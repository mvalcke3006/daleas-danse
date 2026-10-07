import { site, navigation } from '../data/site';

export function GET() {
  const paths = ['/', ...navigation.map((n) => n.href), '/mentions-legales/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
