'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ALL } from '../../lib/site';

const CUR = ['USD', 'EUR', 'TRY', 'GBP'];
const SYM = { USD: '$', EUR: '€', TRY: '₺', GBP: '£' };
const PAY = ['Nakit', 'Kart', 'Havale', 'Kapıda', 'Online'];
const STATUS = ['Onaylı', 'Tamamlandı', 'İptal', 'Ertelendi'];
const CATS = ['Rezervasyon', 'Tedarikçi ödemesi', 'Komisyon', 'Reklam', 'Yakıt', 'Ofis', 'Maaş', 'Vergi', 'Diğer'];
const SERVICES = ALL.map(x => x.item.tr.n).concat('Diğer');
const n = v => Number(v) || 0;
const money = (v, c) => (SYM[c] || '') + n(v).toLocaleString('tr-TR', { maximumFractionDigits: 2 });
const today = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
const ym = d => (d || '').slice(0, 7);
const fmtDate = d => d ? d.split('-').reverse().join('.') : '—';
const byCur = (rows, f) => { const o = {}; rows.forEach(r => { const v = f(r); if (v) o[r.currency] = (o[r.currency] || 0) + v; }); return o; };
const CurList = ({ obj, neg }) => {
  const k = Object.keys(obj).filter(c => Math.abs(obj[c]) > 0.004);
  if (!k.length) return <span className="muted">—</span>;
  return <span className="curl">{k.map(c => <b key={c} className={neg && obj[c] > 0 ? 'neg' : (obj[c] < 0 ? 'neg' : '')}>{money(obj[c], c)}</b>)}</span>;
};

