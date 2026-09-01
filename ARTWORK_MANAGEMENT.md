# Artwork Management

This is the owner guide for managing artwork on the Prashrey Palette website. For normal artwork changes, you only need to add or remove files in `public/artworks/`, edit `src/data/artworkMetadata.js`, and then commit and push.

## Quick Start Cheat Sheet

### Add a new artwork

**File to edit:** Add the image to `public/artworks/`, then edit `src/data/artworkMetadata.js`.

**What to change:** Add one new metadata object at the end of `artworkMetadata` and set `primaryImage` to the image's exact filename.

**Example:** Add `public/artworks/new-artwork.png`, then add an object with `slug: "new-artwork"` and `primaryImage: "new-artwork.png"`.

### Remove an artwork

**File to edit:** `src/data/artworkMetadata.js` and `public/artworks/`.

**What to change:** Delete the artwork's entire metadata object and delete its original image files. Run `npm run build` afterward.

**Example:** Remove the object whose `slug` is `"new-artwork"`, then delete `public/artworks/new-artwork.png`.

### Change an artwork image

**File to edit:** Replace the image in `public/artworks/`.

**What to change:** The safest method is to keep the same filename and replace the file contents. The build detects the content change and regenerates the WebPs.

**Example:** Replace `public/artworks/new-artwork.png` with the new image, keeping the name `new-artwork.png`.

### Change an artwork title

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** Change only the object's `title`. Usually leave `slug` unchanged so the artwork's web address stays stable.

**Example:** `title: "New Artwork"` becomes `title: "Morning Light"`.

### Change dimensions

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** Change the object's `dimensions` string.

**Example:** `dimensions: '24" × 18"'`.

### Change the description

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** Change the object's `description` string.

**Example:** `description: "A quiet study of light and texture."`.

### Change availability or status

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** Change `availability` to one of `"Available"`, `"Sold"`, `"Commission Only"`, or `"Customisation Available"`.

**Example:** `availability: "Sold"`.

### Show or hide an artwork on the homepage

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** To show it, use `featured: true` and give it a unique positive `homepageOrder`. To hide it, use `featured: false` and `homepageOrder: null`.

**Example:** Show it with `featured: true, homepageOrder: 3`; hide it with `featured: false, homepageOrder: null`.

### Change homepage artwork order

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** Change the unique `homepageOrder` numbers on featured artworks. Lower numbers appear first.

**Example:** `homepageOrder: 1` appears before `homepageOrder: 2`.

### Change the “On the easel” hero artwork

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** Set the old hero's `hero` to `false`, then set the new hero's `hero` to `true`. The new hero must also have `featured: true` and a valid `homepageOrder`.

**Example:** Set Shiva-Shakti to `hero: false`, then set another featured artwork to `hero: true`. Exactly one artwork may be the hero.

### Remove an artwork from the homepage but keep it in the full portfolio

**File to edit:** `src/data/artworkMetadata.js`.

**What to change:** Keep the metadata object and image, but set `featured: false`, `homepageOrder: null`, and `hero: false`.

**Example:**

```js
featured: false,
homepageOrder: null,
hero: false,
```

## 1. Adding a New Artwork

1. Prepare a PNG, JPG/JPEG, or WebP image. PNG or high-quality JPG is recommended because the build automatically creates optimized WebPs from it.
2. Give it a lowercase, hyphen-separated filename when practical, such as `morning-light.png`. Existing filenames with spaces still work, but simple filenames are safer.
3. Put the original file directly in `public/artworks/`. Do not put it in `public/artworks/webp/`.
4. Open `src/data/artworkMetadata.js`.
5. Copy this object and add it at the end of the `artworkMetadata` array, before the closing `];`:

```js
{
  slug: "new-artwork",
  title: "New Artwork",
  primaryImage: "new-artwork.png",
  additionalImages: [],
  category: "Acrylic",
  medium: "Acrylic on canvas",
  year: "2026",
  dimensions: '24" × 18"',
  description: "Describe the artwork here.",
  featured: false,
  homepageOrder: null,
  hero: false,
  availability: "Available",
},
```

6. Make `slug` unique. Use only lowercase letters, numbers, and single hyphens. The slug becomes the stable detail-page address, for example `/portfolio/new-artwork`.
7. Make `primaryImage` exactly match the filename, including uppercase/lowercase letters and the extension.
8. To add extra gallery views, put those files in `public/artworks/` and list their exact filenames in order:

