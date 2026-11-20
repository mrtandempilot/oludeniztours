import { PARAMS, packParams } from './params';
import {
  BLIT_FRAG,
  OUTPUT_FRAG,
  POST_FRAG,
  SCENE_FRAG,
  TRANSITION_FRAG,
  VERT,
} from './shaders';
import { SCENE_KINDS, TRANSITIONS, type EngineFrame, type SceneRender } from './types';

/**
 * WebGL2 visual engine. It knows nothing about React, MIDI, audio or the
 * UI — it only turns an EngineFrame into pixels. The same engine runs in the
 * controller preview and in the pop-out /output window.
 */

interface Target {
  fb: WebGLFramebuffer;
  tex: WebGLTexture;
  w: number;
  h: number;
  mip: boolean;
}

type Uniforms = Record<string, WebGLUniformLocation | null>;
interface Prog {
  p: WebGLProgram;
  u: Uniforms;
}

const MON_W = 192;
const MON_H = 108;

export interface EngineOptions {
  monitors?: boolean;
  maxWidth?: number;
}

export class VisualEngine {
  readonly gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private vao: WebGLVertexArrayObject;
  private scene: Prog;
  private trans: Prog;
  private post: Prog;
  private out: Prog;
  private blit: Prog;
  private tA!: Target;
  private tB!: Target;
  private tMix!: Target;
  private tFb: Target[] = [];
  private fbIdx = 0;
  private monA: Target;
  private monB: Target;
  private monOut: Target;
  private thumbScene: Target;
  private thumbPost: Target;
  private thumbOut: Target;
  private black: Target;
  private paramBuf = new Float32Array(PARAMS.length);
  private pixelBuf = new Uint8Array(MON_W * MON_H * 4);
  private floatFb: boolean;
  private iw = 0;
  private ih = 0;
  private frameNo = 0;
  private opts: EngineOptions;
  monitorA: HTMLCanvasElement | null = null;
  monitorB: HTMLCanvasElement | null = null;
  lost = false;
  fps = 0;
  private fpsAcc = 0;
  private fpsN = 0;
  private lastT = 0;

