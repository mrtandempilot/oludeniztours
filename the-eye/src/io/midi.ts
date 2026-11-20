import { addMidiMapping, setBpm, setMidi } from '@/state/actions';
import { live, store } from '@/state/appState';
import { applyControl } from '@/state/controls';

/**
 * Real Web MIDI integration (Chrome / Edge / Opera; Firefox behind a prompt;
 * not available in Safari). No device → status stays "disconnected".
 * Also listens for MIDI clock (0xF8, 24 ppqn) so Ableton can drive BPM:
 * in Ableton enable "Clock" for the output port in Preferences → Link/Tempo/MIDI.
 */
export class MidiManager {
  private access: MIDIAccess | null = null;
  private clockTicks: number[] = [];
  private clockTimer: ReturnType<typeof setInterval> | null = null;

  async start() {
    if (typeof navigator === 'undefined' || !('requestMIDIAccess' in navigator)) {
      setMidi({ status: 'unsupported', error: 'Web MIDI is not supported in this browser (use Chrome or Edge).' });
      return;
    }
    setMidi({ status: 'connecting', error: null });
    try {
      this.access = await navigator.requestMIDIAccess({ sysex: false });
    } catch (e) {
      setMidi({ status: 'denied', error: (e as Error)?.message || 'MIDI permission denied.' });
      return;
    }
    this.access.onstatechange = () => this.refresh();
    this.refresh();
    this.clockTimer = setInterval(() => {
      const last = this.clockTicks[this.clockTicks.length - 1];
      const active = !!last && performance.now() - last < 600;
      if (store.get().midi.clockActive !== active) setMidi({ clockActive: active });
    }, 500);
  }

  private refresh() {
    if (!this.access) return;
    const names: string[] = [];
    this.access.inputs.forEach((input) => {
      if (input.state !== 'connected') return;
      names.push(input.name || 'MIDI input');
      input.onmidimessage = (e) => this.onMessage(e);
    });
    setMidi({ inputs: names, status: names.length ? 'connected' : 'disconnected' });
  }

  private onMessage(e: MIDIMessageEvent) {
    const d = e.data;
    if (!d || d.length === 0) return;
    const status = d[0];
    if (status === 0xf8) return this.onClock();
    if (status === 0xfa || status === 0xfb) {
      live.beat = Math.ceil(live.beat);
      return;
    }
    if (status >= 0xf0) return;
    const type = status & 0xf0;
    const channel = (status & 0x0f) + 1;
    let kind: 'cc' | 'note' | null = null;
    let value = 0;
    const number = d[1] ?? 0;
    if (type === 0xb0) {
      kind = 'cc';
      value = (d[2] ?? 0) / 127;
    } else if (type === 0x90) {
      kind = 'note';
      value = (d[2] ?? 0) > 0 ? 1 : 0;
    } else if (type === 0x80) {
      kind = 'note';
      value = 0;
    }
    if (!kind) return;
    live.lastMidiMsg = `${kind.toUpperCase()} ${number} · ch${channel} · ${kind === 'cc' ? d[2] : value ? 'on' : 'off'}`;

    const m = store.get().midi;
    if (m.learn && m.learnTarget && (kind === 'cc' || value > 0)) {
      addMidiMapping({ target: m.learnTarget, type: kind, channel, number });
      return;
    }
    for (const map of m.mappings) {
      if (map.type === kind && map.channel === channel && map.number === number) {
        live.midiActivity[map.target] = performance.now();
        applyControl(map.target, value);
      }
    }
  }

  private onClock() {
    const now = performance.now();
    this.clockTicks.push(now);
    if (this.clockTicks.length > 48) this.clockTicks.shift();
    if (this.clockTicks.length >= 24) {
      const n = this.clockTicks.length - 1;
      const iv = (this.clockTicks[n] - this.clockTicks[0]) / n; // ms per tick
      const bpm = 60000 / (iv * 24);
      const cur = store.get().bpm;
      if (Math.abs(bpm - cur) > 0.25 && bpm > 40 && bpm < 240) setBpm(bpm, 'midi-clock');
    }
  }

  dispose() {
    if (this.clockTimer) clearInterval(this.clockTimer);
    this.access?.inputs.forEach((i) => (i.onmidimessage = null));
    if (this.access) this.access.onstatechange = null;
  }
}
