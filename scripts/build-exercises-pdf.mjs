/**
 * Compile tous les exercices d'un thème (ordre = legacy exo.tex puis fiches bibliothèque triées)
 * en un seul PDF, structuré en trois parties (avec table des matières) :
 *   1. Énoncés
 *   2. Indications
 *   3. Solutions
 * Chaque partie reprend la même numérotation d'exercice (le compteur est remis à zéro
 * au début de chaque partie), et le PDF est écrit dans public/pdfs/exo_theme{N}_{lang}.pdf.
 *
 * Usage:
 *   node scripts/build-exercises-pdf.mjs <themeNumber> [fr|en]
 *   node scripts/build-exercises-pdf.mjs --all [fr|en]   (tous les thèmes non vides ; fr puis en si pas d'argument de langue)
 *
 * MiKTeX ailleurs : définir la commande complète, ex. PowerShell
 *   $env:PDFLATEX = "C:\Program Files\MiKTeX\miktex\bin\x64\pdflatex.exe"
 *
 * Dépendances LaTeX typiques (MiKTeX) : babel, amsmath, mathtools, tcolorbox, xparse, braket…
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = join(__dirname, "..");

const MAX_THEME_SCAN = 24;

function parseArgs(argv) {
  const raw = argv.slice(2);
  const allMode = raw.includes("--all");
  const pos = raw.filter((a) => !a.startsWith("--"));

  if (allMode) {
    const which = pos[0];
    let langs;
    if (which === "en") langs = ["en"];
    else if (which === "fr") langs = ["fr"];
    else langs = ["fr", "en"];
    return { mode: "all", langs };
  }

  const themeNumber = Number.parseInt(pos[0], 10);
  const lang = pos[1] === "en" ? "en" : "fr";
  return { mode: "single", themeNumber, lang };
}

function texRoot() {
  return join(repoRoot, "content", "tex");
}

function libraryDir(lang) {
  return join(texRoot(), lang === "fr" ? "exercises_library_fr" : "exercises_library_en");
}

function listExerciseLibraryFiles(lang) {
  const dir = libraryDir(lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /^exercices.*\.tex$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

function parseThemeNumberFromSource(source) {
  const m = source.match(/\\theme\s*\{([^}]*)\}/);
  if (!m) return null;
  const n = Number.parseInt(m[1].replace(/\s+/g, ""), 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

function combineThemeExerciseSources(themeNumber, lang) {
  const parts = [];
  const legacyPath = join(texRoot(), `theme${themeNumber}_${lang}`, "exo.tex");
  if (existsSync(legacyPath)) {
    parts.push(readFileSync(legacyPath, "utf8"));
  }
  for (const name of listExerciseLibraryFiles(lang)) {
    const full = join(libraryDir(lang), name);
    const source = readFileSync(full, "utf8");
    if (parseThemeNumberFromSource(source) === themeNumber) {
      parts.push(source);
    }
  }
  return parts.join("\n\n");
}

function stripEnvironmentBlocks(source, envName) {
  const re = new RegExp(`\\\\begin\\{${envName}\\}[\\s\\S]*?\\\\end\\{${envName}\\}`, "g");
  return source.replace(re, "\n");
}

/** Environnements à retirer des énoncés : indications/indices/hints + corrigés. */
const HINT_ENVS = ["indice", "indication", "hint"];
const STRIP_FOR_STATEMENTS_ONLY = [...HINT_ENVS, "solution"];

function stripSolutionsAndHints(source) {
  let out = source;
  let prev;
  do {
    prev = out;
    for (const env of STRIP_FOR_STATEMENTS_ONLY) {
      out = stripEnvironmentBlocks(out, env);
    }
  } while (out !== prev);
  return out.replace(/\n{3,}/g, "\n\n").trim();
}

function stripKeywords(source) {
  return source.replace(/\\keywords\{[^}]*\}/g, "");
}

/** Extrait, dans l'ordre d'apparition, tous les blocs \begin{env}…\end{env} pour les env donnés. */
function extractEnvOccurrencesInOrder(source, envNames) {
  const alt = envNames.join("|");
  const re = new RegExp(`\\\\begin\\{(${alt})\\}[\\s\\S]*?\\\\end\\{\\1\\}`, "g");
  return source.match(re) || [];
}

