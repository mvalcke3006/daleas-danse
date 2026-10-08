import { mkdir, writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve('.');
const out = join(root, 'public/og');
const tmp = join(tmpdir(), 'dd-og');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const img = (f) => `file://${join(root, 'src/assets/img', f)}`;
const P = {
  kids: img('coursinitiationjazz_daleasdanse.jpg'),
  jazz: img('coursdansemodernjazz_daleasdanseannecy.jpg'),
  duo: img('daleasdansestage-web-copyrightdaleasdanse.jpg'),
  yoga: img('coursyogaannecy-marysedaleas.jpg'),
  studio: img('espacedaleas-salle1.jpg'),
  gala: img('daleasdanse-slide4.jpg'),
  team: img('daleasdanse-contactdianeetdelphine.jpg'),
  eveil: img('cours-eveil.jpg'),
  coursEcole: img('cours-ecole-adultes.jpg'),
  adultes: img('cours-adultes-nb.jpg'),
  ados: img('cours-ados-nb.jpg'),
  enfants: img('cours-enfants-bleu.jpg'),
  rouge: img('cours-modern-jazz-rouge.jpg'),
  studioClass: img('cours-studio-nb.jpg'),
  creatif: img('espace-activites-creatives.jpg'),
  alain: img('stage-alain-gruttadauria.jpg'),
  laure: img('stage-laure-demolliere.jpg'),
  fred: img('stage-frederic-jean-baptiste.jpg'),
  pascal: img('stage-pascal-loussouarn.jpg'),
  sp1: img('spectacle-1.jpg'),
  sp2: img('spectacle-2.jpg'),
  sp3: img('spectacle-3.jpg'),
  sp5: img('spectacle-5.jpg'),
};
const figure = img('daleas-figure.png');

const cards = [
  { slug: 'accueil', home: true, left: 'École de danse privée', right: 'Annecy — depuis 1965', photos: ['duo', 'gala', 'kids', 'team', 'yoga'] },
  { slug: 'ecole', title: 'L’école', accent: 'une histoire de famille', left: 'Daléas Danse', right: 'Depuis 1965', photos: ['eveil', 'coursEcole', 'adultes', 'ados', 'team'] },
  { slug: 'horaires', title: 'Horaires', accent: '23 cours par semaine', left: 'Daléas Danse', right: 'Saison 2026 – 2027', photos: ['enfants', 'studioClass', 'rouge', 'jazz', 'kids'] },
  { slug: 'tarifs', title: 'Tarifs', accent: 'dès 18 € le cours', left: 'Daléas Danse', right: 'Saison 2026 – 2027', photos: ['sp1', 'sp5', 'sp2', 'sp3', 'gala'] },
  { slug: 'stages', title: 'Stages', accent: 'chorégraphes invités', left: 'Daléas Danse', right: 'Week-ends & été', photos: ['alain', 'laure', 'fred', 'pascal', 'duo'] },
  { slug: 'yoga', title: 'Yoga', accent: 'avec Maryse Daléas', left: 'Viniyoga', right: 'Espace Daléas, Annecy', photos: ['yoga', 'creatif', 'studio'] },
  { slug: 'location', title: 'Location', accent: 'trois studios à Annecy', left: 'Espace Daléas', right: 'Location de salles', photos: ['studio', 'creatif'] },
  { slug: 'galerie', title: 'Galerie', accent: 'la sphère en 3D', left: 'Daléas Danse', right: 'Cours, scène, studios', photos: ['sp2', 'alain', 'eveil', 'sp3', 'rouge'] },
  { slug: 'contact', title: 'Contact', accent: 'un appel suffit', left: 'Diane & Delphine', right: 'Annecy', photos: ['team', 'kids', 'sp1'] },
];

const slots = [
  { x: 9, y: 22, w: 150, r: -5, blur: 2.5, z: 1, ratio: '4/5' },
  { x: 86, y: 20, w: 210, r: 4, blur: 0, z: 3, ratio: '4/3' },
  { x: 8, y: 78, w: 200, r: -3, blur: 0, z: 3, ratio: '4/3' },
  { x: 90, y: 76, w: 140, r: 6, blur: 2.5, z: 1, ratio: '3/4' },
  { x: 30, y: 90, w: 110, r: 4, blur: 1.5, z: 1, ratio: '3/4' },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url('file://${join(root, 'public/fonts/inter.woff2')}') format('woff2'); font-weight: 100 900; }
@font-face { font-family: Inter; font-style: italic; src: url('file://${join(root, 'public/fonts/inter-italic.woff2')}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { position: relative; background: #fff; color: #000; font-family: Inter, sans-serif; -webkit-font-smoothing: antialiased; }
.spot { display: none; }
.lab { position: absolute; top: 38px; font-size: 13px; letter-spacing: .09em; text-transform: uppercase; color: #5b5b5b; z-index: 5; }
.l { left: 48px; } .r { right: 48px; }
.p { position: absolute; transform: translate(-50%, -50%); }
.p span { display: block; width: 100%; height: 100%; overflow: hidden; border-radius: 4px; box-shadow: 0 26px 44px -26px rgba(20,22,23,.5); }
.p img { width: 100%; height: 100%; object-fit: cover; display: block; }
.c { position: absolute; inset: 0; display: grid; place-items: center; z-index: 2; }
h1 { display: grid; justify-items: center; font-weight: 200; font-size: 168px; line-height: .86; letter-spacing: -.05em; text-transform: uppercase; }
h1 em { font-style: italic; font-weight: 300; font-size: 50px; letter-spacing: -.03em; margin-top: 14px; }
.home { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 34px; width: 100%; padding: 0 60px; }
.home b { font-weight: 200; font-size: 112px; letter-spacing: -.05em; text-transform: uppercase; line-height: 1; }
.home b:first-child { justify-self: end; } .home b:last-child { justify-self: start; letter-spacing: -.02em; }
.home img { height: 430px; filter: drop-shadow(0 18px 16px rgba(20,22,23,.22)); }
.mark { position: absolute; left: 48px; bottom: 34px; height: 54px; z-index: 5; }
.url { position: absolute; right: 48px; bottom: 40px; font-size: 13px; letter-spacing: .09em; text-transform: uppercase; z-index: 5; }
</style></head><body>
<div class="spot"></div>
<p class="lab l">${c.left}</p><p class="lab r">${c.right}</p>
${c.photos.map((k, i) => { const s = slots[i]; return `<div class="p" style="left:${s.x}%;top:${s.y}%;width:${s.w}px;aspect-ratio:${s.ratio};z-index:${s.z};filter:${s.blur ? `blur(${s.blur}px) saturate(.85)` : 'none'};opacity:${s.blur ? 0.85 : 1}"><span style="rotate:${s.r}deg"><img src="${P[k]}"></span></div>`; }).join('')}
<div class="c">${c.home
  ? `<div class="home"><b>Daléas</b><img src="${figure}"><b>Danse</b></div>`
  : `<h1>${c.title}${c.accent ? `<em>${c.accent}</em>` : ''}</h1>`}</div>
${c.home ? '' : `<img class="mark" src="${figure}">`}
<p class="url">daleas-danse.fr</p>
</body></html>`;

await mkdir(out, { recursive: true });
await mkdir(tmp, { recursive: true });
for (const c of cards) {
  const file = join(tmp, `${c.slug}.html`);
  const png = join(tmp, `${c.slug}.png`);
  await writeFile(file, html(c));
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--allow-file-access-from-files', '--virtual-time-budget=4000',
    '--window-size=1200,630', `--screenshot=${png}`, `file://${file}`,
  ], { stdio: 'ignore' });
  await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(join(out, `${c.slug}.jpg`));
  console.log(c.slug);
}
await rm(tmp, { recursive: true, force: true });

const paper = { r: 255, g: 255, b: 255, alpha: 1 };
const icon = async (size, file, pad = 0.12) => {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(join(root, 'src/assets/img/daleas-figure.png')).resize({ height: inner, fit: 'inside' }).toBuffer();
  const meta = await sharp(mark).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: paper } })
    .composite([{ input: mark, left: Math.round((size - meta.width) / 2), top: Math.round((size - meta.height) / 2) }])
    .png()
    .toFile(join(root, 'public', file));
};
await icon(32, 'favicon-32.png', 0.06);
await icon(180, 'apple-touch-icon.png');
await icon(192, 'icon-192.png');
await icon(512, 'icon-512.png');
await icon(512, 'icon-maskable.png', 0.2);
console.log('icons');
