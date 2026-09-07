import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Rebuild the language-neutral diagram used by figs/precessionmag.png.
const root = process.cwd();
const source = join(root, "content/tex/figs-src/fr/theme1/precessionmag.tex");
const build = mkdtempSync(join(tmpdir(), "quantum-precession-"));
execFileSync("lualatex", ["-interaction=nonstopmode", "-halt-on-error",
  `-output-directory=${build}`, source], { stdio: "pipe", timeout: 120000 });
const log = readFileSync(join(build, "precessionmag.log"), "utf8");
if (/Missing character:|Overfull \\[hv]box/.test(log)) {
  throw new Error(`Invalid figure rendering; inspect ${build}`);
}
execFileSync("pdftoppm", ["-png", "-r", "600", "-singlefile",
  join(build, "precessionmag.pdf"), join(build, "precessionmag")],
  { stdio: "pipe", timeout: 60000 });
copyFileSync(join(build, "precessionmag.png"),
  join(root, "content/tex/site-assets/figs/fr/precessionmag.png"));
console.log(`Rendered precessionmag.png at 600 dpi. Vector PDF: ${build}/precessionmag.pdf`);
