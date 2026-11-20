'use client';

import { useEffect, useRef, useState } from 'react';
import { KIND_LABEL, SCENE_KINDS, type Scene, type SceneKind } from '@/engine/types';
import { cx } from '@/lib/cx';
import * as A from '@/state/actions';
import { store } from '@/state/appState';
import { useStoreSlice } from '@/state/createStore';
import { PanelHeader } from './ui/primitives';

function NameEditor({ scene, onDone }: { scene: Scene; onDone: () => void }) {
  const [v, setV] = useState(scene.name);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);
  const commit = () => {
    A.renameScene(scene.id, v.toUpperCase());
    onDone();
  };
  return (
    <input
      ref={ref}
      type="text"
      value={v}
      maxLength={40}
      onChange={(e) => setV(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') onDone();
      }}
      onClick={(e) => e.stopPropagation()}
      className="h-6 w-full px-1.5 text-[11px] font-semibold uppercase tracking-[.1em]"
    />
  );
}

function IconBtn({ children, title, onClick, danger, disabled }: { children: React.ReactNode; title: string; onClick: () => void; danger?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cx(
        'grid h-6 w-6 place-items-center rounded-[4px] text-[11px] text-mute transition-colors hover:bg-white/5 disabled:opacity-30',
        danger ? 'hover:text-tally' : 'hover:text-text',
      )}
    >
      {children}
    </button>
  );
}

