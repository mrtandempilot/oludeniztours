import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'THE EYE — Generative Visual Performance',
  description: 'Real-time control surface for generative audiovisual performance.',
};

export const viewport: Viewport = {
  themeColor: '#040406',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
