/**
 * Production prebuild — regenerates artwork data only.
 * Image optimization (WebP) runs locally via: npm run optimize:images
 * Pre-generated WebP files in public/artworks/webp/ are committed to git.
 */
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const generateScript = join(__dirname, "generate-artworks.mjs");

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function runNode(script) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script], {
      stdio: "inherit",
      cwd: join(__dirname, ".."),
    });
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`Exit code ${code}`)),
    );
  });
}

async function main() {
  if (!(await exists(generateScript))) {
    console.log("generate-artworks.mjs not found — using committed src/data/artworks.js");
    return;
  }

  await runNode(generateScript);
  console.log("Prebuild complete (artwork data regenerated).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
