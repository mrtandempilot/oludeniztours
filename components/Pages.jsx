// Sunucu tarafında üretilen hizmet ve blog sayfaları (eski build.js şablonlarının karşılığı)
import POSTS from '../lib/blog';
import { ALL, SITE, D, lb, src, unitOf, msgFor, pageUrl, faqOf, homeHref, blogHref, waLink, priceNum, WA, CFG } from '../lib/site';

const PROVIDER = { '@type': 'TravelAgency', name: 'Oludeniz Tours', url: SITE + '/', telephone: '+905364616674' };

function Shell({ lang, alt, children }) {
  const tr = lang === 'tr', altLang = tr ? 'en' : 'tr';
  return (
    <div className="sp">
      <header><div className="hw"><a className="logo" href={homeHref(lang)}><span>O</span><b>Oludeniz<i>Tours</i></b></a>
        <div className="sp-r">{alt && <a className="lg" href={alt} hrefLang={altLang}>{altLang.toUpperCase()}</a>}
          <a className="hwa" href={waLink(tr ? 'Merhaba, bilgi almak istiyorum' : 'Hello, I would like some information')} target="_blank" rel="noopener">WhatsApp</a></div></div></header>
      <main>{children}</main>
      <footer><a href={homeHref(lang)}>{tr ? 'Ana Sayfa' : 'Home'}</a><a href={blogHref(lang)}>Blog</a><a href="/iletisim">{tr ? 'İletişim' : 'Contact'}</a><a href="/iptal-iade">{tr ? 'İptal & İade' : 'Cancellation'}</a><a href="/gizlilik">{tr ? 'Gizlilik' : 'Privacy'}</a><p>© 2026 Oludeniz Tours — Fethiye / Ölüdeniz · +90 536 461 66 74</p></footer>
      <div className="bar"><a className="c" href="tel:+905364616674">{tr ? 'Ara' : 'Call'}</a><a className="w" href={waLink(tr ? 'Merhaba, rezervasyon yapmak istiyorum' : 'Hello, I would like to make a booking')} target="_blank" rel="noopener">{tr ? 'WhatsApp Rezervasyon' : 'Book on WhatsApp'}</a></div>
    </div>
  );
}
const Box = ({ title, cls = '', items }) => items && items.length
  ? <section className={'box ' + cls}><h2>{title}</h2><ul>{items.map((x, j) => <li key={j}>{x}</li>)}</ul></section> : null;
const Ld = ({ data }) => <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;

export function serviceMeta(entry, lang) {
  const { item } = entry, d = item[lang], t = lb(lang);
  const p = pageUrl(item, lang), alt = pageUrl(item, lang === 'tr' ? 'en' : 'tr');
  const priceTxt = item.p === null ? t.ask : item.p;
  const desc = (d.desc.replace(/[🪂🌊⚓🏇]/gu, '').trim().slice(0, 150) + (item.p ? ` ${priceTxt} / ${unitOf(item, lang)}.` : '')).trim();
  return {
    title: `${d.n} — Ölüdeniz & Fethiye | Oludeniz Tours`, description: desc,
    alternates: { canonical: SITE + p, languages: { [lang]: SITE + p, [lang === 'tr' ? 'en' : 'tr']: SITE + alt, 'x-default': SITE + pageUrl(item, 'tr') } },
    openGraph: { title: d.n, description: desc, url: SITE + p, images: [src(item.img)], type: 'website' },
  };
}

