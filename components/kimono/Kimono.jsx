'use client';
import { useState } from 'react';

const DEFAULT_PROMPT =
  'Keep her face, identity and pose exactly the same. Only change her outfit to a traditional Japanese kimono with an obi. Keep the Kyoto background and lighting.';

// Vercel'in 4.5 MB istek sınırına takılmamak için fotoğrafı tarayıcıda küçült
function shrink(file, max = 1536) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => reject(new Error('Fotoğraf okunamadı.'));
    img.src = URL.createObjectURL(file);
  });
}

export default function Kimono() {
  const [src, setSrc] = useState(null);
  const [out, setOut] = useState(null);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [pass, setPass] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function pick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr(''); setOut(null);
    try { setSrc(await shrink(f)); } catch (x) { setErr(x.message); }
  }

  async function run() {
    setBusy(true); setErr(''); setOut(null);
    try {
      const r = await fetch('/api/kimono', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-kimono-password': pass },
        body: JSON.stringify({ image: src, prompt }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Hata: ' + r.status);
      setOut(d.image);
    } catch (x) { setErr(x.message); }
    setBusy(false);
  }

  const box = { flex: '1 1 300px', minWidth: 0, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 1px 4px rgba(0,0,0,.08)' };
  const imgS = { width: '100%', height: 'auto', borderRadius: 8, display: 'block' };

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif', color: '#1f2937', background: '#f6f5f2', minHeight: '100vh' }}>
      <h1 style={{ margin: '0 0 4px' }}>👘 Kimono Editor</h1>
      <p style={{ margin: '0 0 20px', color: '#6b7280' }}>Fotoğraf yükle → yüz, kimlik ve poz aynı kalır, sadece kıyafet kimono olur.</p>

      <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={pick} />
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3}
          style={{ width: '100%', boxSizing: 'border-box', padding: 10, borderRadius: 8, border: '1px solid #d1d5db', font: 'inherit' }} />
        <input type="password" placeholder="Şifre (ayarlıysa)" value={pass} onChange={e => setPass(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', font: 'inherit', maxWidth: 280 }} />
        <button onClick={run} disabled={!src || busy}
          style={{ padding: '12px 20px', borderRadius: 8, border: 0, background: busy || !src ? '#9ca3af' : '#b91c1c', color: '#fff', fontWeight: 600, cursor: src && !busy ? 'pointer' : 'default', justifySelf: 'start' }}>
          {busy ? 'Oluşturuluyor… (10–30 sn)' : 'Kimono giydir'}
        </button>
        {err && <div style={{ color: '#b91c1c' }}>{err}</div>}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {src && <div style={box}><b>Orijinal</b><img src={src} alt="Orijinal" style={imgS} /></div>}
        {out && <div style={box}><b>Sonuç</b><img src={out} alt="Sonuç" style={imgS} />
          <a href={out} download="kimono.png" style={{ display: 'inline-block', marginTop: 8 }}>⬇ İndir</a></div>}
      </div>
    </main>
  );
}
