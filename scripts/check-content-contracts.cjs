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
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {compilerOptions:{esModuleInterop: true, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX}}).outputText;
  const localRequire = name => {
    if (name === "server-only") return {};
    if (name === "react") return {...require("react"), cache: fn => fn};
    if (name === "next/navigation") return {useRouter: () => ({push() {}}), usePathname: () => '/fr/chapters/test/lesson-1'};
    if (name.startsWith("@/") || name.startsWith(".")) {
      const source = name.startsWith("@/") ? path.resolve(name.slice(2)) : path.resolve(path.dirname(file), name);
      if (source.endsWith(".json")) return require(source);
      const resolved = [`${source}.ts`, `${source}.tsx`, path.join(source, 'index.ts')].find(fs.existsSync);
      if (!resolved) throw new Error(`Cannot resolve ${name} from ${file}`);
      return load(resolved);
    }
    return require(name);
  };
  vm.runInThisContext(`(function(require,module,exports){${js}\n})`, {filename:file})(localRequire,module,module.exports);
  return module.exports;
}
const {SUPPORTED_LANGS} = load('lib/i18n.ts');
const {getQuizRunnerCopy, getQuizTranslations} = load('lib/quizTranslations.ts');
for (const lang of SUPPORTED_LANGS) {
  const t = getQuizTranslations(lang);
  const copy = JSON.parse(JSON.stringify(getQuizRunnerCopy(lang, 3)));
  assert.deepEqual(copy.progress, [1, 2, 3].map(i => t.questionOf(i, 3)));
  assert.deepEqual(copy.scores, [0, 1, 2, 3].map(score => t.scoreLine(score, 3)));
  assert.equal(copy.restart, t.restart);
}
const {processLatex, renderedHtmlToPlainText} = load('lib/latex.ts');
const inlineWithPunctuation = processLatex('<p>($x$), puis $y$.</p>');
assert.equal((inlineWithPunctuation.match(/class="latex-inline-math-punctuation"/g) ?? []).length, 2);
assert.match(inlineWithPunctuation, /\),<\/span> puis/);
assert.ok(!processLatex('$$x+y$$').includes('latex-inline-math-punctuation'), 'Display equations stay independent of inline punctuation');
assert.equal((processLatex('$x$ et $y$').match(/class="katex"/g) ?? []).length, 2, 'Adjacent inline math remains intact');
assert.ok(inlineWithPunctuation.includes('class="latex-inline-math-punctuation">('), 'Opening parentheses stay with their formula');
for (const punctuation of [')', ',', '.', '\u00a0:', ' ;', ' !', ' ؟', '،', '）']) {
  assert.ok(processLatex(`$x$${punctuation}`).endsWith(`${punctuation}</span>`), `Trailing punctuation stays attached: ${punctuation}`);
}
assert.equal(renderedHtmlToPlainText(processLatex('($x$), puis $y$.')), '(x), puis y.', 'Punctuation and math are preserved once in plain text');
assert.equal(renderedHtmlToPlainText(processLatex('$\\ell^2(\\mathbb{N})$')), 'ℓ2(N)', 'Metadata contains visible math, not hidden TeX or duplicated MathML');
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
const input = '<h2>Repeated</h2><h2>Repeated</h2><sup class="lesson-cite">[2]</sup>';
const presented = presentation.buildLessonPresentation(input,input,'fr');
assert.equal(presented.toc[1].id,'repeated-2');
assert.ok(presented.content.includes('<sup class="lesson-cite">[2]</sup>'));

