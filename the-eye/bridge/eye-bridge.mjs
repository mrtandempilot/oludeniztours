#!/usr/bin/env node
/**
 * THE EYE bridge — WebSocket (browser) ⇄ OSC/UDP (TouchDesigner, Max for Live…)
 *
 *   npm run bridge -- --ws 9980 --osc-out 127.0.0.1:7000 --osc-in 7001
 *
 * Browser → OSC (sent to --osc-out as one bundle per frame, ~30 Hz)
 *   /eye/mix f   /eye/master f   /eye/blackout f   /eye/freeze i
 *   /eye/bpm f   /eye/beat f     /eye/transition s
 *   /eye/scene/a s (name)   /eye/scene/a/kind s   /eye/scene/b s
 *   /eye/param/<key> f      (modulated values of the scene on air)
 *   /eye/audio/<band> f     (kick bass mid high synth)
 *   /eye/event/<take|cut|committed> s (JSON payload)
 *
 * OSC → Browser (listen on --osc-in)
 *   /eye/audio/<band> f            band level 0..1  (e.g. from Max for Live)
 *   /eye/audio f f f f f           kick bass mid high synth
 *   /eye/bpm f                     tempo from Ableton
 *   /eye/control/<path> f          any mappable control, value 0..1
 *        /eye/control/btn/take 1   /eye/control/mix 0.5   /eye/control/param/glow 0.8
 */
import dgram from 'node:dgram';
import { WebSocketServer } from 'ws';

// ------------------------------------------------------------------ args
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, []),
);
const WS_PORT = Number(args.ws ?? process.env.EYE_WS_PORT ?? 9980);
const [OUT_HOST, OUT_PORT] = String(args['osc-out'] ?? process.env.EYE_OSC_OUT ?? '127.0.0.1:7000').split(':');
const IN_PORT = Number(args['osc-in'] ?? process.env.EYE_OSC_IN ?? 7001);
const VERBOSE = 'verbose' in args || process.argv.includes('--verbose');

// ------------------------------------------------------------------ OSC codec
const pad4 = (n) => (n + 3) & ~3;
function oscString(s) {
  const b = Buffer.from(String(s), 'utf8');
  const out = Buffer.alloc(pad4(b.length + 1));
  b.copy(out);
  return out;
}
function oscMessage(address, values) {
  let tags = ',';
  const parts = [];
  for (const v of values) {
    if (typeof v === 'string') {
      tags += 's';
      parts.push(oscString(v));
    } else if (typeof v === 'boolean') {
      tags += 'i';
      const b = Buffer.alloc(4);
      b.writeInt32BE(v ? 1 : 0);
      parts.push(b);
    } else {
      tags += 'f';
      const b = Buffer.alloc(4);
      b.writeFloatBE(Number(v) || 0);
      parts.push(b);
    }
  }
  return Buffer.concat([oscString(address), oscString(tags), ...parts]);
}
function oscBundle(messages) {
  const head = Buffer.concat([oscString('#bundle'), Buffer.from([0, 0, 0, 0, 0, 0, 0, 1])]); // immediate
  const els = messages.map((m) => {
    const len = Buffer.alloc(4);
    len.writeInt32BE(m.length);
    return Buffer.concat([len, m]);
  });
  return Buffer.concat([head, ...els]);
}
function readString(buf, off) {
  let end = off;
  while (end < buf.length && buf[end] !== 0) end++;
  return [buf.toString('utf8', off, end), pad4(end + 1)];
}
function decode(buf, out = []) {
  if (buf.length >= 8 && buf.toString('utf8', 0, 7) === '#bundle') {
    let off = 16;
    while (off + 4 <= buf.length) {
      const len = buf.readInt32BE(off);
      decode(buf.subarray(off + 4, off + 4 + len), out);
      off += 4 + len;
    }
    return out;
  }
  let [address, off] = readString(buf, 0);
  let tags = ',';
  if (off < buf.length) [tags, off] = readString(buf, off);
  const vals = [];
  for (const t of tags.slice(1)) {
    if (t === 'f') { vals.push(buf.readFloatBE(off)); off += 4; }
    else if (t === 'i') { vals.push(buf.readInt32BE(off)); off += 4; }
    else if (t === 'd') { vals.push(buf.readDoubleBE(off)); off += 8; }
    else if (t === 'h') { vals.push(Number(buf.readBigInt64BE(off))); off += 8; }
    else if (t === 's') { const [s, o] = readString(buf, off); vals.push(s); off = o; }
    else if (t === 'T') vals.push(1);
    else if (t === 'F') vals.push(0);
  }
  out.push({ address, args: vals });
  return out;
}

