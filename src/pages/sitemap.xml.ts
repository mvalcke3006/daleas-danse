import type { APIRoute } from 'astro';
import { site } from '../data/site';

const pages = import.meta.glob('./**/*.astro', { eager: false });

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const origin = (process.env.SITE_URL || site.url).replace(/\/$/, '');
  const urls = Object.keys(pages)
    .map((f) => f.replace(/^\.\//, '').replace(/\.astro$/, ''))
    .filter((f) => f !== '404' && !f.includes('['))
    .map((f) => (f === 'index' ? '/' : `/${f.replace(/\/index$/, '')}/`))
    .sort((a, b) => a.length - b.length);
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `  <url><loc>${origin}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : u.includes('mentions') ? '0.2' : '0.8'}</priority></url>`)
      .join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
