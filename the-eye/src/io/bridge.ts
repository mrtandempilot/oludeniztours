import { PARAMS } from '@/engine/params';
import { setBpm, setTd } from '@/state/actions';
import { store } from '@/state/appState';
import { applyControl } from '@/state/controls';
import { PROTOCOL_VERSION, type FrameMsg, type InboundMsg } from './protocol';

/**
 * WebSocket link to TouchDesigner (directly or via bridge/eye-bridge.mjs).
 * Reconnects with back-off. While disconnected nothing is sent and the UI
 * shows DISCONNECTED; the built-in WebGL engine keeps running (demo mode).
 */
export class TouchDesignerLink {
  private ws: WebSocket | null = null;
  private retry = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private lastSend = 0;
  private disposed = false;
  onAudio: ((levels: Record<string, number>) => void) | null = null;

  start() {
    this.disposed = false;
    const unsub = store.subscribe((s, p) => {
      if (s.td.url !== p.td.url || s.td.enabled !== p.td.enabled) this.reconnect();
    });
    this.unsub = unsub;
    this.connect();
  }
  private unsub: (() => void) | null = null;

  private connect() {
    const { url, enabled } = store.get().td;
    if (!enabled || this.disposed) {
      setTd({ status: 'disconnected' });
      return;
    }
    setTd({ status: 'connecting' });
    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch {
      setTd({ status: 'error' });
      this.schedule();
      return;
    }
    this.ws = ws;
    ws.onopen = () => {
      this.retry = 0;
      setTd({ status: 'connected', peer: url, rxCount: 0 });
      this.sendRaw({
        type: 'hello',
        app: 'the-eye',
        protocol: PROTOCOL_VERSION,
        params: PARAMS.map((p) => ({ key: p.key, group: p.group, min: p.min, max: p.max })),
      });
    };
    ws.onmessage = (e) => this.onMessage(e.data);
    ws.onclose = () => {
      if (this.ws === ws) this.ws = null;
      setTd({ status: 'disconnected', peer: null });
      this.schedule();
    };
    ws.onerror = () => {
      /* onclose follows */
    };
  }

  private schedule() {
    if (this.disposed || !store.get().td.enabled) return;
    if (this.timer) clearTimeout(this.timer);
    const delay = Math.min(10000, 1000 * Math.pow(1.6, this.retry++));
    this.timer = setTimeout(() => this.connect(), delay);
  }

  reconnect() {
    if (this.timer) clearTimeout(this.timer);
    this.retry = 0;
    const ws = this.ws;
    this.ws = null;
    if (ws) {
      ws.onclose = null;
      ws.close();
    }
    this.connect();
  }

  private onMessage(data: unknown) {
    if (typeof data !== 'string') return;
    let msg: InboundMsg;
    try {
      msg = JSON.parse(data);
    } catch {
      return;
    }
    setTd({ rxCount: store.get().td.rxCount + 1 });
    if (msg.type === 'audio' && 'levels' in msg) this.onAudio?.(msg.levels as Record<string, number>);
    else if (msg.type === 'control' && 'target' in msg) applyControl(String(msg.target), Number(msg.value));
    else if (msg.type === 'bpm' && 'bpm' in msg && Number.isFinite(msg.bpm)) setBpm(Number(msg.bpm), 'bridge');
  }

  get connected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  sendRaw(msg: object) {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(msg));
  }

  /** throttled to ~30 Hz */
  sendFrame(build: () => FrameMsg) {
    if (!this.connected) return;
    const now = performance.now();
    if (now - this.lastSend < 33) return;
    this.lastSend = now;
    this.sendRaw(build());
  }

  dispose() {
    this.disposed = true;
    this.unsub?.();
    if (this.timer) clearTimeout(this.timer);
    if (this.ws) {
      this.ws.onclose = null;
      this.ws.close();
    }
    this.ws = null;
  }
}