// Bibliographies are selected by the source input, including distinct fiche files.
const chapterContent = load('lib/chapterContent.server.ts');
const spacingSource = String.raw`Texte\, avec\; espaces\: et\ \{accolades\}, mais $x\,y\;z\:\{t\}$ inchangé.`;
const spacingHtml = chapterContent.getTexWebHtmlFromSource(spacingSource, 'fr', []);
assert.ok(spacingHtml.includes(String.raw`$x\,y\;z\:\{t\}$`), 'Text spacing conversion preserves TeX inside math');
assert.doesNotMatch(renderedHtmlToPlainText(processLatex(spacingHtml)), /\\/, 'No prose spacing commands or escaped braces leak into visible text');
assert.ok(chapterContent.getTexWebHtmlFromSource(String.raw`Première ligne\\ seconde ligne.`, 'fr', []).includes('<br/>'), 'Text spacing does not consume an explicit TeX line break');
const referencedEquation = chapterContent.getTexWebHtmlFromSource(String.raw`
\begin{align*}x&=1\end{align*}
\begin{equation}\label{first}y=2\end{equation}
Voir~\eqref{first} et \ref{first}.`, 'fr', []);
assert.ok(referencedEquation.includes('Voir\u00a0(1) et 1.'), 'Equation references use the displayed counter and preserve nonbreaking spaces');
const webUrl = chapterContent.getTexWebHtmlFromSource(String.raw`Source : \url{https://example.org/~author/a\_b?x=1\&y=2\#part}`, 'fr', []);
assert.ok(webUrl.includes('href="https://example.org/~author/a_b?x=1&amp;y=2#part"'), 'URL text commands become links without corrupting URL syntax');
const warningBox = chapterContent.getTexWebHtmlFromSource(String.raw`\begin{attention}[Hypothèse cruciale]Texte\end{attention}`, 'fr', []);
assert.ok(warningBox.includes('latex-block-important') && warningBox.includes('Hypothèse cruciale'), 'Attention environments render their title and body');
assert.doesNotMatch(warningBox, /\\(?:begin|end)/);
const refs = chapterContent.getLessonReferences(99, 99, [], 'theme1_fr/lecon1.tex');
assert.ok(refs.some(ref => ref.key === 'sahoo2022classicality'));
assert.ok(refs.some(ref => ref.key === 'jackson1999classical'));
for (const lang of ['fr', 'en']) {
  const cited = chapterContent.getTexWebHtmlFromSource('\\cite{jackson1999classical,sahoo2022classicality}', lang, refs);
  assert.ok(cited.includes('<sup class="lesson-cite">[1,2]</sup>'));
}
assert.deepEqual(chapterContent.getLessonReferences(2, 1, [], 'theme2_fr/fiche1.tex'), []);
assert.ok(chapterContent.getLessonReferences(2, 1, [], 'theme2_fr/lecon1.tex').length > 0);

