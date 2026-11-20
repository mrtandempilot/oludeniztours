/**
 * Parameter model shared by the UI, the visual engine and the external
 * integrations (TouchDesigner / OSC / MIDI). The ORDER of PARAMS is the
 * uniform-array layout used by the GLSL scene shader — append, don't reorder.
 */

export type ParamGroupId =
  | 'eye'
  | 'iris'
  | 'organic'
  | 'superformula'
  | 'particles'
  | 'distortion'
  | 'feedback'
  | 'color'
  | 'glow'
  | 'rotation'
  | 'scale';

export interface ParamDef {
  key: string;
  label: string;
  group: ParamGroupId;
  min: number;
  max: number;
  def: number;
  step?: number;
  unit?: string;
}

export const PARAM_GROUPS: { id: ParamGroupId; label: string; short: string }[] = [
  { id: 'eye', label: 'Eye Geometry', short: 'EYE' },
  { id: 'iris', label: 'Iris Morph', short: 'IRIS' },
  { id: 'organic', label: 'Outer Organic FX', short: 'ORG' },
  { id: 'superformula', label: 'Superformula', short: 'SF' },
  { id: 'particles', label: 'Particles', short: 'PRT' },
  { id: 'distortion', label: 'Distortion', short: 'DST' },
  { id: 'feedback', label: 'Feedback', short: 'FB' },
  { id: 'color', label: 'Color', short: 'COL' },
  { id: 'glow', label: 'Glow', short: 'GLW' },
  { id: 'rotation', label: 'Rotation', short: 'ROT' },
  { id: 'scale', label: 'Scale', short: 'SCL' },
];

