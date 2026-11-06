import Home from '../../components/Home';
import { homeMeta } from '../../lib/homeMeta';
export const metadata = homeMeta('en');
export default function Page() { return <Home lang="en" />; }
