import './globals.css';

export const metadata = {
  metadataBase: new URL('https://oludeniztours.vercel.app'),
  icons: { icon: '/favicon.svg' },
};
export const viewport = { themeColor: '#0ea5e9', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
