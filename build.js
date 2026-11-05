// Statik SEO sayfalarını üretir:  node build.js
// Kaynak: data.js (hizmetler) + blog-posts.js (blog). Çıktı: /<slug>.html, /en/<slug>.html, /blog, /en/blog, sitemap.xml, robots.txt
// Ayrıca index.html içindeki <!--SEO-LINKS--> ve <!--BLOG-TEASER--> alanlarını doldurur.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = __dirname;
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8') + ';this.D={IMG,WA,A,T,R,H,P,X,S,FAQ,L,SLUG,CFG};', ctx);
const {IMG, WA, A, T, R, H, P, X, S, FAQ, L, SLUG, CFG} = ctx.D;
const POSTS = require('./blog-posts.js');
const SITE = CFG.site.replace(/\/$/, '');
const TODAY = new Date().toISOString().slice(0, 10);

const GROUPS = [
  {k:'a', arr:A, tr:'Aktiviteler', en:'Activities', type:'TouristTrip'},
  {k:'x', arr:X, tr:'Günlük Turlar', en:'Day Trips', type:'TouristTrip'},
  {k:'s', arr:S, tr:'Özel Deneyimler', en:'Special Experiences', type:'Service'},
  {k:'p', arr:P, tr:'Paket Turlar', en:'Package Tours', type:'TouristTrip'},
  {k:'t', arr:T, tr:'Havalimanı Transferi', en:'Airport Transfer', type:'Service'},
  {k:'r', arr:R, tr:'Araç Kiralama', en:'Vehicle Rental', type:'Service'},
  {k:'h', arr:H, tr:'Villa & Günlük Ev', en:'Villas & Holiday Homes', type:'Service'}
];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const src = x => /^https?:/.test(x) ? x : IMG + x;
const urlOf = (item, lang) => lang === 'tr' ? '/' + SLUG[item.tr.n][0] : '/en/' + SLUG[item.tr.n][1];
const byName = {}; GROUPS.forEach(g => g.arr.forEach(it => byName[it.tr.n] = it));
const num = p => p ? parseInt(String(p).replace(/\D/g, ''), 10) : null;
const unit = (item, lang) => { const t = L[lang]; return item.u ? t[item.u] : (item.pv ? t.pv : t.pp); };
const homeUrl = lang => lang === 'tr' ? '/' : '/?lang=en';
const waMsg = (item, lang) => encodeURIComponent(item.p === null
  ? (lang === 'tr' ? `Merhaba, ${item.tr.n} için fiyat ve müsaitlik öğrenmek istiyorum.` : `Hello, I would like a price and availability for ${item.en.n}.`)
  : (lang === 'tr' ? `Merhaba, ${item.tr.n} rezervasyonu yapmak istiyorum.` : `Hello, I would like to book ${item.en.n}.`));

