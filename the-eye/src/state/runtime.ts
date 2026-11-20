import { clampParam, PARAM_BY_KEY, type ParamValues } from '@/engine/params';
import { seedFromId } from '@/engine/presets';
import type { EngineFrame, Scene } from '@/engine/types';
import { VisualEngine } from '@/engine/VisualEngine';
import { AudioEngine } from '@/io/audio';
import { TouchDesignerLink } from '@/io/bridge';
import { MidiManager } from '@/io/midi';
import { onPerfEvent, stepTransition, take } from './actions';
import { live, store, type AppState } from './appState';

export { OUTPUT_CHANNEL } from '@/engine/types';
import { OUTPUT_CHANNEL } from '@/engine/types';

/**
 * PerformanceRuntime — the "conductor". One requestAnimationFrame loop that:
 *   1. advances the musical clock (BPM / beats, freeze aware)
 *   2. advances A→B transitions and the auto-trigger
 *   3. reads audio levels and applies the audio→parameter modulation matrix
 *   4. builds an EngineFrame and hands it to the engine, the pop-out output
 *      window (BroadcastChannel) and TouchDesigner (WebSocket)
 */
export class PerformanceRuntime {
  engine: VisualEngine | null = null;
  audio = new AudioEngine();
  midi = new MidiManager();
  td = new TouchDesignerLink();
  private raf = 0;
  private last = 0;
  private channel: BroadcastChannel | null = null;
  private lastAutoBlock = -1;
  private thumbQueue = new Set<string>();
  private thumbTimer: ReturnType<typeof setTimeout> | null = null;
  private unsubs: (() => void)[] = [];
  frame: EngineFrame | null = null;

  attachCanvas(canvas: HTMLCanvasElement) {
    try {
      this.engine = new VisualEngine(canvas, { monitors: true });
      store.set({ engineError: null });
    } catch (e) {
      store.set({ engineError: (e as Error).message });
      return;
    }
    store.get().scenes.forEach((s) => this.thumbQueue.add(s.id));
    this.flushThumbs();
  }

  private started = false;

  /** Idempotent: the runtime lives for the whole page session. */
  start() {
    if (this.started) return;
    this.started = true;
    if (typeof BroadcastChannel !== 'undefined') this.channel = new BroadcastChannel(OUTPUT_CHANNEL);
    if (this.channel) {
      this.channel.onmessage = (e) => {
        if (e.data?.type === 'output-hello') store.set({ outputWindow: true });
        if (e.data?.type === 'output-bye') store.set({ outputWindow: false });
      };
    }
    this.td.onAudio = (levels) => {
      if (store.get().audio.source === 'bridge') this.audio.pushBridge(levels);
    };
    this.td.start();
    this.midi.start();
    this.audio.setSource(store.get().audio.source);

    this.unsubs.push(
      store.subscribe((s, p) => this.onStateChange(s, p)),
      onPerfEvent((e) => this.td.sendRaw({ type: 'event', name: e.type, data: e })),
    );
    this.last = performance.now();
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.1, (now - this.last) / 1000);
      this.last = now;
      this.tick(dt);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private onStateChange(s: AppState, p: AppState) {
    if (s.scenes !== p.scenes) {
      const prev = new Map(p.scenes.map((x) => [x.id, x]));
      for (const sc of s.scenes) {
        const old = prev.get(sc.id);
        if (!old || old.params !== sc.params || old.kind !== sc.kind) this.thumbQueue.add(sc.id);
      }
      this.scheduleThumbs();
    }
  }

  private scheduleThumbs() {
    if (this.thumbTimer) clearTimeout(this.thumbTimer);
    this.thumbTimer = setTimeout(() => this.flushThumbs(), 350);
  }

  private flushThumbs() {
    if (!this.engine || this.thumbQueue.size === 0) return;
    const thumbs = { ...store.get().thumbs };
    for (const id of this.thumbQueue) {
      const sc = store.get().scenes.find((x) => x.id === id);
      if (!sc) continue;
      thumbs[id] = this.engine.thumbnail({ kind: sc.kind, params: sc.params, seed: seedFromId(sc.id) });
    }
    this.thumbQueue.clear();
    store.set({ thumbs });
  }

