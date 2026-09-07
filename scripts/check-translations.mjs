import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const languages = ["en", "de", "es", "pt", "it", "pl", "ru", "zh", "ja", "ko", "hi", "vi", "ar", "id", "tr", "bn", "ur", "sw", "fa"];
const units = ["theme1/lecon1", "theme2/lecon1", "theme2/lecon2", "theme2/fiche1", "theme2/fiche2"];
const selected = process.argv.find(arg => arg.startsWith("--unit="))?.slice(7);
const availableOnly = process.argv.includes("--available-only");
const report = [];
function clean(source) { return source.replace(/(?<!\\)%[^\n]*/g, "").replace(/\r/g, ""); }
function captures(source, regex) { return [...source.matchAll(regex)].map(match => match[1]); }
function contentHash(source) { return createHash("sha256").update(source.replace(/\r\n/g, "\n")).digest("hex"); }
function mathExpressions(text) {
  // Word order can change in a translation. Compare expressions as a multiset,
  // ignoring translated prose inside \text{} and decimal punctuation only.
  const expressions = [...text.matchAll(/\$\$[\s\S]*?\$\$|(?<![\\$])\$(?!\$)(?:\\.|[^$\\])*\$/g)].map(match => match[0]);
  for (const match of text.matchAll(/(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]|(?<!\\)\\\([\s\S]*?(?<!\\)\\\)|\\beq\b[\s\S]*?\\eeq\b/g)) expressions.push(match[0]);
  for (const match of text.matchAll(/\\begin\{(equation\*?|align\*?|gather\*?|multline\*?|eqnarray\*?)\}([\s\S]*?)\\end\{\1\}/g)) expressions.push(match[2]);
  return expressions.map(value => value
    .replace(/\\(?:text|mbox|textrm|textnormal)\{[^{}]*\}/g, "TEXT")
    .replace(/\s+/g, "").replaceAll("{,}", ".")).sort();
}
function structure(source) {
  const text = clean(source);
  return {
    environments: captures(text, /\\(?:begin|end)\{([^}]+)\}/g),
    headings: captures(text, /\\(section|subsection|subsubsection|paragraph)\*?\s*\{/g),
    labels: captures(text, /\\label\{([^}]+)\}/g),
    references: captures(text, /\\(?:ref|eqref|cite)\{([^}]+)\}/g),
    figures: captures(text, /\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/g).map(name => name.split("/").at(-1).replace(/_(?:fr|en)(?=\.)/, "")),
    math: mathExpressions(text),
  };
}
let checked = 0;
for (const unit of selected ? [selected] : units) {
  assert.ok(units.includes(unit), `Unknown unit ${unit}`);
  const [theme, lesson] = unit.split("/");
  const sourcePath = `content/tex/${theme}_fr/${lesson}.tex`;
  const source = readFileSync(sourcePath, "utf8");
  const expected = structure(source);
  const frenchProse = new Set(clean(source).split("\n").map(line => line.trim()).filter(line =>
    line.length > 55 && /[a-zA-Z\u00c0-\u024f]{4,} [a-zA-Z\u00c0-\u024f]{3,} /.test(line)));
  const sourceHash = contentHash(source);
  for (const lang of languages) {
    const target = `content/tex/${theme}_${lang}/${lesson.replace("lecon", "lesson")}.tex`;
    if (availableOnly && !existsSync(target)) continue;
    assert.ok(existsSync(target), `Missing translation: ${target}`);
    const translated = readFileSync(target, "utf8");
    assert.ok(translated.trim(), `${target}: empty translation`);
    assert.notEqual(clean(translated), clean(source), `${target}: untranslated French copy`);
    assert.doesNotMatch(translated, /\uFFFD/, `${target}: invalid Unicode replacement character`);
    for (const line of clean(translated).split("\n")) {
      assert.ok(!frenchProse.has(line.trim()), `${target}: unchanged French prose: ${line.trim()}`);
    }
    const actual = structure(translated);
    for (const key of Object.keys(expected)) assert.deepEqual(actual[key], expected[key], `${target}: ${key} must match the French source`);
    report.push({unit, lang, sourcePath, sourceSha256: sourceHash, target, sha256: contentHash(translated)});
    checked++;
  }
}
console.log(`${checked} lesson translations checked for complete structure, references and figures.`);
if (process.argv.includes("--write-manifest")) {
  assert.equal(checked, units.length * languages.length);
  writeFileSync("docs/translation-manifest.json", JSON.stringify({method: "Direct AI translation by language-group workers; no external translation API", newlineNormalization: "LF", files: report}, null, 2) + "\n");
}