/** Remplace le contenu de chaque \begin{questions}…\end{questions} par le résultat de mapInner. */
function rewriteQuestionsBlocks(source, mapInner) {
  const re = /\\begin\{questions\}([\s\S]*?)\\end\{questions\}/g;
  return source.replace(re, (_match, inner) => {
    const newInner = mapInner(inner);
    return `\\begin{questions}\n${newInner}\n\\end{questions}`;
  });
}

/** Ne garde, pour chaque exercice, que les indications (ou un texte de repli si aucune). */
function buildIndicationsOnly(source, fallbackText) {
  const noKeywords = stripKeywords(source);
  return rewriteQuestionsBlocks(noKeywords, (inner) => {
    const blocks = extractEnvOccurrencesInOrder(inner, HINT_ENVS);
    return blocks.length > 0 ? blocks.join("\n\n") : fallbackText;
  });
}

/** Ne garde, pour chaque exercice, que les solutions (ou un texte de repli si aucune). */
function buildSolutionsOnly(source, fallbackText) {
  const noKeywords = stripKeywords(source);
  return rewriteQuestionsBlocks(noKeywords, (inner) => {
    const blocks = extractEnvOccurrencesInOrder(inner, ["solution"]);
    return blocks.length > 0 ? blocks.join("\n\n") : fallbackText;
  });
}

function resolvePdflatex() {
  const fromEnv = process.env.PDFLATEX || process.env.MIKTEX_PDFLATEX;
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  return "pdflatex";
}

function buildWrapperTex(themeNumber, lang, chapterTitle) {
  const isFr = lang === "fr";
  const babelOpt = isFr ? "french" : "english";
  const headerFile = isFr ? "content/tex/header_fr.tex" : "content/tex/header_en.tex";
  return `% Auto-generated by scripts/build-exercises-pdf.mjs — do not edit by hand
\\documentclass[11pt,a4paper]{book}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[${babelOpt}]{babel}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{braket}
\\newcommand{\\R}{\\mathbb{R}}
\\newcommand{\\C}{\\mathbb{C}}
\\newcommand{\\N}{\\mathbb{N}}
\\usepackage{geometry}
\\geometry{margin=2.5cm}

\\input{${headerFile.replace(/\\/g, "/")}}

\\begin{document}

\\tableofcontents
\\newpage

\\chapter*{${chapterTitle}}
\\addcontentsline{toc}{chapter}{${chapterTitle}}

\\input{scripts/latex-tmp/body_frag.tex}

\\end{document}
`;
}

function runPdflatex(jobname, wrapperPath, latexOutDir) {
  mkdirSync(latexOutDir, { recursive: true });
  const pdflatex = resolvePdflatex();
  const commonArgs = [
    "-interaction=nonstopmode",
    "-halt-on-error",
    `-output-directory=${latexOutDir}`,
    `-jobname=${jobname}`,
    wrapperPath,
  ];
  const r1 = spawnSync(pdflatex, commonArgs, { cwd: repoRoot, stdio: "inherit", env: process.env });
  if (r1.status !== 0) {
    console.error(`Échec de ${pdflatex} (code ${r1.status ?? r1.error})`);
    process.exit(1);
  }
}

/**
 * pdflatex écrit d'abord dans latex-tmp pour éviter l'erreur Windows
 * « I can't write on file `exo_theme…pdf' » quand le PDF dans public/pdfs est ouvert
 * (Cursor, navigateur, lecteur PDF). La copie finale peut encore échouer si le fichier
 * reste verrouillé : il faut alors fermer le PDF cible.
 */
function publishPdf(jobname, latexOutDir, publicPdfDir) {
  const src = join(latexOutDir, `${jobname}.pdf`);
  const dest = join(publicPdfDir, `${jobname}.pdf`);
  mkdirSync(publicPdfDir, { recursive: true });
  try {
    copyFileSync(src, dest);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(
      `Impossible d'écrire ${dest}. Fermez ce PDF (aperçu dans l'éditeur, navigateur ou lecteur), puis relancez.`,
    );
    console.error(msg);
    process.exit(1);
  }
}

