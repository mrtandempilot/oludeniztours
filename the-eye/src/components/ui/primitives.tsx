'use client';

import { useCallback, useRef, type ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { useStoreSlice } from '@/state/createStore';
import { store, type LinkStatus } from '@/state/appState';

/* ---------------------------------------------------------------- MidiTag */
export function MidiTag({ target, className }: { target: string; className?: string }) {
  const map = useStoreSlice(store, (s) => s.midi.mappings.find((m) => m.target === target) ?? null);
  const learning = useStoreSlice(store, (s) => s.midi.learn);
  if (!map && !learning) return null;
  return (
    <span
      data-midi-tag={target}
      title={map ? `Mapped to MIDI ${map.type.toUpperCase()} ${map.number} ch${map.channel}` : 'Not mapped'}
      className={cx(
        'mono inline-flex h-[14px] shrink-0 items-center rounded-[3px] px-1 text-[9px] leading-none transition-colors',
        map ? 'bg-violet/25 text-violet-hi' : 'border border-dashed border-line-2 text-mute',
        className,
      )}
    >
      {map ? `${map.type === 'cc' ? 'CC' : 'N'}${map.number}` : 'MIDI'}
    </span>
  );
}

/* ---------------------------------------------------------------- Slider */
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  def?: number;
  step?: number;
  onChange: (v: number) => void;
  onRelease?: () => void;
  target?: string;
  format?: (v: number) => string;
  accent?: 'violet' | 'cyan' | 'blue';
  compact?: boolean;
  modulated?: boolean;
}

export function Slider({
  label, value, min, max, def, step, onChange, onRelease, target, format, accent = 'violet', compact, modulated,
}: SliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; v: number; fine: boolean } | null>(null);
  const span = max - min;
  const t = Math.max(0, Math.min(1, (value - min) / span));
  const bipolar = min < 0 && max > 0;
  const zeroT = bipolar ? -min / span : 0;

  const fromClientX = useCallback(
    (clientX: number) => {
      const r = ref.current!.getBoundingClientRect();
      return min + Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * span;
    },
    [min, span],
  );
  const quant = (v: number) => (step ? Math.round(v / step) * step : v);

  const fill = accent === 'cyan' ? 'bg-cyan' : accent === 'blue' ? 'bg-blue' : 'bg-violet';
  return (
    <div className={cx('group select-none', compact ? 'py-0.5' : 'py-1')}>
      <div className="mb-1 flex items-center gap-1.5">
        <span className="truncate text-[11px] text-dim">{label}</span>
        {modulated && <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_6px_#22e1ff]" title="Audio modulated" />}
        {target && <MidiTag target={target} />}
        <span className="mono ml-auto text-[11px] text-text/90">{format ? format(value) : value.toFixed(2)}</span>
      </div>
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        data-midi-target={target}
        className="relative h-6 cursor-ew-resize touch-none rounded-[5px] border border-line-2 bg-[#07070b] md:h-5"
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          drag.current = { x: e.clientX, v: value, fine: e.shiftKey };
          if (!e.shiftKey) onChange(quant(fromClientX(e.clientX)));
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          if (d.fine || e.shiftKey) {
            const w = ref.current!.getBoundingClientRect().width;
            onChange(quant(Math.max(min, Math.min(max, d.v + ((e.clientX - d.x) / w) * span * 0.1))));
          } else onChange(quant(fromClientX(e.clientX)));
        }}
        onPointerUp={() => {
          drag.current = null;
          onRelease?.();
        }}
        onPointerCancel={() => {
          drag.current = null;
          onRelease?.();
        }}
        onDoubleClick={() => def !== undefined && onChange(def)}
        onKeyDown={(e) => {
          const k = (step ?? span / 100) * (e.shiftKey ? 10 : 1);
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onChange(Math.min(max, value + k));
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onChange(Math.max(min, value - k));
          else return;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          className={cx('absolute inset-y-0 rounded-[4px] opacity-80', fill)}
          style={{ left: `${Math.min(zeroT, t) * 100}%`, width: `${Math.abs(t - zeroT) * 100}%` }}
        />
        <div
          className="absolute inset-y-[-2px] w-[3px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,.6)]"
          style={{ left: `${t * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Btn */
type BtnTone = 'default' | 'violet' | 'cyan' | 'danger' | 'active' | 'ghost';
export function Btn({
  children, onClick, tone = 'default', className, target, title, disabled, size = 'md',
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: BtnTone;
  className?: string;
  target?: string;
  title?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const tones: Record<BtnTone, string> = {
    default: 'bg-panel-2 border-line-2 text-dim hover:text-text hover:border-mute',
    ghost: 'bg-transparent border-transparent text-mute hover:text-text',
    violet: 'bg-violet/20 border-violet/60 text-violet-hi hover:bg-violet/30',
    cyan: 'bg-cyan/10 border-cyan/60 text-cyan hover:bg-cyan/20',
    danger: 'bg-tally/15 border-tally/70 text-tally hover:bg-tally/25',
    active: 'bg-violet border-violet-hi text-white shadow-[0_0_16px_rgba(139,92,246,.45)]',
  };
  const sizes = {
    sm: 'h-7 px-2 text-[10px]',
    md: 'h-9 px-3 text-[11px]',
    lg: 'h-12 px-4 text-[12px]',
  };
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      data-midi-target={target}
      onClick={onClick}
      className={cx(
        'relative inline-flex select-none items-center justify-center gap-1.5 rounded-md border font-semibold uppercase tracking-[.12em] transition-[background,color,border,box-shadow] duration-100 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40',
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
      {target && <MidiTag target={target} className="absolute right-1 top-1" />}
    </button>
  );
}

/* ---------------------------------------------------------------- Status */
const STATUS: Record<LinkStatus, { c: string; t: string }> = {
  connected: { c: 'bg-ok shadow-[0_0_8px_#2ee6a6]', t: 'CONNECTED' },
  connecting: { c: 'bg-warn animate-pulse', t: 'SEARCHING' },
  disconnected: { c: 'bg-[#3a3a4d]', t: 'DISCONNECTED' },
  unsupported: { c: 'bg-[#3a3a4d]', t: 'UNSUPPORTED' },
  denied: { c: 'bg-tally', t: 'DENIED' },
  error: { c: 'bg-tally', t: 'ERROR' },
};
export function StatusDot({ status }: { status: LinkStatus }) {
  return <span className={cx('inline-block h-2 w-2 shrink-0 rounded-full', STATUS[status].c)} />;
}
export function statusText(s: LinkStatus) {
  return STATUS[s].t;
}

/* ---------------------------------------------------------------- Panel */
export function PanelHeader({ index, title, right }: { index: string; title: string; right?: ReactNode }) {
  return (
    <div className="flex min-h-10 items-center gap-2 border-b border-line px-3 py-2">
      <span className="mono text-[10px] text-violet-hi/70">{index}</span>
      <span className="label !text-dim">{title}</span>
      <div className="ml-auto flex items-center gap-1.5">{right}</div>
    </div>
  );
}

export function Seg<T extends string | number>({
  value, options, onChange, className,
}: {
  value: T;
  options: { v: T; l: ReactNode; title?: string }[];
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cx('inline-flex rounded-md border border-line-2 bg-[#07070b] p-0.5', className)}>
      {options.map((o) => (
        <button
          key={String(o.v)}
          type="button"
          title={o.title}
          onClick={() => onChange(o.v)}
          className={cx(
            'h-6 rounded-[4px] px-2 text-[10px] font-semibold uppercase tracking-[.1em] transition-colors',
            o.v === value ? 'bg-violet text-white' : 'text-mute hover:text-text',
          )}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}
