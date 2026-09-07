import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, sep } from "node:path";
import sharp from "sharp";

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

const optimizedRoot = join(destination, "_optimized");
rmSync(optimizedRoot, { recursive: true, force: true });
mkdirSync(optimizedRoot, { recursive: true });

const rasterExtensions = new Set([".png", ".jpg", ".jpeg"]);
const responsiveWidths = [480, 800, 1200];
const images = {};

function listRasterImages(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "_optimized" || entry.name.startsWith(".")) continue;
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listRasterImages(absolutePath));
    else if (rasterExtensions.has(extname(entry.name).toLowerCase())) files.push(absolutePath);
  }
  return files;
}

for (const inputPath of listRasterImages(destination)) {
  const relativePath = relative(destination, inputPath);
  const urlPath = `/figs/${relativePath.split(sep).join("/")}`;
  const metadata = await sharp(inputPath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read image dimensions for ${relativePath}`);
  }

  const swapsDimensions = metadata.orientation != null && metadata.orientation >= 5;
  const width = swapsDimensions ? metadata.height : metadata.width;
  const height = swapsDimensions ? metadata.width : metadata.height;
  const widths = [...new Set([
    ...responsiveWidths.filter(candidate => candidate < width),
    Math.min(width, responsiveWidths.at(-1)),
  ])].sort((a, b) => a - b);
  const outputDirectory = join(optimizedRoot, dirname(relativePath));
  mkdirSync(outputDirectory, { recursive: true });
  const stem = basename(relativePath, extname(relativePath));
  const variants = [];

  for (const variantWidth of widths) {
    const outputName = `${stem}.w${variantWidth}.webp`;
    const outputPath = join(outputDirectory, outputName);
    await sharp(inputPath)
      .rotate()
      .resize({ width: variantWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);
    variants.push({
      src: `/figs/_optimized/${relative(outputDirectory, outputPath) === outputName
        ? [...dirname(relativePath).split(sep).filter(part => part !== "."), outputName].join("/")
        : outputName}`,
      width: variantWidth,
    });
  }

  images[urlPath] = { width, height, variants };
}

writeFileSync(
  join(destination, "image-manifest.json"),
  JSON.stringify({ version: 1, images }, null, 2) + "\n",
  "utf8"
);

console.log(`Generated responsive metadata and WebP variants for ${Object.keys(images).length} raster figures.`);
