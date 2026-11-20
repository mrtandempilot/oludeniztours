import { defaultParams, type ParamValues } from './params';
import type { Scene, SceneKind } from './types';

const P = (o: Record<string, number>): ParamValues => ({ ...defaultParams(), ...o });

export const KIND_PRESETS: Record<SceneKind, ParamValues> = {
  eye: P({}),
  bloom: P({
    eyeSize: 0.32, tentacles: 0.85, tentLength: 0.85, tentCurl: 0.75, sfAmount: 0.85,
    sfM: 7, sfN1: 0.6, sfN2: 1.2, sfN3: 1.2, hue: 0.95, glow: 0.9, fbAmount: 0.45,
    fbZoom: 0.25, partAmount: 0.25, rotSpeed: 0.08,
  }),
  tunnel: P({
    eyeSize: 0.22, tentacles: 0.2, fractal: 0.75, sfAmount: 0.6, sfM: 5, sfN1: 1.1,
    sfN2: 3, sfN3: 3, liquid: 0.15, fbAmount: 0.55, fbZoom: 0.5, hue: 0.92,
    rotSpeed: 0.2, rotTwist: 0.35, glow: 1.0, pulse: 0.35,
  }),
  liquid: P({
    eyeSize: 0.3, tentacles: 0.25, liquid: 0.85, warpScale: 0.55, flow: 0.55,
    sfAmount: 0.15, fbAmount: 0.4, hue: 0.03, saturation: 1.25, colorCycle: 0.3,
    glow: 0.8, partAmount: 0.2,
  }),
  geometric: P({
    eyeSize: 0.36, tentacles: 0.3, sfAmount: 1.0, sfM: 8, sfN1: 0.35, sfN2: 0.9,
    sfN3: 0.9, fractal: 0.2, liquid: 0.05, fbAmount: 0.25, rotSpeed: 0.12,
    hue: 0.06, contrast: 1.3, glow: 1.1, irisMorph: 0.7,
  }),
  particles: P({
    eyeSize: 0.28, tentacles: 0.1, partAmount: 1.0, partSpeed: 0.8, partSize: 0.55,
    sfAmount: 0.25, liquid: 0.15, fbAmount: 0.6, fbZoom: 0.35, hue: 0.97, glow: 1.3,
    glowThreshold: 0.3, rotSpeed: -0.15,
  }),
  abstract: P({
    eyeSize: 0.26, tentacles: 0.4, fractal: 1.0, sfAmount: 0.4, sfM: 3, liquid: 0.45,
    glitch: 0.12, fbAmount: 0.5, fbRotate: 0.3, hue: 0.9, saturation: 1.4,
    colorCycle: 0.45, contrast: 1.35, irisMorph: 0.8,
  }),
};

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const INITIAL_SCENES: Scene[] = [
  { id: 's-eye', name: 'THE EYE', kind: 'eye', params: KIND_PRESETS.eye },
  { id: 's-bloom', name: 'ORGANIC BLOOM', kind: 'bloom', params: KIND_PRESETS.bloom },
  { id: 's-tunnel', name: 'FRACTAL TUNNEL', kind: 'tunnel', params: KIND_PRESETS.tunnel },
  { id: 's-liquid', name: 'LIQUID UNIVERSE', kind: 'liquid', params: KIND_PRESETS.liquid },
  { id: 's-geo', name: 'GEOMETRIC ORGANISM', kind: 'geometric', params: KIND_PRESETS.geometric },
  { id: 's-storm', name: 'PARTICLE STORM', kind: 'particles', params: KIND_PRESETS.particles },
  { id: 's-abstract', name: 'ABSTRACT DIMENSION', kind: 'abstract', params: KIND_PRESETS.abstract },
];

export function seedFromId(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 100;
}
