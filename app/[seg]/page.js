// /ru, /de, /pl ana sayfaları + Türkçe hizmet sayfaları (/oludeniz-yamac-parasutu …)
import { notFound } from 'next/navigation';
import Home from '../../components/Home';
import { ServicePage, serviceMeta } from '../../components/Pages';
import '../../styles/page.css';
import { homeMeta } from '../../lib/homeMeta';
import { ALL, SLUG, findBySlug } from '../../lib/site';

const HOME_LANGS = ['ru', 'de', 'pl'];
export const dynamicParams = false;
export function generateStaticParams() {
  return HOME_LANGS.map(seg => ({ seg })).concat(ALL.map(x => ({ seg: SLUG[x.item.tr.n][0] })));
}
export async function generateMetadata({ params }) {
  const { seg } = await params;
  if (HOME_LANGS.includes(seg)) return homeMeta(seg);
  const e = findBySlug(seg, 'tr');
  return e ? serviceMeta(e, 'tr') : {};
}
export default async function Page({ params }) {
  const { seg } = await params;
  if (HOME_LANGS.includes(seg)) return <Home lang={seg} />;
  const e = findBySlug(seg, 'tr');
  if (!e) notFound();
  return <ServicePage entry={e} lang="tr" />;
}
