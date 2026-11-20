import type { ParamValues } from './params';

/** Generator families implemented by the scene shader (uKind). */
export const SCENE_KINDS = [
  'eye',
  'bloom',
  'tunnel',
  'liquid',
  'geometric',
  'particles',
  'abstract',
] as const;
export type SceneKind = (typeof SCENE_KINDS)[number];

export const KIND_LABEL: Record<SceneKind, string> = {
  eye: 'Eye Organism',
  bloom: 'Organic Bloom',
  tunnel: 'Fractal Tunnel',
  liquid: 'Liquid Field',
  geometric: 'Superformula Lattice',
  particles: 'Particle Vortex',
  abstract: 'Kali Fractal',
};

export interface Scene {
  id: string;
  name: string;
  kind: SceneKind;
  params: ParamValues;
}

export const TRANSITIONS = [
  'morph',
  'liquid',
  'dissolve',
  'feedback',
  'glitch',
  'tunnel',
  'particles',
] as const;
export type TransitionType = (typeof TRANSITIONS)[number];

export const TRANSITION_LABEL: Record<TransitionType, string> = {
  morph: 'Morph',
  liquid: 'Liquid',
  dissolve: 'Dissolve',
  feedback: 'Feedback',
  glitch: 'Glitch',
  tunnel: 'Tunnel',
  particles: 'Particle Explosion',
};

export interface SceneRender {
  kind: SceneKind;
  params: ParamValues;
  /** per-scene seed so duplicated scenes can diverge */
  seed: number;
}

/**
 * Everything the visual engine needs to draw one frame. This is the ONLY
 * contract between controller and engine; it is serialisable so the same
 * frame can be sent to a pop-out output window or an external renderer.
 */
export interface EngineFrame {
  time: number;
  beat: number; // continuous beat count
  pulse: number; // 0..1 beat / kick envelope
  freeze: boolean;
  a: SceneRender;
  b: SceneRender | null;
  mix: number; // 0..1 A→B
  transition: { type: TransitionType; intensity: number };
  master: number; // 0..1.5
  blackout: number; // 0..1 (1 = black)
  renderScale: number; // internal resolution multiplier
}

/** BroadcastChannel name used to stream frames to the pop-out output window. */
export const OUTPUT_CHANNEL = 'the-eye-output';