const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {LangProvider} = load('app/context/LangContext.tsx');
const {ChapterContent} = load('app/[lang]/chapters/ChapterContent.tsx');
for (const lang of SUPPORTED_LANGS) {
  const ui = require(path.resolve(`lib/locales/${lang}.json`)).ui;
  assert.ok(!Object.hasOwn(ui, 'glossary') && !Object.hasOwn(ui.nav, 'glossary'),
    `${lang}: removed glossary is not shipped in the interface catalogue`);
  const texFile = `theme1_${lang}/${lang === 'fr' ? 'lecon' : 'lesson'}1.tex`;
  const references = chapterContent.getLessonReferences(1, 1, [], texFile);
  const raw = chapterContent.getLessonWebContent(texFile, -1, references);
  const result = presentation.buildLessonPresentation(raw, raw, lang);
  assert.equal(result.toc.at(-1).text.replace(/^\d+\.\s*/, ''), ui.chapter.tabReferences);
  const lesson = {slug:'lesson-1', titleFr:'Leçon n°1', titleEn:'Lesson 1', subtitleFr:'Les postulats', subtitleEn:'Postulates',
    topicsFr:['Postulats'], topicsEn:['Postulates'], descriptionFr:'DESCRIPTION_MUST_NOT_BE_VISIBLE', descriptionEn:'DESCRIPTION_MUST_NOT_BE_VISIBLE', renderedLang:result.content,
    toc:result.toc, references, texFile, number:1};
  const html = renderToStaticMarkup(React.createElement(LangProvider,
    {initialLang:lang, initialUi:ui, initialThemes:[]}, React.createElement(ChapterContent, {lesson})));
  assert.ok(!html.includes('DESCRIPTION_MUST_NOT_BE_VISIBLE'), `${lang}: lesson descriptions are not displayed`);
  assert.match(html, lang === 'fr' ? />Leçon n°1 : Les postulats<\/h2>/ : />Lesson 1: Postulates<\/h2>/,
    `${lang}: lesson heading includes its numbered label and title`);
  assert.ok(html.includes('class="lesson-keywords"'), `${lang}: keywords remain visible`);
  const keywordsHtml = html.match(/<p class="lesson-keywords">([\s\S]*?)<\/p>/)?.[1] ?? '';
  assert.ok(keywordsHtml.includes(lang === 'fr' ? 'Postulats' : 'Postulates'), `${lang}: keyword text is preserved`);
  assert.doesNotMatch(keywordsHtml, /<a\b/, `${lang}: keywords no longer link to a glossary`);
  assert.match(html, /class="lesson-web-layout"[^>]*><header class="lesson-web-main" style="text-align:start"/,
    `${lang}: heading uses the same responsive column as lesson text`);
  assert.ok(html.includes('https://doi.org/10.48550/arXiv.2211.08363'), `${lang}: bibliography visible without interaction`);
  assert.ok(html.includes('John David Jackson'), `${lang}: Jackson visible in bibliography`);
  assert.ok(!html.includes(ui.chapter.refsEnglishTitle), `${lang}: no English reference group`);
  assert.ok(!html.includes(ui.chapter.refsFrenchTitle), `${lang}: no French reference group`);
  assert.ok(!html.includes(`>${ui.chapter.tabOnline}</button>`), `${lang}: no lesson tab`);
  const heading = `id="${result.toc.at(-1).id}"`;
  assert.ok(html.indexOf(heading) < html.indexOf('https://doi.org/10.48550/arXiv.2211.08363'));
}
console.log('Inline bibliographies, localized TOC headings and initial HTML checked in all 20 languages.');

// French references can cross lesson/fiche boundaries, without publishing a target.
const {getWebThemes} = load('lib/chapters.ts');
const {buildThemeWithLocalizedContent} = load('lib/chapterPage.server.ts');
const activeTheme = buildThemeWithLocalizedContent(getWebThemes('fr').find(theme => theme.number === 3), 'fr', 0);
assert.equal(activeTheme.lessons.filter(lesson => lesson.renderedLang).length, 1, 'Only the active lesson body crosses the client boundary');
assert.ok(activeTheme.lessons.every(lesson => !lesson.content && !lesson.contentLang), 'Intermediate lesson sources remain on the server');
const eighthLessonTheme = buildThemeWithLocalizedContent(getWebThemes('fr').find(theme => theme.number === 3), 'fr', 7);
assert.equal(eighthLessonTheme.lessons[7].number, 8);
assert.ok(eighthLessonTheme.lessons[7].renderedLang.length > 0, 'Opening lesson 8 loads its own content');
assert.ok(eighthLessonTheme.lessons.every((lesson, index) => index === 7 ||
  (!lesson.renderedLang && !lesson.content && !lesson.contentLang && !lesson.toc.length && !lesson.references.length)),
  'Opening lesson 8 does not load the content, TOC or references of other lessons');
