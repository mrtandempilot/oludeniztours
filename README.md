# Oludeniz Tours — Next.js

Next.js 15 (App Router) site, deployed on Vercel.

| Yol | Ne |
|---|---|
| `lib/catalog.js` | Tüm hizmetler, fiyatlar, SSS, SEO adresleri (`SLUG`), ayarlar (`CFG`), yorumlar (`REVIEWS`), RU/DE/PL çeviriler |
| `lib/blog.js` | Blog yazıları (TR + EN) |
| `components/HomePage.jsx` | Ana sayfa (kartlar, modal, paket oluşturucu, arama) |
| `components/Pages.jsx` | Hizmet ve blog sayfaları |
| `app/` | Rotalar: `/`, `/en`, `/ru`, `/de`, `/pl`, `/<tr-slug>`, `/en/<en-slug>`, `/blog`, `/en/blog`, `/admin` |
| `public/` | Yasal sayfalar (iletisim, iptal-iade, gizlilik, kullanim-sartlari) |
| `the-eye/` | THE EYE — ayrı Next.js uygulaması (generative visual performance dashboard). Bkz. `the-eye/README.md` |

## Çalıştırma

```
npm install
npm run dev
```

Fiyat veya hizmet değiştirmek için `lib/catalog.js` düzenlenir; push edince Vercel otomatik yayınlar.