export default function ScenePanel() {
  const s = useStoreSlice(store, (st) => ({
    scenes: st.scenes,
    slotA: st.slotA,
    slotB: st.slotB,
    selected: st.selectedId,
    thumbs: st.thumbs,
    transitioning: st.transitioning,
  }));
  const [editing, setEditing] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropIdx, setDropIdx] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const add = (k: SceneKind) => {
    const id = A.addScene(k);
    setAddOpen(false);
    setEditing(id);
  };

  return (
    <section className="panel flex min-h-0 flex-col overflow-hidden">
      <PanelHeader
        index="01"
        title="Scene Library"
        right={
          <div className="relative">
            <button
              type="button"
              onClick={() => setAddOpen((o) => !o)}
              className="h-7 rounded-md border border-violet/50 bg-violet/15 px-2.5 text-[10px] font-bold tracking-[.14em] text-violet-hi hover:bg-violet/25"
            >
              + NEW
            </button>
            {addOpen && (
              <div className="panel absolute right-0 top-9 z-40 w-52 p-1 shadow-2xl shadow-black/70">
                <div className="label px-2 py-1.5">Generator</div>
                {SCENE_KINDS.map((k) => (
                  <button key={k} type="button" onClick={() => add(k)} className="block w-full rounded px-2 py-1.5 text-left text-[12px] text-dim hover:bg-violet/15 hover:text-text">
                    {KIND_LABEL[k]}
                  </button>
                ))}
              </div>
            )}
          </div>
        }
      />
      <div className="label border-b border-line px-3 py-1.5 !text-[9px] !tracking-[.12em]">
        Click = cue to B · Double-click = take · Drag to reorder
      </div>
      <ol
        className="scroll-thin flex min-h-0 flex-1 gap-2 overflow-auto p-2 max-wide:flex-row max-wide:overflow-x-auto wide:flex-col"
        onDragOver={(e) => e.preventDefault()}
      >
        {s.scenes.map((sc, i) => {
          const isA = sc.id === s.slotA;
          const isB = sc.id === s.slotB;
          return (
            <li
              key={sc.id}
              draggable={editing !== sc.id}
              onDragStart={(e) => {
                setDragId(sc.id);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', sc.id);
              }}
              onDragEnd={() => {
                setDragId(null);
                setDropIdx(null);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                const r = e.currentTarget.getBoundingClientRect();
                const vertical = r.width > 200;
                const before = vertical ? e.clientY < r.top + r.height / 2 : e.clientX < r.left + r.width / 2;
                setDropIdx(before ? i : i + 1);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragId && dropIdx !== null) {
                  const from = s.scenes.findIndex((x) => x.id === dragId);
                  A.moveScene(dragId, dropIdx > from ? dropIdx - 1 : dropIdx);
                }
                setDragId(null);
                setDropIdx(null);
              }}
              onClick={() => (isA ? A.selectScene(sc.id) : A.cueB(sc.id))}
              onDoubleClick={() => A.takeTo(sc.id)}
              className={cx(
                'group relative flex shrink-0 cursor-pointer gap-2.5 rounded-lg border p-1.5 transition-colors max-wide:w-[180px] max-wide:flex-col',
                isA ? 'border-tally/70 bg-tally/[.06]' : isB ? 'border-cyan/60 bg-cyan/[.05]' : 'border-line bg-black/20 hover:border-line-2',
                dragId === sc.id && 'opacity-40',
                dropIdx === i && dragId && 'before:absolute before:-top-[5px] before:inset-x-1 before:h-[2px] before:rounded before:bg-cyan max-wide:before:inset-y-1 max-wide:before:-left-[5px] max-wide:before:right-auto max-wide:before:top-1 max-wide:before:h-auto max-wide:before:w-[2px]',
                dropIdx === i + 1 && i === s.scenes.length - 1 && dragId && 'after:absolute after:-bottom-[5px] after:inset-x-1 after:h-[2px] after:rounded after:bg-cyan',
              )}
            >
              <div className="relative aspect-video w-[104px] shrink-0 overflow-hidden rounded-[5px] bg-black max-wide:w-full">
                {s.thumbs[sc.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.thumbs[sc.id]} alt="" className="h-full w-full object-cover" draggable={false} />
                ) : (
                  <div className="h-full w-full animate-pulse bg-gradient-to-br from-violet/20 to-blue/10" />
                )}
                <span className="mono absolute left-1 top-1 rounded-[3px] bg-black/70 px-1 text-[9px] text-dim">{String(i + 1).padStart(2, '0')}</span>
                {(isA || isB) && (
                  <span className={cx('absolute bottom-1 left-1 rounded-[3px] px-1.5 text-[9px] font-black tracking-[.1em]', isA ? 'bg-tally text-white' : 'bg-cyan text-black')}>
                    {isA ? 'A · LIVE' : 'B · NEXT'}
                  </span>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                {editing === sc.id ? (
                  <NameEditor scene={sc} onDone={() => setEditing(null)} />
                ) : (
                  <div
                    className="truncate text-[11px] font-semibold tracking-[.12em] text-text"
                    title="Double-click the name to rename"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditing(sc.id);
                    }}
                  >
                    {sc.name}
                  </div>
                )}
                <div className="truncate text-[10px] text-mute">{KIND_LABEL[sc.kind]}</div>
                <div className="mt-1 flex items-center gap-0.5 opacity-100 transition-opacity wide:opacity-0 wide:group-hover:opacity-100 wide:group-focus-within:opacity-100">
                  <IconBtn title="Take now" disabled={isA || s.transitioning} onClick={() => A.takeTo(sc.id)}>▶</IconBtn>
                  <IconBtn title="Rename" onClick={() => setEditing(sc.id)}>✎</IconBtn>
                  <IconBtn title="Duplicate" onClick={() => A.duplicateScene(sc.id)}>⧉</IconBtn>
                  <IconBtn title="Move up" disabled={i === 0} onClick={() => A.moveScene(sc.id, i - 1)}>↑</IconBtn>
                  <IconBtn title="Move down" disabled={i === s.scenes.length - 1} onClick={() => A.moveScene(sc.id, i + 1)}>↓</IconBtn>
                  <IconBtn
                    title="Delete"
                    danger
                    disabled={s.scenes.length <= 2 || (s.transitioning && (isA || isB))}
                    onClick={() => {
                      if (confirm(`Delete scene "${sc.name}"?`)) A.deleteScene(sc.id);
                    }}
                  >
                    ✕
                  </IconBtn>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
