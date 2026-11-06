// Ortak yardımcılar — hem sunucu hem istemci tarafında kullanılır
import { IMG, WA, A, T, R, H, P, X, S, FAQ, L, SLUG, CFG, UI, TX } from './catalog';

export const LANGS = ['tr', 'en', 'ru', 'de', 'pl'];
export const SITE = CFG.site.replace(/\/$/, '');
export const DB = { a: A, p: P, t: T, r: R, h: H, x: X, s: S };
export const GROUPS = [
  { k: 'a', tr: 'Aktiviteler', en: 'Activities', type: 'TouristTrip' },
  { k: 'x', tr: 'Günlük Turlar', en: 'Day Trips', type: 'TouristTrip' },
  { k: 's', tr: 'Özel Deneyimler', en: 'Special Experiences', type: 'Service' },
  { k: 'p', tr: 'Paket Turlar', en: 'Packages', type: 'TouristTrip' },
  { k: 't', tr: 'Havalimanı Transferi', en: 'Airport Transfer', type: 'Service' },
  { k: 'r', tr: 'Araç Kiralama', en: 'Vehicle Rental', type: 'Service' },
  { k: 'h', tr: 'Villa & Günlük Ev', en: 'Villas & Holiday Homes', type: 'Service' },
];
export const ALL = GROUPS.flatMap(g => DB[g.k].map((item, i) => ({ item, i, g })));

export function w(lang, tr, en) {
  return lang === 'tr' ? tr : lang === 'en' ? en : ((UI[en] && UI[en][lang]) || en);
}
export const lb = lang => L[lang] || L.en;
export function D(item, lang) {
  if (lang === 'tr' || lang === 'en') return item[lang];
  return Object.assign({}, item.en, (TX[item.en.n] || {})[lang]);
}
export const tagOf = (item, lang) => item.tag ? (item.tag[lang] || (UI[item.tag.en] && UI[item.tag.en][lang]) || item.tag.en) : '';
export const src = x => /^https?:/.test(x) ? x : IMG + x;
export const unitOf = (item, lang) => { const t = lb(lang); return item.u ? t[item.u] : (item.pv ? t.pv : t.pp); };
export const homeHref = lang => lang === 'tr' ? '/' : '/' + lang;
export const blogHref = lang => lang === 'tr' ? '/blog' : '/en/blog';
export const faqOf = (item, lang) => { const f = FAQ[item.tr.n]; return f ? (f[lang] || f.en) : null; };

// TR sayfaları kökte, diğer tüm diller İngilizce hizmet sayfasına gider
export function pageUrl(item, lang) {
  const s = SLUG[item.tr.n];
  if (!s) return '';
  return lang === 'tr' ? '/' + s[0] : '/en/' + s[1];
}
export function msgFor(item, lang) {
  const tr = lang === 'tr', nm = tr ? item.tr.n : item.en.n;
  return encodeURIComponent(item.p === null
    ? (tr ? `Merhaba, ${nm} için fiyat ve müsaitlik öğrenmek istiyorum.` : `Hello, I would like a price and availability for ${nm}.`)
    : (tr ? `Merhaba, ${nm} rezervasyonu yapmak istiyorum.` : `Hello, I would like to book ${nm}.`));
}
export const waLink = text => WA + encodeURIComponent(text);
export const priceNum = p => p ? parseInt(String(p).replace(/\D/g, ''), 10) || 0 : 0;

export function findBySlug(slug, lang) {
  const idx = lang === 'tr' ? 0 : 1;
  const name = Object.keys(SLUG).find(n => SLUG[n][idx] === slug);
  if (!name) return null;
  return ALL.find(x => x.item.tr.n === name) || null;
}
export { WA, CFG, SLUG };
