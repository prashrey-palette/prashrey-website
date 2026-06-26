/**
 * Scans public/artworks/ and generates src/data/artworks.js.
 * Groups variant files (Name, Name_1, Name _2, etc.) into a single artwork entry.
 * Preserves existing metadata when re-run.
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
const VARIANT_SUFFIX = /^(.+?)[\s_]+(\d+)$/i;

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

/** Normalize names so "Autumn's Lullaby", "Autumns Lullaby_1", "Radha-Krishna" group together. */
function normalizeGroupKey(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[''`´]/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/[^\w\s:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFilename(filename) {
  const ext = filename.match(/\.[^.]+$/i)?.[0] ?? "";
  const stem = filename.slice(0, -ext.length);
  const variantMatch = stem.match(VARIANT_SUFFIX);

  if (variantMatch) {
    const baseName = variantMatch[1].trim();
    return {
      filename,
      baseName,
      variant: Number.parseInt(variantMatch[2], 10),
      groupKey: normalizeGroupKey(baseName),
    };
  }

  const baseName = stem.trim();
  return {
    filename,
    baseName,
    variant: 0,
    groupKey: normalizeGroupKey(baseName),
  };
}

function imagePath(filename) {
  return `/artworks/${encodeURIComponent(filename)}`;
}

function titleFromBaseName(baseName) {
  if (/^[0-9A-F]{8}-/i.test(baseName)) {
    return null;
  }

  return baseName
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function pickDisplayBaseName(entries) {
  const primaryCandidates = entries.filter((entry) => entry.variant === 0);
  const pool = primaryCandidates.length > 0 ? primaryCandidates : entries;

  return pool
    .slice()
    .sort((a, b) => scoreBaseName(b.baseName) - scoreBaseName(a.baseName))[0]
    .baseName;
}

function scoreBaseName(name) {
  let score = 0;
  if (/['']/.test(name)) score += 20;
  if (!/-/.test(name)) score += 10;
  if (/^[A-Z]/.test(name)) score += 5;
  return score + name.length * 0.01;
}

function escapeString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function loadExistingMetadata() {
  try {
    const content = await readFile(OUTPUT, "utf8");
    const map = new Map();
    const blockRegex =
      /\{[\s\S]*?id:\s*(\d+),[\s\S]*?title:\s*"([^"]*)"[\s\S]*?category:\s*"([^"]*)"[\s\S]*?medium:\s*"([^"]*)"[\s\S]*?year:\s*"([^"]*)"[\s\S]*?dimensions:\s*"([^"]*)"[\s\S]*?image:\s*"\/artworks\/([^"]+)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?featured:\s*(true|false)/g;

    let match;
    while ((match = blockRegex.exec(content)) !== null) {
      const primaryFilename = decodeURIComponent(match[7]);
      const parsed = parseFilename(primaryFilename);
      const meta = {
        id: Number.parseInt(match[1], 10),
        title: match[2],
        category: match[3],
        medium: match[4],
        year: match[5],
        dimensions: match[6],
        description: match[8],
        featured: match[9] === "true",
      };

      if (
        meta.description === "true" ||
        meta.description === "false" ||
        meta.description.length < 3
      ) {
        continue;
      }

      map.set(parsed.groupKey, meta);
      map.set(normalizeGroupKey(meta.title), meta);
    }

    return map;
  } catch {
    return new Map();
  }
}

function groupFiles(files) {
  const groups = new Map();

  for (const filename of files) {
    const parsed = parseFilename(filename);
    if (!groups.has(parsed.groupKey)) {
      groups.set(parsed.groupKey, []);
    }
    groups.get(parsed.groupKey).push(parsed);
  }

  return [...groups.entries()]
    .map(([groupKey, entries]) => {
      entries.sort((a, b) => {
        if (a.variant !== b.variant) return a.variant - b.variant;
        return a.filename.localeCompare(b.filename, undefined, {
          sensitivity: "base",
        });
      });

      const images = entries.map((entry) => imagePath(entry.filename));

      return {
        groupKey,
        baseName: pickDisplayBaseName(entries),
        primaryFilename: entries[0].filename,
        images,
      };
    })
    .sort((a, b) =>
      a.baseName.localeCompare(b.baseName, undefined, {
        sensitivity: "base",
      }),
    );
}

async function main() {
  const files = (await readdir(ARTWORKS_DIR))
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const existing = await loadExistingMetadata();
  const groups = groupFiles(files);
  let untitledCount = 0;

  const artworks = groups.map((group, index) => {
    const saved = existing.get(group.groupKey);
    const derivedTitle = titleFromBaseName(group.baseName);
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
      image: group.images[0],
      images: group.images,
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
 *   - Base image:   My Artwork.PNG
 *   - Extra views:  My Artwork_1.PNG, My Artwork _2.PNG  (grouped automatically)
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
    .map((a) => {
      const imagesField =
        a.images.length > 1
          ? `\n    images: [\n${a.images.map((img) => `      "${img}",`).join("\n")}\n    ],`
          : "";

      return `  {
    id: ${a.id},
    title: "${escapeString(a.title)}",
    category: "${escapeString(a.category)}",
    medium: "${escapeString(a.medium)}",
    year: "${escapeString(a.year)}",
    dimensions: "${escapeString(a.dimensions)}",
    image: "${a.image}",${imagesField}
    description: "${escapeString(a.description)}",
    featured: ${a.featured},
  }`;
    })
    .join(",\n");

  const footer = `
];
`;

  await writeFile(OUTPUT, header + body + footer, "utf8");
  console.log(
    `Generated ${artworks.length} artworks from ${files.length} images → src/data/artworks.js`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
