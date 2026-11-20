'use client';

import { useState } from 'react';
import { PARAM_GROUPS, PARAMS, type ParamGroupId } from '@/engine/params';
import { KIND_LABEL, SCENE_KINDS, type SceneKind } from '@/engine/types';
import { cx } from '@/lib/cx';
import * as A from '@/state/actions';
import { store } from '@/state/appState';
import { useStoreSlice } from '@/state/createStore';
import { PanelHeader, Seg, Slider } from './ui/primitives';

const GROUP_ACCENT: Partial<Record<ParamGroupId, 'violet' | 'cyan' | 'blue'>> = {
  eye: 'violet', iris: 'violet', organic: 'blue', superformula: 'cyan', particles: 'cyan',
  distortion: 'blue', feedback: 'violet', color: 'cyan', glow: 'violet', rotation: 'blue', scale: 'blue',
};

function fmt(v: number, min: number, max: number) {
  if (max - min > 4) return v.toFixed(2);
  return v.toFixed(2);
}

export default function EffectsPanel() {
  const s = useStoreSlice(store, (st) => {
    const id = st.editTarget === 'A' ? st.slotA : st.slotB;
    return {
      target: st.editTarget,
      scene: st.scenes.find((x) => x.id === id),
      modulated: st.audio.source === 'off' ? '' : st.audio.channels.filter((c) => c.target && c.amount).map((c) => c.target).join(','),
    };
  });
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const sc = s.scene;
  if (!sc) return null;
  const mod = new Set(s.modulated.split(','));

  return (
    <section className="panel flex min-h-0 flex-col overflow-hidden">
      <PanelHeader
        index="04"
        title="Effect Control"
        right={
          <Seg
            value={s.target}
            onChange={A.setEditTarget}
            options={[
              { v: 'A', l: 'A · LIVE', title: 'Edit the scene on air' },
              { v: 'B', l: 'B · NEXT', title: 'Prepare the next scene' },
            ]}
          />
        }
      />
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className={cx('h-2 w-2 shrink-0 rounded-full', s.target === 'A' ? 'bg-tally' : 'bg-cyan')} />
        <span className="truncate text-[11px] font-semibold tracking-[.12em]">{sc.name}</span>
        <select
          className="ml-auto max-w-[150px]"
          value={sc.kind}
          onChange={(e) => A.setSceneKind(sc.id, e.target.value as SceneKind)}
          title="Generator"
        >
          {SCENE_KINDS.map((k) => (
            <option key={k} value={k}>{KIND_LABEL[k]}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => A.resetParams(sc.id)}
          className="h-7 rounded-md border border-line-2 px-2 text-[10px] font-semibold tracking-[.12em] text-mute hover:text-text"
          title="Reset all parameters to the generator preset"
        >
          RESET
        </button>
      </div>
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {PARAM_GROUPS.map((g) => {
            const params = PARAMS.filter((p) => p.group === g.id);
            const closed = collapsed[g.id];
            return (
              <div key={g.id} className="rounded-lg border border-line bg-black/25">
                <div className="flex items-center gap-2 px-2.5 py-1.5">
                  <button
                    type="button"
                    onClick={() => setCollapsed((c) => ({ ...c, [g.id]: !c[g.id] }))}
                    className="flex flex-1 items-center gap-2 text-left"
                    aria-expanded={!closed}
                  >
                    <span className={cx('text-[9px] text-mute transition-transform', closed ? '-rotate-90' : '')}>▼</span>
                    <span className="mono w-8 text-[9px] text-violet-hi/80">{g.short}</span>
                    <span className="text-[11px] font-semibold tracking-[.1em] text-text/90">{g.label.toUpperCase()}</span>
                  </button>
                  <button
                    type="button"
                    className="text-[9px] tracking-[.12em] text-mute hover:text-text"
                    onClick={() => A.resetParams(sc.id, params.map((p) => p.key))}
                    title={`Reset ${g.label}`}
                  >
                    RST
                  </button>
                </div>
                {!closed && (
                  <div className="px-2.5 pb-2">
                    {params.map((p) => (
                      <Slider
                        key={p.key}
                        compact
                        label={p.label}
                        value={sc.params[p.key] ?? p.def}
                        min={p.min}
                        max={p.max}
                        def={p.def}
                        step={p.step}
                        target={`param:${p.key}`}
                        accent={GROUP_ACCENT[g.id]}
                        modulated={mod.has(p.key)}
                        format={(v) => fmt(v, p.min, p.max)}
                        onChange={(v) => A.setParam(sc.id, p.key, v)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-line px-3 py-1.5 text-[10px] text-mute">
        Drag · <span className="text-dim">Shift</span>+drag fine · double-click resets · <span className="text-cyan">●</span> audio-modulated
      </div>
    </section>
  );
}
