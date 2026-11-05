// Oludeniz Tours — sayfa mantığı. Veri: data.js, çeviriler: i18n.js
const LANGS = ['tr','en','ru','de','pl'];
const DB = {a:A, p:P, t:T, r:R, h:H, x:X, s:S};
const store = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
};

function pickLang(){
  const q = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(q)) return q;
  const s = store.get('lang');
  if (LANGS.includes(s)) return s;
  const n = (navigator.language || 'tr').slice(0,2).toLowerCase();
  return LANGS.includes(n) ? n : 'en';
}
let lang = pickLang();

// Metin yardımcıları
function w(tr, en){ return lang==='tr' ? tr : lang==='en' ? en : ((UI[en] && UI[en][lang]) || en); }
function lb(){ return L[lang] || L.en; }
function D(item){
  if (lang==='tr' || lang==='en') return item[lang];
  return Object.assign({}, item.en, (TX[item.en.n] || {})[lang]);
}
function tagOf(item){ return item.tag ? (item.tag[lang] || (UI[item.tag.en] && UI[item.tag.en][lang]) || item.tag.en) : ''; }
function src(x){ return /^https?:/.test(x) ? x : IMG + x; }
function unitOf(item){ const t = lb(); return item.u ? t[item.u] : (item.pv ? t.pv : t.pp); }
function msgFor(item){
  const nm = lang==='tr' ? item.tr.n : item.en.n;
  return encodeURIComponent(item.p===null
    ? (lang==='tr' ? 'Merhaba, ' + nm + ' için fiyat ve müsaitlik öğrenmek istiyorum.' : 'Hello, I would like a price and availability for ' + nm + '.')
    : (lang==='tr' ? 'Merhaba, ' + nm + ' rezervasyonu yapmak istiyorum.' : 'Hello, I would like to book ' + nm + '.'));
}
function pageUrl(item){
  const s = SLUG[item.tr.n];
  if (!s) return '';
  return lang==='tr' ? '/' + s[0] : '/en/' + s[1];
}

// Kartlar
function card(item, i, ty){
  const d = D(item), t = lb();
  const isPkg = ty==='p';
  const tag = isPkg ? t.pkg : tagOf(item);
  const inC = inCart(ty, i);
  return `<div class="card" onclick="openM('${ty}',${i})">
    <div class="im"><img loading="lazy" src="${src(item.img)}" alt="${d.n}">${tag?`<span class="badge${isPkg?' pkg':''}">${tag}</span>`:''}
      <button type="button" class="addb${inC?' on':''}" aria-label="${t.add}" title="${t.add}" onclick="event.stopPropagation();toggleCart('${ty}',${i})">${inC?'✓':'+'}</button></div>
    <div class="bd">
      <h3>${d.n}</h3>
      <p class="loc">📍 ${d.loc}</p>
      <div class="feats">${d.f.map(x=>`<span>${x}</span>`).join('')}</div>
      <div class="prow">
        <div class="price"><small>${unitOf(item)}</small><b>${item.p===null?t.ask:item.p}</b>${item.old?`<span class="old">${item.old}</span>`:''}</div>
        <a class="bk" href="${WA+msgFor(item)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${item.p===null?t.askB:w('Rezervasyon','Book Now')}</a>
      </div>
      <span class="more">${t.det} →</span>
    </div>
  </div>`;
}