```js
additionalImages: ["new-artwork-detail.png", "new-artwork-side.png"],
```

9. Choose a category already listed in `artworkCategories` at the top of the same file: currently `"Acrylic"`, `"Pichwai"`, or `"Mixed Media"`.
10. Set `featured: true` and a unique positive `homepageOrder` only if it should appear on the homepage.
11. Set `hero: true` only if it should be “On the easel.” First set the previous hero to `false`; there must be exactly one hero.
12. Set `availability` to `"Available"`, `"Sold"`, `"Commission Only"`, or `"Customisation Available"`.
13. Run `npm run build`.

All fields in the template are required except `additionalImages`, which may be omitted. Keeping it as an empty array makes the setup easier to understand.

During `npm run build`, the prebuild validates the metadata and filenames, generates or refreshes PNG/JPG-to-WebP versions, and regenerates `src/data/artworks.js`. TypeScript and Vite then compile the website into `dist/`.

## 2. Homepage Management

The full portfolio and the homepage are controlled separately.

```js
featured: true,
homepageOrder: 1,
```

means the artwork appears on the homepage.

```js
featured: false,
homepageOrder: null,
```

means it does not appear on the homepage. This does **not** remove it from the full portfolio. Every valid object in `artworkMetadata` appears in the full portfolio whether `featured` is `true` or `false`.

The homepage does not use file order and does not silently limit the list. Every artwork explicitly marked `featured: true` is displayed.

## 3. Homepage Ordering

Featured artworks are sorted from the smallest `homepageOrder` to the largest:

```js
// Shiva-Shakti
featured: true,
homepageOrder: 1,

// Elephantine
featured: true,
homepageOrder: 2,

// Gajanana
featured: true,
homepageOrder: 3,
```

This produces the order Shiva-Shakti, Elephantine, Gajanana.

Each featured artwork must have a positive whole number. The numbers do not have to be consecutive, but consecutive numbers are easiest to manage. If two artworks have the same number, the build stops with an error similar to:

```text
Artwork validation failed: Duplicate homepageOrder 2 for "Artwork A" and "Artwork B".
```

An unfeatured artwork must use `homepageOrder: null`.

## 4. Changing the “On the easel” Hero Artwork

The hero is selected only by this field:

```js
hero: true,
```

You do not need to edit `HeroSection.tsx`.

To change the hero:

1. Find the current `hero: true` object and change it to `hero: false`.
2. Find the new artwork and change it to `hero: true`.
3. Make sure the new hero also has `featured: true` and a unique positive `homepageOrder`.
4. Run `npm run build`.

Exactly one artwork must have `hero: true`. The build stops with a clear error if it finds zero or more than one. Shiva-Shakti is the current hero.

## 5. Images and Optimization

### Supported original formats

- PNG: supported and automatically optimized.
- JPG/JPEG: supported and automatically optimized.
- WebP: supported and used directly; it is already web-optimized, so the script does not create more WebPs from it.
- HEIC/HEIF: ignored as source-directory leftovers and forbidden in metadata.

PNG or a high-quality JPG is recommended for an original. Prefer lowercase, slug-like names such as:

```text
shiva-shakti.png
morning-light.jpg
```

Existing legacy names such as `Shiva Shakti.PNG` continue to work because the metadata records the exact filename.

Originals go in:

```text
public/artworks/
```

Generated WebPs go in:

```text
public/artworks/webp/
```

For a PNG/JPG such as `Shiva Shakti.PNG`, the build creates exact variants such as:

```text
Shiva Shakti.webp
Shiva Shakti-640.webp
Shiva Shakti-1024.webp
Shiva Shakti-1536.webp
```

The optimizer records the original file's content hash in `scripts/artwork-image-manifest.json`. If the original content changes, all four WebPs are regenerated. If it has not changed, optimization is skipped. The generated artwork data includes a WebP path only after the exact file exists and its hash matches the original. `OptimizedImage` never guesses a filename; if an optimized request still fails in the browser, it retries with the original.

You never need to manually create or edit files in `public/artworks/webp/`.

### HEIC and HEIF

HEIC/HEIF must never be used in `primaryImage` or `additionalImages`. Browsers are not expected to display them reliably, and the build rejects such a metadata reference.

If you want to use a HEIC photo:

