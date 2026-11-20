# THE EYE — Generative Visual Performance Dashboard

A live-performance control surface for generative audiovisual art: a real-time
WebGL2 visual engine (a surreal eye surrounded by tentacles, Gielis
superformula geometry, fractals, liquid distortion, particles, feedback and
glitch), an A/B scene mixer with seven transitions, per-scene effect control,
audio reactivity for Ableton Live, MIDI learn, and a WebSocket/OSC link to
TouchDesigner.

It is a self-contained Next.js app inside this repo. It shares nothing with the
Oludeniz Tours site in the repository root.

```bash
cd the-eye
npm install
npm run dev        # http://localhost:3100
npm run bridge     # optional: WebSocket ⇄ OSC bridge for TouchDesigner / Ableton
```

## What is real and what is simulated

| Area | Status |
|---|---|
| Visual preview | **Real.** Procedural WebGL2 shaders, running live in the browser. |
| MIDI | **Real.** Web MIDI (Chrome/Edge). CC and notes, MIDI learn, MIDI clock → BPM. Shows DISCONNECTED / DENIED / UNSUPPORTED when there is no device or permission. |
| Audio input | **Real** in `INPUT` mode: any audio interface or loopback (BlackHole, Loopback, VB-Cable), with a frequency band and input channel per band. |
| Ableton | **Real** in `ABLETON` mode: band levels and BPM arrive as OSC through the bridge, for example from a Max for Live device. |
| Audio in `DEMO` mode | **Simulated** from the BPM clock, and labelled SIMULATED throughout the UI. |
| TouchDesigner | **Real** WebSocket client. It shows DISCONNECTED and the **DEMO MODE** badge until a server answers. |

## Using it live

- **Scene library**: click a scene to cue it to **B**, double-click to take it at once, and drag to reorder (↑/↓ on touch). Double-click a name to rename. Use **+ NEW** to pick a generator. Each scene has buttons to duplicate and delete it.
- **A/B transition**: **TAKE** (Space) runs the selected transition (Morph, Liquid, Dissolve, Feedback, Glitch, Tunnel, Particle Explosion) with its duration and intensity. **CUT** (Enter) switches at once. Dragging the **crossfade T-bar** to B commits the switch. **AUTO** takes the next scene every 1/4/8/16 bars, on the downbeat.
- **Effect control**: about 37 parameters in 11 groups. It edits slot **A** (live) or **B** (prepare the next scene); click a monitor or press A/S to switch. Shift-drag gives fine control, and double-click resets a value.
- **Audio reactivity**: Kick, Bass, Mid, High and Synth/SH-4 each have a meter, a gain, a target parameter and a bipolar amount. A cyan dot marks any parameter that audio is modulating.
- **Performance**: master intensity, blackout, freeze, previous/next/random scene, BPM with tap tempo, and FPS with a LO/MID/HI render scale.
- **Output**: **FULLSCREEN** puts the program stage fullscreen. **OUTPUT ↗** opens a borderless `/output` window for a projector. That window renders frames streamed from the controller over a `BroadcastChannel`.
- **MIDI LEARN** (L): click any outlined control, then move a knob or hit a pad. Mapped controls show a `CC21`/`N36` tag that flashes when MIDI arrives.
- Scenes, mappings and settings are saved in `localStorage`. Press `?` to see every shortcut.

## Architecture

```
src/
  engine/          visual engine: no React, no I/O
    params.ts        parameter model (also the shader uniform layout)
    shaders.ts       GLSL: scene generator, 7 transitions, post (glow/feedback/glitch), output
    VisualEngine.ts  WebGL2 renderer: EngineFrame → pixels, A/B monitors, thumbnails
    types.ts         EngineFrame: the only contract between controller and engine
  state/
    appState.ts      store (scenes, A/B, transition, audio, midi, td) + `live` hi-freq values
    actions.ts       all mutations, the transition state machine, persistence
    controls.ts      control-target registry shared by MIDI, OSC and the keyboard
    runtime.ts       rAF conductor: clock → transition → audio modulation → engine / output window / TD
  io/
    midi.ts          Web MIDI + clock
    audio.ts         demo simulation, audio-interface FFT bands, bridge levels
    bridge.ts        TouchDesigner WebSocket client (reconnect, 30 Hz frames)
    protocol.ts      JSON wire protocol types
  components/      UI panels (React + Tailwind)
bridge/eye-bridge.mjs     WebSocket ⇄ OSC/UDP bridge (Node)
touchdesigner/*.py        Web Server DAT and OSC In DAT callbacks
```

The UI never draws pixels and the engine never reads UI state. The runtime
builds a serialisable `EngineFrame` each frame and sends it to:

1. the local `VisualEngine` (the preview),
2. the `/output` window (`BroadcastChannel`),
3. TouchDesigner (`frame` messages at about 30 Hz over WebSocket).

Swapping in TouchDesigner as the renderer only means consuming those frames.

## TouchDesigner

**Option A, direct.** Add a Web Server DAT on port 9980 and use
`touchdesigner/eye_webserver_callbacks.py` as its callbacks. Scene parameters
and the performance state land in the `eye_params` and `eye_state` tables. To
send audio levels or commands back, call `send()` (see the docstring).

**Option B, OSC.** Run `npm run bridge -- --osc-out 127.0.0.1:7000 --osc-in 7001`.
Point an OSC In CHOP at port 7000 to get `eye/mix`, `eye/param/*`,
`eye/audio/*` and so on, and use `touchdesigner/eye_osc_callbacks.py` for scene
names and events.

The address map is documented at the top of `bridge/eye-bridge.mjs`. For
example, `/eye/control/btn/take 1` sent to port 7001 triggers TAKE.

## Ableton Live

- **BPM**: enable MIDI Clock output to the controller's MIDI port (the dashboard follows it and shows `MIDI CLK`), or send `/eye/bpm` through the bridge.
- **Audio**, either:
  - route Ableton's output, or a dedicated SH-4 return, to a loopback or interface input and choose **INPUT**, then set an input channel per band; or
  - send band levels from a Max for Live envelope follower as OSC (`/eye/audio/kick 0.8`, or `/eye/audio k b m h s`) to the bridge's port 7001 and choose **ABLETON**.

## Deploying

This folder is its own Next.js project. On Vercel, create a separate project
with **Root Directory = `the-eye`**. The tours site in the repository root is
unaffected. Web MIDI and audio input need HTTPS or localhost.
