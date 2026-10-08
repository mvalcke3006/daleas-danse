import sharp from 'sharp';
import { readdir } from 'node:fs/promises';

const [src = 'src/assets/source', out = 'src/assets/img'] = process.argv.slice(2);

const grade = async (file) => {
  const base = sharp(`${src}/${file}`).normalise({ lower: 1, upper: 99.4 });
  const { channels } = await base.clone().stats();
  const means = channels.slice(0, 3).map((c) => c.mean);
  const grey = (means[0] + means[1] + means[2]) / 3;
  const balance = means.map((m) => 1 + (grey / Math.max(1, m) - 1) * 0.8);
  const contrast = 1.08;
  await base
    .linear(balance.map((b) => b * contrast), balance.map(() => -128 * (contrast - 1) + 12))
    .recomb([
      [1.04, -0.02, -0.02],
      [-0.01, 1.02, -0.01],
      [-0.03, 0.01, 1.06],
    ])
    .modulate({ saturation: 1.34, brightness: 1.06 })
    .sharpen({ sigma: 0.7, m1: 0.6, m2: 1.4 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${out}/${file}`);
};

const files = (await readdir(src)).filter((f) => /\.jpe?g$/i.test(f));
await Promise.all(files.map(grade));
console.log(`${files.length} photos`);
