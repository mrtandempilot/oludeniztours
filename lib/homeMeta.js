import { SITE, w, LANGS } from './site';

const TITLE = {
  tr: 'Oludeniz Tours | Ölüdeniz Yamaç Paraşütü, Turlar, Araç & Villa Kiralama',
  en: 'Oludeniz Tours | Ölüdeniz Paragliding, Tours, Car & Villa Rentals',
  ru: 'Oludeniz Tours | Параглайдинг в Олюденизе, экскурсии, аренда авто и вилл',
  de: 'Oludeniz Tours | Paragliding in Ölüdeniz, Touren, Mietwagen & Villen',
  pl: 'Oludeniz Tours | Paralotnie w Ölüdeniz, wycieczki, wynajem aut i willi',
};
export function homeMeta(lang) {
  const url = SITE + (lang === 'tr' ? '/' : '/' + lang);
  const desc = w(lang, "Ölüdeniz'de yamaç paraşütü, tekne turları, günlük geziler, araba/motosiklet/ATV kiralama, villa ve günlük ev kiralama, Dalaman Havalimanı'ndan VIP transfer. WhatsApp'tan hemen rezervasyon.",
    'Paragliding, boat tours, day trips, car and villa rentals, airport transfers — all in one place.');
  return {
    title: TITLE[lang], description: desc,
    alternates: { canonical: url, languages: Object.fromEntries(LANGS.map(l => [l, SITE + (l === 'tr' ? '/' : '/' + l)]).concat([['x-default', SITE + '/']])) },
    openGraph: { title: TITLE[lang], description: desc, url, images: ['https://skywalkersparagliding.com/api/images/2aedfafb833d2f25.webp'], type: 'website' },
  };
}
export const ORG_LD = {"@context":"https://schema.org","@type":"TravelAgency","name":"Oludeniz Tours","url":SITE + "/","telephone":"+905364616674","image":"https://skywalkersparagliding.com/api/images/2aedfafb833d2f25.webp","priceRange":"₺₺","address":{"@type":"PostalAddress","addressLocality":"Ölüdeniz, Fethiye","addressRegion":"Muğla","addressCountry":"TR"},"areaServed":["Ölüdeniz","Fethiye","Hisarönü","Ovacık","Marmaris","Dalaman"],"contactPoint":{"@type":"ContactPoint","telephone":"+905364616674","contactType":"reservations","availableLanguage":["Turkish","English","Russian","German","Polish"]}};
