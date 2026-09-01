/**
 * Generates exact responsive WebP variants for metadata-declared PNG/JPG images.
 * A content-hash manifest prevents stale WebPs after an original is replaced.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTWORKS_DIR = join(ROOT, "public", "artworks");
const WEBP_DIR = join(ARTWORKS_DIR, "webp");
const METADATA_FILE = join(ROOT, "src", "data", "artworkMetadata.js");
const MANIFEST_FILE = join(__dirname, "artwork-image-manifest.json");

const CONVERTIBLE_IMAGE = /\.(jpe?g|png)$/i;
const WIDTHS = [640, 1024, 1536];

function optimizedFilename(filename, width) {
  const stem = filename.slice(0, -extname(filename).length);
  return `${stem}${width ? `-${width}` : ""}.webp`;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function fileHash(path) {
  const contents = await readFile(path);
  return createHash("sha256").update(contents).digest("hex");
}

async function loadManifest() {
  try {
    const manifest = JSON.parse(await readFile(MANIFEST_FILE, "utf8"));
    if (manifest?.version === 1 && manifest.sources) return manifest;
  } catch {
    // A missing or invalid manifest safely causes declared images to regenerate.
  }
  return { version: 1, sources: {} };
}

async function main() {
  const sharp = (await import("sharp")).default;
  const metadataUrl = `${pathToFileURL(METADATA_FILE).href}?optimized=${Date.now()}`;
  const { artworkMetadata } = await import(metadataUrl);
  const filenames = [
    ...new Set(
      artworkMetadata.flatMap((artwork) => [
        artwork.primaryImage,
        ...(artwork.additionalImages ?? []),
      ]),
    ),
  ].filter((filename) => CONVERTIBLE_IMAGE.test(filename));

  await mkdir(WEBP_DIR, { recursive: true });
  const previousManifest = await loadManifest();
  const nextManifest = { version: 1, sources: {} };
  let optimizedCount = 0;
  let unchangedCount = 0;

  for (const filename of filenames) {
    const input = join(ARTWORKS_DIR, filename);
    const hash = await fileHash(input);
    const outputs = [
      optimizedFilename(filename),
      ...WIDTHS.map((width) => optimizedFilename(filename, width)),
    ];
    const outputsExist = (
      await Promise.all(outputs.map((output) => exists(join(WEBP_DIR, output))))
    ).every(Boolean);

    if (previousManifest.sources[filename] === hash && outputsExist) {
      unchangedCount += 1;
      nextManifest.sources[filename] = hash;
      continue;
    }

    for (const width of WIDTHS) {
      await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(join(WEBP_DIR, optimizedFilename(filename, width)));
      optimizedCount += 1;
    }

    await sharp(input)
      .rotate()
      .webp({ quality: 85, effort: 4 })
      .toFile(join(WEBP_DIR, optimizedFilename(filename)));
    optimizedCount += 1;
    nextManifest.sources[filename] = hash;
  }

  await writeFile(
    MANIFEST_FILE,
    `${JSON.stringify(nextManifest, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `Image optimization complete: ${optimizedCount} file(s) written, ${unchangedCount} source image(s) already current.`,
  );
}

main().catch((error) => {
  console.error(`Image optimization failed: ${error.message || error}`);
  process.exit(1);
});
