'use client';

import { cx } from '@/lib/cx';
import * as A from '@/state/actions';
import { store } from '@/state/appState';
import { useStoreSlice } from '@/state/createStore';
import { MidiTag, PanelHeader, Slider, StatusDot, statusText } from './ui/primitives';

function Big({
  label, hint, onClick, target, active, tone = 'default',
}: {
  label: string;
  hint: string;
  onClick: () => void;
  target: string;
  active?: boolean;
  tone?: 'default' | 'danger' | 'cyan';
}) {
  return (
    <button
      type="button"
      data-midi-target={target}
      onClick={onClick}
      className={cx(
        'relative flex h-16 flex-col items-center justify-center rounded-lg border text-[12px] font-black tracking-[.22em] transition-all active:scale-[.97]',
        active && tone === 'danger' && 'border-tally bg-tally text-white shadow-[0_0_24px_rgba(255,46,85,.55)]',
        active && tone === 'cyan' && 'border-cyan bg-cyan/25 text-cyan shadow-[0_0_24px_rgba(34,225,255,.4)]',
        !active && 'border-line-2 bg-panel-2 text-dim hover:border-mute hover:text-text',
      )}
    >
      {label}
      <span className="mono mt-1 text-[9px] font-medium tracking-[.1em] opacity-50">{hint}</span>
      <MidiTag target={target} className="absolute right-1.5 top-1.5" />
    </button>
  );
}

export default function PerformancePanel() {
  const s = useStoreSlice(store, (st) => ({
    master: st.master,
    freeze: st.freeze,
    blackout: st.blackout,
    midi: st.midi.status,
    midiN: st.midi.inputs.length,
    td: st.td.status,
    audio: st.audio.source,
    audioStatus: st.audio.status,
  }));
  return (
    <section className="panel overflow-hidden">
      <PanelHeader index="03" title="Performance" />
      <div className="space-y-3 p-3">
        <Slider
          label="MASTER INTENSITY"
          value={s.master}
          min={0}
          max={1.5}
          def={1}
          target="master"
          onChange={A.setMaster}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <div className="grid grid-cols-2 gap-2">
          <Big label="BLACKOUT" hint="B" target="btn:blackout" tone="danger" active={s.blackout} onClick={() => A.toggleBlackout()} />
          <Big label="FREEZE" hint="F" target="btn:freeze" tone="cyan" active={s.freeze} onClick={() => A.toggleFreeze()} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Big label="◀ PREV" hint="←" target="btn:prev" onClick={A.prevScene} />
          <Big label="RANDOM" hint="R" target="btn:random" onClick={A.randomScene} />
          <Big label="NEXT ▶" hint="→" target="btn:next" onClick={A.nextScene} />
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          {[
            { k: 'MIDI', st: s.midi, sub: s.midiN ? `${s.midiN} dev` : statusText(s.midi) },
            { k: 'TOUCHDES.', st: s.td, sub: statusText(s.td) },
            {
              k: 'AUDIO',
              st: s.audio === 'demo' ? ('connecting' as const) : s.audio === 'off' ? ('disconnected' as const) : s.audioStatus,
              sub: s.audio === 'demo' ? 'SIMULATED' : s.audio === 'off' ? 'OFF' : statusText(s.audioStatus),
            },
          ].map((x) => (
            <div key={x.k} className="flex items-center gap-1.5 rounded-md border border-line bg-black/30 px-2 py-1.5">
              <StatusDot status={x.st} />
              <div className="min-w-0 leading-tight">
                <div className="font-bold tracking-[.12em] text-dim">{x.k}</div>
                <div className="mono truncate text-[8.5px] text-mute">{x.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
