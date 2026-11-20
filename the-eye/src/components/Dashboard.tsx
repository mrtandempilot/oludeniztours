'use client';

import { useEffect, useRef, useState } from 'react';
import { TRANSITIONS } from '@/engine/types';
import { cx } from '@/lib/cx';
import { onTick } from '@/lib/ticker';
import * as A from '@/state/actions';
import { live, store } from '@/state/appState';
import { controlLabel } from '@/state/controls';
import { useStoreSlice } from '@/state/createStore';
import { getRuntime } from '@/state/runtime';
import AudioPanel from './AudioPanel';
import EffectsPanel from './EffectsPanel';
import PerformancePanel from './PerformancePanel';
import PreviewStage from './PreviewStage';
import ScenePanel from './ScenePanel';
import TopBar from './TopBar';
import TransitionPanel from './TransitionPanel';

const SHORTCUTS: [string, string][] = [
  ['Space', 'TAKE  A → B'],
  ['Enter', 'CUT to B'],
  ['← / →', 'Previous / next scene'],
  ['R', 'Random scene'],
  ['B', 'Blackout'],
  ['F', 'Freeze'],
  ['T', 'Tap tempo'],
  ['1 – 7', 'Transition type'],
  ['A / S', 'Edit slot A / B'],
  ['L', 'MIDI learn'],
  ['?', 'This help'],
];

function isTyping(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null;
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
}

