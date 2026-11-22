// Canlı kamera sayfası — yayın VPS'teki MediaMTX'ten HLS olarak gelir.
// Yayın adresi Vercel'de NEXT_PUBLIC_CAMERA_HLS ortam değişkeninde (örn. https://kamera.alanadi.com/cam/index.m3u8)
import LiveCam from '../../components/LiveCam';
import { WA } from '../../lib/catalog';
import '../../styles/page.css';

export const metadata = {
  title: 'Ölüdeniz Canlı Kamera — Şu An Ölüdeniz | Oludeniz Tours',
  description: 'Ölüdeniz’i canlı izleyin: hava, deniz ve yamaç paraşütü koşullarını anlık görün. Rezervasyon için WhatsApp’tan yazın.',
  alternates: { canonical: '/canli' },
};

export default function Page() {
  const src = process.env.NEXT_PUBLIC_CAMERA_HLS || '';
  const wa = WA + encodeURIComponent('Merhaba, canlı kamerayı izledim, rezervasyon yapmak istiyorum.');
  return (
    <div className="sp">
      <header><div className="hw">
        <a className="logo" href="/"><span>☀</span>Oludeniz<i>Tours</i></a>
        <div className="sp-r"><a className="hwa" href={wa}>WhatsApp</a></div>
      </div></header>
      <main>
        <div className="bc"><a href="/">Ana Sayfa</a> › Canlı Kamera</div>
        <h1>Ölüdeniz Canlı Kamera</h1>
        <p className="loc">Şu an Ölüdeniz nasıl? Hava ve deniz durumunu canlı izleyin.</p>
        <LiveCam src={src} />
        <a className="cta" href={wa}>💬 WhatsApp ile Rezervasyon</a>
        <div className="box">
          <h2>Bu yayın hakkında</h2>
          <p>Görüntü birkaç saniye gecikmeli gelir. Yayın açılmazsa sayfayı yenileyin; kamera geçici olarak kapalı olabilir.</p>
        </div>
      </main>
      <footer><a href="/">Ana Sayfa</a><a href="/iletisim">İletişim</a></footer>
    </div>
  );
}