function sec(title, cls, items){
  if(!items || !items.length) return '';
  return `<div class="msec ${cls}"><h4>${title}</h4><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
}

let cur = null;
function openM(type, i){
  const item = DB[type][i];
  cur = [type, i];
  const d = D(item), t = lb(), unit = unitOf(item);
  let h = `<div class="mhero"><img src="${src(item.img)}" alt="${d.n}"></div><div class="mbody">`;
  h += `<h3>${d.n}</h3><p class="mmeta">📍 ${d.loc}</p>`;
  h += item.p===null
    ? `<div class="mprice"><b>${t.ask}</b><span style="color:var(--gray);font-size:.85rem">· ${unit}</span></div>`
    : `<div class="mprice"><b>${item.p}</b>${item.old?`<span class="old">${item.old}</span>`:''}<span style="color:var(--gray);font-size:.85rem">/ ${unit}</span></div>`;
  if(item.dep) h += `<p class="mdep">💳 ${t.dep}: <b>${item.dep}</b> — ${t.depNote}</p>`;
  h += `<div class="mlinks"><button type="button" class="madd" id="maddBtn" onclick="toggleCart('${type}',${i})">${inCart(type,i)?t.added:'➕ '+t.add}</button>`;
  const pu = pageUrl(item);
  if (pu) h += `<a class="mpage" href="${pu}">${t.page} ↗</a>`;
  if (item.url) h += `<a class="mpage" href="${item.url}" target="_blank" rel="noopener">${t.web} ↗</a>`;
  h += `</div>`;
  h += `<div class="msec"><h4>${t.about}</h4><p>${d.desc}</p></div>`;
  h += sec(t.inc, 'inc', d.inc);
  h += sec(t.exc, 'exc', d.exc);
  h += sec(t.info, '', d.info);
  if(d.prog && d.prog.length){
    h += `<div class="msec"><h4>${t.prog}</h4>${d.prog.map((s,j)=>`<div class="step"><span class="n">${j+1}</span><div><b>${s[0]}</b><p>${s[1]}</p></div></div>`).join('')}</div>`;
  }
  h += sec(item.pv?t.reg2:t.reg, '', d.reg);
  h += sec(t.bring, '', d.bring);
  h += sec(t.ban, 'exc', d.ban);
  h += sec(t.extra, '', d.extra);
  const F = FAQ[item.tr.n];
  const fq = F ? (F[lang] || F.en) : null;
  if(fq) h += `<div class="msec"><h4>${t.faq}</h4>${fq.map(x=>`<details class="faqd"><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join('')}</div>`;
  h += `<div class="mcta"><a href="${WA+msgFor(item)}" target="_blank" rel="noopener">${item.p===null?t.quote:t.book+' — '+item.p}</a></div></div>`;
  showSheet(h);
}
function showSheet(h){
  document.getElementById('msheet').innerHTML = h;
  const m = document.getElementById('modal');
  m.classList.add('open');
  m.querySelector('.sheet').scrollTop = 0;
  document.body.classList.add('lock');
}
function closeM(){
  cur = null;
  document.getElementById('modal').classList.remove('open');
  document.body.classList.remove('lock');
}

// Kategoriler (t:'sc' = bölüme kaydır)
const CATS = [
 {i:'🪂',t:'a',k:0,tr:'Yamaç Paraşütü',en:'Paragliding'},
 {i:'⛵',t:'a',k:2,tr:'Tekne Turu',en:'Boat Tour'},
 {i:'🤿',t:'a',k:1,tr:'Tüplü Dalış',en:'Diving'},
 {i:'🚙',t:'a',k:5,tr:'Jeep Safari',en:'Jeep Safari'},
 {i:'🏍️',t:'a',k:6,tr:'ATV Turu',en:'ATV Tour'},
 {i:'🛶',t:'a',k:3,tr:'Rafting',en:'Rafting'},
 {i:'🐎',t:'a',k:4,tr:'At Safari',en:'Horse Safari'},
 {i:'🦋',t:'sc',k:'tours',tr:'Günlük Turlar',en:'Day Trips'},
 {i:'🛥️',t:'s',k:0,tr:'Yat Kiralama',en:'Yacht Charter'},
 {i:'🚐',t:'sc',k:'transfer',tr:'Transfer',en:'Transfer'},
 {i:'🚗',t:'r',k:0,tr:'Araba Kiralama',en:'Car Rental'},
 {i:'🛵',t:'r',k:1,tr:'Motor Kiralama',en:'Scooter Rental'},
 {i:'🏡',t:'sc',k:'stay',tr:'Villa & Ev',en:'Villas & Homes'},
 {i:'💍',t:'s',k:2,tr:'Evlilik Teklifi',en:'Proposal'},
 {i:'🛁',t:'s',k:3,tr:'Hamam & Spa',en:'Hamam & Spa'},
 {i:'🧺',t:'sc',k:'builder',tr:'Paket Oluştur',en:'Build a Package'}
];
function goCat(j){
  const c = CATS[j];
  if(c.t==='sc'){ document.getElementById(c.k).scrollIntoView({behavior:'smooth'}); return; }
  openM(c.t, c.k);
}

const GROUPS = [
  ['a','Aktiviteler','Activities'],
  ['x','Günlük Turlar','Day Trips'],
  ['s','Özel Deneyimler','Special Experiences'],
  ['p','Paket Turlar','Packages'],
  ['t','Havalimanı Transferi','Airport Transfer'],
  ['r','Araç Kiralama','Vehicle Rental'],
  ['h','Villa & Günlük Ev','Villas & Holiday Homes']
];

function guestOpts(sel){
  let g = '';
  for(let n=1;n<=10;n++) g += `<option value="${n}">${n} ${w('Kişi', n>1?'Guests':'Guest')}</option>`;
  g += `<option value="10+">10+ ${w('Kişi','Guests')}</option>`;
  sel.innerHTML = g;
}

function buildSearch(){
  const sq = document.getElementById('sq'), sg = document.getElementById('sg'), sd = document.getElementById('sd');
  const qv = sq.value, gv = sg.value || '2';
  const grp = (lbl, arr, ty) => `<optgroup label="${lbl}">${arr.map((x,i)=>`<option value="${ty}:${i}">${D(x).n}</option>`).join('')}</optgroup>`;
  sq.innerHTML = `<option value="">${w('Tüm aktiviteler','All activities')}</option>` + GROUPS.map(g=>grp(w(g[1],g[2]), DB[g[0]], g[0])).join('');
  sq.value = qv;
  guestOpts(sg); sg.value = gv;
  const today = new Date(); const iso = new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  if(!sd.min) sd.min = iso;
  const cd = document.getElementById('cdate'); if(cd && !cd.min) cd.min = iso;
  document.getElementById('cats').innerHTML = CATS.map((c,j)=>`<button type="button" class="cat" onclick="goCat(${j})"><i>${c.i}</i>${w(c.tr,c.en)}</button>`).join('');
}

function doSearch(e){
  e.preventDefault();
  const q = document.getElementById('sq').value, d = document.getElementById('sd').value, g = document.getElementById('sg').value;
  const tr = lang==='tr';
  let name = tr ? 'aktiviteleriniz' : 'your activities';
  if(q){ const [ty, i] = q.split(':'); name = DB[ty][+i][tr?'tr':'en'].n; }
  const dt = d ? d.split('-').reverse().join('.') : (tr ? 'esnek tarih' : 'flexible date');
  const msg = tr
    ? `Merhaba, ${name} için müsaitlik sormak istiyorum.\n📅 Tarih: ${dt}\n👥 Kişi: ${g}`
    : `Hello, I'd like to check availability for ${name}.\n📅 Date: ${dt}\n👥 Guests: ${g}`;
  window.open(WA + encodeURIComponent(msg), '_blank', 'noopener');
  return false;
}

// ---- Paket oluşturucu / sepet ----
let cart = [];
try { cart = JSON.parse(store.get('cart') || '[]').filter(k => { const [t,i] = k.split(':'); return DB[t] && DB[t][+i]; }); } catch(e){ cart = []; }
function inCart(t,i){ return cart.includes(t+':'+i); }
function saveCart(){ store.set('cart', JSON.stringify(cart)); }
function toggleCart(t,i){
  const k = t+':'+i;
  cart = inCart(t,i) ? cart.filter(x=>x!==k) : cart.concat(k);
  saveCart();
  renderCards();
  renderBuilder();
  if (cur) { const b = document.getElementById('maddBtn'); if (b) b.textContent = inCart(cur[0],cur[1]) ? lb().added : '➕ '+lb().add; }
}
function priceNum(p){ return p ? parseInt(String(p).replace(/\D/g,''),10) || 0 : 0; }
function fmt(n){ return n.toLocaleString('tr-TR') + ' ₺'; }
function cartCalc(){
  const g = parseInt(document.getElementById('cguests')?.value || '2', 10) || 2;
  let total = 0, ask = 0;
  const items = cart.map(k => { const [t,i] = k.split(':'); return DB[t][+i]; });
  items.forEach(it => {
    if (it.p===null) { ask++; return; }
    total += it.pv ? priceNum(it.p) : priceNum(it.p) * g;
  });
  return {items, total, ask, g};
}
function renderBuilder(){
  const box = document.getElementById('bchips');
  if (!box) return;
  box.innerHTML = GROUPS.map(gr => `<div class="bgrp"><h4>${w(gr[1],gr[2])}</h4><div class="chips">${DB[gr[0]].map((x,i)=>`<button type="button" class="chip${inCart(gr[0],i)?' on':''}" onclick="toggleCart('${gr[0]}',${i})">${inCart(gr[0],i)?'✓ ':''}${D(x).n}${x.p?` <small>${x.p}</small>`:''}</button>`).join('')}</div></div>`).join('');
  const c = cartCalc();
  const sum = document.getElementById('bsum');
  if (!c.items.length) {
    sum.innerHTML = `<p class="bempty">${w('Henüz bir şey seçmediniz — yukarıdan aktivite seçin.','Nothing selected yet — pick activities above.')}</p>`;
  } else {
    sum.innerHTML = `<ul class="blist">${c.items.map(it=>`<li><span>${D(it).n}</span><b>${it.p===null?lb().ask:(it.pv?it.p:it.p+' × '+c.g)}</b></li>`).join('')}</ul>
      <div class="btotal"><span>${w('Tahmini toplam','Estimated total')}</span><b>${fmt(c.total)}</b></div>
      ${c.ask?`<p class="bnote">+ ${c.ask} ${w('hizmetin fiyatı WhatsApp\'ta iletilecek','service(s) priced on WhatsApp')}</p>`:''}
      ${c.items.length>=2?`<p class="bnote">🎁 ${w('Çoklu rezervasyonlarda size özel indirim için yazın.','Ask us about a discount for multiple bookings.')}</p>`:''}`;
  }
  const bar = document.getElementById('cartbar');
  bar.classList.toggle('show', c.items.length>0);
  document.getElementById('cbcount').textContent = c.items.length;
  document.getElementById('cbtotal').textContent = c.total ? fmt(c.total) + (c.ask?' +':'') : lb().ask;
}
function sendCart(){
  const c = cartCalc();
  if (!c.items.length) { document.getElementById('builder').scrollIntoView({behavior:'smooth'}); return; }
  const tr = lang==='tr';
  const d = document.getElementById('cdate').value;
  const dt = d ? d.split('-').reverse().join('.') : (tr ? 'esnek tarih' : 'flexible date');
  const lines = c.items.map((it,j)=>`${j+1}. ${tr?it.tr.n:it.en.n}${it.p?` (${it.p}${it.pv?'':' x'+c.g})`:''}`).join('\n');
  const msg = tr
    ? `Merhaba, kendi paketimi oluşturdum:\n${lines}\n📅 Tarih: ${dt}\n👥 Kişi: ${c.g}\n💰 Tahmini toplam: ${fmt(c.total)}${c.ask?` + ${c.ask} hizmet fiyatı`:''}\nMüsaitlik ve fiyat teyidi rica ederim.`
    : `Hello, I built my own package:\n${lines}\n📅 Date: ${dt}\n👥 Guests: ${c.g}\n💰 Estimated total: ${fmt(c.total)}${c.ask?` + ${c.ask} item(s) to be priced`:''}\nPlease confirm availability and price.`;
  window.open(WA + encodeURIComponent(msg), '_blank', 'noopener');
}
function clearCart(){ cart = []; saveCart(); renderCards(); renderBuilder(); }

// ---- Yorumlar & Instagram ----
function renderSocial(){
  const rv = document.getElementById('revlist');
  if (rv) rv.innerHTML = REVIEWS.map(r=>`<div class="rcard"><div class="stars">${'★'.repeat(r.stars||5)}</div><p>“${r.text}”</p><b>${r.name}</b>${r.date?`<small>${r.date}</small>`:''}</div>`).join('');
  const gl = document.getElementById('revlink');
  if (gl) { gl.style.display = CFG.googleReviews ? '' : 'none'; gl.href = CFG.googleReviews || '#'; }
  const ig = document.getElementById('insta');
  if (ig) {
    ig.style.display = CFG.instagram ? '' : 'none';
    const a = document.getElementById('igbtn'); if (a) a.href = 'https://instagram.com/' + CFG.instagram;
    const h = document.getElementById('ighandle'); if (h) h.textContent = '@' + CFG.instagram;
  }
}

// ---- Render ----
function renderCards(){
  const G = (id, arr, ty) => { const el = document.getElementById(id); if (el) el.innerHTML = arr.map((x,i)=>card(x,i,ty)).join(''); };
  G('actGrid', A, 'a'); G('tourGrid', X, 'x'); G('specGrid', S, 's'); G('pkgGrid', P, 'p');
  G('trfGrid', T, 't'); G('rentGrid', R, 'r'); G('stayGrid', H, 'h');
}
function render(){
  buildSearch();
  renderCards();
  document.querySelectorAll('[data-en]').forEach(el=>{
    el.textContent = lang==='tr' ? el.dataset.tr : lang==='en' ? el.dataset.en : ((UI[el.dataset.en] && UI[el.dataset.en][lang]) || el.dataset.en);
  });
  document.querySelectorAll('[data-hen]').forEach(el=>{ el.href = lang==='tr' ? el.dataset.htr : el.dataset.hen; });
  const cg = document.getElementById('cguests'); const cgv = cg.value || '2'; guestOpts(cg); cg.value = cgv;
  renderBuilder();
  renderSocial();
  document.getElementById('langSel').value = lang;
  document.documentElement.lang = lang;
}
function setLang(l){
  lang = LANGS.includes(l) ? l : 'en';
  store.set('lang', lang);
  closeM();
  render();
}

render();
