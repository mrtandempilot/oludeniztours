'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { onTick } from '@/lib/ticker';
import * as A from '@/state/actions';
import { live, store, type LinkStatus } from '@/state/appState';
import { useStoreSlice } from '@/state/createStore';
import { getRuntime } from '@/state/runtime';
import { Btn, MidiTag, Seg, StatusDot, statusText } from './ui/primitives';

function Pop({ label, status, sub, children }: { label: string; status: LinkStatus; sub: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', h);
    return () => window.removeEventListener('pointerdown', h);
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cx(
          'flex h-9 items-center gap-2 rounded-md border px-2.5 text-left transition-colors',
          open ? 'border-violet/60 bg-violet/10' : 'border-line-2 bg-panel-2 hover:border-mute',
        )}
      >
        <StatusDot status={status} />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] font-bold tracking-[.16em] text-text">{label}</span>
          <span className="mono mt-0.5 text-[9px] text-mute">{sub}</span>
        </span>
      </button>
      {open && (
        <div className="panel absolute right-0 top-11 z-50 w-[300px] p-3 text-[12px] shadow-2xl shadow-black/60 max-sm:fixed max-sm:inset-x-3 max-sm:top-16 max-sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
}

function BeatDots() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const bpmRef = useRef<HTMLSpanElement>(null);
  useEffect(
    () =>
      onTick(() => {
        const b = Math.floor(live.beat) % 4;
        const ph = live.beatPhase;
        refs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = i === b ? String(0.35 + 0.65 * Math.exp(-ph * 4)) : '0.15';
        });
        if (bpmRef.current) bpmRef.current.style.opacity = String(0.6 + 0.4 * Math.exp(-ph * 5));
      }),
    [],
  );
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={cx('h-2.5 w-2.5 rounded-[2px]', i === 0 ? 'bg-cyan' : 'bg-violet-hi')}
        />
      ))}
      <span ref={bpmRef} className="sr-only" />
    </div>
  );
}

function Fps() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let last = 0;
    return onTick((now) => {
      if (now - last < 500 || !ref.current) return;
      last = now;
      ref.current.textContent = `${live.fps || '--'} FPS`;
    });
  }, []);
  return <span ref={ref} className="mono text-[10px] text-mute">-- FPS</span>;
}

