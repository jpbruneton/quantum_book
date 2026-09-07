import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "content", "tex", "site-assets", "figs");
const destination = join(root, "public", "figs");

if (!existsSync(source)) {
  throw new Error(
    "Private figure assets are missing. Initialize the content/tex submodule before building."
  );
}

mkdirSync(destination, { recursive: true });
cpSync(source, destination, { recursive: true, force: true });

console.log("Copied private figure assets to public/figs.");

// Keep legacy image URLs working without storing generated assets in Git.
const shared = join(source, "fr");
for (const entry of readdirSync(shared, {withFileTypes: true})) {
  if (entry.isFile() && !entry.name.startsWith(".")) cpSync(join(shared, entry.name), join(destination, entry.name));
}
