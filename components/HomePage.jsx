'use client';
import { useEffect, useMemo, useState } from 'react';
import { REVIEWS } from '../lib/catalog';
import POSTS from '../lib/blog';
import {
  LANGS, DB, GROUPS, ALL, w, lb, D, tagOf, src, unitOf, msgFor, pageUrl, faqOf,
  homeHref, blogHref, waLink, priceNum, WA, CFG,
} from '../lib/site';

const CATS = [
  { i: '🪂', t: 'a', k: 0, tr: 'Yamaç Paraşütü', en: 'Paragliding' },
  { i: '⛵', t: 'a', k: 2, tr: 'Tekne Turu', en: 'Boat Tour' },
  { i: '🤿', t: 'a', k: 1, tr: 'Tüplü Dalış', en: 'Diving' },
  { i: '🚙', t: 'a', k: 5, tr: 'Jeep Safari', en: 'Jeep Safari' },
  { i: '🏍️', t: 'a', k: 6, tr: 'ATV Turu', en: 'ATV Tour' },
  { i: '🛶', t: 'a', k: 3, tr: 'Rafting', en: 'Rafting' },
  { i: '🐎', t: 'a', k: 4, tr: 'At Safari', en: 'Horse Safari' },
  { i: '🦋', t: 'sc', k: 'tours', tr: 'Günlük Turlar', en: 'Day Trips' },
  { i: '🛥️', t: 's', k: 0, tr: 'Yat Kiralama', en: 'Yacht Charter' },
  { i: '🚐', t: 'sc', k: 'transfer', tr: 'Transfer', en: 'Transfer' },
  { i: '🚗', t: 'r', k: 0, tr: 'Araba Kiralama', en: 'Car Rental' },
  { i: '🛵', t: 'r', k: 1, tr: 'Motor Kiralama', en: 'Scooter Rental' },
  { i: '🏡', t: 'sc', k: 'stay', tr: 'Villa & Ev', en: 'Villas & Homes' },
  { i: '💍', t: 's', k: 2, tr: 'Evlilik Teklifi', en: 'Proposal' },
  { i: '🛁', t: 's', k: 3, tr: 'Hamam & Spa', en: 'Hamam & Spa' },
  { i: '🧺', t: 'sc', k: 'builder', tr: 'Paket Oluştur', en: 'Build a Package' },
];

const SECTIONS = [
  { id: 'activities', k: 'a', tr: 'Aktiviteler', en: 'Activities', subTr: 'Karta dokunun, tüm detayları görün', subEn: 'Tap a card to see full details' },
  { id: 'tours', k: 'x', tr: 'Günlük Turlar & Geziler', en: 'Day Trips & Excursions', subTr: 'Kelebekler Vadisi, Saklıkent, Dalyan ve Yunan adaları — otelden alış dahil', subEn: 'Butterfly Valley, Saklıkent, Dalyan and the Greek islands — hotel pickup included' },
  { id: 'special', k: 's', tr: 'Özel Deneyimler', en: 'Special Experiences', subTr: 'Özel yat, profesyonel çekim, evlilik teklifi ve Türk hamamı', subEn: 'Private yacht, professional shoots, marriage proposals and Turkish bath' },
  { id: 'packages', k: 'p', tr: 'Popüler Paket Turlar', en: 'Popular Package Tours', subTr: 'En çok tercih edilenler — tek pakette birden fazla macera', subEn: 'Most preferred — multiple adventures in one package' },
  { id: 'transfer', k: 't', tr: 'Havalimanı Transferi', en: 'Airport Transfer', subTr: "Dalaman Havalimanı'ndan Fethiye, Ölüdeniz ve Marmaris'e özel VIP transfer — fiyatlar araç başıdır", subEn: 'Private VIP transfer from Dalaman Airport to Fethiye, Ölüdeniz and Marmaris — prices are per vehicle' },
  { id: 'rent', k: 'r', tr: 'Araç Kiralama', en: 'Vehicle Rental', subTr: 'Araba, motosiklet / scooter ve ATV kiralama — otelinize teslim, günlük ve haftalık seçenekler', subEn: 'Car, motorbike / scooter and ATV rental — delivered to your hotel, daily and weekly options' },
  { id: 'stay', k: 'h', tr: 'Villa & Günlük Ev Kiralama', en: 'Villa & Holiday Home Rental', subTr: "Ölüdeniz, Hisarönü, Ovacık ve Fethiye'de havuzlu villalar ve günlük kiralık evler", subEn: 'Private-pool villas and holiday homes in Ölüdeniz, Hisarönü, Ovacık and Fethiye' },
];