const CSS = `:root{--blue:#0ea5e9;--blue-d:#0284c7;--dark:#0f172a;--gray:#64748b;--bg:#f8fafc;--green:#25d366;--red:#ef4444;--shadow:0 4px 20px rgba(15,23,42,.08)}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--dark);line-height:1.6;padding-bottom:80px}
img{display:block;max-width:100%}a{color:var(--blue-d)}
header{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);box-shadow:0 1px 0 rgba(15,23,42,.07)}
.hw{max-width:980px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:10px 16px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--dark);font-family:Georgia,serif;font-weight:800;font-size:1.15rem}
.logo span{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--blue),#0369a1);color:#fff;display:flex;align-items:center;justify-content:center}
.logo i{font-style:normal;color:var(--blue)}.hw .sp{margin-left:auto;display:flex;gap:10px;align-items:center}
.lg{border:1.5px solid var(--blue);border-radius:99px;padding:4px 12px;font-weight:700;font-size:.8rem;text-decoration:none}
.hwa{background:var(--green);color:#fff;text-decoration:none;font-weight:700;padding:8px 14px;border-radius:99px;font-size:.85rem}
main{max-width:980px;margin:0 auto;padding:16px}
.bc{font-size:.8rem;color:var(--gray);margin-bottom:10px}.bc a{color:var(--gray)}
.hero{border-radius:18px;overflow:hidden;aspect-ratio:16/9;margin-bottom:16px;box-shadow:var(--shadow)}.hero img{width:100%;height:100%;object-fit:cover}
h1{font-size:clamp(1.6rem,5vw,2.4rem);line-height:1.15;margin-bottom:6px}
.loc{color:var(--gray);margin-bottom:10px}
.pr{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;margin-bottom:6px}.pr b{font-size:1.6rem}.pr s{color:var(--gray)}.pr small{color:var(--gray)}
.dep{color:var(--gray);font-size:.85rem;margin-bottom:12px}
.feats{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 16px}.feats span{background:#e0f2fe;color:var(--blue-d);font-size:.78rem;font-weight:600;padding:4px 10px;border-radius:99px}
.cta{display:inline-flex;align-items:center;gap:8px;background:var(--green);color:#fff;font-weight:800;padding:14px 22px;border-radius:99px;text-decoration:none;margin:6px 0 18px}
.box{background:#fff;border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow)}
.box h2{font-size:1.05rem;margin-bottom:8px}.box ul{list-style:none}.box li{padding:3px 0 3px 22px;position:relative;font-size:.92rem}
.box li::before{content:"•";position:absolute;left:6px;color:var(--blue)}.box.inc li::before{content:"✓";color:#16a34a;font-weight:700}.box.exc li::before{content:"✕";color:var(--red);font-weight:700}
.step{display:flex;gap:10px;padding:6px 0}.step .n{flex-shrink:0;width:26px;height:26px;border-radius:50%;background:#e0f2fe;color:var(--blue-d);font-weight:800;font-size:.75rem;display:flex;align-items:center;justify-content:center}
details{border-bottom:1px solid #e2e8f0}details:last-child{border-bottom:none}summary{font-weight:700;cursor:pointer;padding:9px 0}details p{padding:0 0 10px;font-size:.9rem;color:#475569}
.rel{display:grid;gap:10px}@media(min-width:700px){.rel{grid-template-columns:repeat(3,1fr)}}
.rel a{display:block;background:#fff;border-radius:14px;box-shadow:var(--shadow);overflow:hidden;text-decoration:none;color:var(--dark)}
.rel img{aspect-ratio:4/3;object-fit:cover;width:100%}.rel b{display:block;padding:10px 12px;font-size:.92rem}
article h2{font-size:1.3rem;margin:22px 0 6px}article p,article li{font-size:1rem;color:#1e293b;margin-bottom:10px}article ul{padding-left:20px}
.posts{display:grid;gap:12px}.posts a{display:block;background:#fff;border-radius:14px;box-shadow:var(--shadow);padding:16px;text-decoration:none;color:var(--dark)}.posts a span{color:var(--gray);font-size:.88rem}
.bar{position:fixed;left:0;right:0;bottom:0;padding:10px 14px;background:rgba(255,255,255,.97);box-shadow:0 -4px 16px rgba(15,23,42,.1);display:flex;gap:10px}
.bar a{flex:1;text-align:center;padding:13px;border-radius:99px;font-weight:800;text-decoration:none}.bar .c{background:#e2e8f0;color:var(--dark)}.bar .w{background:var(--green);color:#fff}
footer{text-align:center;color:var(--gray);font-size:.8rem;padding:24px 16px}footer a{color:var(--gray);margin:0 6px}
h3.sec{font-size:1.1rem;margin:22px 0 10px}`;

