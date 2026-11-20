/**
 * THE EYE wire protocol (JSON over WebSocket).
 *
 * The browser is always the WebSocket *client*. The server can be:
 *   a) TouchDesigner directly — a Web Server DAT with WebSocket enabled
 *      (see touchdesigner/eye_webserver_callbacks.py), or
 *   b) bridge/eye-bridge.mjs — translates JSON ⇄ OSC/UDP for TouchDesigner
 *      OSC In/Out CHOPs/DATs, Max for Live, Resolume, etc.
 *
 * Every message has a `type`. Unknown types must be ignored by both sides.
 */
import type { AudioBand } from '@/state/appState';
import type { TransitionType } from '@/engine/types';

export const PROTOCOL_VERSION = 1;

// ---------------------------------------------------------------- outbound
export interface HelloMsg {
  type: 'hello';
  app: 'the-eye';
  protocol: number;
  params: { key: string; group: string; min: number; max: number }[];
}

/** ~30 Hz performance state; params are the *modulated* values being rendered */
export interface FrameMsg {
  type: 'frame';
  t: number;
  bpm: number;
  beat: number;
  mix: number;
  master: number;
  blackout: number;
  freeze: boolean;
  transition: TransitionType;
  a: { id: string; name: string; kind: string; params: Record<string, number> };
  b: { id: string; name: string; kind: string } | null;
  audio: Record<AudioBand, number>;
}

export interface EventMsg {
  type: 'event';
  name: 'take' | 'cut' | 'committed';
  data: Record<string, unknown>;
}

// ---------------------------------------------------------------- inbound
export interface AudioInMsg {
  type: 'audio';
  levels: Partial<Record<AudioBand, number>>;
}
export interface ControlInMsg {
  /** same target ids as MIDI mapping, value 0..1, e.g. {target:'btn:take', value:1} */
  type: 'control';
  target: string;
  value: number;
}
export interface BpmInMsg {
  type: 'bpm';
  bpm: number;
}
export type InboundMsg = AudioInMsg | ControlInMsg | BpmInMsg | { type: string };
