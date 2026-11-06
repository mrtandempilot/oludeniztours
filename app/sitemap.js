import POSTS from '../lib/blog';
import { ALL, SITE, pageUrl } from '../lib/site';
import { postPath } from '../components/Pages';

export default function sitemap() {
  const now = new Date();
  const urls = ['/', '/en', '/ru', '/de', '/pl', '/blog', '/en/blog', '/iletisim', '/iptal-iade', '/gizlilik', '/kullanim-sartlari']
    .concat(ALL.flatMap(x => [pageUrl(x.item, 'tr'), pageUrl(x.item, 'en')]))
    .concat(POSTS.flatMap(p => [postPath(p, 'tr'), postPath(p, 'en')]));
  return urls.map(u => ({ url: SITE + u, lastModified: now }));
}
