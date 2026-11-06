import { BlogIndex, blogIndexMeta } from '../../../components/Pages';
import '../../../styles/page.css';
export const metadata = blogIndexMeta('en');
export default function Page() { return <BlogIndex lang="en" />; }
