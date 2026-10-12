import sharp from 'sharp';
import { readdir } from 'node:fs/promises';

const [src = 'src/assets/source', out = 'src/assets/img'] = process.argv.slice(2);

const TARGET_SAT = 0.24;
const TARGET_LUM = 0.55;
const TONE = [
  [1.05, 0.02, -0.03],
  [0.01, 1.0, -0.01],
  [-0.03, 0.03, 0.92],
];

const measure = async (img) => {
  const { data, info } = await img.clone().resize(96, 96, { fit: 'inside' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let s = 0, l = 0;
  const n = info.width * info.height;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    s += mx === 0 ? 0 : (mx - mn) / mx;
    l += 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  return { sat: s / n, lum: l / n };
};

const grade = async (file) => {
  const meta = await sharp(`${src}/${file}`).metadata();
  const width = meta.width < 1400 ? Math.min(meta.width * 2, 1600) : Math.min(meta.width, 2000);
  const base = sharp(`${src}/${file}`).resize({ width, kernel: 'lanczos3' }).normalise({ lower: 1, upper: 99.4 });

  const { channels } = await base.clone().stats();
  const means = channels.slice(0, 3).map((c) => c.mean);
  const grey = (means[0] + means[1] + means[2]) / 3;
  const balance = means.map((m) => 1 + (grey / Math.max(1, m) - 1) * 0.85);
  const balanced = sharp(await base.clone().linear(balance, [0, 0, 0]).toBuffer());

  const { sat, lum } = await measure(balanced);
  const mono = sat < 0.15;
  const satK = mono ? 0 : Math.min(1.7, Math.max(0.55, TARGET_SAT / Math.max(0.01, sat)));
  const lumK = Math.min(1.25, Math.max(0.85, TARGET_LUM / Math.max(0.05, lum)));

  let img = balanced
    .modulate({ saturation: mono ? 0 : satK, brightness: lumK })
    .linear(0.96, 8);
  if (!mono) img = img.recomb(TONE);

  await img
    .sharpen({ sigma: width > meta.width ? 1.1 : 0.7, m1: 0.8, m2: 1.8 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${out}/${file}`);
  return `${file} ${mono ? 'n&b' : `sat ${sat.toFixed(2)}→×${satK.toFixed(2)}`} lum ${lum.toFixed(2)}→×${lumK.toFixed(2)}`;
};

const files = (await readdir(src)).filter((f) => /\.jpe?g$/i.test(f));
for (const f of files) console.log(await grade(f));
