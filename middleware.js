import { NextResponse } from 'next/server';

const LANGS = ['en', 'ru', 'de', 'pl'];
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview/i;

export function middleware(req) {
  const url = req.nextUrl;
  // Eski adres: /?lang=en → /en
  const q = url.searchParams.get('lang');
  if (url.pathname === '/' && q) {
    const to = url.clone(); to.searchParams.delete('lang');
    to.pathname = q === 'tr' ? '/' : (LANGS.includes(q) ? '/' + q : '/');
    return NextResponse.redirect(to, 308);
  }
  // İlk ziyarette tarayıcı diline göre yönlendir (botlar ve dil seçmiş olanlar hariç)
  if (url.pathname === '/' && !req.cookies.get('lang') && !BOT.test(req.headers.get('user-agent') || '')) {
    const al = (req.headers.get('accept-language') || '').toLowerCase();
    const first = al.split(',')[0]?.trim().slice(0, 2);
    if (first && first !== 'tr' && al) {
      const to = url.clone(); to.pathname = '/' + (LANGS.includes(first) ? first : 'en');
      return NextResponse.redirect(to, 307);
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ['/'] };