export function ServicePage({ entry, lang }) {
  const { item, g } = entry, d = item[lang], t = lb(lang), tr = lang === 'tr';
  const p = pageUrl(item, lang), alt = pageUrl(item, tr ? 'en' : 'tr');
  const fq = faqOf(item, lang);
  const cta = <a className="cta" href={WA + msgFor(item, lang)} target="_blank" rel="noopener">{item.p === null ? t.quote : t.book + ' — ' + item.p}</a>;
  const rel = ALL.filter(x => x.item !== item).sort((a, b) => (b.g.k === g.k) - (a.g.k === g.k)).slice(0, 6);
  const main = { '@context': 'https://schema.org', '@type': g.type, name: d.n, description: d.desc, image: src(item.img), url: SITE + p, provider: PROVIDER };
  if (g.type === 'TouristTrip') main.touristType = tr ? 'Tatilciler' : 'Holidaymakers'; else main.areaServed = 'Ölüdeniz, Fethiye, Muğla, Türkiye';
  if (item.p) main.offers = { '@type': 'Offer', price: priceNum(item.p), priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url: SITE + p };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: tr ? 'Ana Sayfa' : 'Home', item: SITE + homeHref(lang) },
    { '@type': 'ListItem', position: 2, name: d.n, item: SITE + p }] };
  const faqLd = fq && { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: fq.map(x => ({ '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } })) };
  return (
    <Shell lang={lang} alt={alt}>
      <Ld data={main} /><Ld data={crumbs} />{faqLd && <Ld data={faqLd} />}
      <nav className="bc"><a href={homeHref(lang)}>{tr ? 'Ana Sayfa' : 'Home'}</a> › {g[lang]} › {d.n}</nav>
      <div className="hero"><img src={src(item.img)} alt={d.n} /></div>
      <h1>{d.n}</h1><p className="loc">📍 {d.loc}</p>
      <div className="pr"><b>{item.p === null ? t.ask : item.p}</b>{item.old && <s>{item.old}</s>}<small>/ {unitOf(item, lang)}</small></div>
      {item.dep && <p className="dep">💳 {t.dep}: <b>{item.dep}</b> — {t.depNote}</p>}
      <div className="feats">{d.f.map((x, j) => <span key={j}>{x}</span>)}</div>
      {cta}
      <section className="box"><h2>{t.about}</h2><p>{d.desc}</p></section>
      <Box title={t.inc} cls="inc" items={d.inc} /><Box title={t.exc} cls="exc" items={d.exc} /><Box title={t.info} items={d.info} />
      {d.prog && d.prog.length > 0 && <section className="box"><h2>{t.prog}</h2>{d.prog.map((s, j) => <div className="step" key={j}><span className="n">{j + 1}</span><div><b>{s[0]}</b><p>{s[1]}</p></div></div>)}</section>}
      <Box title={item.pv ? t.reg2 : t.reg} items={d.reg} /><Box title={t.bring} items={d.bring} /><Box title={t.ban} cls="exc" items={d.ban} /><Box title={t.extra} items={d.extra} />
      {fq && <section className="box"><h2>{t.faq}</h2>{fq.map((x, j) => <details key={j}><summary>{x[0]}</summary><p>{x[1]}</p></details>)}</section>}
      {item.url && <p><a href={item.url} target="_blank" rel="noopener">{t.web}: {item.url.replace(/^https?:\/\/(www\.)?/, '')} ↗</a></p>}
      {cta}
      <h3 className="sec">{tr ? 'Bunlar da ilginizi çekebilir' : 'You may also like'}</h3>
      <div className="rel">{rel.map(({ item: x }) => <a key={x.tr.n} href={pageUrl(x, lang)}><img loading="lazy" src={src(x.img)} alt={x[lang].n} /><b>{x[lang].n}</b></a>)}</div>
    </Shell>
  );
}

// ---- Blog
const byName = Object.fromEntries(ALL.map(x => [x.item.tr.n, x.item]));
export const postPath = (post, lang) => (lang === 'tr' ? '/blog/' : '/en/blog/') + post[lang].slug;
function linkify(html, lang) {
  return html.replace(/\{\{link:([^}]+)\}\}/g, (_, n) => {
    const it = byName[n]; if (!it) return n;
    return `<a href="${pageUrl(it, lang)}">${it[lang].n}</a>`;
  }).replace(/href="\/\?lang=en#/g, 'href="/en#');
}
export const findPost = (slug, lang) => POSTS.find(p => p[lang].slug === slug);
export function postMeta(post, lang) {
  const d = post[lang], p = postPath(post, lang), alt = postPath(post, lang === 'tr' ? 'en' : 'tr');
  return { title: d.title + ' | Oludeniz Tours', description: d.desc,
    alternates: { canonical: SITE + p, languages: { [lang]: SITE + p, [lang === 'tr' ? 'en' : 'tr']: SITE + alt } },
    openGraph: { title: d.title, description: d.desc, url: SITE + p, images: [post.img], type: 'article' } };
}
export function BlogPost({ post, lang }) {
  const d = post[lang], tr = lang === 'tr', p = postPath(post, lang);
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: d.title, description: d.desc, image: post.img, datePublished: post.date, dateModified: post.date, inLanguage: lang,
    author: { '@type': 'Organization', name: 'Oludeniz Tours' }, publisher: { '@type': 'Organization', name: 'Oludeniz Tours' }, mainEntityOfPage: SITE + p };
  return (
    <Shell lang={lang} alt={postPath(post, tr ? 'en' : 'tr')}>
      <Ld data={ld} />
      <nav className="bc"><a href={homeHref(lang)}>{tr ? 'Ana Sayfa' : 'Home'}</a> › <a href={blogHref(lang)}>Blog</a></nav>
      <article><div className="hero"><img src={post.img} alt={d.title} /></div><h1>{d.title}</h1><p className="loc">{post.date} · Oludeniz Tours</p>
        <div dangerouslySetInnerHTML={{ __html: linkify(d.body, lang) }} /></article>
      <a className="cta" href={waLink(tr ? 'Merhaba, tatilimi planlamak için bilgi almak istiyorum.' : 'Hello, I would like help planning my holiday.')} target="_blank" rel="noopener">{tr ? "WhatsApp'tan Plan Yapalım" : "Let's Plan on WhatsApp"}</a>
    </Shell>
  );
}
export function blogIndexMeta(lang) {
  const tr = lang === 'tr';
  return { title: (tr ? 'Ölüdeniz Rehberi & Blog' : 'Ölüdeniz Guide & Blog') + ' | Oludeniz Tours',
    description: tr ? 'Ölüdeniz ve Fethiye için gezi rehberleri, ulaşım bilgileri ve aktivite ipuçları.' : 'Travel guides, transport info and activity tips for Ölüdeniz and Fethiye.',
    alternates: { canonical: SITE + blogHref(lang), languages: { tr: SITE + '/blog', en: SITE + '/en/blog' } } };
}
export function BlogIndex({ lang }) {
  const tr = lang === 'tr';
  return (
    <Shell lang={lang} alt={tr ? '/en/blog' : '/blog'}>
      <nav className="bc"><a href={homeHref(lang)}>{tr ? 'Ana Sayfa' : 'Home'}</a> › Blog</nav>
      <h1>{tr ? 'Ölüdeniz Rehberi & Blog' : 'Ölüdeniz Guide & Blog'}</h1>
      <p className="loc">{tr ? 'Ölüdeniz ve Fethiye tatilinizi planlamak için ipuçları' : 'Tips for planning your Ölüdeniz and Fethiye holiday'}</p>
      <div className="posts">{POSTS.map(x => <a key={x[lang].slug} href={postPath(x, lang)}><b>{x[lang].title}</b><br /><span>{x[lang].desc}</span></a>)}</div>
    </Shell>
  );
}
