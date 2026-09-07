import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const languages = ["en", "de", "es", "pt", "it", "pl", "ru", "zh", "ja", "ko", "hi", "vi", "ar", "id", "tr", "bn", "ur", "sw", "fa"];
const source = JSON.parse(readFileSync("lib/locales/fr.json", "utf8"));
const availableOnly = process.argv.includes("--available-only");
const placeholders = value => [...value.matchAll(/\{([a-zA-Z]+)\}/g)].map(match => match[1]).sort();
function check(expected, actual, at) {
  assert.equal(typeof actual, typeof expected, `${at}: value type`);
  if (typeof expected === "string") {
    assert.deepEqual(placeholders(actual), placeholders(expected), `${at}: template placeholders`);
    if (expected.trim()) assert.ok(actual.trim(), `${at}: empty translation`);
    assert.doesNotMatch(actual, /\uFFFD/, `${at}: invalid Unicode`);
  } else if (Array.isArray(expected)) {
    assert.ok(Array.isArray(actual), at);
    assert.equal(actual.length, expected.length, `${at}: array length`);
    expected.forEach((value, index) => check(value, actual[index], `${at}.${index}`));
  } else {
    assert.deepEqual(Object.keys(actual).sort(), Object.keys(expected).sort(), `${at}: complete catalogue keys`);
    for (const key of Object.keys(expected)) check(expected[key], actual[key], `${at}.${key}`);
  }
}
const completed = [];
for (const lang of languages) {
  const file = `lib/locales/${lang}.json`;
  if (availableOnly && !existsSync(file)) continue;
  assert.ok(existsSync(file), `${file}: missing catalogue`);
  const translation = JSON.parse(readFileSync(file, "utf8"));
  check(source, translation, lang);
  assert.notEqual(translation.ui.book.description, source.ui.book.description, `${lang}: untranslated book description`);
  completed.push(lang);
}
console.log(`${completed.length} complete interface catalogues validated.`);
if (process.argv.includes("--write-index")) {
  const imports = completed.map(lang => `import ${lang} from "./${lang}.json";`).join("\n");
  writeFileSync("lib/locales/index.ts", `${imports}\nexport const translatedCatalogs: Record<string, unknown> = {${completed.join(", ")}};\n`);
}