  /** Apply the audio → parameter modulation matrix */
  private modulate(params: ParamValues, s: AppState): ParamValues {
    const out = { ...params };
    const k = s.audio.reactivity * Math.min(1.25, s.master);
    if (s.audio.source === 'off' || k <= 0) return out;
    for (const ch of s.audio.channels) {
      if (!ch.target || !ch.amount) continue;
      const d = PARAM_BY_KEY[ch.target];
      if (!d) continue;
      const lvl = live.levels[ch.id];
      out[ch.target] = clampParam(ch.target, (out[ch.target] ?? d.def) + lvl * ch.amount * (d.max - d.min) * k);
    }
    return out;
  }

  private tick(dt: number) {
    const s = store.get();

    // 1. clock
    if (!s.freeze) {
      live.time += dt;
      live.beat += (dt * s.bpm) / 60;
    }
    live.beatPhase = live.beat - Math.floor(live.beat);

    // 2. transitions + auto trigger (every N beats, on the downbeat)
    stepTransition(dt);
    if (s.transition.auto && !s.transitioning) {
      const block = Math.floor(live.beat / Math.max(1, s.transition.autoBeats));
      if (this.lastAutoBlock >= 0 && block !== this.lastAutoBlock) take();
      this.lastAutoBlock = block;
    } else {
      this.lastAutoBlock = Math.floor(live.beat / Math.max(1, s.transition.autoBeats));
    }

    // 3. audio
    this.audio.update(dt, live.beat);

    // blackout fade (~120 ms)
    const bt = s.blackout ? 1 : 0;
    live.blackout += (bt - live.blackout) * (1 - Math.exp(-dt * 25));
    if (Math.abs(bt - live.blackout) < 0.002) live.blackout = bt;

    // 4. frame
    const sa = s.scenes.find((x) => x.id === s.slotA) ?? s.scenes[0];
    const sb = s.scenes.find((x) => x.id === s.slotB) ?? null;
    const audioLive = s.audio.source !== 'off';
    const beatEnv = Math.exp(-live.beatPhase * 6);
    const pulse = audioLive ? Math.max(live.levels.kick, beatEnv * 0.3) : beatEnv;
    const frame: EngineFrame = {
      time: live.time,
      beat: live.beat,
      pulse,
      freeze: s.freeze,
      a: this.render(sa, s),
      b: sb ? this.render(sb, s) : null,
      mix: live.mix,
      transition: { type: s.transition.type, intensity: s.transition.intensity },
      master: s.master,
      blackout: live.blackout,
      renderScale: s.renderScale,
    };
    this.frame = frame;
    if (this.engine) {
      this.engine.render(frame);
      live.fps = this.engine.fps;
    }
    if (s.outputWindow) this.channel?.postMessage({ type: 'frame', frame });
    this.td.sendFrame(() => ({
      type: 'frame',
      t: live.time,
      bpm: s.bpm,
      beat: live.beat,
      mix: live.mix,
      master: s.master,
      blackout: live.blackout,
      freeze: s.freeze,
      transition: s.transition.type,
      a: { id: sa.id, name: sa.name, kind: sa.kind, params: frame.a.params },
      b: sb ? { id: sb.id, name: sb.name, kind: sb.kind } : null,
      audio: { ...live.levels },
    }));
  }

  private render(sc: Scene, s: AppState) {
    return { kind: sc.kind, params: this.modulate(sc.params, s), seed: seedFromId(sc.id) };
  }

  setMonitors(a: HTMLCanvasElement | null, b: HTMLCanvasElement | null) {
    if (!this.engine) return;
    this.engine.monitorA = a;
    this.engine.monitorB = b;
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.unsubs.forEach((u) => u());
    this.td.dispose();
    this.midi.dispose();
    this.audio.dispose();
    this.channel?.close();
    this.engine?.dispose();
    this.engine = null;
  }
}

let instance: PerformanceRuntime | null = null;
export function getRuntime() {
  if (!instance) instance = new PerformanceRuntime();
  return instance;
}
export function disposeRuntime() {
  instance?.dispose();
  instance = null;
}