  constructor(canvas: HTMLCanvasElement, opts: EngineOptions = {}) {
    this.canvas = canvas;
    this.opts = opts;
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) throw new Error('WebGL2 is not available in this browser.');
    this.gl = gl;
    this.floatFb = !!gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('OES_texture_float_linear');

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.lost = true;
    });

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    this.vao = vao;

    this.scene = this.program(SCENE_FRAG, ['uRes', 'uTime', 'uPulse', 'uSeed', 'uKind', 'uP']);
    this.trans = this.program(TRANSITION_FRAG, [
      'uA', 'uB', 'uPrev', 'uMix', 'uIntensity', 'uType', 'uTime', 'uRes',
    ]);
    this.post = this.program(POST_FRAG, [
      'uSrc', 'uPrev', 'uRes', 'uTime', 'uFbAmount', 'uFbZoom', 'uFbRotate', 'uGlitch', 'uGlow', 'uGlowTh',
    ]);
    this.out = this.program(OUTPUT_FRAG, ['uSrc', 'uRes', 'uTime', 'uMaster', 'uBlack']);
    this.blit = this.program(BLIT_FRAG, ['uSrc']);

    this.monA = this.target(MON_W, MON_H);
    this.monB = this.target(MON_W, MON_H, true);
    this.monOut = this.target(MON_W, MON_H);
    this.thumbScene = this.target(MON_W, MON_H, true);
    this.thumbPost = this.target(MON_W, MON_H);
    this.thumbOut = this.target(MON_W, MON_H);
    this.black = this.target(4, 4);
    this.clear(this.black);
  }

  // ------------------------------------------------------------------ setup
  private program(frag: string, uniforms: string[]): Prog {
    const gl = this.gl;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(s);
        gl.deleteShader(s);
        throw new Error('Shader compile error: ' + log);
      }
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, frag));
    gl.bindAttribLocation(p, 0, 'aPos');
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error('Program link error: ' + gl.getProgramInfoLog(p));
    }
    const u: Uniforms = {};
    for (const n of uniforms) u[n] = gl.getUniformLocation(p, n === 'uP' ? 'uP[0]' : n);
    return { p, u };
  }

  private target(w: number, h: number, mip = false, float = false): Target {
    const gl = this.gl;
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    const useFloat = float && this.floatFb;
    gl.texImage2D(
      gl.TEXTURE_2D, 0,
      useFloat ? gl.RGBA16F : gl.RGBA8, w, h, 0, gl.RGBA,
      useFloat ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mip ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (mip) gl.generateMipmap(gl.TEXTURE_2D);
    const fb = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { fb, tex, w, h, mip };
  }

  private freeTarget(t?: Target) {
    if (!t) return;
    this.gl.deleteFramebuffer(t.fb);
    this.gl.deleteTexture(t.tex);
  }

  private clear(t: Target) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, t.fb);
    gl.viewport(0, 0, t.w, t.h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  private ensureSize(renderScale: number) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.max(2, Math.floor(this.canvas.clientWidth * dpr));
    const ch = Math.max(2, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== cw || this.canvas.height !== ch) {
      this.canvas.width = cw;
      this.canvas.height = ch;
    }
    const maxW = this.opts.maxWidth ?? 1920;
    let iw = Math.floor(cw * renderScale);
    let ih = Math.floor(ch * renderScale);
    if (iw > maxW) {
      ih = Math.floor((ih * maxW) / iw);
      iw = maxW;
    }
    iw = Math.max(16, iw);
    ih = Math.max(16, ih);
    if (iw === this.iw && ih === this.ih) return;
    this.iw = iw;
    this.ih = ih;
    [this.tA, this.tB, this.tMix, ...this.tFb].forEach((t) => this.freeTarget(t));
    this.tA = this.target(iw, ih);
    this.tB = this.target(iw, ih);
    this.tMix = this.target(iw, ih, true);
    this.tFb = [this.target(iw, ih, false, true), this.target(iw, ih, false, true)];
    this.tFb.forEach((t) => this.clear(t));
  }

  // ------------------------------------------------------------------ passes
  private bindTex(unit: number, t: Target) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t.tex);
  }

  private draw(dst: Target | null) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, dst ? dst.fb : null);
    gl.viewport(0, 0, dst ? dst.w : this.canvas.width, dst ? dst.h : this.canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (dst?.mip) {
      gl.bindTexture(gl.TEXTURE_2D, dst.tex);
      gl.generateMipmap(gl.TEXTURE_2D);
    }
  }

  private renderScene(s: SceneRender, time: number, pulse: number, dst: Target) {
    const gl = this.gl;
    const { p, u } = this.scene;
    gl.useProgram(p);
    gl.uniform2f(u.uRes, dst.w, dst.h);
    gl.uniform1f(u.uTime, time);
    gl.uniform1f(u.uPulse, pulse);
    gl.uniform1f(u.uSeed, s.seed);
    gl.uniform1i(u.uKind, Math.max(0, SCENE_KINDS.indexOf(s.kind)));
    gl.uniform1fv(u.uP, packParams(s.params, this.paramBuf));
    this.draw(dst);
  }

  private renderPost(src: Target, prev: Target, dst: Target, params: Record<string, number>, time: number) {
    const gl = this.gl;
    const { p, u } = this.post;
    gl.useProgram(p);
    this.bindTex(0, src);
    this.bindTex(1, prev);
    gl.uniform1i(u.uSrc, 0);
    gl.uniform1i(u.uPrev, 1);
    gl.uniform2f(u.uRes, dst.w, dst.h);
    gl.uniform1f(u.uTime, time);
    gl.uniform1f(u.uFbAmount, params.fbAmount ?? 0);
    gl.uniform1f(u.uFbZoom, params.fbZoom ?? 0);
    gl.uniform1f(u.uFbRotate, params.fbRotate ?? 0);
    gl.uniform1f(u.uGlitch, params.glitch ?? 0);
    gl.uniform1f(u.uGlow, params.glow ?? 0);
    gl.uniform1f(u.uGlowTh, params.glowThreshold ?? 0.5);
    this.draw(dst);
  }

  private renderOutput(src: Target, dst: Target | null, master: number, black: number, time: number) {
    const gl = this.gl;
    const { p, u } = this.out;
    gl.useProgram(p);
    this.bindTex(0, src);
    gl.uniform1i(u.uSrc, 0);
    gl.uniform2f(u.uRes, dst ? dst.w : this.canvas.width, dst ? dst.h : this.canvas.height);
    gl.uniform1f(u.uTime, time);
    gl.uniform1f(u.uMaster, master);
    gl.uniform1f(u.uBlack, black);
    this.draw(dst);
  }

  private blitTo(src: Target, dst: Target | null) {
    const gl = this.gl;
    gl.useProgram(this.blit.p);
    this.bindTex(0, src);
    gl.uniform1i(this.blit.u.uSrc, 0);
    this.draw(dst);
  }

  private readTo(t: Target, canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, t.fb);
    gl.readPixels(0, 0, t.w, t.h, gl.RGBA, gl.UNSIGNED_BYTE, this.pixelBuf);
    if (canvas.width !== t.w) canvas.width = t.w;
    if (canvas.height !== t.h) canvas.height = t.h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = ctx.createImageData(t.w, t.h);
    const row = t.w * 4;
    for (let y = 0; y < t.h; y++) {
      img.data.set(this.pixelBuf.subarray((t.h - 1 - y) * row, (t.h - y) * row), y * row);
    }
    ctx.putImageData(img, 0, 0);
  }

  private postParams(f: EngineFrame) {
    const a = f.a.params;
    const b = f.b?.params;
    const m = f.b ? f.mix : 0;
    const k = ['fbAmount', 'fbZoom', 'fbRotate', 'glitch', 'glow', 'glowThreshold'];
    const out: Record<string, number> = {};
    for (const key of k) {
      const va = a[key] ?? 0;
      out[key] = b ? va + ((b[key] ?? 0) - va) * m : va;
    }
    return out;
  }

  // ------------------------------------------------------------------ public
  render(f: EngineFrame) {
    if (this.lost) return;
    const now = performance.now();
    if (this.lastT) {
      this.fpsAcc += now - this.lastT;
      this.fpsN++;
      if (this.fpsAcc > 500) {
        this.fps = Math.round((1000 * this.fpsN) / this.fpsAcc);
        this.fpsAcc = 0;
        this.fpsN = 0;
      }
    }
    this.lastT = now;
    this.frameNo++;
    const gl = this.gl;
    gl.bindVertexArray(this.vao);
    this.ensureSize(f.renderScale);

    const cur = this.tFb[this.fbIdx];
    const prev = this.tFb[1 - this.fbIdx];

    if (!f.freeze) {
      this.renderScene(f.a, f.time, f.pulse, this.tA);
      const mixing = !!f.b && f.mix > 0.0005;
      if (mixing && f.b) this.renderScene(f.b, f.time, f.pulse, this.tB);

      // transition (also acts as plain copy when not mixing)
      const { p, u } = this.trans;
      gl.useProgram(p);
      this.bindTex(0, this.tA);
      this.bindTex(1, mixing ? this.tB : this.tA);
      this.bindTex(2, prev);
      gl.uniform1i(u.uA, 0);
      gl.uniform1i(u.uB, 1);
      gl.uniform1i(u.uPrev, 2);
      gl.uniform1f(u.uMix, mixing ? f.mix : 0);
      gl.uniform1f(u.uIntensity, f.transition.intensity);
      gl.uniform1i(u.uType, Math.max(0, TRANSITIONS.indexOf(f.transition.type)));
      gl.uniform1f(u.uTime, f.time);
      gl.uniform2f(u.uRes, this.iw, this.ih);
      this.draw(this.tMix);

      this.renderPost(this.tMix, prev, cur, this.postParams(f), f.time);
      this.fbIdx = 1 - this.fbIdx;
      this.renderOutput(cur, null, f.master, f.blackout, f.time);
    } else {
      // frozen: keep showing the last feedback frame, still honour master/blackout
      this.renderOutput(prev, null, f.master, f.blackout, f.time);
    }

    // low-res monitors (A program / B preview), every 3rd frame
    if (this.opts.monitors && this.frameNo % 3 === 0 && !f.freeze) {
      if (this.monitorA) {
        this.blitTo(this.tA, this.monA);
        this.renderOutput(this.monA, this.monOut, 1, 0, f.time);
        this.readTo(this.monOut, this.monitorA);
      }
      if (this.monitorB && f.b) {
        if (f.mix > 0.0005) this.blitTo(this.tB, this.monB);
        else this.renderScene(f.b, f.time, f.pulse, this.monB);
        this.renderPost(this.monB, this.black, this.thumbPost, { ...f.b.params, fbAmount: 0, glitch: 0 }, f.time);
        this.renderOutput(this.thumbPost, this.monOut, 1, 0, f.time);
        this.readTo(this.monOut, this.monitorB);
      }
    }
  }

  /** Render a still of a scene and return it as a data URL (for the library). */
  thumbnail(s: SceneRender, time = 6): string {
    if (this.lost) return '';
    const gl = this.gl;
    gl.bindVertexArray(this.vao);
    this.renderScene(s, time, 0, this.thumbScene);
    this.renderPost(this.thumbScene, this.black, this.thumbPost, { ...s.params, fbAmount: 0, glitch: 0 }, time);
    this.renderOutput(this.thumbPost, this.thumbOut, 1, 0, time);
    const c = document.createElement('canvas');
    this.readTo(this.thumbOut, c);
    return c.toDataURL('image/jpeg', 0.8);
  }

  dispose() {
    const ext = this.gl.getExtension('WEBGL_lose_context');
    ext?.loseContext();
  }
}
