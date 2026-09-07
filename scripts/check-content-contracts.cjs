const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const modules = new Map();
function load(file) {
  file = path.resolve(file);
  if (modules.has(file)) return modules.get(file).exports;
  const module = {exports: {}};
  modules.set(file, module);
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {compilerOptions:{esModuleInterop: true, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}}).outputText;
  const localRequire = name => {
    if (name === "server-only") return {};
    if (name === "react") return {cache: fn => fn};
    if (name.startsWith("@/")) return name.endsWith(".json") ? require(path.resolve(name.slice(2))) : load(`${name.slice(2)}.ts`);
    return require(name);
  };
  vm.runInThisContext(`(function(require,module,exports){${js}\n})`, {filename:file})(localRequire,module,module.exports);
  return module.exports;
}
const {SUPPORTED_LANGS} = load('lib/i18n.ts');
const routes = load('lib/localeRoutes.ts');
assert.equal(SUPPORTED_LANGS.length, 20);
for (const lang of SUPPORTED_LANGS) {
  for (const logical of ['/chapters/hilbert-spaces/lesson-2', '/chapters/hilbert-spaces/fiche-1', '/exercises/hilbert-spaces/exo-example', '/quiz/hilbert-spaces/lesson-2']) {
    const url = routes.localizedPath(lang,logical);
    assert.equal(routes.toLogicalPath(routes.stripLocalePrefix(url).pathWithoutLang),logical);
    assert.equal(routes.swapLocaleInPath(url,'fr'),routes.localizedPath('fr',logical));
  }
}
assert.equal(routes.preferSiteLangFromAcceptLanguage('xx;q=1, de-DE;q=0.8, fr;q=0.5'), 'de');
const exos = load('lib/exercisesLibrary.server.ts');
for (const lang of SUPPORTED_LANGS) {
  const entries = exos.buildAllExerciseIndexEntries(lang);
  const ids = new Set();
  for (const entry of entries) {
    const key = `${entry.themeNumber}/${entry.id}`;
    assert.ok(!ids.has(key), `unique exercise ${key}`); ids.add(key);
    assert.ok(exos.extractThemeExerciseSourceById(entry.themeNumber,lang,entry.id));
    assert.equal(typeof entry.seoReady,'boolean');
  }
  if (!['fr','en'].includes(lang)) assert.equal(entries.length,0,'No fabricated translation');
}
assert.ok(exos.buildAllExerciseIndexEntries('fr').length >= 9);
assert.equal(exos.findThemeExerciseEntry(1,'exo:demo-1','de'),null);
const quiz = load('lib/quizzes.ts');
quiz.quizQuestions.push({id:'test-a',theme:1,lessonRef:'lesson-1',question:'Question',choices:['Vrai','Faux'],explanations:['Oui','Non'],correctIndex:0});
assert.ok(quiz.getLocalizedQuizQuestions(1,'lesson-1','fr')[0].trueFalse);
assert.equal(quiz.getLocalizedQuizQuestions(2,'lesson-1','fr'),null,'Themes must not collide');
assert.equal(quiz.getLocalizedQuizQuestions(1,'fiche-1','fr'),null,'Fiches must not collide');
assert.equal(quiz.getLocalizedQuizQuestions(1,'lesson-1','en'),null,'No fallback quiz');
quiz.quizQuestionTranslations.en = {'test-a':{question:'Question',choices:['True','False'],explanations:['Yes']}};
assert.equal(quiz.getLocalizedQuizQuestions(1,'lesson-1','en'),null,'Reject incomplete explanation');
quiz.quizQuestionTranslations.en['test-a'].explanations.push('No');
assert.equal(quiz.getLocalizedQuizQuestions(1,'lesson-1','en').length,1);
console.log('Locale round trips, grouped exercise IDs and all-or-nothing quiz translations checked.');

const presentation = load('lib/lessonPresentation.ts');
const input = '<h2>Repeated</h2><h2>Repeated</h2><sup class="lesson-cite" data-cite-en="2" data-cite-fr="1">[2]</sup>';
const presented = presentation.buildLessonPresentation(input,input,'fr');
assert.equal(presented.toc[1].id,'repeated-2');
assert.ok(presented.content.includes('<sup class="lesson-cite">[1]</sup>'));