const lessonRoutes = load('lib/lessonRoutes.ts');
for (const lang of SUPPORTED_LANGS) {
  for (const theme of getWebThemes(lang)) {
    if (!theme.lessons.length) continue;
    assert.equal(lessonRoutes.chapterThemePath(lang, theme),
      lessonRoutes.chapterLessonPath(lang, theme.slug, theme.lessons[0]),
      'Theme links open the first published lesson directly, without a redirect');
  }
}
const frenchPages = new Map();
for (const theme of getWebThemes('fr')) {
  for (const lesson of theme.lessons) {
    if (!fs.existsSync(path.resolve('content/tex', lesson.texFile))) continue;
    const references = chapterContent.getLessonReferences(theme.number, lesson.number, [], lesson.texFile);
    frenchPages.set(lessonRoutes.chapterLessonPath('fr', theme.slug, lesson), {
      file: lesson.texFile, html: chapterContent.getLessonWebContent(lesson.texFile, -1, references),
    });
  }
}
let crossReferenceCount = 0;
for (const page of frenchPages.values()) {
  for (const match of page.html.matchAll(/class="latex-cross-reference" href="([^"#]+)#([^"]+)"/g)) {
    assert.ok(frenchPages.get(match[1])?.html.includes(`id="${match[2]}"`), `${page.file}: cross-reference target exists`);
    crossReferenceCount++;
  }
}
assert.ok(crossReferenceCount >= 9, 'Cross-lesson and cross-fiche references are rendered');
const frenchPostulates = [...frenchPages.values()].find(page => page.file === 'theme3_fr/lecon1.tex').html;
const theme3Lessons = getWebThemes('fr').find(theme => theme.number === 3).lessons;
assert.equal(getWebThemes().find(theme => theme.number === 3).lessons.length, 11, 'All authored theme 3 lessons remain registered');
assert.deepEqual(theme3Lessons.map(lesson => lesson.number), [1, 2, 3, 4, 5, 6, 7, 8], 'Only theme 3 lessons 1–8 are published in French');
for (const lesson of theme3Lessons) {
  const source = fs.readFileSync(path.join('content/tex', lesson.texFile), 'utf8');
  const refs = chapterContent.getLessonReferences(3, lesson.number, [], lesson.texFile);
  const raw = chapterContent.getLessonWebContent(lesson.texFile, -1, refs);
  const html = processLatex(raw);
  assert.match(source.trimEnd(), new RegExp(`\\\\section\\{Références\\}\\s*\\\\input\\{ref_3_${lesson.number}\\}$`));
  assert.doesNotMatch(html, /katex-error/);
  assert.doesNotMatch(renderedHtmlToPlainText(html), /\\[A-Za-z]+|\$|__FOOTNOTE_|\[(?:eq|th|sec|fig|ch):[^\]]+\]/);
  for (const [, key] of source.matchAll(/\\cite\{([^}]+)\}/g)) {
    assert.ok(refs.some(ref => ref.key === key), `${lesson.texFile}: citation ${key} resolves`);
  }
  for (const ref of refs) assert.ok(!ref.url.includes('\\'), 'Bibliography URLs contain no TeX escapes');
  assert.equal((html.match(/<figure class="latex-figure"/g) ?? []).length,
    (source.match(/\\begin\{figure\}/g) ?? []).length, `${lesson.texFile}: every figure survives conversion`);
  assert.equal((html.match(/<table class="latex-table"/g) ?? []).length,
    (source.match(/\\begin\{tabular\}/g) ?? []).length, `${lesson.texFile}: every text table survives conversion`);
}
const matrixRows = processLatex(chapterContent.getTexWebHtmlFromSource(String.raw`\[
\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\begin{pmatrix}c\\s\end{pmatrix},\quad
\begin{pmatrix}0&J\\J&0\end{pmatrix}\]`, 'fr', []));
assert.doesNotMatch(renderedHtmlToPlainText(matrixRows), /\\/);
assert.doesNotMatch(matrixRows, /katex-error/);
const chapterAliases = chapterContent.getTexWebHtmlFromSource(String.raw`Voir \hyperref[ch:discussion]{discussion} et \hyperref[Disc]{alias}.`, 'fr', [], 'theme3_fr/lecon1.tex');
assert.equal((chapterAliases.match(/class="latex-cross-reference"/g) ?? []).length, 2, 'Chapter labels on separate lines and aliases resolve');
const plainItalics = chapterContent.getTexWebHtmlFromSource(String.raw`\textit{Titre du livre}`, 'fr', []);
assert.ok(plainItalics.includes('<i>Titre du livre</i>'));
assert.ok(!plainItalics.includes('latex-inline-blue-strong'));
const sgLink = chapterContent.getTexWebHtmlFromSource(String.raw`\hyperref[ch:sg]{Stern et Gerlach}`, 'fr', [], 'theme3_fr/lecon2.tex');
assert.doesNotMatch(sgLink, /href=/, 'Keep the original cross-theme label unresolved until its source is refactored');
const hiddenInterferenceLink = chapterContent.getTexWebHtmlFromSource(String.raw`\hyperref[ch:interferences]{Interférences}`, 'fr', [], 'theme3_fr/lecon2.tex');
assert.doesNotMatch(hiddenInterferenceLink, /href=/, 'The hidden theme 1 lesson stays unpublished');
const unpublishedReference = chapterContent.getTexWebHtmlFromSource(String.raw`Voir \ref{sec:haroche}.`, 'fr', [], 'theme3_fr/lecon1.tex');
assert.ok(unpublishedReference.includes('thème 5, leçon 8, non publiée'), 'Unpublished source is identified without a broken link');
assert.doesNotMatch(unpublishedReference, /href=/);
const postulateReferences = chapterContent.getLessonReferences(3, 1, [], 'theme3_fr/lecon1.tex');
assert.equal(postulateReferences.length, 10);
const renderedPostulates = processLatex(frenchPostulates);
assert.equal((renderedPostulates.match(/class="latex-block latex-block-postulat"/g) ?? []).length, 6);
assert.equal((renderedPostulates.match(/class="latex-block latex-block-theorem"/g) ?? []).length, 3);
for (let n = 1; n <= 6; n++) assert.ok(renderedPostulates.includes(`Postulat ${n}`));
assert.ok(renderedPostulates.includes('Introduction au thème 3'));
assert.equal((renderedPostulates.match(/class="latex-footnote-ref"/g) ?? []).length,
  (fs.readFileSync('content/tex/theme3_fr/lecon1.tex', 'utf8').match(/\\footnote\s*\{/g) ?? []).length);
assert.ok(renderedPostulates.includes('latex-block-neutral'), 'The theme introduction uses the neutral frame');
assert.doesNotMatch(renderedPostulates, /katex-error/);
assert.doesNotMatch(renderedHtmlToPlainText(renderedPostulates), /\\[A-Za-z]+|\$|__FOOTNOTE_/);
const postulateSource = fs.readFileSync('content/tex/theme3_fr/lecon1.tex', 'utf8');
for (const [, key] of postulateSource.matchAll(/\\cite\{([^}]+)\}/g)) {
  assert.ok(postulateReferences.some(ref => ref.key === key), `Postulates citation ${key} resolves`);
}
const postulatePresentation = presentation.buildLessonPresentation(frenchPostulates, renderedPostulates, 'fr');
assert.equal(postulatePresentation.toc.at(-1).text, '4. Références');
const theoremSyntax = chapterContent.getTexWebHtmlFromSource(String.raw`
\begin{theorem}[Premier]{th:first}Énoncé.\end{theorem}
\begin{theorem}[Second]\label{th:second}Énoncé.\end{theorem}
\begin{theorem}Sans titre ni label.\end{theorem}
\begin{postulat}[Test]{post:test}Énoncé.\end{postulat}
Voir \ref{th:first}, \ref*{th:second}, \ref{post:test}.`, 'fr', [], 'theme3_fr/lecon1.tex');
assert.ok(theoremSyntax.includes('Voir 1, 2, 1.'));
assert.ok(theoremSyntax.includes('Théorème 3'));
const noteWithMath = processLatex(chapterContent.getTexWebHtmlFromSource(String.raw`
\begin{equation}\label{eq:outside}x=1\end{equation}
Texte\footnote{Voir \eqref{eq:outside}.
\[y=x+1\]
Fin de la note.} Suite.`, 'fr', []));
assert.equal((noteWithMath.match(/class="latex-footnote-ref"/g) ?? []).length, 1);
assert.ok(noteWithMath.includes('Voir (1).'));
const listNote = chapterContent.getTexWebHtmlFromSource(String.raw`
\begin{itemize}
\item Premier item\footnote{Note du premier item.}. Suite.

\item Deuxieme item avant une formule
\[x=1\]
Fin du deuxieme item.
\end{itemize}`, 'fr', []);
assert.match(listNote, /Premier item[\s\S]*Note du premier item\.[\s\S]*<\/li>\s*<li>Deuxieme item/);
assert.equal((listNote.match(/Note du premier item\./g) ?? []).length, 1);
assert.ok(listNote.indexOf('Note du premier item.') < listNote.indexOf('Deuxieme item'));
assert.doesNotMatch(processLatex(listNote), /katex-error/);
assert.doesNotMatch(renderedHtmlToPlainText(noteWithMath), /\\|\$|__FOOTNOTE_/);
assert.doesNotMatch(frenchPostulates, /\\ref\{\}|\[blochsphere\]|\[rabi_battements\]/);
const frenchDirac = [...frenchPages.values()].find(page => page.file === 'theme2_fr/lecon2.tex').html;
assert.doesNotMatch(frenchDirac, /\[eq:ket_to_bra\]/, 'The labelled dagger identity has a displayed equation number');
console.log(`${crossReferenceCount} French cross-references have published targets and stable anchors; unpublished targets stay unlinked.`);

