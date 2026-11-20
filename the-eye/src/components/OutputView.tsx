'use client';

import { useEffect, useRef, useState } from 'react';
import { type EngineFrame } from '@/engine/types';
import { VisualEngine } from '@/engine/VisualEngine';
import { OUTPUT_CHANNEL } from '@/engine/types';

/**
 * Borderless program output for a projector / second screen. It runs its own
 * engine instance and renders frames streamed from the controller window
 * over a BroadcastChannel — the controller stays the single source of truth.
 */
export default function OutputView() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<'waiting' | 'live' | 'error'>('waiting');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!canvas.current) return;
    let engine: VisualEngine;
    try {
      engine = new VisualEngine(canvas.current, { maxWidth: 3840 });
    } catch (e) {
      setErr((e as Error).message);
      setState('error');
      return;
    }
    const ch = new BroadcastChannel(OUTPUT_CHANNEL);
    let frame: EngineFrame | null = null;
    let lastAt = 0;
    ch.onmessage = (e) => {
      if (e.data?.type === 'frame') {
        frame = e.data.frame;
        lastAt = performance.now();
      }
    };
    const hello = () => ch.postMessage({ type: 'output-hello' });
    hello();
    const helloT = setInterval(hello, 1000);
    const bye = () => ch.postMessage({ type: 'output-bye' });
    window.addEventListener('beforeunload', bye);

    let raf = 0;
    let shown: 'waiting' | 'live' = 'waiting';
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const alive = !!frame && performance.now() - lastAt < 3000;
      if (alive && frame) engine.render({ ...frame, renderScale: 1 });
      const next = alive ? 'live' : 'waiting';
      if (next !== shown) {
        shown = next;
        setState(next);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(helloT);
      bye();
      window.removeEventListener('beforeunload', bye);
      ch.close();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black"
      style={{ cursor: state === 'live' ? 'none' : 'default' }}
      onDoubleClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())}
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      {state !== 'live' && (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-[13px] font-black tracking-[.5em] text-text">THE EYE · OUTPUT</div>
            <p className="mt-3 text-[12px] text-mute">
              {state === 'error' ? err : 'Waiting for the controller window… keep the dashboard open in another tab or window.'}
            </p>
            <p className="mt-1 text-[11px] text-mute">Double-click for fullscreen.</p>
          </div>
        </div>
      )}
    </div>
  );
}