export default function Admin() {
  const sb = supabase();
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const [staff, setStaff] = useState(null); // null = bilinmiyor
  const [tab, setTab] = useState('ozet');
  const [data, setData] = useState({ bookings: [], cash: [], suppliers: [] });
  const [err, setErr] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!sb) { setReady(true); return; }
    sb.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  const load = useCallback(async () => {
    if (!sb || !session) return;
    setErr('');
    const [st, b, c, s] = await Promise.all([
      sb.from('staff').select('email'),
      sb.from('bookings').select('*').order('tour_date', { ascending: false, nullsFirst: false }).order('id', { ascending: false }).limit(2000),
      sb.from('cash_entries').select('*').order('entry_date', { ascending: false }).order('id', { ascending: false }).limit(5000),
      sb.from('suppliers').select('*').order('name'),
    ]);
    const e = st.error || b.error || c.error || s.error;
    if (e) { setErr(e.message.includes('does not exist') ? 'Tablolar henüz oluşturulmamış. supabase/schema.sql dosyasını Supabase SQL Editor\'de çalıştır.' : e.message); setStaff(false); return; }
    setStaff((st.data || []).length > 0);
    setData({ bookings: b.data || [], cash: c.data || [], suppliers: s.data || [] });
  }, [sb, session]);
  useEffect(() => { load(); }, [load]);

  const flash = m => { setToast(m); setTimeout(() => setToast(''), 2500); };
  const run = async (p, ok) => { const { error } = await p; if (error) { flash('Hata: ' + error.message); return false; } if (ok) flash(ok); await load(); return true; };

  if (!ready) return <div className="ad"><p className="center muted">Yükleniyor…</p></div>;
  if (!sb) return <div className="ad"><div className="card narrow"><h1>Yönetim</h1><p>Supabase bağlantı bilgileri eksik. Vercel'de <code>NEXT_PUBLIC_SUPABASE_URL</code> ve <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> tanımlanmalı.</p></div></div>;
  if (!session) return <Login sb={sb} />;

  return (
    <div className="ad">
      <header className="top">
        <div className="brand"><span>O</span><b>Oludeniz Tours</b><small>Yönetim</small></div>
        <nav className="tabs">
          {[['ozet', 'Özet'], ['rez', 'Rezervasyonlar'], ['kasa', 'Kasa'], ['ted', 'Tedarikçiler']].map(([k, l]) =>
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
        </nav>
        <div className="who"><small>{session.user.email}</small><button className="link" onClick={() => sb.auth.signOut()}>Çıkış</button></div>
      </header>
      <main className="wrap">
        {err && <div className="alert">{err}</div>}
        {staff === false && !err && <div className="alert">Bu hesabın panele erişim yetkisi yok. Supabase'de <code>staff</code> tablosuna <b>{session.user.email}</b> eklenmeli.</div>}
        {staff && tab === 'ozet' && <Summary data={data} />}
        {staff && tab === 'rez' && <Bookings data={data} sb={sb} run={run} />}
        {staff && tab === 'kasa' && <Cash data={data} sb={sb} run={run} />}
        {staff && tab === 'ted' && <Suppliers data={data} sb={sb} run={run} />}
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function Login({ sb }) {
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault(); setBusy(true); setMsg('');
    const { error } = await sb.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) setMsg(error.message === 'Invalid login credentials' ? 'E-posta veya şifre hatalı.' : error.message);
  };
  return (
    <div className="ad"><form className="card narrow login" onSubmit={submit}>
      <div className="brand"><span>O</span><b>Oludeniz Tours</b></div>
      <h1>Yönetim girişi</h1>
      <label>E-posta<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Şifre<input type="password" autoComplete="current-password" required value={pw} onChange={e => setPw(e.target.value)} /></label>
      {msg && <p className="neg">{msg}</p>}
      <button className="btn" disabled={busy}>{busy ? 'Giriş yapılıyor…' : 'Giriş yap'}</button>
    </form></div>
  );
}

function supplierDebts(data) {
  const out = {};
  data.suppliers.forEach(s => { out[s.id] = { s, cost: {}, paid: {} }; });
  data.bookings.filter(b => b.supplier_id && b.status !== 'İptal').forEach(b => {
    const o = out[b.supplier_id]; if (o) o.cost[b.currency] = (o.cost[b.currency] || 0) + n(b.cost_total);
  });
  data.cash.filter(c => c.supplier_id && c.direction === 'Çıkış').forEach(c => {
    const o = out[c.supplier_id]; if (o) o.paid[c.currency] = (o.paid[c.currency] || 0) + n(c.amount);
  });
  return Object.values(out).map(o => { const bal = {}; new Set([...Object.keys(o.cost), ...Object.keys(o.paid)]).forEach(c => bal[c] = (o.cost[c] || 0) - (o.paid[c] || 0)); return { ...o, bal }; });
}

function Summary({ data }) {
  const m = ym(today());
  const active = data.bookings.filter(b => b.status !== 'İptal');
  const month = active.filter(b => ym(b.tour_date) === m);
  const cashBal = byCur(data.cash, c => (c.direction === 'Giriş' ? 1 : -1) * n(c.amount));
  const cashCash = byCur(data.cash.filter(c => c.method === 'Nakit'), c => (c.direction === 'Giriş' ? 1 : -1) * n(c.amount));
  const recv = byCur(active.filter(b => b.status !== 'Tamamlandı' || n(b.sale_total) > n(b.deposit)), b => n(b.sale_total) - n(b.deposit));
  const debt = {}; supplierDebts(data).forEach(o => Object.entries(o.bal).forEach(([c, v]) => { if (v > 0) debt[c] = (debt[c] || 0) + v; }));
  const upcoming = active.filter(b => b.tour_date && b.tour_date >= today()).sort((a, b) => a.tour_date.localeCompare(b.tour_date)).slice(0, 8);
  const months = [...new Set(active.map(b => ym(b.tour_date)).filter(Boolean))].sort().reverse().slice(0, 12);
  return (
    <>
      <section className="stats">
        <div className="stat"><small>Kasa bakiyesi</small><CurList obj={cashBal} /><em>Nakit: <CurList obj={cashCash} /></em></div>
        <div className="stat"><small>Bu ay ({m.split('-').reverse().join('.')}) ciro</small><CurList obj={byCur(month, b => n(b.sale_total))} /><em>{month.length} rezervasyon · {month.reduce((a, b) => a + n(b.guests), 0)} kişi</em></div>
        <div className="stat"><small>Bu ay kâr</small><CurList obj={byCur(month, b => n(b.sale_total) - n(b.cost_total))} /></div>
        <div className="stat"><small>Müşteriden tahsil edilecek</small><CurList obj={recv} /></div>
        <div className="stat"><small>Tedarikçilere borç</small><CurList obj={debt} neg /></div>
      </section>
      <section className="card">
        <h2>Yaklaşan turlar</h2>
        {upcoming.length ? <div className="tbl"><table><thead><tr><th>Tarih</th><th>Müşteri</th><th>Hizmet</th><th>Kişi</th><th>Kalan</th></tr></thead>
          <tbody>{upcoming.map(b => <tr key={b.id}><td>{fmtDate(b.tour_date)}</td><td>{b.customer}</td><td>{b.service}</td><td className="num">{b.guests}</td><td className="num">{money(n(b.sale_total) - n(b.deposit), b.currency)}</td></tr>)}</tbody></table></div>
          : <p className="muted">Yaklaşan tur yok. Rezervasyonlar sekmesinden ilk kaydı ekle.</p>}
      </section>
      <section className="card">
        <h2>Aylık özet</h2>
        {months.length ? <div className="tbl"><table><thead><tr><th>Ay</th><th>Rezervasyon</th><th>Kişi</th><th>Ciro</th><th>Kâr</th></tr></thead>
          <tbody>{months.map(mm => { const rows = active.filter(b => ym(b.tour_date) === mm); return <tr key={mm}><td>{mm.split('-').reverse().join('.')}</td><td className="num">{rows.length}</td><td className="num">{rows.reduce((a, b) => a + n(b.guests), 0)}</td><td><CurList obj={byCur(rows, b => n(b.sale_total))} /></td><td><CurList obj={byCur(rows, b => n(b.sale_total) - n(b.cost_total))} /></td></tr>; })}</tbody></table></div>
          : <p className="muted">Tur tarihi girilmiş rezervasyon olunca burada aylara göre ciro ve kâr görünecek.</p>}
      </section>
    </>
  );
}

const EMPTY_B = () => ({ tour_date: today(), customer: '', phone: '', service: SERVICES[0], guests: 1, currency: 'USD', sale_total: '', deposit: '', payment_method: 'Nakit', supplier_id: '', cost_total: '', supplier_paid: 'Hayır', status: 'Onaylı', note: '' });

function Bookings({ data, sb, run }) {
  const [edit, setEdit] = useState(null); // obje veya null
  const [toCash, setToCash] = useState(true);
  const [q, setQ] = useState(''); const [st, setSt] = useState('aktif'); const [mo, setMo] = useState('');
  const sup = Object.fromEntries(data.suppliers.map(s => [s.id, s.name]));
  const months = [...new Set(data.bookings.map(b => ym(b.tour_date)).filter(Boolean))].sort().reverse();
  const rows = data.bookings.filter(b =>
    (st === 'hepsi' || (st === 'aktif' ? b.status !== 'İptal' : b.status === st)) &&
    (!mo || ym(b.tour_date) === mo) &&
    (!q || (b.customer + ' ' + (b.phone || '') + ' ' + b.service + ' ' + (b.note || '')).toLowerCase().includes(q.toLowerCase())));

  const save = async e => {
    e.preventDefault();
    const b = { ...edit };
    const isNew = !b.id;
    const body = {
      tour_date: b.tour_date || null, customer: b.customer.trim(), phone: b.phone || null, service: b.service, guests: Math.max(1, parseInt(b.guests, 10) || 1),
      currency: b.currency, sale_total: n(b.sale_total), deposit: n(b.deposit), payment_method: b.payment_method || null,
      supplier_id: b.supplier_id ? Number(b.supplier_id) : null, cost_total: n(b.cost_total), supplier_paid: b.supplier_paid, status: b.status, note: b.note || null,
    };
    if (isNew) {
      const { data: ins, error } = await sb.from('bookings').insert(body).select('id').single();
      if (error) return run(Promise.resolve({ error }));
      if (toCash && body.deposit > 0) {
        await sb.from('cash_entries').insert({ entry_date: today(), description: `${body.customer} – ${body.service} kapora`, direction: 'Giriş', currency: body.currency, amount: body.deposit, method: ['Nakit', 'Kart', 'Havale', 'Online'].includes(body.payment_method) ? body.payment_method : 'Nakit', category: 'Rezervasyon', booking_id: ins.id });
      }
      await run(Promise.resolve({}), 'Rezervasyon eklendi');
    } else {
      await run(sb.from('bookings').update(body).eq('id', b.id), 'Kaydedildi');
    }
    setEdit(null);
  };
  const collect = async b => {
    const rest = n(b.sale_total) - n(b.deposit);
    if (rest <= 0) return;
    const ok = await run(sb.from('cash_entries').insert({ entry_date: today(), description: `${b.customer} – ${b.service} kalan ödeme`, direction: 'Giriş', currency: b.currency, amount: rest, method: b.payment_method === 'Kart' ? 'Kart' : b.payment_method === 'Havale' ? 'Havale' : 'Nakit', category: 'Rezervasyon', booking_id: b.id }));
    if (ok) await run(sb.from('bookings').update({ deposit: n(b.sale_total) }).eq('id', b.id), `Kalan ${money(rest, b.currency)} kasaya işlendi`);
  };
  const del = async b => { if (edit && edit._confirm === b.id) { await run(sb.from('bookings').delete().eq('id', b.id), 'Silindi'); setEdit(null); } else setEdit({ ...b, _confirm: b.id }); };

  return (
    <>
      <div className="bar">
        <button className="btn" onClick={() => setEdit(EMPTY_B())}>+ Yeni rezervasyon</button>
        <input className="search" placeholder="Ara: müşteri, telefon, hizmet…" value={q} onChange={e => setQ(e.target.value)} aria-label="Ara" />
        <select value={st} onChange={e => setSt(e.target.value)} aria-label="Durum"><option value="aktif">İptal hariç</option><option value="hepsi">Hepsi</option>{STATUS.map(s => <option key={s}>{s}</option>)}</select>
        <select value={mo} onChange={e => setMo(e.target.value)} aria-label="Ay"><option value="">Tüm aylar</option>{months.map(m => <option key={m} value={m}>{m.split('-').reverse().join('.')}</option>)}</select>
      </div>
      <section className="card">
        <div className="tbl"><table>
          <thead><tr><th>Tur tarihi</th><th>Müşteri</th><th>Hizmet</th><th>Kişi</th><th>Satış</th><th>Tahsil</th><th>Kalan</th><th>Tedarikçi</th><th>Alış</th><th>Kâr</th><th>Durum</th><th></th></tr></thead>
          <tbody>
            {rows.map(b => { const rest = n(b.sale_total) - n(b.deposit); return (
              <tr key={b.id} className={b.status === 'İptal' ? 'cancel' : ''}>
                <td>{fmtDate(b.tour_date)}</td>
                <td><b>{b.customer}</b>{b.phone && <small className="sub">{b.phone}</small>}</td>
                <td>{b.service}</td><td className="num">{b.guests}</td>
                <td className="num">{money(b.sale_total, b.currency)}</td>
                <td className="num">{money(b.deposit, b.currency)}</td>
                <td className={'num' + (rest > 0 ? ' warn' : '')}>{money(rest, b.currency)}</td>
                <td>{sup[b.supplier_id] || <span className="muted">—</span>}</td>
                <td className="num">{money(b.cost_total, b.currency)}</td>
                <td className="num">{money(n(b.sale_total) - n(b.cost_total), b.currency)}</td>
                <td><span className={'pill p-' + b.status}>{b.status}</span></td>
                <td className="acts">
                  {rest > 0 && b.status !== 'İptal' && <button className="link" onClick={() => collect(b)}>Kalanı tahsil et</button>}
                  <button className="link" onClick={() => setEdit({ ...b, supplier_id: b.supplier_id || '' })}>Düzenle</button>
                </td>
              </tr>); })}
            {!rows.length && <tr><td colSpan="12" className="muted center">Kayıt yok. “+ Yeni rezervasyon” ile ilk satışı ekle.</td></tr>}
          </tbody>
        </table></div>
      </section>
      {edit && (
        <div className="drawer" onClick={e => { if (e.target === e.currentTarget) setEdit(null); }}>
          <form className="panel" onSubmit={save}>
            <div className="ph"><h2>{edit.id ? 'Rezervasyonu düzenle' : 'Yeni rezervasyon'}</h2><button type="button" className="link" onClick={() => setEdit(null)}>Kapat</button></div>
            <div className="grid2">
              <label>Tur tarihi<input type="date" value={edit.tour_date || ''} onChange={e => setEdit({ ...edit, tour_date: e.target.value })} /></label>
              <label>Durum<select value={edit.status} onChange={e => setEdit({ ...edit, status: e.target.value })}>{STATUS.map(s => <option key={s}>{s}</option>)}</select></label>
              <label className="full">Müşteri<input required value={edit.customer} onChange={e => setEdit({ ...edit, customer: e.target.value })} /></label>
              <label>Telefon<input type="tel" value={edit.phone || ''} onChange={e => setEdit({ ...edit, phone: e.target.value })} /></label>
              <label>Kişi<input type="number" min="1" value={edit.guests} onChange={e => setEdit({ ...edit, guests: e.target.value })} /></label>
              <label className="full">Hizmet<select value={edit.service} onChange={e => setEdit({ ...edit, service: e.target.value })}>{(SERVICES.includes(edit.service) ? SERVICES : [edit.service, ...SERVICES]).map(s => <option key={s}>{s}</option>)}</select></label>
              <label>Para birimi<select value={edit.currency} onChange={e => setEdit({ ...edit, currency: e.target.value })}>{CUR.map(c => <option key={c}>{c}</option>)}</select></label>
              <label>Ödeme şekli<select value={edit.payment_method || ''} onChange={e => setEdit({ ...edit, payment_method: e.target.value })}>{PAY.map(c => <option key={c}>{c}</option>)}</select></label>
              <label>Satış (toplam)<input inputMode="decimal" value={edit.sale_total} onChange={e => setEdit({ ...edit, sale_total: e.target.value.replace(',', '.') })} /></label>
              <label>Tahsil edilen<input inputMode="decimal" value={edit.deposit} onChange={e => setEdit({ ...edit, deposit: e.target.value.replace(',', '.') })} /></label>
              <label>Tedarikçi<select value={edit.supplier_id} onChange={e => setEdit({ ...edit, supplier_id: e.target.value })}><option value="">—</option>{data.suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
              <label>Alış (toplam)<input inputMode="decimal" value={edit.cost_total} onChange={e => setEdit({ ...edit, cost_total: e.target.value.replace(',', '.') })} /></label>
              <label className="full">Not<input value={edit.note || ''} onChange={e => setEdit({ ...edit, note: e.target.value })} /></label>
            </div>
            <p className="calc">Kalan: <b>{money(n(edit.sale_total) - n(edit.deposit), edit.currency)}</b> · Kâr: <b>{money(n(edit.sale_total) - n(edit.cost_total), edit.currency)}</b></p>
            {!edit.id && <label className="chk"><input type="checkbox" checked={toCash} onChange={e => setToCash(e.target.checked)} /> Tahsil edilen tutarı kasaya da işle</label>}
            <div className="pf">
              <button className="btn">{edit.id ? 'Kaydet' : 'Ekle'}</button>
              {edit.id && <button type="button" className="btn ghost danger" onClick={() => del(edit)}>{edit._confirm === edit.id ? 'Silmeyi onayla' : 'Sil'}</button>}
            </div>
            {!data.suppliers.length && <p className="muted small">Tedarikçi listesi boş — Tedarikçiler sekmesinden ekleyebilirsin.</p>}
          </form>
        </div>
      )}
    </>
  );
}

function Cash({ data, sb, run }) {
  const blank = () => ({ entry_date: today(), description: '', direction: 'Giriş', currency: 'TRY', amount: '', method: 'Nakit', category: 'Diğer' });
  const [f, setF] = useState(blank());
  const [mo, setMo] = useState(ym(today()));
  const [confirm, setConfirm] = useState(null);
  const months = [...new Set(data.cash.map(c => ym(c.entry_date)).concat(ym(today())))].sort().reverse();
  const rows = data.cash.filter(c => !mo || ym(c.entry_date) === mo);
  const bal = byCur(data.cash, c => (c.direction === 'Giriş' ? 1 : -1) * n(c.amount));
  const add = async e => {
    e.preventDefault();
    if (!(n(f.amount) > 0)) return;
    if (await run(sb.from('cash_entries').insert({ ...f, amount: n(f.amount) }), 'Kasaya işlendi')) setF(blank());
  };
  const del = async c => { if (confirm === c.id) { await run(sb.from('cash_entries').delete().eq('id', c.id), 'Silindi'); setConfirm(null); } else setConfirm(c.id); };
  return (
    <>
      <section className="stats">
        {CUR.map(c => <div className="stat" key={c}><small>Bakiye {c}</small><b className={(bal[c] || 0) < 0 ? 'neg' : ''}>{money(bal[c] || 0, c)}</b></div>)}
      </section>
      <form className="card inline" onSubmit={add}>
        <h2>Kasaya ekle</h2>
        <div className="row">
          <input type="date" value={f.entry_date} onChange={e => setF({ ...f, entry_date: e.target.value })} aria-label="Tarih" />
          <select value={f.direction} onChange={e => setF({ ...f, direction: e.target.value })} aria-label="Giriş/Çıkış"><option>Giriş</option><option>Çıkış</option></select>
          <input required className="grow" placeholder="Açıklama (ör. reklam, yakıt…)" value={f.description} onChange={e => setF({ ...f, description: e.target.value })} aria-label="Açıklama" />
          <input required inputMode="decimal" placeholder="Tutar" value={f.amount} onChange={e => setF({ ...f, amount: e.target.value.replace(',', '.') })} aria-label="Tutar" className="amt" />
          <select value={f.currency} onChange={e => setF({ ...f, currency: e.target.value })} aria-label="Para birimi">{CUR.map(c => <option key={c}>{c}</option>)}</select>
          <select value={f.method} onChange={e => setF({ ...f, method: e.target.value })} aria-label="Ödeme şekli">{['Nakit', 'Kart', 'Havale', 'Online'].map(c => <option key={c}>{c}</option>)}</select>
          <select value={f.category} onChange={e => setF({ ...f, category: e.target.value })} aria-label="Kategori">{CATS.map(c => <option key={c}>{c}</option>)}</select>
          <button className="btn">Ekle</button>
        </div>
      </form>
      <section className="card">
        <div className="ph"><h2>Hareketler</h2><select value={mo} onChange={e => setMo(e.target.value)} aria-label="Ay"><option value="">Tüm aylar</option>{months.map(m => <option key={m} value={m}>{m.split('-').reverse().join('.')}</option>)}</select></div>
        <div className="tbl"><table>
          <thead><tr><th>Tarih</th><th>Açıklama</th><th>Kategori</th><th>Şekil</th><th>Giriş</th><th>Çıkış</th><th></th></tr></thead>
          <tbody>
            {rows.map(c => <tr key={c.id}><td>{fmtDate(c.entry_date)}</td><td>{c.description}</td><td>{c.category || '—'}</td><td>{c.method || '—'}</td>
              <td className="num pos">{c.direction === 'Giriş' ? money(c.amount, c.currency) : ''}</td>
              <td className="num neg">{c.direction === 'Çıkış' ? money(c.amount, c.currency) : ''}</td>
              <td className="acts"><button className="link" onClick={() => del(c)}>{confirm === c.id ? 'Onayla' : 'Sil'}</button></td></tr>)}
            {!rows.length && <tr><td colSpan="7" className="muted center">Bu dönemde hareket yok.</td></tr>}
          </tbody>
        </table></div>
      </section>
    </>
  );
}

function Suppliers({ data, sb, run }) {
  const [f, setF] = useState({ name: '', phone: '', note: '' });
  const [pay, setPay] = useState(null); // {s, amount, currency, method}
  const rows = supplierDebts(data);
  const add = async e => { e.preventDefault(); if (await run(sb.from('suppliers').insert({ name: f.name.trim(), phone: f.phone || null, note: f.note || null }), 'Tedarikçi eklendi')) setF({ name: '', phone: '', note: '' }); };
  const doPay = async e => {
    e.preventDefault(); if (!(n(pay.amount) > 0)) return;
    if (await run(sb.from('cash_entries').insert({ entry_date: today(), description: `${pay.s.name} ödemesi`, direction: 'Çıkış', currency: pay.currency, amount: n(pay.amount), method: pay.method, category: 'Tedarikçi ödemesi', supplier_id: pay.s.id }), 'Ödeme kasaya işlendi')) setPay(null);
  };
  const wa = p => { let d = String(p || '').replace(/\D/g, ''); if (d.length === 11 && d[0] === '0') d = '9' + d; if (d.length === 10 && d[0] === '5') d = '90' + d; return d.length >= 10 ? 'https://wa.me/' + d : null; };
  return (
    <>
      <form className="card inline" onSubmit={add}>
        <h2>Tedarikçi ekle</h2>
        <div className="row">
          <input required className="grow" placeholder="Firma / kişi" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} aria-label="Firma" />
          <input type="tel" placeholder="Telefon" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} aria-label="Telefon" />
          <input className="grow" placeholder="Not (hizmetler, IBAN…)" value={f.note} onChange={e => setF({ ...f, note: e.target.value })} aria-label="Not" />
          <button className="btn">Ekle</button>
        </div>
      </form>
      <section className="card">
        <h2>Tedarikçiler ve borçlar</h2>
        <p className="muted small">Borç = iptal edilmemiş rezervasyonlardaki alış toplamı − kasadan bu tedarikçiye yapılan ödemeler.</p>
        <div className="tbl"><table>
          <thead><tr><th>Firma</th><th>Telefon</th><th>Rezervasyon</th><th>Toplam alış</th><th>Ödenen</th><th>Kalan borç</th><th></th></tr></thead>
          <tbody>
            {rows.map(o => <tr key={o.s.id}>
              <td><b>{o.s.name}</b>{o.s.note && <small className="sub">{o.s.note}</small>}</td>
              <td>{o.s.phone ? <>{o.s.phone} {wa(o.s.phone) && <a href={wa(o.s.phone)} target="_blank" rel="noopener">WhatsApp</a>}</> : '—'}</td>
              <td className="num">{data.bookings.filter(b => b.supplier_id === o.s.id && b.status !== 'İptal').length}</td>
              <td><CurList obj={o.cost} /></td><td><CurList obj={o.paid} /></td><td><CurList obj={o.bal} neg /></td>
              <td className="acts"><button className="link" onClick={() => { const c = Object.keys(o.bal).find(k => o.bal[k] > 0) || 'TRY'; setPay({ s: o.s, currency: c, amount: o.bal[c] > 0 ? String(Math.round(o.bal[c] * 100) / 100) : '', method: 'Nakit' }); }}>Ödeme yap</button></td>
            </tr>)}
            {!rows.length && <tr><td colSpan="7" className="muted center">Henüz tedarikçi yok.</td></tr>}
          </tbody>
        </table></div>
      </section>
      {pay && (
        <div className="drawer" onClick={e => { if (e.target === e.currentTarget) setPay(null); }}>
          <form className="panel" onSubmit={doPay}>
            <div className="ph"><h2>{pay.s.name} — ödeme</h2><button type="button" className="link" onClick={() => setPay(null)}>Kapat</button></div>
            <div className="grid2">
              <label>Tutar<input required inputMode="decimal" value={pay.amount} onChange={e => setPay({ ...pay, amount: e.target.value.replace(',', '.') })} /></label>
              <label>Para birimi<select value={pay.currency} onChange={e => setPay({ ...pay, currency: e.target.value })}>{CUR.map(c => <option key={c}>{c}</option>)}</select></label>
              <label>Ödeme şekli<select value={pay.method} onChange={e => setPay({ ...pay, method: e.target.value })}>{['Nakit', 'Kart', 'Havale', 'Online'].map(c => <option key={c}>{c}</option>)}</select></label>
            </div>
            <p className="muted small">Kasaya “Çıkış / Tedarikçi ödemesi” olarak işlenir ve borçtan düşer.</p>
            <div className="pf"><button className="btn">Ödemeyi kaydet</button></div>
          </form>
        </div>
      )}
    </>
  );
}