function layout({lang, title, desc, path: p, alt, img, body, ld}) {
  const t = lang === 'tr';
  const altLang = t ? 'en' : 'tr';
  const ldTags = (ld || []).map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${p}">
${alt ? `<link rel="alternate" hreflang="${lang}" href="${SITE}${p}">\n<link rel="alternate" hreflang="${altLang}" href="${SITE}${alt}">\n<link rel="alternate" hreflang="x-default" href="${SITE}${t ? p : alt}">` : ''}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${p}">
${img ? `<meta property="og:image" content="${esc(img)}">` : ''}
<meta name="theme-color" content="#0ea5e9">
<style>${CSS}</style>
${ldTags}
</head>
<body>
<header><div class="hw"><a class="logo" href="${homeUrl(lang)}"><span>O</span><b>Oludeniz<i>Tours</i></b></a>
<div class="sp">${alt ? `<a class="lg" href="${alt}" hreflang="${altLang}">${altLang.toUpperCase()}</a>` : ''}<a class="hwa" href="${WA}${encodeURIComponent(t ? 'Merhaba, bilgi almak istiyorum' : 'Hello, I would like some information')}" target="_blank" rel="noopener">WhatsApp</a></div></div></header>
<main>
${body}
</main>
<footer><a href="${homeUrl(lang)}">${t ? 'Ana Sayfa' : 'Home'}</a><a href="${t ? '/blog' : '/en/blog'}">Blog</a><a href="/iletisim">${t ? 'İletişim' : 'Contact'}</a><a href="/iptal-iade">${t ? 'İptal & İade' : 'Cancellation'}</a><a href="/gizlilik">${t ? 'Gizlilik' : 'Privacy'}</a><p>© 2026 Oludeniz Tours — Fethiye / Ölüdeniz · +90 536 461 66 74</p></footer>
<div class="bar"><a class="c" href="tel:+905364616674">${t ? 'Ara' : 'Call'}</a><a class="w" href="${WA}${encodeURIComponent(t ? 'Merhaba, rezervasyon yapmak istiyorum' : 'Hello, I would like to make a booking')}" target="_blank" rel="noopener">${t ? 'WhatsApp Rezervasyon' : 'Book on WhatsApp'}</a></div>
</body>
</html>`;
}

const list = (title, cls, items) => items && items.length ? `<section class="box ${cls}"><h2>${title}</h2><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul></section>` : '';
const PROVIDER = {'@type':'TravelAgency', name:'Oludeniz Tours', url: SITE + '/', telephone:'+905364616674'};

function itemPage(item, group, lang) {
  const d = item[lang], t = L[lang], tr = lang === 'tr';
  const p = urlOf(item, lang), alt = urlOf(item, tr ? 'en' : 'tr');
  const title = `${d.n} — ${tr ? 'Ölüdeniz & Fethiye' : 'Ölüdeniz & Fethiye'} | Oludeniz Tours`;
  const priceTxt = item.p === null ? t.ask : item.p;
  const desc = (d.desc.replace(/[🪂🌊⚓🏇]/gu, '').trim().slice(0, 150) + (item.p ? ` ${priceTxt} / ${unit(item, lang)}.` : '')).trim();
  let b = `<nav class="bc"><a href="${homeUrl(lang)}">${tr ? 'Ana Sayfa' : 'Home'}</a> › ${group[lang]} › ${esc(d.n)}</nav>`;
  b += `<div class="hero"><img src="${src(item.img)}" alt="${esc(d.n)}"></div>`;
  b += `<h1>${esc(d.n)}</h1><p class="loc">📍 ${esc(d.loc)}</p>`;
  b += `<div class="pr"><b>${priceTxt}</b>${item.old ? `<s>${item.old}</s>` : ''}<small>/ ${unit(item, lang)}</small></div>`;
  if (item.dep) b += `<p class="dep">💳 ${t.dep}: <b>${item.dep}</b> — ${t.depNote}</p>`;
  b += `<div class="feats">${d.f.map(x => `<span>${esc(x)}</span>`).join('')}</div>`;
  b += `<a class="cta" href="${WA}${waMsg(item, lang)}" target="_blank" rel="noopener">${item.p === null ? t.quote : t.book + ' — ' + item.p}</a>`;
  b += `<section class="box"><h2>${t.about}</h2><p>${d.desc}</p></section>`;
  b += list(t.inc, 'inc', d.inc) + list(t.exc, 'exc', d.exc) + list(t.info, '', d.info);
  if (d.prog && d.prog.length) b += `<section class="box"><h2>${t.prog}</h2>${d.prog.map((s, j) => `<div class="step"><span class="n">${j + 1}</span><div><b>${s[0]}</b><p>${s[1]}</p></div></div>`).join('')}</section>`;
  b += list(item.pv ? t.reg2 : t.reg, '', d.reg) + list(t.bring, '', d.bring) + list(t.ban, 'exc', d.ban) + list(t.extra, '', d.extra);
  const fq = FAQ[item.tr.n] && FAQ[item.tr.n][lang];
  if (fq) b += `<section class="box"><h2>${t.faq}</h2>${fq.map(x => `<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join('')}</section>`;
  if (item.url) b += `<p><a href="${item.url}" target="_blank" rel="noopener">${t.web}: ${item.url.replace(/^https?:\/\/(www\.)?/, '')} ↗</a></p>`;
  b += `<a class="cta" href="${WA}${waMsg(item, lang)}" target="_blank" rel="noopener">${item.p === null ? t.quote : t.book + ' — ' + item.p}</a>`;
  const rel = GROUPS.flatMap(g => g.arr).filter(x => x !== item).sort((a, c) => (group.arr.includes(c) - group.arr.includes(a))).slice(0, 6);
  b += `<h3 class="sec">${tr ? 'Bunlar da ilginizi çekebilir' : 'You may also like'}</h3><div class="rel">${rel.map(x => `<a href="${urlOf(x, lang)}"><img loading="lazy" src="${src(x.img)}" alt="${esc(x[lang].n)}"><b>${esc(x[lang].n)}</b></a>`).join('')}</div>`;

  const main = {'@context':'https://schema.org','@type':group.type, name:d.n, description:d.desc, image:src(item.img), url:SITE + p,
    provider: PROVIDER, areaServed: 'Ölüdeniz, Fethiye, Muğla, Türkiye'};
  if (group.type === 'TouristTrip') { delete main.areaServed; main.touristType = tr ? 'Tatilciler' : 'Holidaymakers'; }
  if (item.p) main.offers = {'@type':'Offer', price: num(item.p), priceCurrency:'TRY', availability:'https://schema.org/InStock', url: SITE + p};
  const ld = [main, {'@context':'https://schema.org','@type':'BreadcrumbList', itemListElement:[
    {'@type':'ListItem', position:1, name: tr ? 'Ana Sayfa' : 'Home', item: SITE + homeUrl(lang)},
    {'@type':'ListItem', position:2, name: d.n, item: SITE + p}]}];
  if (fq) ld.push({'@context':'https://schema.org','@type':'FAQPage', mainEntity: fq.map(x => ({'@type':'Question', name:x[0], acceptedAnswer:{'@type':'Answer', text:x[1]}}))});
  return {path: p, html: layout({lang, title, desc, path: p, alt, img: src(item.img), body: b, ld})};
}

function linkify(html, lang) {
  return html.replace(/\{\{link:([^}]+)\}\}/g, (_, n) => {
    const it = byName[n]; if (!it) throw new Error('Bilinmeyen link: ' + n);
    return `<a href="${urlOf(it, lang)}">${esc(it[lang].n)}</a>`;
  });
}
function postPath(post, lang) { return (lang === 'tr' ? '/blog/' : '/en/blog/') + post[lang].slug; }
function postPage(post, lang) {
  const d = post[lang], tr = lang === 'tr', p = postPath(post, lang), alt = postPath(post, tr ? 'en' : 'tr');
  let b = `<nav class="bc"><a href="${homeUrl(lang)}">${tr ? 'Ana Sayfa' : 'Home'}</a> › <a href="${tr ? '/blog' : '/en/blog'}">Blog</a></nav>`;
  b += `<article><div class="hero"><img src="${post.img}" alt="${esc(d.title)}"></div><h1>${esc(d.title)}</h1><p class="loc">${post.date} · Oludeniz Tours</p>${linkify(d.body, lang)}</article>`;
  b += `<a class="cta" href="${WA}${encodeURIComponent(tr ? 'Merhaba, tatilimi planlamak için bilgi almak istiyorum.' : 'Hello, I would like help planning my holiday.')}" target="_blank" rel="noopener">${tr ? "WhatsApp'tan Plan Yapalım" : "Let's Plan on WhatsApp"}</a>`;
  const ld = [{'@context':'https://schema.org','@type':'BlogPosting', headline:d.title, description:d.desc, image:post.img, datePublished:post.date, dateModified:post.date, inLanguage:lang,
    author:{'@type':'Organization', name:'Oludeniz Tours'}, publisher:{'@type':'Organization', name:'Oludeniz Tours'}, mainEntityOfPage: SITE + p}];
  return {path: p, html: layout({lang, title: d.title + ' | Oludeniz Tours', desc: d.desc, path: p, alt, img: post.img, body: b, ld})};
}
function blogIndex(lang) {
  const tr = lang === 'tr', p = tr ? '/blog' : '/en/blog', alt = tr ? '/en/blog' : '/blog';
  const b = `<nav class="bc"><a href="${homeUrl(lang)}">${tr ? 'Ana Sayfa' : 'Home'}</a> › Blog</nav><h1>${tr ? 'Ölüdeniz Rehberi & Blog' : 'Ölüdeniz Guide & Blog'}</h1><p class="loc">${tr ? 'Ölüdeniz ve Fethiye tatilinizi planlamak için ipuçları' : 'Tips for planning your Ölüdeniz and Fethiye holiday'}</p>
<div class="posts">${POSTS.map(x => `<a href="${postPath(x, lang)}"><b>${esc(x[lang].title)}</b><br><span>${esc(x[lang].desc)}</span></a>`).join('')}</div>`;
  return {path: p + '/index', html: layout({lang, title: (tr ? 'Ölüdeniz Rehberi & Blog' : 'Ölüdeniz Guide & Blog') + ' | Oludeniz Tours', desc: tr ? 'Ölüdeniz ve Fethiye için gezi rehberleri, ulaşım bilgileri ve aktivite ipuçları.' : 'Travel guides, transport info and activity tips for Ölüdeniz and Fethiye.', path: p, alt, body: b})};
}

// ---- Üret ----
const out = [];
GROUPS.forEach(g => g.arr.forEach(it => ['tr', 'en'].forEach(l => out.push(itemPage(it, g, l)))));
POSTS.forEach(po => ['tr', 'en'].forEach(l => out.push(postPage(po, l))));
out.push(blogIndex('tr'), blogIndex('en'));

// eski üretilmiş dosyaları temizle (manifest ile)
const MAN = path.join(ROOT, '.generated.json');
if (fs.existsSync(MAN)) JSON.parse(fs.readFileSync(MAN, 'utf8')).forEach(f => { try { fs.unlinkSync(path.join(ROOT, f)); } catch (e) {} });
const written = [];
out.forEach(o => {
  const f = o.path.replace(/^\//, '') + '.html';
  fs.mkdirSync(path.dirname(path.join(ROOT, f)), {recursive: true});
  fs.writeFileSync(path.join(ROOT, f), o.html);
  written.push(f);
});

// sitemap + robots
const urls = ['/', '/?lang=en', '/iletisim', '/iptal-iade', '/gizlilik', '/kullanim-sartlari']
  .concat(out.map(o => o.path.replace(/\/index$/, '')));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u.replace(/&/g, '&amp;')}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
written.push('sitemap.xml', 'robots.txt');
fs.writeFileSync(MAN, JSON.stringify(written.filter(f => !['sitemap.xml', 'robots.txt'].includes(f)), null, 1));

// index.html: SEO linkleri + blog vitrini
let idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const seo = `<div class="seol">${GROUPS.map(g => `<h4>${g.tr} · ${g.en}</h4>` + g.arr.map(it => `<a href="${urlOf(it, 'tr')}">${esc(it.tr.n)}</a><a href="${urlOf(it, 'en')}" hreflang="en">${esc(it.en.n)} (EN)</a>`).join('')).join('')}</div>`;
const teaser = POSTS.map(po => `    <a href="${postPath(po, 'tr')}" data-htr="${postPath(po, 'tr')}" data-hen="${postPath(po, 'en')}"><b data-tr="${esc(po.tr.title)}" data-en="${esc(po.en.title)}">${esc(po.tr.title)}</b><span data-tr="${esc(po.tr.desc)}" data-en="${esc(po.en.desc)}">${esc(po.tr.desc)}</span></a>`).join('\n');
idx = idx.replace(/<!--SEO-LINKS-->[\s\S]*?<!--\/SEO-LINKS-->/, `<!--SEO-LINKS-->${seo}<!--/SEO-LINKS-->`)
         .replace(/<!--BLOG-TEASER-->[\s\S]*?<!--\/BLOG-TEASER-->/, `<!--BLOG-TEASER-->\n${teaser}\n<!--/BLOG-TEASER-->`);
fs.writeFileSync(path.join(ROOT, 'index.html'), idx);

console.log(`${written.length} dosya yazıldı, sitemap: ${urls.length} URL`);
