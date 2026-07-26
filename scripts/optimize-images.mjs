/**
 * Generates responsive WebP versions of artwork images for faster loading.
 * Requires: npm install sharp --save-dev
 *
 * Usage: npm run optimize:images
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTWORKS_DIR = join(ROOT, "public", "artworks");
const WEBP_DIR = join(ARTWORKS_DIR, "webp");

const IMAGE_EXT = /\.(jpe?g|png)$/i;
const WIDTHS = [640, 1024, 1536];

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn(
      "Skipping image optimization — install sharp: npm install --save-dev sharp",
    );
    process.exit(0);
  }

  await mkdir(WEBP_DIR, { recursive: true });

  const files = (await readdir(ARTWORKS_DIR)).filter(
    (f) => IMAGE_EXT.test(f) && f !== "webp",
  );

  let converted = 0;
  for (const file of files) {
    const input = join(ARTWORKS_DIR, file);
    const base = file.replace(/\.[^.]+$/, "");
    const inputStat = await stat(input);

    for (const width of WIDTHS) {
      const output = join(WEBP_DIR, `${base}-${width}.webp`);
      try {
        const outputStat = await stat(output);
        if (outputStat.mtimeMs >= inputStat.mtimeMs) continue;
      } catch {
        /* convert */
      }

      await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      converted += 1;
    }

    const fullOutput = join(WEBP_DIR, `${base}.webp`);
    try {
      const outputStat = await stat(fullOutput);
      if (outputStat.mtimeMs < inputStat.mtimeMs) {
        await sharp(input)
          .rotate()
          .webp({ quality: 85, effort: 4 })
          .toFile(fullOutput);
        converted += 1;
      }
    } catch {
      await sharp(input)
        .rotate()
        .webp({ quality: 85, effort: 4 })
        .toFile(fullOutput);
      converted += 1;
    }
  }

  console.log(`Optimized ${converted} WebP files → public/artworks/webp/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
