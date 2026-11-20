'use client';

import { useEffect, useRef } from 'react';
import { PARAM_GROUPS, PARAMS } from '@/engine/params';
import { cx } from '@/lib/cx';
import { onTick } from '@/lib/ticker';
import * as A from '@/state/actions';
import { live, store, type AudioBand, type AudioSource } from '@/state/appState';
import { useStoreSlice } from '@/state/createStore';
import { getRuntime } from '@/state/runtime';
import { PanelHeader, Seg, Slider, StatusDot, statusText } from './ui/primitives';

const BAND_COLOR: Record<AudioBand, string> = {
  kick: '#ff2e55',
  bass: '#8b5cf6',
  mid: '#3d6bff',
  high: '#22e1ff',
  synth: '#b18cff',
};

function Meter({ band }: { band: AudioBand }) {
  const bar = useRef<HTMLDivElement>(null);
  const peak = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let pk = 0;
    return onTick(() => {
      const v = live.levels[band];
      pk = Math.max(v, pk - 0.008);
      if (bar.current) bar.current.style.transform = `scaleY(${v})`;
      if (peak.current) peak.current.style.bottom = `${pk * 100}%`;
    });
  }, [band]);
  return (
    <div className="relative h-full w-3 overflow-hidden rounded-[3px] border border-line-2 bg-[#06060a]">
      <div
        ref={bar}
        className="absolute inset-0 origin-bottom"
        style={{ background: `linear-gradient(to top, ${BAND_COLOR[band]}, ${BAND_COLOR[band]}aa 70%, #fff)`, transform: 'scaleY(0)' }}
      />
      <div ref={peak} className="absolute inset-x-0 h-[2px] bg-white" />
      {[0.25, 0.5, 0.75].map((t) => (
        <div key={t} className="absolute inset-x-0 h-px bg-black/60" style={{ bottom: `${t * 100}%` }} />
      ))}
    </div>
  );
}

export default function AudioPanel() {
  const a = useStoreSlice(store, (s) => s.audio);
  const tdStatus = useStoreSlice(store, (s) => s.td.status);

  const setSource = (src: AudioSource) => getRuntime().audio.setSource(src);

  const statusLine = (() => {
    switch (a.source) {
      case 'demo':
        return <span className="text-warn">SIMULATED — levels generated from the BPM clock, no audio connected</span>;
      case 'off':
        return <span className="text-mute">Audio reactivity disabled</span>;
      case 'input':
        return a.status === 'connected' ? (
          <span className="text-ok">{a.deviceLabel} · {a.inputChannels} ch</span>
        ) : (
          <span className={a.status === 'connecting' ? 'text-warn' : 'text-tally'}>{a.error ?? statusText(a.status)}</span>
        );
      case 'bridge':
        return a.status === 'connected' ? (
          <span className="text-ok">Receiving band levels from Ableton via bridge</span>
        ) : (
          <span className="text-warn">
            Waiting for Ableton levels{tdStatus !== 'connected' ? ' — bridge DISCONNECTED' : ' — bridge connected, no audio messages yet'}
          </span>
        );
    }
  })();

  return (
    <section className="panel overflow-hidden">
      <PanelHeader
        index="05"
        title="Audio Reactivity · Ableton Live"
        right={
          <Seg
            value={a.source}
            onChange={setSource}
            options={[
              { v: 'demo', l: 'DEMO', title: 'Simulated levels' },
              { v: 'input', l: 'INPUT', title: 'Audio interface / loopback from Ableton' },
              { v: 'bridge', l: 'ABLETON', title: 'Band levels via OSC bridge (Max for Live)' },
              { v: 'off', l: 'OFF' },
            ]}
          />
        }
      />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-3 py-2 text-[11px]">
        <StatusDot status={a.source === 'demo' ? 'connecting' : a.source === 'off' ? 'disconnected' : a.status} />
        {statusLine}
        {a.source === 'input' && (
          <select
            className="ml-auto max-w-[220px]"
            value={a.deviceId ?? ''}
            onFocus={() => getRuntime().audio.listDevices()}
            onChange={(e) => {
              A.setAudio({ deviceId: e.target.value || null });
              getRuntime().audio.setSource('input', e.target.value || null);
            }}
          >
            <option value="">Default input</option>
            {a.devices.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        )}
        <div className={cx('w-40', a.source !== 'input' && 'ml-auto')}>
          <Slider
            compact
            label="Reactivity"
            value={a.reactivity}
            min={0}
            max={2}
            def={1}
            target="audio.reactivity"
            accent="cyan"
            onChange={(v) => A.setAudio({ reactivity: v })}
            format={(v) => `${Math.round(v * 100)}%`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 lg:grid-cols-5">
        {a.channels.map((c) => (
          <div key={c.id} className="flex gap-2.5 rounded-lg border border-line bg-black/25 p-2">
            <div className="flex h-[132px] gap-1">
              <Meter band={c.id} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: BAND_COLOR[c.id] }} />
                <span className="truncate text-[11px] font-bold tracking-[.12em]">{c.label.toUpperCase()}</span>
              </div>
              <div className="mono mt-0.5 text-[9px] text-mute">
                {c.lowHz}–{c.highHz >= 1000 ? `${(c.highHz / 1000).toFixed(c.highHz % 1000 ? 1 : 0)}k` : c.highHz} Hz
                {a.source === 'input' && (
                  <>
                    {' · '}
                    <select
                      className="!h-4 !border-0 !bg-transparent !p-0 text-[9px] text-dim"
                      value={c.inputChannel}
                      onChange={(e) => A.setAudioChannel(c.id, { inputChannel: Number(e.target.value) })}
                      title="Input channel"
                    >
                      {Array.from({ length: Math.max(2, a.inputChannels) }, (_, i) => (
                        <option key={i} value={i}>IN {i + 1}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <label className="mt-1.5 block">
                <span className="sr-only">Target parameter</span>
                <select
                  className="h-7 w-full !text-[11px]"
                  value={c.target ?? ''}
                  onChange={(e) => A.setAudioChannel(c.id, { target: e.target.value || null })}
                >
                  <option value="">— not mapped —</option>
                  {PARAM_GROUPS.map((g) => (
                    <optgroup key={g.id} label={g.label}>
                      {PARAMS.filter((p) => p.group === g.id).map((p) => (
                        <option key={p.key} value={p.key}>→ {g.short} {p.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <Slider compact label="Amount" value={c.amount} min={-1} max={1} def={0.3} accent="cyan" onChange={(v) => A.setAudioChannel(c.id, { amount: v })} format={(v) => `${v > 0 ? '+' : ''}${Math.round(v * 100)}%`} />
              <Slider compact label="Gain" value={c.gain} min={0} max={4} def={1} accent="blue" onChange={(v) => A.setAudioChannel(c.id, { gain: v })} format={(v) => `×${v.toFixed(2)}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
