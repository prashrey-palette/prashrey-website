/**
 * Scans public/artworks/ and generates src/data/artworks.js.
 * Preserves existing metadata (title, category, etc.) when re-run.
 *
 * Usage: node scripts/generate-artworks.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTWORKS_DIR = join(ROOT, "public", "artworks");
const OUTPUT = join(ROOT, "src", "data", "artworks.js");

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;

const CATEGORIES = [
  "Acrylic",
  "Watercolor",
  "Oil",
  "Sketch",
  "Mixed Media",
  "Digital Art",
];

const CATEGORY_MEDIUM = {
  Acrylic: "Acrylic on canvas",
  Watercolor: "Watercolor on paper",
  Oil: "Oil on canvas",
  Sketch: "Graphite and ink on paper",
  "Mixed Media": "Mixed media on board",
  "Digital Art": "Digital illustration",
};

function titleFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  if (/^[0-9A-F]{8}-/i.test(base)) {
    return null;
  }
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function imagePath(filename) {
  return `/artworks/${encodeURIComponent(filename)}`;
}

async function loadExistingMetadata() {
  try {
    const content = await readFile(OUTPUT, "utf8");
    const map = new Map();
    const entryRegex =
      /image:\s*"\/artworks\/([^"]+)"[\s\S]*?title:\s*"([^"]*)"[\s\S]*?category:\s*"([^"]*)"[\s\S]*?medium:\s*"([^"]*)"[\s\S]*?year:\s*"([^"]*)"[\s\S]*?dimensions:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?featured:\s*(true|false)/g;
    let match;
    while ((match = entryRegex.exec(content)) !== null) {
      const encoded = match[1];
      const filename = decodeURIComponent(encoded);
      map.set(filename, {
        title: match[2],
        category: match[3],
        medium: match[4],
        year: match[5],
        dimensions: match[6],
        description: match[7],
        featured: match[8] === "true",
      });
    }
    return map;
  } catch {
    return new Map();
  }
}

function escapeString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function main() {
  const files = (await readdir(ARTWORKS_DIR))
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => {
      const aNamed = !/^[0-9A-F]{8}-/i.test(a);
      const bNamed = !/^[0-9A-F]{8}-/i.test(b);
      if (aNamed !== bNamed) return aNamed ? -1 : 1;
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    });

  const existing = await loadExistingMetadata();
  let untitledCount = 0;

  const artworks = files.map((filename, index) => {
    const saved = existing.get(filename);
    const derivedTitle = titleFromFilename(filename);
    const category =
      saved?.category && CATEGORIES.includes(saved.category)
        ? saved.category
        : CATEGORIES[index % CATEGORIES.length];

  if (!derivedTitle) untitledCount += 1;

    const defaultTitle =
      derivedTitle ?? `Studio Piece ${String(untitledCount).padStart(2, "0")}`;

    return {
      id: index + 1,
      title: saved?.title ?? defaultTitle,
      category,
      medium: saved?.medium ?? CATEGORY_MEDIUM[category],
      year: saved?.year ?? "2025",
      dimensions: saved?.dimensions ?? "—",
      image: imagePath(filename),
      description:
        saved?.description ??
        (derivedTitle
          ? `A studio work titled "${defaultTitle}". Update this description in src/data/artworks.js.`
          : "Placeholder entry — update the title, category, and description in src/data/artworks.js."),
      featured: saved?.featured ?? index < 6,
    };
  });

  const header = `/**
 * Artwork gallery data for Prashrey Palette Art Studio.
 *
 * ADD NEW IMAGES: drop files into public/artworks/
 * EDIT METADATA: update title, category, medium, year, dimensions, description below
 * REGENERATE LIST: npm run generate:artworks (preserves your metadata edits)
 *
 * @typedef {import("../types/artwork").Artwork} Artwork
 * @typedef {import("../types/artwork").ArtworkCategory} ArtworkCategory
 */

/** @type {ArtworkCategory[]} */
export const artworkCategories = ${JSON.stringify(CATEGORIES, null, 2)};

/** @type {Artwork[]} */
export const artworks = [
`;

  const body = artworks
    .map(
      (a) => `  {
    id: ${a.id},
    title: "${escapeString(a.title)}",
    category: "${escapeString(a.category)}",
    medium: "${escapeString(a.medium)}",
    year: "${escapeString(a.year)}",
    dimensions: "${escapeString(a.dimensions)}",
    image: "${a.image}",
    description: "${escapeString(a.description)}",
    featured: ${a.featured},
  }`,
    )
    .join(",\n");

  const footer = `
];
`;

  await writeFile(OUTPUT, header + body + footer, "utf8");
  console.log(`Generated ${artworks.length} artworks → src/data/artworks.js`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
