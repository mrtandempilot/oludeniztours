import { setAudio } from '@/state/actions';
import { AUDIO_BANDS, live, store, type AudioBand } from '@/state/appState';

/**
 * Audio reactivity.
 *
 *  demo   — SIMULATED levels generated from the BPM clock (clearly labelled).
 *  input  — real audio from an interface / loopback (e.g. Ableton → BlackHole,
 *           Loopback, VB-Cable or a multichannel interface). Each band reads its
 *           own input channel + frequency range, so a dedicated SH-4 channel can
 *           be routed to "Synth / SH-4".
 *  bridge — levels pushed over the WebSocket bridge (Max for Live → OSC →
 *           bridge → browser). See /bridge and /touchdesigner.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private analysers: AnalyserNode[] = [];
  private bins: Float32Array<ArrayBuffer>[] = [];
  private smooth: Record<AudioBand, number> = { kick: 0, bass: 0, mid: 0, high: 0, synth: 0 };
  private bridgeLevels: Partial<Record<AudioBand, number>> = {};
  private bridgeAt = 0;
  private synthNote = 0;
  private lastBeatInt = -1;

  async listDevices() {
    try {
      const devs = await navigator.mediaDevices.enumerateDevices();
      setAudio({
        devices: devs
          .filter((d) => d.kind === 'audioinput')
          .map((d, i) => ({ id: d.deviceId, label: d.label || `Input ${i + 1}` })),
      });
    } catch {
      /* ignore */
    }
  }

  async setSource(source: 'demo' | 'input' | 'bridge' | 'off', deviceId?: string | null) {
    this.stopInput();
    setAudio({ source, error: null, status: 'disconnected', deviceLabel: null, inputChannels: 0 });
    if (source === 'input') await this.startInput(deviceId ?? store.get().audio.deviceId);
    if (source === 'bridge') setAudio({ status: 'connecting' });
  }

  private async startInput(deviceId: string | null) {
    if (!navigator.mediaDevices?.getUserMedia) {
      setAudio({ status: 'unsupported', error: 'Audio input is not available (needs HTTPS or localhost).' });
      return;
    }
    setAudio({ status: 'connecting' });
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: { ideal: 8 },
        },
      });
    } catch (e) {
      const err = e as DOMException;
      setAudio({
        status: err?.name === 'NotAllowedError' ? 'denied' : 'error',
        error: err?.message || 'Could not open audio input.',
      });
      return;
    }
    const ctx = new AudioContext({ latencyHint: 'interactive' });
    this.ctx = ctx;
    const src = ctx.createMediaStreamSource(this.stream);
    const track = this.stream.getAudioTracks()[0];
    const n = Math.max(1, Math.min(8, track?.getSettings().channelCount ?? src.channelCount ?? 2));
    const split = ctx.createChannelSplitter(n);
    src.connect(split);
    for (let i = 0; i < n; i++) {
      const an = ctx.createAnalyser();
      an.fftSize = 2048;
      an.smoothingTimeConstant = 0.35;
      split.connect(an, i);
      this.analysers.push(an);
      this.bins.push(new Float32Array(an.frequencyBinCount));
    }
    await this.listDevices();
    setAudio({
      status: 'connected',
      deviceId: deviceId ?? null,
      deviceLabel: track?.label || 'Audio input',
      inputChannels: n,
    });
  }

  private stopInput() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.analysers = [];
    this.bins = [];
  }

  /** external levels from the WebSocket bridge (0..1) */
  pushBridge(levels: Partial<Record<AudioBand, number>>) {
    this.bridgeLevels = levels;
    this.bridgeAt = performance.now();
    const a = store.get().audio;
    if (a.source === 'bridge' && a.status !== 'connected') setAudio({ status: 'connected' });
  }

  private bandLevel(ch: number, lo: number, hi: number) {
    const an = this.analysers[Math.min(ch, this.analysers.length - 1)];
    const buf = this.bins[Math.min(ch, this.bins.length - 1)];
    if (!an || !buf || !this.ctx) return 0;
    an.getFloatFrequencyData(buf);
    const hz = this.ctx.sampleRate / an.fftSize;
    const i0 = Math.max(1, Math.floor(lo / hz));
    const i1 = Math.min(buf.length - 1, Math.max(i0 + 1, Math.ceil(hi / hz)));
    let sum = 0;
    for (let i = i0; i <= i1; i++) sum += Math.pow(10, buf[i] / 20);
    const db = 20 * Math.log10(sum / (i1 - i0 + 1) + 1e-9);
    return Math.max(0, Math.min(1, (db + 70) / 55)); // -70dB..-15dB → 0..1
  }

  private simulate(beat: number): Record<AudioBand, number> {
    const ph = beat - Math.floor(beat);
    const bi = Math.floor(beat);
    if (bi !== this.lastBeatInt) {
      this.lastBeatInt = bi;
      if (bi % 2 === 0) this.synthNote = Math.random();
    }
    const sixteenth = (beat * 4) % 1;
    const bar = Math.floor(beat / 4) % 8;
    const breakdown = bar === 7;
    return {
      kick: breakdown ? 0.05 : Math.exp(-ph * 7),
      bass: breakdown ? 0.1 : 0.55 * Math.exp(-((ph + 0.5) % 1) * 4) + 0.15,
      mid: 0.35 + 0.25 * Math.sin(beat * 0.37) + 0.1 * Math.random(),
      high: (0.6 * Math.exp(-sixteenth * 10) + 0.1 * Math.random()) * (breakdown ? 0.3 : 1),
      synth: (0.4 + 0.5 * this.synthNote) * (0.6 + 0.4 * Math.sin(beat * Math.PI * 0.25)),
    };
  }

  update(dt: number, beat: number) {
    const a = store.get().audio;
    let raw: Partial<Record<AudioBand, number>> = {};
    if (a.source === 'demo') raw = this.simulate(beat);
    else if (a.source === 'input' && this.analysers.length) {
      for (const c of a.channels) raw[c.id] = this.bandLevel(c.inputChannel, c.lowHz, c.highHz);
    } else if (a.source === 'bridge') {
      if (performance.now() - this.bridgeAt < 1000) raw = this.bridgeLevels;
      else if (a.status === 'connected') setAudio({ status: 'connecting' });
    }
    for (const id of AUDIO_BANDS) {
      const cfg = a.channels.find((c) => c.id === id);
      const target = Math.min(1, (raw[id] ?? 0) * (cfg?.gain ?? 1));
      const cur = this.smooth[id];
      const k = target > cur ? 1 - Math.exp(-dt * 40) : 1 - Math.exp(-dt * 7); // fast attack, slower release
      this.smooth[id] = cur + (target - cur) * k;
      live.levels[id] = this.smooth[id];
    }
  }

  dispose() {
    this.stopInput();
  }
}
