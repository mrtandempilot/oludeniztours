/** @type {import('next').NextConfig} */
const legal = ['iletisim', 'iptal-iade', 'gizlilik', 'kullanim-sartlari'];
export default {
  async rewrites() {
    return legal.map(p => ({ source: '/' + p, destination: '/' + p + '.html' }));
  },
  async redirects() {
    return [{ source: '/index.html', destination: '/', permanent: true }]
      .concat(legal.map(p => ({ source: '/' + p + '.html', destination: '/' + p, permanent: true })));
  },
};