function buildThemeLanguage(themeNumber, lang, tmpDir, publicPdfDir) {
  const merged = combineThemeExerciseSources(themeNumber, lang);
  if (!merged.trim()) {
    return false;
  }

  const chapterTitle =
    lang === "fr" ? `Exercices — Thème ${themeNumber}` : `Exercises — Theme ${themeNumber}`;
  const sectionTitles =
    lang === "fr"
      ? { statements: "Énoncés", indications: "Indications", solutions: "Solutions" }
      : { statements: "Statements", indications: "Hints", solutions: "Solutions" };
  const noIndicationText =
    lang === "fr"
      ? "\\textit{Aucune indication pour cet exercice.}"
      : "\\textit{No hint for this exercise.}";
  const noSolutionText =
    lang === "fr" ? "\\textit{Solution non disponible.}" : "\\textit{Solution not available.}";

  const statementsBody = stripSolutionsAndHints(merged);
  const indicationsBody = buildIndicationsOnly(merged, noIndicationText);
  const solutionsBody = buildSolutionsOnly(merged, noSolutionText);

  const fullBody = `
\\section*{${sectionTitles.statements}}
\\addcontentsline{toc}{section}{${sectionTitles.statements}}
${statementsBody}

\\newpage
\\setcounter{exoctr}{0}
\\section*{${sectionTitles.indications}}
\\addcontentsline{toc}{section}{${sectionTitles.indications}}
${indicationsBody}

\\newpage
\\setcounter{exoctr}{0}
\\section*{${sectionTitles.solutions}}
\\addcontentsline{toc}{section}{${sectionTitles.solutions}}
${solutionsBody}
`;

  writeFileSync(join(tmpDir, "body_frag.tex"), fullBody, "utf8");
  const wrapperPath = join(tmpDir, `wrapper_theme${themeNumber}_${lang}.tex`);
  writeFileSync(wrapperPath, buildWrapperTex(themeNumber, lang, chapterTitle), "utf8");
  const jobname = `exo_theme${themeNumber}_${lang}`;

  // Deux passes pdflatex : la première écrit le .toc, la seconde le restitue dans le PDF.
  console.log(`Compilation (${jobname}) — passe 1/2 (table des matières) …`);
  runPdflatex(jobname, wrapperPath, tmpDir);
  console.log(`Compilation (${jobname}) — passe 2/2 …`);
  runPdflatex(jobname, wrapperPath, tmpDir);

  console.log(`Copie → public/pdfs/${jobname}.pdf …`);
  publishPdf(jobname, tmpDir, publicPdfDir);
  console.log(`OK: public/pdfs/${jobname}.pdf`);
  return true;
}

function main() {
  const parsed = parseArgs(process.argv);
  const tmpDir = join(repoRoot, "scripts", "latex-tmp");
  mkdirSync(tmpDir, { recursive: true });
  const publicPdfDir = join(repoRoot, "public", "pdfs");

  if (parsed.mode === "all") {
    let built = 0;
    for (let themeNumber = 1; themeNumber <= MAX_THEME_SCAN; themeNumber += 1) {
      for (const lang of parsed.langs) {
        if (buildThemeLanguage(themeNumber, lang, tmpDir, publicPdfDir)) {
          built += 1;
        }
      }
    }
    if (built === 0) {
      console.error("Aucun thème avec du contenu TeX trouvé pour les langues demandées.");
      process.exit(1);
    }
    console.log(`Terminé : ${built} compilation(s).`);
    return;
  }

  const { themeNumber, lang } = parsed;
  if (!Number.isFinite(themeNumber) || themeNumber < 1) {
    console.error("Usage: node scripts/build-exercises-pdf.mjs <themeNumber> [fr|en]");
    console.error("   ou: node scripts/build-exercises-pdf.mjs --all [fr|en]");
    process.exit(1);
  }

  if (!buildThemeLanguage(themeNumber, lang, tmpDir, publicPdfDir)) {
    console.error(`Aucun fichier TeX trouvé pour le thème ${themeNumber} (${lang}).`);
    process.exit(1);
  }
}

main();