export const PARAMS: ParamDef[] = [
  // Eye geometry
  { key: 'eyeSize', label: 'Size', group: 'eye', min: 0, max: 1, def: 0.55 },
  { key: 'eyeOpen', label: 'Aperture', group: 'eye', min: 0, max: 1, def: 0.8 },
  { key: 'eyeVeins', label: 'Veins', group: 'eye', min: 0, max: 1, def: 0.45 },
  { key: 'eyeGaze', label: 'Gaze Motion', group: 'eye', min: 0, max: 1, def: 0.35 },
  // Iris
  { key: 'irisMorph', label: 'Morph', group: 'iris', min: 0, max: 1, def: 0.3 },
  { key: 'irisDetail', label: 'Fiber Detail', group: 'iris', min: 0, max: 1, def: 0.7 },
  { key: 'pupilSize', label: 'Pupil', group: 'iris', min: 0.05, max: 0.9, def: 0.32 },
  { key: 'irisSpin', label: 'Spin', group: 'iris', min: -1, max: 1, def: 0.1 },
  // Outer organic
  { key: 'tentacles', label: 'Tentacles', group: 'organic', min: 0, max: 1, def: 0.7 },
  { key: 'tentLength', label: 'Length', group: 'organic', min: 0, max: 1, def: 0.6 },
  { key: 'tentCurl', label: 'Curl', group: 'organic', min: 0, max: 1, def: 0.5 },
  { key: 'fractal', label: 'Fractal', group: 'organic', min: 0, max: 1, def: 0.3 },
  // Superformula  r(φ) = (|cos(mφ/4)|^n2 + |sin(mφ/4)|^n3)^(-1/n1)
  { key: 'sfAmount', label: 'Amount', group: 'superformula', min: 0, max: 1, def: 0.5 },
  { key: 'sfM', label: 'm', group: 'superformula', min: 0, max: 16, def: 6, step: 0.01 },
  { key: 'sfN1', label: 'n1', group: 'superformula', min: 0.2, max: 8, def: 1.5, step: 0.01 },
  { key: 'sfN2', label: 'n2', group: 'superformula', min: 0.2, max: 8, def: 1.7, step: 0.01 },
  { key: 'sfN3', label: 'n3', group: 'superformula', min: 0.2, max: 8, def: 1.7, step: 0.01 },
  // Particles
  { key: 'partAmount', label: 'Density', group: 'particles', min: 0, max: 1, def: 0.4 },
  { key: 'partSpeed', label: 'Speed', group: 'particles', min: 0, max: 1, def: 0.4 },
  { key: 'partSize', label: 'Size', group: 'particles', min: 0, max: 1, def: 0.4 },
  // Distortion
  { key: 'liquid', label: 'Liquid', group: 'distortion', min: 0, max: 1, def: 0.25 },
  { key: 'warpScale', label: 'Warp Scale', group: 'distortion', min: 0, max: 1, def: 0.4 },
  { key: 'flow', label: 'Flow Speed', group: 'distortion', min: 0, max: 1, def: 0.35 },
  // Feedback
  { key: 'fbAmount', label: 'Amount', group: 'feedback', min: 0, max: 0.98, def: 0.35 },
  { key: 'fbZoom', label: 'Zoom', group: 'feedback', min: -1, max: 1, def: 0.15 },
  { key: 'fbRotate', label: 'Rotate', group: 'feedback', min: -1, max: 1, def: 0.05 },
  { key: 'glitch', label: 'Glitch', group: 'feedback', min: 0, max: 1, def: 0.0 },
  // Color
  { key: 'hue', label: 'Hue', group: 'color', min: 0, max: 1, def: 0.0 },
  { key: 'saturation', label: 'Saturation', group: 'color', min: 0, max: 2, def: 1.0 },
  { key: 'contrast', label: 'Contrast', group: 'color', min: 0.5, max: 2, def: 1.1 },
  { key: 'colorCycle', label: 'Cycle', group: 'color', min: 0, max: 1, def: 0.1 },
  // Glow
  { key: 'glow', label: 'Glow', group: 'glow', min: 0, max: 2, def: 0.7 },
  { key: 'glowThreshold', label: 'Threshold', group: 'glow', min: 0, max: 1, def: 0.45 },
  // Rotation
  { key: 'rotSpeed', label: 'Speed', group: 'rotation', min: -1, max: 1, def: 0.05 },
  { key: 'rotTwist', label: 'Twist', group: 'rotation', min: -1, max: 1, def: 0.0 },
  // Scale
  { key: 'zoom', label: 'Zoom', group: 'scale', min: 0.3, max: 3, def: 1.0, step: 0.01 },
  { key: 'pulse', label: 'Beat Pulse', group: 'scale', min: 0, max: 1, def: 0.25 },
];

export type ParamKey = (typeof PARAMS)[number]['key'];
export type ParamValues = Record<string, number>;

export const PARAM_INDEX: Record<string, number> = Object.fromEntries(
  PARAMS.map((p, i) => [p.key, i]),
);
export const PARAM_BY_KEY: Record<string, ParamDef> = Object.fromEntries(
  PARAMS.map((p) => [p.key, p]),
);

export function defaultParams(): ParamValues {
  return Object.fromEntries(PARAMS.map((p) => [p.key, p.def]));
}

export function clampParam(key: string, v: number): number {
  const d = PARAM_BY_KEY[key];
  if (!d) return v;
  return Math.min(d.max, Math.max(d.min, v));
}

/** Pack params into the Float32Array uniform layout expected by the shader. */
export function packParams(values: ParamValues, out = new Float32Array(PARAMS.length)) {
  for (let i = 0; i < PARAMS.length; i++) {
    const p = PARAMS[i];
    const v = values[p.key];
    out[i] = v === undefined ? p.def : v;
  }
  return out;
}

/** GLSL #defines so the shader can refer to params by name. */
export function paramDefinesGLSL(): string {
  return (
    `#define NP ${PARAMS.length}\n` +
    PARAMS.map((p, i) => `#define P_${p.key} uP[${i}]`).join('\n') +
    '\n'
  );
}