1. Convert it to PNG, JPG/JPEG, or WebP outside this project.
2. Put the converted file in `public/artworks/`.
3. Reference only the converted filename in `artworkMetadata.js`.

You may delete the old HEIC. If you keep it in `public/artworks/`, it is safely ignored and the build prints an `Ignored ... HEIC file(s)` warning. The current Shiva-Shakti and Kaashi HEIC files are kept but ignored; their PNGs are the browser-facing images.

## 6. Replacing an Existing Artwork Image

The safest replacement process is:

1. Find the artwork's `primaryImage` in `src/data/artworkMetadata.js`.
2. Replace that file in `public/artworks/` while keeping exactly the same filename.
3. Run `npm run build`.
4. Confirm the build reports image optimization and succeeds.

Do not delete or edit the existing WebPs. The content hash detects the replacement and regenerates them.

If you intentionally use a new filename instead:

1. Add the new file to `public/artworks/`.
2. Update `primaryImage` to the new exact filename.
3. Delete the old original if it is no longer used; otherwise the build warns that it is an unreferenced web-safe image.
4. Run `npm run build`.

Old unreferenced WebPs may remain in `public/artworks/webp/`, but they cannot be selected because generated data contains paths only for the metadata-declared image.

## 7. Artwork Dimensions

Dimensions are normal JavaScript strings. These formats all work:

```js
dimensions: '24" × 18"',
dimensions: '36" × 24"',
dimensions: '3.5 ft × 2.5 ft',
```

Use the multiplication sign `×` for a clean display. Single quotes around the string allow the double-quote marks to represent inches without escaping them in the metadata file.

## 8. Full Portfolio

The “Show Full Portfolio” page displays every valid object in the `artworkMetadata` array, in the same order as the objects in that file.

- Add to the full portfolio: add the original image and a metadata object.
- Remove from the full portfolio: remove the metadata object and its original image files.
- Keep in the portfolio but hide from the homepage: keep the object and image, then set `featured: false`, `homepageOrder: null`, and `hero: false`.

Dropping an image into `public/artworks/` by itself does not create an artwork. This prevents accidental filenames or directory order from changing the portfolio.

## 9. Generated Files — Do Not Edit

> ⚠️ **DO NOT EDIT `src/data/artworks.js` MANUALLY. IT IS REGENERATED DURING EVERY BUILD.**

Edit this file instead:

```text
src/data/artworkMetadata.js
```

Also do not manually edit:

```text
public/artworks/webp/*.webp
scripts/artwork-image-manifest.json
dist/
```

These are generated from the originals and metadata. It is normal to see changed generated WebPs or a changed manifest in Git after replacing an image and running a build.

For normal artwork management, do not edit `HeroSection.tsx`, homepage components, `OptimizedImage.tsx`, `prebuild.mjs`, or `artworks.js`.

## 10. Local Testing

Install dependencies once:

```bash
npm install
```

Start the local website:

```bash
npm run dev
```

The `predev` step automatically validates metadata, optimizes changed images, and regenerates artwork data before Vite starts. Open the Local URL printed in the terminal, normally `http://localhost:5173`.

Before committing, run the production build:

```bash
npm run build
```

A successful build means:

1. Artwork metadata and image references passed validation.
2. Changed or missing WebPs were generated.
3. `src/data/artworks.js` was regenerated.
4. TypeScript found no compile errors.
5. Vite created the deployable `dist/` site.

Warnings that HEIC files were ignored are expected and safe. An error beginning with `Artwork validation failed:` must be fixed.

## 11. Render Deployment

The normal deployment workflow is:

```bash
npm run build
git add .
git commit -m "Update artworks"
git push
```

After the push:

1. Render detects the Git change.
2. Render runs `npm install` and `npm run build`.
3. The npm `prebuild` lifecycle validates artwork metadata.
4. Changed or missing optimized assets are generated from the declared originals.
5. The final artwork data is generated with exact original and WebP paths.
6. TypeScript and Vite build the website.
7. Render deploys `dist/` and the changes become live.

Useful successful log messages include:

```text
Image optimization complete: ...
Generated 29 validated artworks → src/data/artworks.js
Prebuild complete (images optimized and artwork data regenerated).
✓ built in ...
```

The artwork count changes when you add or remove metadata objects.

If an artwork does not appear, search the Render log for:

