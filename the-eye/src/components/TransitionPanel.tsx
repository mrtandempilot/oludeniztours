'use client';

import { useEffect, useRef } from 'react';
import { KIND_LABEL, TRANSITIONS, TRANSITION_LABEL, type TransitionType } from '@/engine/types';
import { cx } from '@/lib/cx';
import { onTick } from '@/lib/ticker';
import * as A from '@/state/actions';
import { live, store } from '@/state/appState';
import { useStoreSlice } from '@/state/createStore';
import { getRuntime } from '@/state/runtime';
import { MidiTag, PanelHeader, Seg, Slider } from './ui/primitives';

const T_ICON: Record<TransitionType, string> = {
  morph: '◐',
  liquid: '≋',
  dissolve: '░',
  feedback: '◎',
  glitch: '▚',
  tunnel: '◉',
  particles: '✺',
};

function Monitor({ slot }: { slot: 'A' | 'B' }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const s = useStoreSlice(store, (st) => {
    const sc = st.scenes.find((x) => x.id === (slot === 'A' ? st.slotA : st.slotB));
    return { name: sc?.name, kind: sc?.kind, edit: st.editTarget === slot };
  });
  useEffect(() => {
    const rt = getRuntime();
    const set = () => {
      const other = document.querySelector<HTMLCanvasElement>(`canvas[data-monitor="${slot === 'A' ? 'B' : 'A'}"]`);
      if (slot === 'A') rt.setMonitors(ref.current, other);
      else rt.setMonitors(other, ref.current);
    };
    // engine may attach after mount
    const id = setInterval(() => {
      if (rt.engine) {
        set();
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, [slot]);
  const isA = slot === 'A';
  return (
    <button
      type="button"
      onClick={() => A.setEditTarget(slot)}
      title={`Edit ${slot} in the effect panel`}
      className={cx(
        'group relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border text-left transition-colors',
        isA ? 'border-tally/60' : 'border-cyan/50',
        s.edit && 'ring-1 ring-violet-hi/70',
      )}
    >
      <div className="relative aspect-video w-full bg-black">
        <canvas ref={ref} data-monitor={slot} className="absolute inset-0 h-full w-full" />
        <span className={cx('absolute left-1.5 top-1.5 rounded-[3px] px-1.5 py-0.5 text-[10px] font-black tracking-[.12em]', isA ? 'bg-tally text-white' : 'bg-cyan text-black')}>
          {isA ? 'A · PROGRAM' : 'B · PREVIEW'}
        </span>
        {s.edit && <span className="absolute right-1.5 top-1.5 rounded-[3px] bg-violet px-1.5 py-0.5 text-[9px] font-bold tracking-[.12em] text-white">EDITING</span>}
      </div>
      <div className="flex items-center gap-2 bg-black/40 px-2 py-1.5">
        <span className="truncate text-[11px] font-semibold tracking-[.12em]">{s.name}</span>
        <span className="ml-auto hidden truncate text-[10px] text-mute sm:inline">{s.kind && KIND_LABEL[s.kind]}</span>
      </div>
    </button>
  );
}

function TBar() {
  const track = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  useEffect(
    () =>
      onTick(() => {
        if (handle.current) handle.current.style.left = `${live.mix * 100}%`;
        if (fill.current) fill.current.style.width = `${live.mix * 100}%`;
      }),
    [],
  );
  const set = (x: number) => {
    const r = track.current!.getBoundingClientRect();
    A.setManualMix((x - r.left) / r.width);
  };
  return (
    <div className="select-none">
      <div className="mb-1 flex items-center gap-2">
        <span className="label">Crossfade</span>
        <MidiTag target="mix" />
        <span className="ml-auto text-[10px] text-mute">drag to mix manually · release at B to commit</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-black text-tally">A</span>
        <div
          ref={track}
          data-midi-target="mix"
          className="relative h-10 flex-1 cursor-ew-resize touch-none rounded-md border border-line-2 bg-[#07070b]"
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture?.(e.pointerId);
            dragging.current = true;
            set(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && set(e.clientX)}
          onPointerUp={() => {
            dragging.current = false;
            A.releaseManualMix();
          }}
          onPointerCancel={() => {
            dragging.current = false;
            A.releaseManualMix();
          }}
        >
          <div ref={fill} className="absolute inset-y-0 left-0 rounded-l-md bg-gradient-to-r from-tally/20 via-violet/30 to-cyan/40" />
          {[0.25, 0.5, 0.75].map((t) => (
            <div key={t} className="absolute inset-y-2 w-px bg-white/10" style={{ left: `${t * 100}%` }} />
          ))}
          <div ref={handle} className="absolute inset-y-[-3px] w-4 -translate-x-1/2 rounded-[4px] border border-white/70 bg-gradient-to-b from-[#f4f4ff] to-[#9a9ab4] shadow-[0_0_14px_rgba(177,140,255,.6)]" />
        </div>
        <span className="text-[11px] font-black text-cyan">B</span>
      </div>
    </div>
  );
}

export default function TransitionPanel() {
  const t = useStoreSlice(store, (s) => s.transition);
  const transitioning = useStoreSlice(store, (s) => s.transitioning);
  const sameAB = useStoreSlice(store, (s) => s.slotA === s.slotB);

  return (
    <section className="panel overflow-hidden">
      <PanelHeader
        index="02"
        title="A / B Transition"
        right={<span className="text-[10px] text-mute">click a monitor to edit that slot</span>}
      />
      <div className="grid gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* monitors + take */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Monitor slot="A" />
            <Monitor slot="B" />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <button
              type="button"
              data-midi-target="btn:take"
              disabled={transitioning || sameAB}
              onClick={A.take}
              className={cx(
                'relative h-16 rounded-lg border text-[22px] font-black tracking-[.5em] transition-transform active:scale-[.985] disabled:cursor-not-allowed md:h-[72px]',
                transitioning
                  ? 'take-run border-cyan bg-cyan/15 text-cyan'
                  : 'take-glow border-violet-hi/80 bg-gradient-to-b from-violet to-[#5b2fd6] text-white hover:brightness-110',
              )}
              title="Transition A → B (Space)"
            >
              {transitioning ? 'TAKING' : 'TAKE'}
              <span className="absolute bottom-1.5 left-0 right-0 text-center text-[9px] font-semibold tracking-[.2em] opacity-60">SPACE</span>
              <MidiTag target="btn:take" className="absolute right-2 top-2" />
            </button>
            <button
              type="button"
              data-midi-target="btn:cut"
              disabled={sameAB}
              onClick={A.cut}
              title="Instant cut to B (Enter)"
              className="relative h-16 w-20 rounded-lg border border-line-2 bg-panel-2 text-[13px] font-black tracking-[.3em] text-dim hover:border-mute hover:text-text active:scale-[.98] md:h-[72px]"
            >
              CUT
              <MidiTag target="btn:cut" className="absolute right-1.5 top-1.5" />
            </button>
          </div>
          <TBar />
        </div>

        {/* transition settings */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="label mb-1.5">Transition type · keys 1–7</div>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7 xl:grid-cols-4 2xl:grid-cols-7">
              {TRANSITIONS.map((ty, i) => (
                <button
                  key={ty}
                  type="button"
                  onClick={() => A.setTransition({ type: ty })}
                  className={cx(
                    'flex h-14 flex-col items-center justify-center gap-0.5 rounded-md border px-1 transition-colors',
                    t.type === ty
                      ? 'border-violet-hi bg-violet/25 text-text shadow-[0_0_14px_rgba(139,92,246,.35)]'
                      : 'border-line-2 bg-[#08080d] text-mute hover:border-mute hover:text-text',
                  )}
                >
                  <span className="text-[17px] leading-none">{T_ICON[ty]}</span>
                  <span className="text-center text-[8.5px] font-bold leading-tight tracking-[.08em]">
                    {ty === 'particles' ? 'PARTICLE EXPL.' : TRANSITION_LABEL[ty].toUpperCase()}
                  </span>
                  <span className="mono text-[8px] opacity-50">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <Slider
              label="Duration"
              value={t.duration}
              min={0.25}
              max={16}
              def={4}
              step={0.05}
              target="trans.duration"
              onChange={(v) => A.setTransition({ duration: v })}
              format={(v) => `${v.toFixed(2)}s`}
            />
            <Slider
              label="Intensity"
              value={t.intensity}
              min={0}
              max={1}
              def={0.7}
              target="trans.intensity"
              accent="cyan"
              onChange={(v) => A.setTransition({ intensity: v })}
              format={(v) => `${Math.round(v * 100)}%`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-md border border-line bg-black/25 p-2">
            <button
              type="button"
              data-midi-target="btn:auto"
              onClick={() => A.setTransition({ auto: !t.auto })}
              className={cx(
                'relative flex h-9 items-center gap-2 rounded-md border px-3 text-[11px] font-bold tracking-[.14em]',
                t.auto ? 'border-cyan bg-cyan/15 text-cyan' : 'border-line-2 bg-panel-2 text-dim',
              )}
            >
              <span className={cx('h-2 w-2 rounded-full', t.auto ? 'bg-cyan blink' : 'bg-[#3a3a4d]')} />
              AUTO
              <MidiTag target="btn:auto" />
            </button>
            <span className="text-[10px] text-mute">every</span>
            <Seg
              value={t.autoBeats}
              onChange={(v) => A.setTransition({ autoBeats: v })}
              options={[
                { v: 4, l: '1 BAR' },
                { v: 16, l: '4' },
                { v: 32, l: '8' },
                { v: 64, l: '16' },
              ]}
            />
            <span className="text-[10px] text-mute">bars · on the downbeat</span>
          </div>
        </div>
      </div>
    </section>
  );
}
