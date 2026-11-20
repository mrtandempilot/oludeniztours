import { createStore } from './createStore';
import type { ParamGroupId } from '@/engine/params';
import { INITIAL_SCENES } from '@/engine/presets';
import type { Scene, TransitionType } from '@/engine/types';

export type LinkStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'unsupported'
  | 'denied'
  | 'error';

export type AudioBand = 'kick' | 'bass' | 'mid' | 'high' | 'synth';
export const AUDIO_BANDS: AudioBand[] = ['kick', 'bass', 'mid', 'high', 'synth'];

export interface AudioChannelCfg {
  id: AudioBand;
  label: string;
  gain: number; // 0..4
  target: string | null; // param key
  amount: number; // -1..1
  inputChannel: number; // 0-based input channel of the audio interface
  lowHz: number;
  highHz: number;
}

export type AudioSource = 'demo' | 'input' | 'bridge' | 'off';

export interface MidiMapping {
  target: string;
  type: 'cc' | 'note';
  channel: number;
  number: number;
}

export interface AppState {
  scenes: Scene[];
  slotA: string;
  slotB: string;
  selectedId: string;
  editTarget: 'A' | 'B';
  transition: {
    type: TransitionType;
    duration: number; // seconds
    intensity: number; // 0..1
    auto: boolean;
    autoBeats: number;
  };
  transitioning: boolean;
  bpm: number;
  bpmSource: 'internal' | 'tap' | 'midi-clock' | 'bridge';
  master: number;
  freeze: boolean;
  blackout: boolean;
  renderScale: number;
  audio: {
    source: AudioSource;
    status: LinkStatus;
    deviceId: string | null;
    deviceLabel: string | null;
    devices: { id: string; label: string }[];
    inputChannels: number;
    reactivity: number;
    channels: AudioChannelCfg[];
    error: string | null;
  };
  midi: {
    status: LinkStatus;
    inputs: string[];
    learn: boolean;
    learnTarget: string | null;
    mappings: MidiMapping[];
    clockActive: boolean;
    error: string | null;
  };
  td: {
    url: string;
    enabled: boolean;
    status: LinkStatus;
    peer: string | null;
    rxCount: number;
  };
  thumbs: Record<string, string>;
  outputWindow: boolean;
  engineError: string | null;
}

export const DEFAULT_AUDIO_CHANNELS: AudioChannelCfg[] = [
  { id: 'kick', label: 'Kick', gain: 1, target: 'pupilSize', amount: 0.35, inputChannel: 0, lowHz: 35, highHz: 120 },
  { id: 'bass', label: 'Bass', gain: 1, target: 'tentCurl', amount: 0.4, inputChannel: 0, lowHz: 60, highHz: 250 },
  { id: 'mid', label: 'Mid', gain: 1, target: 'liquid', amount: 0.3, inputChannel: 0, lowHz: 250, highHz: 2000 },
  { id: 'high', label: 'High', gain: 1, target: 'partAmount', amount: 0.45, inputChannel: 0, lowHz: 4000, highHz: 14000 },
  { id: 'synth', label: 'Synth / SH-4', gain: 1, target: 'irisMorph', amount: 0.5, inputChannel: 1, lowHz: 300, highHz: 3000 },
];

export function initialState(): AppState {
  return {
    scenes: INITIAL_SCENES.map((s) => ({ ...s, params: { ...s.params } })),
    slotA: INITIAL_SCENES[0].id,
    slotB: INITIAL_SCENES[1].id,
    selectedId: INITIAL_SCENES[0].id,
    editTarget: 'A',
    transition: { type: 'morph', duration: 4, intensity: 0.7, auto: false, autoBeats: 32 },
    transitioning: false,
    bpm: 128,
    bpmSource: 'internal',
    master: 1,
    freeze: false,
    blackout: false,
    renderScale: 0.75,
    audio: {
      source: 'demo',
      status: 'disconnected',
      deviceId: null,
      deviceLabel: null,
      devices: [],
      inputChannels: 0,
      reactivity: 1,
      channels: DEFAULT_AUDIO_CHANNELS.map((c) => ({ ...c })),
      error: null,
    },
    midi: {
      status: 'disconnected',
      inputs: [],
      learn: false,
      learnTarget: null,
      mappings: [],
      clockActive: false,
      error: null,
    },
    td: {
      url: 'ws://localhost:9980',
      enabled: true,
      status: 'disconnected',
      peer: null,
      rxCount: 0,
    },
    thumbs: {},
    outputWindow: false,
    engineError: null,
  };
}

export const store = createStore<AppState>(initialState());

/** High-frequency values. Read via requestAnimationFrame, never via React state. */
export const live = {
  mix: 0,
  beat: 0,
  beatPhase: 0,
  time: 0,
  fps: 0,
  levels: { kick: 0, bass: 0, mid: 0, high: 0, synth: 0 } as Record<AudioBand, number>,
  midiActivity: {} as Record<string, number>,
  lastMidiMsg: '',
  blackout: 0,
};

export function getScene(id: string): Scene | undefined {
  return store.get().scenes.find((s) => s.id === id);
}

export type { ParamGroupId };
