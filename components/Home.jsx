import '../styles/home.css';
import HomePage from './HomePage';
import { ORG_LD } from '../lib/homeMeta';

export default function Home({ lang }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      <HomePage lang={lang} />
    </>
  );
}
