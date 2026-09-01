/**
 * Validates owner-managed artwork metadata and generates browser-ready data.
 * The generated module contains only exact, verified original and WebP paths.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTWORKS_DIR = join(ROOT, "public", "artworks");
const WEBP_DIR = join(ARTWORKS_DIR, "webp");
const METADATA_FILE = join(ROOT, "src", "data", "artworkMetadata.js");
const MANIFEST_FILE = join(__dirname, "artwork-image-manifest.json");
const OUTPUT_FILE = join(ROOT, "src", "data", "artworks.js");

const SUPPORTED_IMAGE = /\.(jpe?g|png|webp)$/i;
const HEIC_IMAGE = /\.hei[cf]$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESPONSIVE_WIDTHS = [640, 1024, 1536];
const AVAILABILITY_VALUES = [
  "Available",
  "Sold",
  "Commission Only",
  "Customisation Available",
];
const REQUIRED_STRING_FIELDS = [
  "slug",
  "title",
  "primaryImage",
  "category",
  "medium",
  "year",
  "dimensions",
  "description",
  "availability",
];

function fail(message) {
  throw new Error(`Artwork validation failed: ${message}`);
}

function encodeFilePath(directory, filename) {
  return `${directory}/${encodeURIComponent(filename)}`;
}

function optimizedFilename(filename, width) {
  const stem = filename.slice(0, -extname(filename).length);
  return `${stem}${width ? `-${width}` : ""}.webp`;
}

async function listFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function fileHash(path) {
  const contents = await readFile(path);
  return createHash("sha256").update(contents).digest("hex");
}

async function loadManifest() {
  try {
    const manifest = JSON.parse(await readFile(MANIFEST_FILE, "utf8"));
    return manifest?.version === 1 && manifest.sources ? manifest : null;
  } catch {
    return null;
  }
}

function validateMetadata(metadata, categories, originalFiles) {
  if (!Array.isArray(metadata) || metadata.length === 0) {
    fail("artworkMetadata must contain at least one artwork.");
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    fail("artworkCategories must contain at least one category.");
  }

  const originalFileLookup = new Map(
    originalFiles.map((filename) => [filename.toLowerCase(), filename]),
  );
  const slugs = new Set();
  const imageOwners = new Map();
  const optimizedStems = new Map();
  const homepageOrders = new Map();
  const heroes = [];

  for (const artwork of metadata) {
    const label = artwork?.title || artwork?.slug || "Untitled artwork";

    for (const field of REQUIRED_STRING_FIELDS) {
      if (typeof artwork?.[field] !== "string" || !artwork[field].trim()) {
        fail(`${label} must have a non-empty ${field}.`);
      }
    }

    if (!SLUG.test(artwork.slug)) {
      fail(
        `${label} has invalid slug "${artwork.slug}". Use lowercase words separated by single hyphens.`,
      );
    }

    if (slugs.has(artwork.slug)) {
      fail(`Duplicate slug "${artwork.slug}".`);
    }
    slugs.add(artwork.slug);

    if (!categories.includes(artwork.category)) {
      fail(
        `${label} uses unknown category "${artwork.category}". Choose one of: ${categories.join(", ")}.`,
      );
    }

    if (!AVAILABILITY_VALUES.includes(artwork.availability)) {
      fail(
        `${label} uses unknown availability "${artwork.availability}". Choose one of: ${AVAILABILITY_VALUES.join(", ")}.`,
      );
    }

    if (typeof artwork.featured !== "boolean") {
      fail(`${label} must set featured to true or false.`);
    }

    if (typeof artwork.hero !== "boolean") {
      fail(`${label} must set hero to true or false.`);
    }

    if (artwork.featured) {
      if (!Number.isInteger(artwork.homepageOrder) || artwork.homepageOrder < 1) {
        fail(
          `${label} is featured and must have a positive integer homepageOrder.`,
        );
      }

      const existingTitle = homepageOrders.get(artwork.homepageOrder);
      if (existingTitle) {
        fail(
          `Duplicate homepageOrder ${artwork.homepageOrder} for "${existingTitle}" and "${label}".`,
        );
      }
      homepageOrders.set(artwork.homepageOrder, label);
    } else if (artwork.homepageOrder !== null) {
      fail(`${label} is not featured, so homepageOrder must be null.`);
    }

    if (artwork.hero) {
      heroes.push(label);
      if (!artwork.featured) {
        fail(`${label} is the hero and must also set featured: true.`);
      }
    }

    const additionalImages = artwork.additionalImages ?? [];
    if (!Array.isArray(additionalImages)) {
      fail(`${label} additionalImages must be an array.`);
    }

    const filenames = [artwork.primaryImage, ...additionalImages];
    for (const filename of filenames) {
      if (typeof filename !== "string" || !filename.trim()) {
        fail(`${label} contains an empty image filename.`);
      }
      if (basename(filename) !== filename) {
        fail(`${label} image "${filename}" must be a filename, not a path.`);
      }
      if (HEIC_IMAGE.test(filename)) {
        fail(
          `${label} references HEIC file "${filename}". Convert it to PNG, JPG/JPEG, or WebP first.`,
        );
      }
      if (!SUPPORTED_IMAGE.test(filename)) {
        fail(
          `${label} image "${filename}" is unsupported. Use PNG, JPG/JPEG, or WebP.`,
        );
      }

      const actualFilename = originalFileLookup.get(filename.toLowerCase());
      if (!actualFilename) {
        fail(
          `${label} references missing image "${filename}" in public/artworks/.`,
        );
      }
      if (actualFilename !== filename) {
        fail(
          `${label} image case does not match the file on disk: use "${actualFilename}".`,
        );
      }

      const imageKey = filename.toLowerCase();
      const existingOwner = imageOwners.get(imageKey);
      if (existingOwner) {
        fail(
          `Image "${filename}" is assigned to both "${existingOwner}" and "${label}".`,
        );
      }
      imageOwners.set(imageKey, label);

      if (!/\.webp$/i.test(filename)) {
        const stem = filename.slice(0, -extname(filename).length).toLowerCase();
        const existingImage = optimizedStems.get(stem);
        if (existingImage) {
          fail(
            `Images "${existingImage}" and "${filename}" would produce the same WebP filenames. Rename one source image.`,
          );
        }
        optimizedStems.set(stem, filename);
      }
    }
  }

  if (heroes.length !== 1) {
    fail(
      `Exactly one artwork must have hero: true. Found ${heroes.length}${heroes.length ? ` (${heroes.join(", ")})` : ""}.`,
    );
  }

  return imageOwners;
}

async function buildImage(filename, optimizedFiles, manifest) {
  const image = {
    src: encodeFilePath("/artworks", filename),
  };

  if (/\.webp$/i.test(filename)) return image;

  const currentHash = await fileHash(join(ARTWORKS_DIR, filename));
  if (manifest?.sources?.[filename] !== currentHash) return image;

  const fullFilename = optimizedFilename(filename);
  if (optimizedFiles.has(fullFilename)) {
    image.optimizedSrc = encodeFilePath("/artworks/webp", fullFilename);
  }

  const srcSet = RESPONSIVE_WIDTHS.map((width) => ({
    filename: optimizedFilename(filename, width),
    width,
  }))
    .filter(({ filename: candidate }) => optimizedFiles.has(candidate))
    .map(({ filename: candidate, width }) => ({
      src: encodeFilePath("/artworks/webp", candidate),
      width,
    }));

  if (srcSet.length > 0) image.srcSet = srcSet;
  return image;
}

async function main() {
  const metadataUrl = `${pathToFileURL(METADATA_FILE).href}?generated=${Date.now()}`;
  const { artworkMetadata, artworkCategories } = await import(metadataUrl);
  const originalFiles = await listFiles(ARTWORKS_DIR);
  const optimizedFiles = new Set(await listFiles(WEBP_DIR));
  const manifest = await loadManifest();
  const imageOwners = validateMetadata(
    artworkMetadata,
    artworkCategories,
    originalFiles,
  );

  const artworks = [];
  for (const [index, metadata] of artworkMetadata.entries()) {
    const filenames = [
      metadata.primaryImage,
      ...(metadata.additionalImages ?? []),
    ];
    const images = [];
    for (const filename of filenames) {
      images.push(await buildImage(filename, optimizedFiles, manifest));
    }

    const {
      primaryImage: _primaryImage,
      additionalImages: _additionalImages,
      ...content
    } = metadata;
    artworks.push({
      id: index + 1,
      ...content,
      image: images[0],
      images,
    });
  }

  const ignoredHeic = originalFiles.filter((filename) => HEIC_IMAGE.test(filename));
  const unreferencedImages = originalFiles.filter(
    (filename) =>
      SUPPORTED_IMAGE.test(filename) && !imageOwners.has(filename.toLowerCase()),
  );

  const output = `/**
 * GENERATED FILE — DO NOT EDIT.
 * Edit src/data/artworkMetadata.js, then run npm run build.
 * Generated by scripts/generate-artworks.mjs.
 *
 * @typedef {import("../types/artwork").Artwork} Artwork
 * @typedef {import("../types/artwork").ArtworkCategory} ArtworkCategory
 */

/** @type {ArtworkCategory[]} */
export const artworkCategories = ${JSON.stringify(artworkCategories, null, 2)};

/** @type {Artwork[]} */
export const artworks = ${JSON.stringify(artworks, null, 2)};

export const homepageArtworks = artworks
  .filter((artwork) => artwork.featured)
  .sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0));

const selectedHeroArtwork = artworks.find((artwork) => artwork.hero);

if (!selectedHeroArtwork) {
  throw new Error("Generated artwork data has no hero artwork.");
}

export const heroArtwork = selectedHeroArtwork;
`;

  await writeFile(OUTPUT_FILE, output, "utf8");

  if (ignoredHeic.length > 0) {
    console.warn(
      `Ignored ${ignoredHeic.length} HEIC file(s): ${ignoredHeic.join(", ")}`,
    );
  }
  if (unreferencedImages.length > 0) {
    console.warn(
      `Ignored ${unreferencedImages.length} web-safe image(s) not listed in artworkMetadata.js: ${unreferencedImages.join(", ")}`,
    );
  }
  console.log(
    `Generated ${artworks.length} validated artworks → src/data/artworks.js`,
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
