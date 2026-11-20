import { PARAM_BY_KEY, PARAM_GROUPS } from '@/engine/params';
import * as A from './actions';
import { store } from './appState';

/**
 * Control-target registry. Every mappable control in the UI carries a
 * `data-midi-target` id. MIDI, the TouchDesigner bridge and keyboard all
 * drive the performance through `applyControl()`, so a single map works for
 * every input source.
 *
 *   param:<key>      continuous, edits the scene in the current edit slot
 *   mix | master | trans.duration | trans.intensity | audio.reactivity
 *   btn:<name>       triggers (value > 0.5 on rising edge)
 */

export const BUTTONS: Record<string, { label: string; run: () => void }> = {
  take: { label: 'TAKE', run: A.take },
  cut: { label: 'CUT', run: A.cut },
  blackout: { label: 'Blackout', run: () => A.toggleBlackout() },
  freeze: { label: 'Freeze', run: () => A.toggleFreeze() },
  random: { label: 'Random', run: A.randomScene },
  prev: { label: 'Prev', run: A.prevScene },
  next: { label: 'Next', run: A.nextScene },
  tap: { label: 'Tap', run: A.tapTempo },
  auto: { label: 'Auto', run: () => A.setTransition({ auto: !store.get().transition.auto }) },
};

const lastBtn: Record<string, number> = {};

export function controlLabel(target: string): string {
  if (target.startsWith('param:')) {
    const d = PARAM_BY_KEY[target.slice(6)];
    if (!d) return target;
    const g = PARAM_GROUPS.find((x) => x.id === d.group);
    return `${g?.short ?? ''} ${d.label}`;
  }
  if (target.startsWith('btn:')) return BUTTONS[target.slice(4)]?.label ?? target;
  return (
    {
      mix: 'Crossfade',
      master: 'Master',
      'trans.duration': 'Trans. Duration',
      'trans.intensity': 'Trans. Intensity',
      'audio.reactivity': 'Audio Reactivity',
    } as Record<string, string>
  )[target] ?? target;
}

/** value is normalised 0..1 */
export function applyControl(target: string, value: number) {
  const v = Math.max(0, Math.min(1, value));
  if (target.startsWith('param:')) {
    const key = target.slice(6);
    const d = PARAM_BY_KEY[key];
    if (!d) return;
    A.setParam(A.editTargetSceneId(), key, d.min + v * (d.max - d.min));
    return;
  }
  if (target.startsWith('btn:')) {
    const name = target.slice(4);
    const prev = lastBtn[name] ?? 0;
    lastBtn[name] = v;
    if (v > 0.5 && prev <= 0.5) BUTTONS[name]?.run();
    return;
  }
  switch (target) {
    case 'mix':
      A.setManualMix(v);
      if (v < 0.01) A.releaseManualMix();
      break;
    case 'master':
      A.setMaster(v * 1.5);
      break;
    case 'trans.duration':
      A.setTransition({ duration: 0.25 + v * 15.75 });
      break;
    case 'trans.intensity':
      A.setTransition({ intensity: v });
      break;
    case 'audio.reactivity':
      A.setAudio({ reactivity: v * 2 });
      break;
  }
}
