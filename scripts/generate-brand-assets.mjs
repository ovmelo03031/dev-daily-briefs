// Generate brand assets from the source logo image.
// - Crops the shield icon (left portion of the landscape logo) for favicons
// - Copies the full logo for use in Header / OG image / README
//
// Usage: node scripts/generate-brand-assets.mjs <source.png>

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir, copyFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = process.argv[2] ?? resolve(root, 'Gemini_Generated_Image_ehfsw6ehfsw6ehfs.png');

const publicDir = resolve(root, 'public');
const brandDir = resolve(root, 'src/assets/brand');

await mkdir(publicDir, { recursive: true });
await mkdir(brandDir, { recursive: true });

// Inspect source
const meta = await sharp(src).metadata();
console.log(`Source: ${meta.width}x${meta.height}`);

// The shield icon sits on the LEFT portion of the landscape image.
// Crop bounding box (tuned for the Gemini-generated logo, ~1408x768).
// We take a square region centered on the shield.
// Shield visual center ≈ x:480, y:390. Square size ≈ 360.
const SHIELD = { left: 310, top: 220, width: 290, height: 290 };

// 1. Full logo → src/assets/brand/logo.png (untouched) + og-image.png (trimmed)
await copyFile(src, resolve(brandDir, 'logo.png'));
console.log('✓ src/assets/brand/logo.png');

// 2. Horizontal wordmark trimmed of excess background for header use
// Keep roughly the centered logo band (trim top/bottom empty space)
await sharp(src)
  .extract({ left: 160, top: 140, width: 1100, height: 500 })
  .resize({ height: 120, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(resolve(brandDir, 'logo-wordmark.png'));
console.log('✓ src/assets/brand/logo-wordmark.png (120px tall for header)');

// 3. Favicon square variants — cropped shield only
for (const size of [16, 32, 48, 64, 192, 512]) {
  await sharp(src)
    .extract(SHIELD)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(resolve(publicDir, `favicon-${size}.png`));
}
console.log('✓ public/favicon-{16,32,48,64,192,512}.png');

// 4. Default favicon.png (32x32 is the sweet spot)
await sharp(src)
  .extract(SHIELD)
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, 'favicon.png'));
console.log('✓ public/favicon.png (32x32)');

// 5. Apple touch icon (180x180)
await sharp(src)
  .extract(SHIELD)
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, 'apple-touch-icon.png'));
console.log('✓ public/apple-touch-icon.png (180x180)');

// 6. OG image (1200x630 recommended by OpenGraph spec)
// Compose: full logo centered on a dark backdrop
await sharp(src)
  .resize(1200, 630, { fit: 'contain', background: { r: 11, g: 15, b: 26, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, 'og-image.png'));
console.log('✓ public/og-image.png (1200x630 OG)');

console.log('\nAll brand assets generated ✓');
