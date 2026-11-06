import { notFound } from 'next/navigation';
import { ServicePage, serviceMeta } from '../../../components/Pages';
import '../../../styles/page.css';
import { ALL, SLUG, findBySlug } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return ALL.map(x => ({ slug: SLUG[x.item.tr.n][1] })); }
export async function generateMetadata({ params }) { const { slug } = await params; const e = findBySlug(slug, 'en'); return e ? serviceMeta(e, 'en') : {}; }
export default async function Page({ params }) {
  const { slug } = await params; const e = findBySlug(slug, 'en');
  if (!e) notFound();
  return <ServicePage entry={e} lang="en" />;
}
