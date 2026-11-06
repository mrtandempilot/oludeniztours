import { SITE } from '../lib/site';
export default function robots() {
  const ai = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Bingbot'];
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin'] }, ...ai.map(a => ({ userAgent: a, allow: '/', disallow: ['/admin'] }))],
    sitemap: SITE + '/sitemap.xml',
  };
}
