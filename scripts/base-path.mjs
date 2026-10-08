import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const [dir = 'dist', rawBase = '/'] = process.argv.slice(2);
const base = '/' + rawBase.replace(/^\/+|\/+$/g, '');
if (base === '/') process.exit(0);

const prefix = (url) => (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(base + '/') ? base + url : url);

const rewriteHtml = (html) =>
  html
    .replace(/\b(href|src|action|poster|content|data-img|data-src)="(\/[^"]*)"/g, (m, attr, url) =>
      attr === 'content' && !url.startsWith('/') ? m : `${attr}="${prefix(url)}"`)
    .replace(/\bsrcset="([^"]*)"/g, (m, set) =>
      `srcset="${set.split(',').map((part) => part.trim().replace(/^(\S+)/, (u) => prefix(u))).join(', ')}"`)
    .replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (m, q, url) => `url(${q}${prefix(url)}${q})`);

const rewriteCss = (css) => css.replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (m, q, url) => `url(${q}${prefix(url)}${q})`);

const walk = async (d) => {
  for (const entry of await readdir(d, { withFileTypes: true })) {
    const p = join(d, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (extname(p) === '.html') await writeFile(p, rewriteHtml(await readFile(p, 'utf8')));
    else if (extname(p) === '.css') await writeFile(p, rewriteCss(await readFile(p, 'utf8')));
  }
};
await walk(dir);
