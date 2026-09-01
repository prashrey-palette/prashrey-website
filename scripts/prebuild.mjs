/** Production prebuild: validate, optimize declared images, then generate exact data. */
import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const optimizeScript = join(__dirname, "optimize-images.mjs");
const generateScript = join(__dirname, "generate-artworks.mjs");

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
  // Validate before spending time on image conversion, then regenerate exact paths.
  await runNode(generateScript);
  await runNode(optimizeScript);
  await runNode(generateScript);
  console.log("Prebuild complete (images optimized and artwork data regenerated).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
