import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Rebuild both language-neutral diagrams of the torque/precession figure.
const root = process.cwd();
const build = mkdtempSync(join(tmpdir(), "quantum-precession-"));
for (const [name, extension] of [["precessionmag", "png"], ["magnetorque", "jpg"]]) {
  const source = join(root, `content/tex/figs-src/fr/theme1/${name}.tex`);
  execFileSync("lualatex", ["-interaction=nonstopmode", "-halt-on-error",
    `-output-directory=${build}`, source], { stdio: "pipe", timeout: 120000 });
  const log = readFileSync(join(build, `${name}.log`), "utf8");
  if (/Missing character:|Overfull \\[hv]box/.test(log)) {
    throw new Error(`Invalid figure rendering; inspect ${build}`);
  }
  const format = extension === "png" ? ["-png"] : ["-jpeg", "-jpegopt", "quality=100"];
  execFileSync("pdftoppm", [...format, "-r", "600", "-singlefile",
    join(build, `${name}.pdf`), join(build, name)],
    { stdio: "pipe", timeout: 60000 });
  copyFileSync(join(build, `${name}.${extension}`),
    join(root, `content/tex/site-assets/figs/fr/${name}.${extension}`));
  console.log(`Rendered ${name}.${extension} at 600 dpi. Vector PDF: ${build}/${name}.pdf`);
}
