'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { KIND_LABEL, TRANSITION_LABEL } from '@/engine/types';
import { cx } from '@/lib/cx';
import { onTick } from '@/lib/ticker';
import { live, store } from '@/state/appState';
import { useStoreSlice } from '@/state/createStore';
import { getRuntime } from '@/state/runtime';

const PreviewStage = forwardRef<HTMLDivElement>(function PreviewStage(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const s = useStoreSlice(store, (st) => ({
    a: st.scenes.find((x) => x.id === st.slotA),
    b: st.scenes.find((x) => x.id === st.slotB),
    freeze: st.freeze,
    blackout: st.blackout,
    transitioning: st.transitioning,
    type: st.transition.type,
    error: st.engineError,
  }));

  useEffect(() => {
    const rt = getRuntime();
    if (canvasRef.current && !rt.engine) rt.attachCanvas(canvasRef.current);
  }, []);

  useEffect(
    () =>
      onTick(() => {
        if (barRef.current) barRef.current.style.transform = `scaleX(${live.mix})`;
        if (pctRef.current) pctRef.current.textContent = live.mix > 0 ? `${Math.round(live.mix * 100)}%` : '';
      }),
    [],
  );

  return (
    <div
      ref={ref}
      className="eye-stage group relative aspect-video w-full overflow-hidden rounded-[10px] border border-line bg-black [&:fullscreen]:rounded-none [&:fullscreen]:border-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {s.error && (
        <div className="absolute inset-0 grid place-items-center bg-black/90 p-6 text-center">
          <div>
            <div className="label mb-2 !text-tally">Visual engine unavailable</div>
            <p className="max-w-md text-[12px] text-dim">{s.error}</p>
            <p className="mt-2 text-[11px] text-mute">The controls still work and will drive TouchDesigner if connected.</p>
          </div>
        </div>
      )}

      {/* overlays — hidden when the stage itself is fullscreen */}
      <div className="stage-overlay pointer-events-none absolute inset-0">
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-[4px] bg-tally px-2 py-1 text-[10px] font-bold tracking-[.18em] text-white shadow-[0_0_14px_rgba(255,46,85,.6)]">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> PROGRAM
          </span>
          <span data-role="program-name" className="rounded-[4px] bg-black/60 px-2 py-1 text-[11px] font-semibold tracking-[.14em] text-text backdrop-blur">
            {s.a?.name}
          </span>
          <span className="hidden rounded-[4px] bg-black/50 px-2 py-1 text-[10px] tracking-[.1em] text-mute backdrop-blur sm:inline">
            {s.a && KIND_LABEL[s.a.kind]}
          </span>
        </div>
        <div className="absolute right-3 top-3 flex gap-1.5">
          {s.freeze && <span className="rounded-[4px] border border-cyan/60 bg-cyan/15 px-2 py-1 text-[10px] font-bold tracking-[.18em] text-cyan">FROZEN</span>}
          {s.blackout && <span className="rounded-[4px] border border-tally/60 bg-tally/20 px-2 py-1 text-[10px] font-bold tracking-[.18em] text-tally blink">BLACKOUT</span>}
        </div>
        <div className={cx('absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8 transition-opacity', s.transitioning ? 'opacity-100' : 'opacity-70')}>
          <div className="mb-1 flex items-center gap-2 text-[10px] tracking-[.14em]">
            <span className="text-mute">A</span>
            <span className="text-dim">{s.a?.name}</span>
            <span className="text-violet-hi">→ {TRANSITION_LABEL[s.type].toUpperCase()} →</span>
            <span className="text-dim">{s.b?.name}</span>
            <span ref={pctRef} className="mono ml-auto text-cyan" />
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <div ref={barRef} className="h-full origin-left bg-gradient-to-r from-violet via-blue to-cyan" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default PreviewStage;
