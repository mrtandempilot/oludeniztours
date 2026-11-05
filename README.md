# Oludeniz Tours

Statik site (Vercel). Build adımı yok — üretilen sayfalar repoya commit edilir.

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Ana sayfa (markup + CSS) |
| `data.js` | Tüm hizmetler, fiyatlar, SSS, SEO adresleri (`SLUG`), ayarlar (`CFG`), yorumlar (`REVIEWS`) |
| `i18n.js` | RU / DE / PL çevirileri |
| `app.js` | Sayfa mantığı: kartlar, modal, sepet/paket oluşturucu, hava durumu |
| `blog-posts.js` | Blog yazıları (TR + EN) |
| `build.js` | Hizmet sayfalarını, blogu, `sitemap.xml` ve `robots.txt`'yi üretir |

## Değişiklik yaptıktan sonra

```
node build.js
```

Bu komut `/<slug>.html`, `/en/<slug>.html`, `/blog/*`, `/en/blog/*` sayfalarını yeniden üretir ve `index.html` altındaki SEO linklerini günceller.

## Ayarlar (`data.js` → `CFG`)
- `site`: kendi alan adınıza geçince güncelleyin (canonical + sitemap).
- `instagram`: kullanıcı adı girilince Instagram bölümü görünür.
- `googleReviews`: Google işletme profili linki girilince "Google'da tüm yorumları okuyun" butonu görünür.
- `REVIEWS`: yalnızca gerçek müşteri yorumlarını ekleyin.
