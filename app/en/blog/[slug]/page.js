import { notFound } from 'next/navigation';
import POSTS from '../../../../lib/blog';
import { BlogPost, postMeta, findPost } from '../../../../components/Pages';
import '../../../../styles/page.css';
export const dynamicParams = false;
export function generateStaticParams() { return POSTS.map(p => ({ slug: p.en.slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const p = findPost(slug, 'en'); return p ? postMeta(p, 'en') : {}; }
export default async function Page({ params }) {
  const { slug } = await params; const p = findPost(slug, 'en');
  if (!p) notFound();
  return <BlogPost post={p} lang="en" />;
}
