'use client';
import { useEffect, useRef, useState } from 'react';

// HLS oynatıcı: Safari/iOS yerel oynatır, diğer tarayıcılar hls.js kullanır.
export default function LiveCam({ src }) {
  const ref = useRef(null);
  const [st, setSt] = useState(src ? 'loading' : 'off');

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    let hls, retry, dead = false;
    const ok = () => setSt('live');
    v.addEventListener('playing', ok);

    const start = async () => {
      if (dead) return;
      if (v.canPlayType('application/vnd.apple.mpegurl')) {
        v.src = src;
        v.onerror = () => { setSt('error'); retry = setTimeout(start, 8000); };
        v.play().catch(() => {});
        return;
      }
      const Hls = (await import('hls.js')).default;
      if (!Hls.isSupported() || dead) { setSt('error'); return; }
      hls?.destroy();
      hls = new Hls({ lowLatencyMode: true, liveSyncDurationCount: 2 });
      hls.loadSource(src);
      hls.attachMedia(v);
      hls.on(Hls.Events.MANIFEST_PARSED, () => v.play().catch(() => {}));
      hls.on(Hls.Events.ERROR, (_, d) => {
        if (!d.fatal) return;
        setSt('error');
        hls.destroy(); hls = null;
        retry = setTimeout(start, 8000); // kamera geri gelince otomatik bağlan
      });
    };
    start();
    return () => { dead = true; clearTimeout(retry); hls?.destroy(); v.removeEventListener('playing', ok); };
  }, [src]);

  const msg = { loading: 'Yayına bağlanıyor…', error: 'Yayın şu an kullanılamıyor, tekrar deneniyor…', off: 'Canlı yayın yakında.' }[st];
  return (
    <div className="hero" style={{ position: 'relative', background: '#0f172a' }}>
      <video ref={ref} muted autoPlay playsInline controls={st === 'live'}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {st === 'live'
        ? <span style={{ position: 'absolute', top: 12, left: 12, background: '#ef4444', color: '#fff', fontWeight: 800, fontSize: '.75rem', padding: '4px 10px', borderRadius: 99 }}>● CANLI</span>
        : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, textAlign: 'center', padding: 16 }}>{msg}</div>}
    </div>
  );
}