function LearnBar() {
  const m = useStoreSlice(store, (s) => ({ learn: s.midi.learn, target: s.midi.learnTarget, status: s.midi.status }));
  const msgRef = useRef<HTMLSpanElement>(null);
  useEffect(
    () =>
      onTick(() => {
        if (msgRef.current && msgRef.current.textContent !== live.lastMidiMsg) msgRef.current.textContent = live.lastMidiMsg || '—';
      }),
    [],
  );
  if (!m.learn) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-violet/50 bg-violet/15 px-4 py-2 text-[12px]">
      <span className="font-black tracking-[.2em] text-violet-hi">MIDI LEARN</span>
      {m.status !== 'connected' && <span className="text-warn">No MIDI device connected — mappings can be prepared but won’t receive input.</span>}
      <span className="text-dim">
        {m.target ? (
          <>
            Move a knob / fader or hit a pad for <b className="text-cyan">{controlLabel(m.target)}</b>
          </>
        ) : (
          'Click any outlined control to select it'
        )}
      </span>
      <span className="mono text-[10px] text-mute">last: <span ref={msgRef}>—</span></span>
      <div className="ml-auto flex gap-2">
        {m.target && (
          <button type="button" className="rounded border border-line-2 px-2 py-1 text-[10px] tracking-[.12em] text-dim hover:text-tally" onClick={() => A.clearMidiMapping(m.target!)}>
            UNMAP
          </button>
        )}
        <button type="button" className="rounded bg-violet px-3 py-1 text-[10px] font-bold tracking-[.14em] text-white" onClick={A.toggleMidiLearn}>
          DONE (Esc)
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [help, setHelp] = useState(false);
  const learn = useStoreSlice(store, (s) => ({ on: s.midi.learn, target: s.midi.learnTarget }));
  const mobile = useStoreSlice(store, (s) => ({ transitioning: s.transitioning, blackout: s.blackout, freeze: s.freeze }));

  // boot: restore saved set, start runtime + persistence
  useEffect(() => {
    getRuntime().start(); // subscribe first so restored scenes get thumbnails
    A.loadPersisted();
    return A.startPersistence();
  }, []);

  const fullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => {});
  };

  // keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      let handled = true;
      if (k === ' ') A.take();
      else if (k === 'Enter') A.cut();
      else if (k === 'ArrowRight') A.nextScene();
      else if (k === 'ArrowLeft') A.prevScene();
      else if (k === 'r' || k === 'R') A.randomScene();
      else if (k === 'b' || k === 'B') A.toggleBlackout();
      else if (k === 'f' || k === 'F') A.toggleFreeze();
      else if (k === 't' || k === 'T') A.tapTempo();
      else if (k === 'l' || k === 'L') A.toggleMidiLearn();
      else if (k === 'a' || k === 'A') A.setEditTarget('A');
      else if (k === 's' || k === 'S') A.setEditTarget('B');
      else if (k === '?') setHelp((h) => !h);
      else if (k === 'Escape') {
        if (store.get().midi.learn) A.toggleMidiLearn();
        setHelp(false);
      } else if (/^[1-7]$/.test(k)) A.setTransition({ type: TRANSITIONS[Number(k) - 1] });
      else handled = false;
      if (handled) e.preventDefault();
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  // MIDI learn: capture clicks on mappable controls
  useEffect(() => {
    document.body.dataset.learn = learn.on ? '1' : '0';
    document.querySelectorAll<HTMLElement>('[data-midi-target]').forEach((el) => {
      el.dataset.learning = learn.on && el.dataset.midiTarget === learn.target ? '1' : '0';
    });
    if (!learn.on) return;
    const pick = (e: Event) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-midi-target]');
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'pointerdown') A.setLearnTarget(el.dataset.midiTarget!);
    };
    window.addEventListener('pointerdown', pick, true);
    window.addEventListener('click', pick, true);
    return () => {
      window.removeEventListener('pointerdown', pick, true);
      window.removeEventListener('click', pick, true);
    };
  }, [learn.on, learn.target]);

  // flash MIDI tags on incoming messages
  useEffect(() => {
    let last = 0;
    return onTick((now) => {
      if (now - last < 50) return;
      last = now;
      document.querySelectorAll<HTMLElement>('[data-midi-tag]').forEach((el) => {
        const t = live.midiActivity[el.dataset.midiTag!];
        el.dataset.active = t && now - t < 160 ? '1' : '0';
      });
    });
  }, []);

  return (
    <div className="flex min-h-dvh flex-col pb-[84px] md:pb-0">
      <TopBar onFullscreen={fullscreen} />
      <LearnBar />
      <main className="eye-grid flex-1 p-2.5 md:p-3">
        <div className="a-scenes flex min-h-0 flex-col">
          <ScenePanel />
        </div>
        <div className="a-stage">
          <PreviewStage ref={stageRef} />
        </div>
        <div className="a-trans">
          <TransitionPanel />
        </div>
        <div className="a-audio">
          <AudioPanel />
        </div>
        <div className="a-side">
          <div className="a-perf">
            <PerformancePanel />
          </div>
          <div className="a-fx flex min-h-0 flex-col">
            <EffectsPanel />
          </div>
        </div>
      </main>
      <footer className="hidden items-center gap-4 px-4 pb-3 text-[10px] text-mute md:flex">
        <span>THE EYE v0.1 · WebGL2 engine</span>
        <span>Press <kbd className="mono rounded border border-line-2 px-1 text-dim">?</kbd> for shortcuts</span>
        <button type="button" className="ml-auto hover:text-tally" onClick={() => confirm('Reset all scenes, mappings and settings?') && A.resetAll()}>
          Reset saved set
        </button>
      </footer>

      {/* phone performance bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_2fr] gap-2 border-t border-line bg-ink/95 p-2.5 backdrop-blur md:hidden">
        <button type="button" onClick={() => A.toggleBlackout()} className={cx('h-14 rounded-lg border text-[11px] font-black tracking-[.15em]', mobile.blackout ? 'border-tally bg-tally text-white' : 'border-line-2 bg-panel-2 text-dim')}>
          BLACK
        </button>
        <button type="button" onClick={() => A.toggleFreeze()} className={cx('h-14 rounded-lg border text-[11px] font-black tracking-[.15em]', mobile.freeze ? 'border-cyan bg-cyan/25 text-cyan' : 'border-line-2 bg-panel-2 text-dim')}>
          FREEZE
        </button>
        <button type="button" onClick={A.take} disabled={mobile.transitioning} className={cx('h-14 rounded-lg border text-[18px] font-black tracking-[.4em]', mobile.transitioning ? 'take-run border-cyan bg-cyan/15 text-cyan' : 'take-glow border-violet-hi bg-gradient-to-b from-violet to-[#5b2fd6] text-white')}>
          TAKE
        </button>
      </div>

      {help && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setHelp(false)}>
          <div className="panel w-full max-w-sm p-4" onClick={(e) => e.stopPropagation()}>
            <div className="label mb-3 !text-dim">Keyboard shortcuts</div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[12px]">
              {SHORTCUTS.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt><kbd className="mono rounded border border-line-2 bg-black/40 px-1.5 py-0.5 text-[11px] text-cyan">{k}</kbd></dt>
                  <dd className="text-dim">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