const lessonSource = load('lib/lessonSource.server.ts');
let translatedLinks = 0;
for (const lang of SUPPORTED_LANGS.filter(lang => lang !== 'fr')) {
  const pages = new Map();
  for (const theme of getWebThemes(lang)) {
    for (const lesson of theme.lessons) {
      if (!lessonSource.hasLessonWebContent(lesson.texFile, lang)) continue;
      const file = lessonSource.getTexFilePathForLang(lesson.texFile, lang);
      pages.set(lessonRoutes.chapterLessonPath(lang, theme.slug, lesson), {
        file, html: chapterContent.getLessonWebContent(file, -1, chapterContent.getLessonReferences(theme.number, lesson.number, [], file)),
      });
    }
  }
  let count = 0;
  for (const page of pages.values()) {
    for (const match of page.html.matchAll(/class="latex-cross-reference" href="([^"#]+)#([^"]+)"/g)) {
      assert.ok(match[1].startsWith(`/${lang}/`), `${lang}: reference stays in the requested language`);
      assert.ok(pages.get(match[1])?.html.includes(`id="${match[2]}"`), `${page.file}: translated target anchor exists`);
      count++;
    }
  }
  assert.ok(count >= 2, `${lang}: Hilbert and Dirac links are present`);
  translatedLinks += count;
  const copy = require(path.resolve(`lib/locales/${lang}.json`)).ui.crossReference;
  for (const n of [1, 2]) {
    const html = [...pages.values()].find(page => page.file === `theme2_${lang}/lesson${n}.tex`).html;
    assert.ok(html.includes(copy.unavailable), `${lang}: untranslated target is explicitly identified`);
    assert.doesNotMatch(html, /\[(?:postulat_mesure|sec:t2-notations-dirac|sec:t4-operateurs-bornes|hilbertcn|sec:t4-adjoint-domaine-dense|eq:ket_to_bra|eq:bra_to_ket)\]/);
  }
  assert.equal(lessonSource.hasLessonWebContent('theme3_fr/lecon1.tex', lang), false);
}
console.log(`${translatedLinks} translated cross-references have same-language targets and stable anchors; missing translations remain unlinked.`);
