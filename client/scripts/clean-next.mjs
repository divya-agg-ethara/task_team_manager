import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [".next", path.join("node_modules", ".cache", "next")];

for (const rel of targets) {
  const dir = path.join(root, rel);
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Removed ${rel}`);
  } catch (err) {
    console.warn(`Could not remove ${rel}:`, err.message);
  }
}

console.log("Done. Stop any running 'next dev' first if removal failed.");