const fmt = n => n.toLocaleString('tr-TR') + ' ₺';
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
};

function List({ title, cls = '', items }) {
  if (!items || !items.length) return null;
  return <div className={'msec ' + cls}><h4>{title}</h4><ul>{items.map((x, j) => <li key={j}>{x}</li>)}</ul></div>;
}

export default function HomePage({ lang }) {
  const t = lb(lang);
  const tr = lang === 'tr';
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(null); // [type, index]
  const [allCats, setAllCats] = useState(false);
  const [q, setQ] = useState(''); const [sd, setSd] = useState(''); const [sg, setSg] = useState('2');
  const [cdate, setCdate] = useState(''); const [cg, setCg] = useState('2');
  const [today, setToday] = useState('');

  useEffect(() => {
    try {
      const c = JSON.parse(store.get('cart') || '[]').filter(k => { const [ty, i] = k.split(':'); return DB[ty] && DB[ty][+i]; });
      setCart(c);
    } catch (e) {}
    const d = new Date();
    setToday(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10));
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => { document.body.classList.toggle('lock', !!open); }, [open]);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  const inCart = (ty, i) => cart.includes(ty + ':' + i);
  const toggleCart = (ty, i) => {
    const k = ty + ':' + i;
    setCart(c => { const n = c.includes(k) ? c.filter(x => x !== k) : c.concat(k); store.set('cart', JSON.stringify(n)); return n; });
  };
  const clearCart = () => { setCart([]); store.set('cart', '[]'); };

  const calc = useMemo(() => {
    const g = parseInt(cg, 10) || 2;
    let total = 0, ask = 0;
    const items = cart.map(k => { const [ty, i] = k.split(':'); return DB[ty][+i]; });
    items.forEach(it => { if (it.p === null) { ask++; return; } total += it.pv ? priceNum(it.p) : priceNum(it.p) * g; });
    return { items, total, ask, g };
  }, [cart, cg]);

  const setLang = l => {
    try { document.cookie = 'lang=' + l + ';path=/;max-age=31536000;samesite=lax'; } catch (e) {}
    window.location.href = homeHref(l);
  };
  const goCat = c => {
    if (c.t === 'sc') { document.getElementById(c.k)?.scrollIntoView({ behavior: 'smooth' }); return; }
    setOpen([c.t, c.k]);
  };
  const openWa = msg => window.open(WA + encodeURIComponent(msg), '_blank', 'noopener');
  const doSearch = e => {
    e.preventDefault();
    let name = tr ? 'aktiviteleriniz' : 'your activities';
    if (q) { const [ty, i] = q.split(':'); name = DB[ty][+i][tr ? 'tr' : 'en'].n; }
    const dt = sd ? sd.split('-').reverse().join('.') : (tr ? 'esnek tarih' : 'flexible date');
    openWa(tr ? `Merhaba, ${name} için müsaitlik sormak istiyorum.\n📅 Tarih: ${dt}\n👥 Kişi: ${sg}` : `Hello, I'd like to check availability for ${name}.\n📅 Date: ${dt}\n👥 Guests: ${sg}`);
  };
  const sendCart = () => {
    if (!calc.items.length) { document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' }); return; }
    const dt = cdate ? cdate.split('-').reverse().join('.') : (tr ? 'esnek tarih' : 'flexible date');
    const lines = calc.items.map((it, j) => `${j + 1}. ${tr ? it.tr.n : it.en.n}${it.p ? ` (${it.p}${it.pv ? '' : ' x' + calc.g})` : ''}`).join('\n');
    openWa(tr
      ? `Merhaba, kendi paketimi oluşturdum:\n${lines}\n📅 Tarih: ${dt}\n👥 Kişi: ${calc.g}\n💰 Tahmini toplam: ${fmt(calc.total)}${calc.ask ? ` + ${calc.ask} hizmet fiyatı` : ''}\nMüsaitlik ve fiyat teyidi rica ederim.`
      : `Hello, I built my own package:\n${lines}\n📅 Date: ${dt}\n👥 Guests: ${calc.g}\n💰 Estimated total: ${fmt(calc.total)}${calc.ask ? ` + ${calc.ask} item(s) to be priced` : ''}\nPlease confirm availability and price.`);
  };

  const guestOpts = Array.from({ length: 10 }, (_, n) => n + 1).map(n => <option key={n} value={n}>{n} {w(lang, 'Kişi', n > 1 ? 'Guests' : 'Guest')}</option>)
    .concat(<option key="10+" value="10+">10+ {w(lang, 'Kişi', 'Guests')}</option>);

  const Card = ({ item, i, ty }) => {
    const d = D(item, lang), isPkg = ty === 'p', tag = isPkg ? t.pkg : tagOf(item, lang), on = inCart(ty, i), href = pageUrl(item, lang);
    return (
      <div className="card" onClick={() => setOpen([ty, i])}>
        <div className="im">
          <img loading="lazy" src={src(item.img)} alt={d.n} />
          {tag && <span className={'badge' + (isPkg ? ' pkg' : '')}>{tag}</span>}
          <button type="button" className={'addb' + (on ? ' on' : '')} aria-label={t.add} title={t.add} onClick={e => { e.stopPropagation(); toggleCart(ty, i); }}>{on ? '✓' : '+'}</button>
        </div>
        <div className="bd">
          <h3><a href={href} onClick={e => { e.preventDefault(); }} style={{ color: 'inherit', textDecoration: 'none' }}>{d.n}</a></h3>
          <p className="loc">📍 {d.loc}</p>
          <div className="feats">{d.f.map((x, j) => <span key={j}>{x}</span>)}</div>
          <div className="prow">
            <div className="price"><small>{unitOf(item, lang)}</small><b>{item.p === null ? t.ask : item.p}</b>{item.old && <span className="old">{item.old}</span>}</div>
            <a className="bk" href={WA + msgFor(item, lang)} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}>{item.p === null ? t.askB : w(lang, 'Rezervasyon', 'Book Now')}</a>
          </div>
          <span className="more">{t.det} →</span>
        </div>
      </div>
    );
  };

  const Modal = () => {
    if (!open) return null;
    const [ty, i] = open, item = DB[ty][i], d = D(item, lang), unit = unitOf(item, lang), fq = faqOf(item, lang), pu = pageUrl(item, lang);
    return (
      <div className="modal open" onClick={e => { if (e.target === e.currentTarget) setOpen(null); }}>
        <div className="sheet">
          <button className="mx" onClick={() => setOpen(null)} aria-label="Kapat">✕</button>
          <div className="mhero"><img src={src(item.img)} alt={d.n} /></div>
          <div className="mbody">
            <h3>{d.n}</h3><p className="mmeta">📍 {d.loc}</p>
            {item.p === null
              ? <div className="mprice"><b>{t.ask}</b><span style={{ color: 'var(--gray)', fontSize: '.85rem' }}>· {unit}</span></div>
              : <div className="mprice"><b>{item.p}</b>{item.old && <span className="old">{item.old}</span>}<span style={{ color: 'var(--gray)', fontSize: '.85rem' }}>/ {unit}</span></div>}
            {item.dep && <p className="mdep">💳 {t.dep}: <b>{item.dep}</b> — {t.depNote}</p>}
            <div className="mlinks">
              <button type="button" className="madd" onClick={() => toggleCart(ty, i)}>{inCart(ty, i) ? t.added : '➕ ' + t.add}</button>
              {pu && <a className="mpage" href={pu}>{t.page} ↗</a>}
              {item.url && <a className="mpage" href={item.url} target="_blank" rel="noopener">{t.web} ↗</a>}
            </div>
            <div className="msec"><h4>{t.about}</h4><p>{d.desc}</p></div>
            <List title={t.inc} cls="inc" items={d.inc} />
            <List title={t.exc} cls="exc" items={d.exc} />
            <List title={t.info} items={d.info} />
            {d.prog && d.prog.length > 0 && <div className="msec"><h4>{t.prog}</h4>{d.prog.map((s, j) => <div className="step" key={j}><span className="n">{j + 1}</span><div><b>{s[0]}</b><p>{s[1]}</p></div></div>)}</div>}
            <List title={item.pv ? t.reg2 : t.reg} items={d.reg} />
            <List title={t.bring} items={d.bring} />
            <List title={t.ban} cls="exc" items={d.ban} />
            <List title={t.extra} items={d.extra} />
            {fq && <div className="msec"><h4>{t.faq}</h4>{fq.map((x, j) => <details className="faqd" key={j}><summary>{x[0]}</summary><p>{x[1]}</p></details>)}</div>}
            <div className="mcta"><a href={WA + msgFor(item, lang)} target="_blank" rel="noopener">{item.p === null ? t.quote : t.book + ' — ' + item.p}</a></div>
          </div>
        </div>
      </div>
    );
  };

  const navLinks = [['#activities', 'Aktiviteler', 'Activities'], ['#transfer', 'Transfer', 'Transfer'], ['#tours', 'Günlük Turlar', 'Day Trips'], ['#rent', 'Araç Kiralama', 'Rentals'], ['#stay', 'Villa & Ev', 'Villas & Homes']];

  return (
    <div className="hp">
      <header>
        <div className="hwrap">
          <a className="logo" href={homeHref(lang)}><span className="mk">O</span><span><b>Oludeniz<i>Tours</i></b><small>{w(lang, 'Ölüdeniz · Fethiye · Marmaris', 'Ölüdeniz · Fethiye · Marmaris')}</small></span></a>
          <nav className="nav">
            {navLinks.map(([h, a, b]) => <a key={h} href={h}>{w(lang, a, b)}</a>)}
            <a href={blogHref(lang)}>Blog</a>
            <a href="/iletisim">{w(lang, 'İletişim', 'Contact')}</a>
          </nav>
          <div className="hact">
            <a className="tel" href="tel:+905364616674">📞 0536 461 66 74</a>
            <select className="lang-btn" aria-label="Language" value={lang} onChange={e => setLang(e.target.value)}>
              {LANGS.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
            </select>
            <a className="hwa" href={waLink(tr ? 'Merhaba, rezervasyon yapmak istiyorum' : 'Hello, I would like to make a booking')} target="_blank" rel="noopener">{w(lang, 'Rezervasyon', 'Book Now')}</a>
          </div>
        </div>
      </header>

      <div className="hero">
        <img src="https://skywalkersparagliding.com/api/images/2aedfafb833d2f25.webp" alt={w(lang, 'Ölüdeniz Yamaç Paraşütü', 'Paragliding')} fetchPriority="high" />
        <div className="hrate"><b>5.0</b><div className="st">★★★★★</div><small>{w(lang, '500+ Google yorumu', '500+ Google reviews')}</small></div>
        <div className="hero-c">
          <div className="eyebrow">🪂 <span>{w(lang, "Ölüdeniz'in dijital kapısı", 'Your digital gateway to Ölüdeniz')}</span></div>
          <h1><span>{w(lang, "Ölüdeniz'i", 'Discover')}</span> <em>{w(lang, 'Keşfet', 'Ölüdeniz')}</em></h1>
          <p className="lead">{w(lang, 'Yamaç paraşütü, tekne turları, günlük geziler, araç ve villa kiralama, havalimanı transferi — hepsi tek yerde.', 'Paragliding, boat tours, day trips, car and villa rentals, airport transfers — all in one place.')}</p>
          <div className="checks"><span>{w(lang, 'Yerel uzmanlık', 'Local expertise')}</span><span>{w(lang, '7/24 WhatsApp destek', '24/7 WhatsApp support')}</span><span>{w(lang, 'Güvenli rezervasyon', 'Secure booking')}</span></div>
          <form className="search" onSubmit={doSearch}>
            <div className="sf wide"><label htmlFor="sq">{w(lang, 'Ne arıyorsunuz?', 'What are you looking for?')}</label>
              <select id="sq" value={q} onChange={e => setQ(e.target.value)}>
                <option value="">{w(lang, 'Tüm aktiviteler', 'All activities')}</option>
                {GROUPS.map(g => <optgroup key={g.k} label={w(lang, g.tr, g.en)}>{DB[g.k].map((x, i) => <option key={i} value={g.k + ':' + i}>{D(x, lang).n}</option>)}</optgroup>)}
              </select></div>
            <div className="sf"><label htmlFor="sd">{w(lang, 'Tarih', 'Date')}</label><input type="date" id="sd" min={today || undefined} value={sd} onChange={e => setSd(e.target.value)} /></div>
            <div className="sf"><label htmlFor="sg">{w(lang, 'Kişi', 'Guests')}</label><select id="sg" value={sg} onChange={e => setSg(e.target.value)}>{guestOpts}</select></div>
            <button className="sbtn" type="submit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg><span>{w(lang, 'Müsaitlik Sor', 'Check Availability')}</span></button>
          </form>
          <div className={'cats' + (allCats ? ' all' : '')}>
            {CATS.map((c, j) => <button key={j} type="button" className="cat" onClick={() => goCat(c)}><i>{c.i}</i>{w(lang, c.tr, c.en)}</button>)}
          </div>
          {!allCats && <button type="button" className="catmore" onClick={() => setAllCats(true)}>{w(lang, 'Tüm kategoriler ▾', 'All categories ▾')}</button>}
        </div>
      </div>

      <div className="trust">
        <div><b>25+</b><small>{w(lang, 'Hizmet', 'Services')}</small></div>
        <div><b>7/24</b><small>{w(lang, 'Destek', 'Support')}</small></div>
        <div><b>10K+</b><small>{w(lang, 'Mutlu Müşteri', 'Happy Guests')}</small></div>
        <div><b>5.0 ★</b><small>{w(lang, 'Google Puanı', 'Google Rating')}</small></div>
      </div>

      {SECTIONS.map(s => (
        <section id={s.id} key={s.id}>
          <h2>{w(lang, s.tr, s.en)}</h2>
          <p className="sub">{w(lang, s.subTr, s.subEn)}</p>
          <div className="grid">{DB[s.k].map((item, i) => <Card key={i} item={item} i={i} ty={s.k} />)}</div>
        </section>
      ))}

      <section id="builder">
        <h2>{w(lang, 'Kendi Paketini Oluştur', 'Build Your Own Package')}</h2>
        <p className="sub">{w(lang, "İstediğiniz aktiviteleri seçin, tahmini toplamı görün ve tek mesajla WhatsApp'tan gönderin", 'Pick the activities you want, see the estimated total and send it all in one WhatsApp message')}</p>
        <div className="bwrap">
          <div>
            {GROUPS.map(g => (
              <div className="bgrp" key={g.k}><h4>{w(lang, g.tr, g.en)}</h4>
                <div className="chips">{DB[g.k].map((x, i) => {
                  const on = inCart(g.k, i);
                  return <button key={i} type="button" className={'chip' + (on ? ' on' : '')} onClick={() => toggleCart(g.k, i)}>{on ? '✓ ' : ''}{D(x, lang).n}{x.p && <> <small>{x.p}</small></>}</button>;
                })}</div>
              </div>
            ))}
          </div>
          <div className="bpanel">
            <div className="bfields">
              <label><span>{w(lang, 'Tarih', 'Date')}</span><input type="date" min={today || undefined} value={cdate} onChange={e => setCdate(e.target.value)} /></label>
              <label><span>{w(lang, 'Kişi', 'Guests')}</span><select value={cg} onChange={e => setCg(e.target.value)}>{guestOpts}</select></label>
            </div>
            <div>
              {!calc.items.length
                ? <p className="bempty">{w(lang, 'Henüz bir şey seçmediniz — yukarıdan aktivite seçin.', 'Nothing selected yet — pick activities above.')}</p>
                : <>
                  <ul className="blist">{calc.items.map((it, j) => <li key={j}><span>{D(it, lang).n}</span><b>{it.p === null ? t.ask : (it.pv ? it.p : it.p + ' × ' + calc.g)}</b></li>)}</ul>
                  <div className="btotal"><span>{w(lang, 'Tahmini toplam', 'Estimated total')}</span><b>{fmt(calc.total)}</b></div>
                  {calc.ask > 0 && <p className="bnote">+ {calc.ask} {w(lang, "hizmetin fiyatı WhatsApp'ta iletilecek", 'service(s) priced on WhatsApp')}</p>}
                  {calc.items.length >= 2 && <p className="bnote">🎁 {w(lang, 'Çoklu rezervasyonlarda size özel indirim için yazın.', 'Ask us about a discount for multiple bookings.')}</p>}
                </>}
            </div>
            <button type="button" className="bsend" onClick={sendCart}>{w(lang, "WhatsApp'tan Paketi Gönder", 'Send Package on WhatsApp')}</button>
            <button type="button" className="bclear" onClick={clearCart}>{w(lang, 'Temizle', 'Clear')}</button>
          </div>
        </div>
      </section>

      <section>
        <h2>{w(lang, 'Neden Bizi Seçmelisiniz?', 'Why Choose Us?')}</h2>
        <p className="sub"></p>
        <div className="why">
          {[['🪂', 'Deneyim', 'Experience', 'Yılların deneyimi ile profesyonel hizmet', 'Professional service with years of experience'],
            ['🛡️', 'Güvenlik', 'Safety', 'Güvenliğiniz bizim önceliğimiz', 'Your safety is our priority'],
            ['💰', 'En İyi Fiyat', 'Best Price', 'Kaliteli hizmet, uygun fiyat', 'Quality service, fair price'],
            ['📞', '7/24 Destek', '24/7 Support', 'Her zaman yanınızdayız', 'We are always with you']].map(x =>
            <div key={x[1]}><div className="ic">{x[0]}</div><b>{w(lang, x[1], x[2])}</b><p>{w(lang, x[3], x[4])}</p></div>)}
        </div>
      </section>

      <section id="reviews">
        <h2>{w(lang, 'Misafir Yorumları', 'Guest Reviews')}</h2>
        {REVIEWS.length > 0 && <div className="revlist">{REVIEWS.map((r, j) => <div className="rcard" key={j}><div className="stars">{'★'.repeat(r.stars || 5)}</div><p>“{r.text}”</p><b>{r.name}</b>{r.date && <small>{r.date}</small>}</div>)}</div>}
        <div className="rev">
          <div className="stars">★★★★★</div>
          <b>5.0/5</b>
          <p>{w(lang, '500+ Google yorumu üzerinden — Müşterilerimiz bizi öneriyor', 'Based on 500+ Google reviews — Our guests recommend us')}</p>
          {CFG.googleReviews && <a className="revlink" href={CFG.googleReviews} target="_blank" rel="noopener">{w(lang, "Google'da tüm yorumları okuyun →", 'Read all reviews on Google →')}</a>}
        </div>
      </section>

      {CFG.instagram && (
        <section id="insta">
          <div className="igbox">
            <div className="igic">📸</div>
            <h2>{w(lang, "Instagram'da Bizi Takip Edin", 'Follow Us on Instagram')}</h2>
            <p><b>@{CFG.instagram}</b> — <span>{w(lang, 'her gün yeni uçuş videoları, tekne turları ve Ölüdeniz manzaraları', 'new flight videos, boat trips and Ölüdeniz views every day')}</span></p>
            <a className="igbtn" href={'https://instagram.com/' + CFG.instagram} target="_blank" rel="noopener">{w(lang, "Instagram'ı Aç", 'Open Instagram')}</a>
          </div>
        </section>
      )}

      <section id="blogteaser">
        <h2>{w(lang, 'Ölüdeniz Rehberi', 'Ölüdeniz Guide')}</h2>
        <p className="sub">{w(lang, 'Tatilinizi planlarken işinize yarayacak yazılar', 'Helpful reads while planning your holiday')}</p>
        <div className="blogs">
          {POSTS.map(po => { const pl = tr ? po.tr : po.en; return <a key={pl.slug} href={(tr ? '/blog/' : '/en/blog/') + pl.slug}><b>{w(lang, po.tr.title, po.en.title)}</b><span>{w(lang, po.tr.desc, po.en.desc)}</span></a>; })}
        </div>
      </section>

      <section id="contact">
        <div className="contact">
          <h2>{w(lang, 'Yardıma mı İhtiyacınız Var?', 'Need Help?')}</h2>
          <p>{w(lang, 'Ekibimiz rezervasyonunuzla ilgili yardımcı olmak için burada. Bize her zaman ulaşabilirsiniz!', 'Our team is here to help with your booking. You can reach us anytime!')}</p>
          <div className="cbtns">
            <a className="call" href="tel:+905364616674">{w(lang, '📞 Bizi Arayın', '📞 Call Us')}</a>
            <a className="wa2" href={waLink(tr ? 'Merhaba, bilgi almak istiyorum' : 'Hello, I would like some information')} target="_blank" rel="noopener">{w(lang, 'WhatsApp Destek', 'WhatsApp Support')}</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="flinks">
          <a href="/iletisim">{w(lang, 'İletişim', 'Contact')}</a>
          <a href="/iptal-iade">{w(lang, 'İptal & İade', 'Cancellation & Refund')}</a>
          <a href="/gizlilik">{w(lang, 'Gizlilik', 'Privacy')}</a>
          <a href="/kullanim-sartlari">{w(lang, 'Kullanım Şartları', 'Terms of Use')}</a>
        </div>
        <div className="seol">
          {GROUPS.map(g => (
            <div key={g.k} style={{ display: 'contents' }}>
              <h4>{g.tr} · {g.en}</h4>
              {ALL.filter(x => x.g.k === g.k).map(({ item }) => <span key={item.tr.n} style={{ display: 'contents' }}><a href={pageUrl(item, 'tr')}>{item.tr.n}</a><a href={pageUrl(item, 'en')} hrefLang="en">{item.en.n} (EN)</a></span>)}
            </div>
          ))}
        </div>
        <p>© 2026 Oludeniz Tours — Fethiye / Ölüdeniz</p>
      </footer>

      <div className={'cartbar' + (calc.items.length ? ' show' : '')} onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })}>
        <span>🧺 <b>{calc.items.length}</b> <span>{w(lang, 'seçim', 'selected')}</span></span>
        <b>{calc.total ? fmt(calc.total) + (calc.ask ? ' +' : '') : t.ask}</b>
        <button type="button" onClick={e => { e.stopPropagation(); sendCart(); }}>{w(lang, 'Gönder', 'Send')}</button>
      </div>

      <div className="bottombar">
        <a className="bb-call" href="tel:+905364616674">{w(lang, 'Ara', 'Call')}</a>
        <a className="bb-wa" href={waLink(tr ? 'Merhaba, rezervasyon yapmak istiyorum' : 'Hello, I would like to make a booking')} target="_blank" rel="noopener">{w(lang, 'WhatsApp Rezervasyon', 'Book on WhatsApp')}</a>
      </div>

      <Modal />
    </div>
  );
}
