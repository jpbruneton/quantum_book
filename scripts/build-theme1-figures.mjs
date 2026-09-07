import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const sourceRoot = join(root, "content/tex/figs-src");
const translations = JSON.parse(readFileSync(join(sourceRoot, "theme1-translations.json"), "utf8"));
const selected = process.argv.slice(2).filter(arg => !arg.startsWith("--"));
const languages = selected.length ? selected : Object.keys(translations).filter(lang => lang !== "fr");
const sourcesOnly = process.argv.includes("--sources-only");
const fonts = {
  ar: ["Noto Naskh Arabic", "Arabic"], fa: ["Noto Naskh Arabic", "Arabic"], ur: ["Noto Naskh Arabic", "Arabic"],
  hi: ["Nirmala UI", "Devanagari"], bn: ["Nirmala UI", "Bengali"],
  zh: ["SimSun"], ja: ["Yu Gothic"], ko: ["Malgun Gothic"],
};
const sourceLabels = ["prédiction classique", "bande\\\\continue", "résultat expérimental", "deux\\\\traces", "four", "bloqué"];
const aliases = ["SG_base_prediction.png", "sg_double_zz.png", "sg_double_zx.png", "sg_triple.png"];
const failures = [];
for (const lang of languages) {
  if (!translations[lang] || lang === "fr") throw new Error(`Unsupported translation language ${lang}`);
  const rtl = ["ar", "ur", "fa"].includes(lang);
  const [font, script] = fonts[lang] ?? ["Noto Serif"];
  const fontOptions = [rtl ? null : "Renderer=HarfBuzz", script ? `Script=${script}` : null].filter(Boolean).join(",");
  const destination = join(sourceRoot, lang, "theme1");
  mkdirSync(destination, {recursive: true});
  for (let index = 1; index <= 5; index++) {
    const name = index === 5 ? "lecon2_fig1" : `lecon1_fig${index}`;
    let source = readFileSync(join(sourceRoot, "fr", "theme1", `${name}.tex`), "utf8");
    source = source.replace(/^[ \t]*%.*\r?\n/gm, "");
    source = source.replace("\\usepackage{tikz}", `\\usepackage{tikz}\n\\usepackage{fontspec}\n\\setmainfont{${font}}${fontOptions ? `[${fontOptions}]` : ""}`);
    source = source.replace("\\begin{document}", `${rtl ? "\\usepackage{bidi}\n\\newcommand{\\Lang}[1]{\\RL{#1}}" : "\\newcommand{\\Lang}[1]{#1}"}\n\\begin{document}`);
    sourceLabels.forEach((label, number) => {
      source = source.replaceAll(`{${label}}`, `{\\Lang{${translations[lang][number]}}}`);
    });
    // Bounded boxes protect translated headings from overlapping the adjacent panel.
    source = source.replaceAll("\\node at", "\\node[text width=4.8cm,align=center] at");
    source = source.replaceAll("\\node[align=center]", "\\node[text width=3.2cm,align=center]");
    const sourcePath = join(destination, `${name}.tex`);
    writeFileSync(sourcePath, source, "utf8");
    if (sourcesOnly) continue;
    const build = mkdtempSync(join(tmpdir(), `quantum-fig-${lang}-`));
    try {
      execFileSync(rtl ? "xelatex" : "lualatex", ["-interaction=nonstopmode", "-halt-on-error", `-output-directory=${build}`, sourcePath], {stdio: "pipe", timeout: 120000});
      const log = readFileSync(join(build, `${name}.log`), "utf8");
      if (/Missing character:|Overfull \\[hv]box/.test(log)) throw new Error(log.split("\n").filter(line => /Missing character:|Overfull/.test(line)).join("\n"));
      execFileSync("pdftoppm", ["-png", "-r", "300", "-singlefile", join(build, `${name}.pdf`), join(build, name)], {stdio: "pipe", timeout: 60000});
      const output = join(root, "content/tex/site-assets/figs", lang, "theme1");
      mkdirSync(output, {recursive: true});
      copyFileSync(join(build, `${name}.png`), join(output, `${name}.png`));
      if (index <= 4) copyFileSync(join(build, `${name}.png`), join(output, "..", aliases[index - 1]));
      console.log(`Rendered ${lang}/theme1/${name}.png`);
    } catch (error) {
      failures.push({lang, name, message: error.message, log: build});
      console.error(`French figure retained for ${lang}/${name}; details: ${build}`);
    }
  }
}
if (!sourcesOnly) {
  const report = join(root, "content/tex/figs-src/theme1-build-report.json");
  writeFileSync(report, JSON.stringify({languages, failures}, null, 2) + "\n");
  if (failures.length) process.exitCode = 1;
}