- `Artwork validation failed:` for duplicate orders, hero errors, missing files, bad filename case, or invalid metadata.
- `Image optimization failed:` for an unreadable or corrupt PNG/JPG.
- `Ignored ... web-safe image(s) not listed` when a file exists but has no metadata object.
- `Ignored ... HEIC file(s)` which is informational and means those files were safely excluded.
- The final `Generated ... validated artworks` and Vite `built in` messages. If they are absent, the deployment did not finish successfully.

## 12. Troubleshooting

| Problem | Likely cause | What to check |
| --- | --- | --- |
| Artwork not on homepage | `featured` is false or `homepageOrder` is null | In `artworkMetadata.js`, set `featured: true` and give it a unique positive `homepageOrder`. |
| Wrong artwork order on homepage | Incorrect `homepageOrder` values | Check every featured object's number. Lower numbers display first; duplicate numbers fail the build. |
| Wrong hero artwork | Incorrect `hero` configuration | Search `artworkMetadata.js` for `hero: true`. Exactly one must exist, and it must also be featured. |
| Correct title but wrong image | Wrong `primaryImage` or an image assigned to the wrong object | Check the exact filename on that metadata object. The build rejects one image being assigned to two artworks. Run `npm run build` to refresh hashes and paths. |
| Image does not load | Missing file, wrong filename case, corrupt image, or failed deployment | Confirm the file is directly in `public/artworks/`, exactly matches `primaryImage`, uses PNG/JPG/JPEG/WebP, and passes `npm run build`. |
| New artwork is missing | Image or metadata object is missing | Both the original image and a complete object in `artworkMetadata.js` are required. Check the generated artwork count in build logs. |
| Build fails | Metadata or image validation error | Read the full `Artwork validation failed:` message. It names the artwork and the field, order, hero setting, or filename to fix. |
| HEIC causes problems | HEIC was listed in metadata | Convert it to PNG/JPG/WebP and reference the converted file. Unreferenced HEIC files are ignored safely. |
| Changes work locally but not live | Push or Render deployment did not complete | Confirm the commit was pushed, inspect the latest Render deploy, and look for the final generated-data and Vite success messages. |
| Replaced image still looks old | Browser/CDN cache or build did not run | Run `npm run build`, commit the changed original plus generated changes, push, confirm Render succeeded, then hard-refresh the page. |
| Build says an image is unreferenced | File exists but no metadata object uses it | Add it to `primaryImage`/`additionalImages`, or delete the unused original. It cannot appear automatically. |

## 13. Website Architecture

```text
Web-safe originals in public/artworks/
                 +
Owner metadata in src/data/artworkMetadata.js
                 ↓
scripts/prebuild.mjs
      ├─ validates metadata, hero, order, and filenames
      ├─ optimizes changed PNG/JPG files to exact WebPs
      └─ generates src/data/artworks.js
                 ↓
Verified image objects + artwork content
                 ↓
OptimizedImage + React artwork components
                 ↓
Homepage / Hero / Full Portfolio / Artwork Detail
```

Important files:

- `public/artworks/`: owner-managed web-safe original images; unlisted files do not become artworks.
- `public/artworks/webp/`: automatically generated full-size and responsive WebP assets.
- `src/data/artworkMetadata.js`: the one owner-edited source of truth for artwork content, images, homepage visibility/order, and hero choice.
- `scripts/prebuild.mjs`: runs validation/generation, image optimization, and final data generation in the correct order.
- `scripts/optimize-images.mjs`: creates exact WebPs only for declared PNG/JPG images and tracks content hashes.
- `scripts/artwork-image-manifest.json`: generated source-image hashes used to detect replacements and prevent stale WebPs.
- `scripts/generate-artworks.mjs`: validates metadata and creates browser-ready data containing only verified paths.
- `src/data/artworks.js`: generated data consumed by React; never edit it manually.
- `src/components/OptimizedImage.tsx`: displays only generated exact sources and falls back to the original when needed.
- `src/components/HeroSection.tsx`: displays the single generated `heroArtwork`; normal hero changes require no component edit.
- `src/pages/HomePage.tsx`: displays all `featured` artworks in `homepageOrder`.
- `src/components/ArtworkGrid.tsx`: displays the complete portfolio independently of homepage visibility.
- `src/pages/ArtworkDetailPage.tsx`: loads an artwork by its stable slug and displays its declared images and metadata.

The normal six-month-later workflow remains: add or remove an original image, edit `src/data/artworkMetadata.js`, run `npm run build`, then commit and push.
