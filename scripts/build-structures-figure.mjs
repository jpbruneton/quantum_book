import {execFileSync} from "node:child_process";
import {copyFileSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";

const root = process.cwd();
const sourceRoot = join(root, "content/tex/figs-src");
const sourcePath = join(sourceRoot, "fr/theme2/structures.tex");
const catalog = JSON.parse(
  readFileSync(join(sourceRoot, "theme2-structures-translations.json"), "utf8")
);
const selected = process.argv.slice(2).filter(argument => !argument.startsWith("--"));
const languages = selected.length ? selected : Object.keys(catalog.languages);
const sourcesOnly = process.argv.includes("--sources-only");
const fonts = {
  ar: ["Noto Naskh Arabic", "Arabic"],
  fa: ["Noto Naskh Arabic", "Arabic"],
  ur: ["Noto Naskh Arabic", "Arabic"],
  hi: ["Nirmala UI", "Devanagari"],
  bn: ["Nirmala UI", "Bengali"],
  zh: ["SimSun"],
  ja: ["Yu Gothic"],
  ko: ["Malgun Gothic"],
};
const rtlLanguages = new Set(["ar", "ur", "fa"]);
const failures = [];

function localizeSource(lang) {
  const values = catalog.languages[lang];
  if (!values) throw new Error("Unsupported translation language " + lang);
  if (values.length !== catalog.keys.length) {
    throw new Error(lang + ": expected " + catalog.keys.length + " labels, received " + values.length);
  }

  let source = readFileSync(sourcePath, "utf8");
  for (const [index, macro] of catalog.keys.entries()) {
    const value = values[index].replaceAll("|", "\\\\");
    const pattern = new RegExp("\\\\newcommand\\{\\\\" + macro + "\\}\\{[^}]*\\}");
    source = source.replace(pattern, "\\newcommand{\\" + macro + "}{" + value + "}");
  }
  if (lang === "fr") return source;

  const rtl = rtlLanguages.has(lang);
  const [font, script] = fonts[lang] ?? ["Noto Serif"];
  const fontOptions = [rtl ? null : "Renderer=HarfBuzz", script ? "Script=" + script : null]
    .filter(Boolean)
    .join(",");
  source = source.replace(
    "\\usepackage{amsfonts,amsmath}",
    "\\usepackage{amsfonts,amsmath}\n\\usepackage{fontspec}\n\\setmainfont{" + font + "}" +
      (fontOptions ? "[" + fontOptions + "]" : "")
  );
  source = source.replace(
    "\\newcommand{\\Lang}[1]{#1}",
    rtl
      ? "\\usepackage{bidi}\n\\newcommand{\\Lang}[1]{\\RL{#1}}"
      : "\\newcommand{\\Lang}[1]{#1}"
  );
  if (rtl) {
    source = source.replace(
      "\\newcommand{\\Formula}[1]{#1}",
      "\\newcommand{\\Formula}[1]{\\LR{#1}}"
    );
  }
  return source;
}

for (const lang of languages) {
  let localizedPath = sourcePath;
  if (lang !== "fr") {
    const destination = join(sourceRoot, lang, "theme2");
    mkdirSync(destination, {recursive: true});
    localizedPath = join(destination, "structures.tex");
    writeFileSync(localizedPath, localizeSource(lang), "utf8");
  }
  if (sourcesOnly) continue;

  const build = mkdtempSync(join(tmpdir(), "quantum-structures-" + lang + "-"));
  try {
    execFileSync(rtlLanguages.has(lang) ? "xelatex" : "lualatex", [
      "-interaction=nonstopmode",
      "-halt-on-error",
      "-output-directory=" + build,
      localizedPath,
    ], {stdio: "pipe", timeout: 120000});
    const log = readFileSync(join(build, "structures.log"), "utf8");
    const layoutErrors = log
      .split("\n")
      .filter(line => /Missing character:|Overfull \\[hv]box/.test(line));
    if (layoutErrors.length) throw new Error(layoutErrors.join("\n"));

    execFileSync("pdftoppm", [
      "-png",
      "-r",
      "300",
      "-singlefile",
      join(build, "structures.pdf"),
      join(build, "structures"),
    ], {stdio: "pipe", timeout: 60000});
    const output = join(root, "content/tex/site-assets/figs", lang, "theme2");
    mkdirSync(output, {recursive: true});
    copyFileSync(join(build, "structures.png"), join(output, "structures.png"));
    console.log("Rendered " + lang + "/theme2/structures.png");
  } catch (error) {
    failures.push({lang, message: error.message, log: build});
    console.error("Failed " + lang + "/theme2/structures; details: " + build);
  }
}

if (!sourcesOnly) {
  const report = join(sourceRoot, "theme2-structures-build-report.json");
  writeFileSync(report, JSON.stringify({languages, failures}, null, 2) + "\n");
  if (failures.length) process.exitCode = 1;
}