export default function TopBar({ onFullscreen }: { onFullscreen: () => void }) {
  const s = useStoreSlice(store, (st) => ({
    bpm: st.bpm,
    bpmSource: st.bpmSource,
    midi: st.midi,
    td: st.td,
    audio: st.audio,
    renderScale: st.renderScale,
    outputWindow: st.outputWindow,
  }));
  const [url, setUrl] = useState(s.td.url);
  useEffect(() => setUrl(s.td.url), [s.td.url]);

  const demo = s.td.status !== 'connected';
  const bpmSrc = { internal: 'INT', tap: 'TAP', 'midi-clock': 'MIDI CLK', bridge: 'ABLETON' }[s.bpmSource];

  return (
    <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-ink/80 px-3 py-2 backdrop-blur md:px-4">
      {/* brand */}
      <div className="mr-1 flex items-center gap-2.5">
        <div className="relative h-8 w-8 shrink-0">
          <div className="absolute inset-0 rounded-full border border-violet/70" />
          <div className="absolute inset-[7px] rounded-full bg-[radial-gradient(circle,#000_30%,#3d6bff_45%,#8b5cf6_70%,transparent_72%)]" />
          <div className="absolute inset-0 rounded-full shadow-[0_0_18px_rgba(139,92,246,.6)]" />
        </div>
        <div className="leading-none">
          <div className="text-[15px] font-black tracking-[.42em] text-text">THE EYE</div>
          <div className="mt-1 text-[9px] tracking-[.24em] text-mute">GENERATIVE PERFORMANCE SYSTEM</div>
        </div>
      </div>

      {/* tempo */}
      <div className="flex h-11 items-center gap-2 rounded-lg border border-line-2 bg-[#07070b] px-2.5">
        <BeatDots />
        <div className="flex flex-col items-end leading-none">
          <span className="mono text-[20px] font-semibold tabular-nums text-text">{s.bpm.toFixed(1)}</span>
          <span className="mono text-[8px] tracking-[.18em] text-mute">BPM · {bpmSrc}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <button type="button" className="h-4 w-5 rounded-sm bg-panel-2 text-[10px] leading-none text-dim hover:text-text" onClick={() => A.setBpm(s.bpm + 1)} aria-label="BPM +1">+</button>
          <button type="button" className="h-4 w-5 rounded-sm bg-panel-2 text-[10px] leading-none text-dim hover:text-text" onClick={() => A.setBpm(s.bpm - 1)} aria-label="BPM -1">−</button>
        </div>
        <Btn size="sm" tone="violet" onClick={A.tapTempo} target="btn:tap" title="Tap tempo (T)" className="!h-8 !px-3">
          TAP
        </Btn>
      </div>

      {demo ? (
        <div className="flex h-9 items-center gap-2 rounded-md border border-warn/40 bg-warn/10 px-2.5" title="TouchDesigner is not connected. The built-in WebGL engine renders a simulated preview.">
          <span className="h-1.5 w-1.5 rounded-full bg-warn blink" />
          <span className="text-[10px] font-bold tracking-[.16em] text-warn">DEMO MODE</span>
          <span className="hidden text-[10px] text-warn/70 xl:inline">local engine · simulated</span>
        </div>
      ) : (
        <div className="flex h-9 items-center gap-2 rounded-md border border-ok/40 bg-ok/10 px-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          <span className="text-[10px] font-bold tracking-[.16em] text-ok">LIVE · TD LINKED</span>
        </div>
      )}

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Pop label="MIDI" status={s.midi.status} sub={s.midi.inputs.length ? `${s.midi.inputs.length} IN${s.midi.clockActive ? ' · CLK' : ''}` : statusText(s.midi.status)}>
          <div className="label mb-2">Web MIDI</div>
          {s.midi.error && <p className="mb-2 text-tally">{s.midi.error}</p>}
          {s.midi.inputs.length ? (
            <ul className="mb-2 space-y-1">
              {s.midi.inputs.map((n) => (
                <li key={n} className="flex items-center gap-2"><StatusDot status="connected" />{n}</li>
              ))}
            </ul>
          ) : (
            <p className="mb-2 text-dim">No MIDI inputs detected. Connect a controller — it appears here automatically.</p>
          )}
          <p className="text-dim">Clock: {s.midi.clockActive ? <span className="text-ok">receiving — BPM follows Ableton</span> : 'not receiving'}</p>
          <p className="mt-1 text-dim">{s.midi.mappings.length} mapping(s). Use LEARN, click a control, move a knob.</p>
          {s.midi.mappings.length > 0 && (
            <Btn size="sm" tone="danger" className="mt-2" onClick={() => A.setMidi({ mappings: [] })}>Clear all mappings</Btn>
          )}
        </Pop>

        <Pop label="TOUCHDESIGNER" status={s.td.status} sub={s.td.status === 'connected' ? `RX ${s.td.rxCount}` : s.td.enabled ? statusText(s.td.status) : 'OFF'}>
          <div className="label mb-2">TouchDesigner / OSC bridge</div>
          <p className="mb-2 text-dim">
            WebSocket to a TouchDesigner Web Server DAT or to <span className="mono text-text">npm run bridge</span> (OSC). While disconnected, the preview is rendered by the local engine.
          </p>
          <div className="flex gap-1.5">
            <input type="text" className="mono h-8 min-w-0 flex-1 px-2 text-[11px]" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && A.setTd({ url })} spellCheck={false} />
            <Btn size="sm" onClick={() => { A.setTd({ url, enabled: true }); getRuntime().td.reconnect(); }}>Connect</Btn>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Seg value={s.td.enabled ? 'on' : 'off'} options={[{ v: 'on', l: 'Auto-connect' }, { v: 'off', l: 'Off' }]} onChange={(v) => A.setTd({ enabled: v === 'on' })} />
            <span className="text-[11px] text-mute">{statusText(s.td.status)}</span>
          </div>
        </Pop>

        <Pop label="AUDIO" status={s.audio.source === 'demo' ? 'connecting' : s.audio.status} sub={s.audio.source === 'demo' ? 'SIMULATED' : s.audio.source === 'off' ? 'OFF' : statusText(s.audio.status)}>
          <div className="label mb-2">Audio input</div>
          <p className="text-dim">
            Source: <span className="text-text">{s.audio.source.toUpperCase()}</span>
            {s.audio.deviceLabel && <> · {s.audio.deviceLabel} ({s.audio.inputChannels} ch)</>}
          </p>
          {s.audio.source === 'demo' && <p className="mt-1 text-warn">Levels are simulated from the BPM clock. Choose INPUT or ABLETON in the Audio panel for real signal.</p>}
          {s.audio.error && <p className="mt-1 text-tally">{s.audio.error}</p>}
        </Pop>

        <div className="hidden items-center gap-2 lg:flex">
          <Fps />
          <Seg
            value={s.renderScale}
            onChange={A.setRenderScale}
            options={[
              { v: 0.5, l: 'LO', title: 'Render at 50% resolution' },
              { v: 0.75, l: 'MID', title: 'Render at 75% resolution' },
              { v: 1, l: 'HI', title: 'Render at full resolution' },
            ]}
          />
        </div>

        <Btn tone={s.midi.learn ? 'active' : 'default'} onClick={A.toggleMidiLearn} title="MIDI learn: click a control, then move a knob/fader or hit a pad (L)">
          {s.midi.learn ? 'LEARNING…' : 'MIDI LEARN'}
        </Btn>
        <Btn
          tone={s.outputWindow ? 'cyan' : 'default'}
          title="Open a borderless output window for a projector / second screen"
          onClick={() => window.open('/output', 'the-eye-output', 'popup,width=1280,height=720')}
        >
          {s.outputWindow ? 'OUTPUT ●' : 'OUTPUT ↗'}
        </Btn>
        <Btn tone="violet" onClick={onFullscreen} title="Fullscreen program output (Esc to exit)">FULLSCREEN</Btn>
      </div>
    </header>
  );
}
