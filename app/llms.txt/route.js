// /llms.txt — yapay zekâ asistanları (ChatGPT, Claude, Perplexity…) için site özeti
import POSTS from '../../lib/blog';
import { GROUPS, DB, SITE, pageUrl, unitOf } from '../../lib/site';

export const dynamic = 'force-static';

export function GET() {
  const lines = [
    '# Oludeniz Tours',
    '',
    '> Local tour and activity company in Ölüdeniz, Fethiye (Muğla, Turkey). Tandem paragliding from Babadağ, boat trips, scuba diving, jeep and ATV safaris, rafting, day trips (Butterfly Valley, Saklıkent, Dalyan, Rhodes), private yacht charter, VIP airport transfers from Dalaman Airport (DLM), car / scooter / ATV rental, and villa and holiday home rental. Bookings via WhatsApp +90 536 461 66 74.',
    '',
    `- Website: ${SITE}/ (Turkish), ${SITE}/en (English), also /ru, /de, /pl`,
    '- Phone / WhatsApp: +90 536 461 66 74',
    '- Area served: Ölüdeniz, Fethiye, Hisarönü, Ovacık, Kayaköy, Marmaris, Dalaman',
    '- Languages: Turkish, English',
    '',
  ];
  GROUPS.forEach(g => {
    lines.push(`## ${g.en}`, '');
    DB[g.k].forEach(it => {
      const price = it.p ? `${it.p} ${unitOf(it, 'en')}` : 'price on request';
      lines.push(`- [${it.en.n}](${SITE}${pageUrl(it, 'en')}): ${it.en.loc}. ${price}.`);
    });
    lines.push('');
  });
  lines.push('## Guides', '');
  POSTS.forEach(p => lines.push(`- [${p.en.title}](${SITE}/en/blog/${p.en.slug}): ${p.en.desc}`));
  lines.push('');
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
