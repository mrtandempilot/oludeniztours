import type { Metadata } from 'next';
import OutputView from '@/components/OutputView';

export const metadata: Metadata = { title: 'THE EYE — Output' };

export default function OutputPage() {
  return <OutputView />;
}