// ------------------------------------------------------------------ sockets
const udpOut = dgram.createSocket('udp4');
const udpIn = dgram.createSocket('udp4');
const wss = new WebSocketServer({ port: WS_PORT });
const clients = new Set();

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

wss.on('connection', (ws, req) => {
  clients.add(ws);
  log(`browser connected (${req.socket.remoteAddress}) — ${clients.size} client(s)`);
  ws.on('close', () => {
    clients.delete(ws);
    log(`browser disconnected — ${clients.size} client(s)`);
  });
  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(String(raw));
    } catch {
      return;
    }
    const send = (buf) => udpOut.send(buf, Number(OUT_PORT), OUT_HOST);
    if (msg.type === 'hello') {
      log(`hello from ${msg.app} (protocol ${msg.protocol}, ${msg.params?.length} params)`);
      send(oscMessage('/eye/hello', [String(msg.protocol)]));
    } else if (msg.type === 'frame') {
      const m = [
        oscMessage('/eye/mix', [msg.mix]),
        oscMessage('/eye/master', [msg.master]),
        oscMessage('/eye/blackout', [msg.blackout]),
        oscMessage('/eye/freeze', [!!msg.freeze]),
        oscMessage('/eye/bpm', [msg.bpm]),
        oscMessage('/eye/beat', [msg.beat]),
        oscMessage('/eye/transition', [msg.transition]),
        oscMessage('/eye/scene/a', [msg.a?.name ?? '']),
        oscMessage('/eye/scene/a/kind', [msg.a?.kind ?? '']),
        oscMessage('/eye/scene/b', [msg.b?.name ?? '']),
      ];
      for (const [k, v] of Object.entries(msg.a?.params ?? {})) m.push(oscMessage(`/eye/param/${k}`, [v]));
      for (const [k, v] of Object.entries(msg.audio ?? {})) m.push(oscMessage(`/eye/audio/${k}`, [v]));
      send(oscBundle(m));
    } else if (msg.type === 'event') {
      log(`event ${msg.name}`);
      send(oscMessage(`/eye/event/${msg.name}`, [JSON.stringify(msg.data ?? {})]));
    }
  });
});

const BANDS = ['kick', 'bass', 'mid', 'high', 'synth'];
const levels = {};
let audioDirty = false;
const broadcast = (obj) => {
  const s = JSON.stringify(obj);
  for (const c of clients) if (c.readyState === 1) c.send(s);
};
setInterval(() => {
  if (!audioDirty) return;
  audioDirty = false;
  broadcast({ type: 'audio', levels });
}, 16);

udpIn.on('message', (buf, rinfo) => {
  let msgs;
  try {
    msgs = decode(buf);
  } catch {
    return;
  }
  for (const { address, args: a } of msgs) {
    if (VERBOSE) log(`osc ${rinfo.address}:${rinfo.port} ${address} ${a.join(' ')}`);
    if (address === '/eye/audio') {
      a.slice(0, 5).forEach((v, i) => (levels[BANDS[i]] = Number(v)));
      audioDirty = true;
    } else if (address.startsWith('/eye/audio/')) {
      const band = address.slice(11);
      if (BANDS.includes(band)) {
        levels[band] = Number(a[0] ?? 0);
        audioDirty = true;
      }
    } else if (address === '/eye/bpm') {
      broadcast({ type: 'bpm', bpm: Number(a[0]) });
    } else if (address.startsWith('/eye/control/')) {
      const parts = address.slice(13).split('/');
      const target = parts.length > 1 && (parts[0] === 'btn' || parts[0] === 'param') ? `${parts[0]}:${parts.slice(1).join('/')}` : parts.join('.');
      broadcast({ type: 'control', target, value: Number(a[0] ?? 1) });
    }
  }
});

udpIn.on('error', (e) => log('OSC in error:', e.message));
wss.on('error', (e) => {
  log('WebSocket error:', e.message);
  process.exit(1);
});
udpIn.bind(IN_PORT, () => {
  log('THE EYE bridge running');
  log(`  browser  ⇄ ws://localhost:${WS_PORT}`);
  log(`  OSC out  → ${OUT_HOST}:${OUT_PORT}  (TouchDesigner OSC In)`);
  log(`  OSC in   ← udp :${IN_PORT}  (audio levels / bpm / control)`);
});
