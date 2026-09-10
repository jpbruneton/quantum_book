import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
const {routes} = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
const languages = ["fr","en","de","es","pt","it","pl","ru","zh","ja","ko","hi","vi","ar","id","tr","bn","ur","sw","fa"];
const pages = Object.keys(routes).filter(path => /^\/[a-z]{2}(?:\/|$)/.test(path));
for (const lang of languages) assert.ok(routes[`/${lang}`], `${lang}: static home`);
assert.ok(!routes['/fr/chapters/foundational-experiments/lesson-2'], 'Withdrawn French lesson is not generated');
let mathPages = 0;
for (const route of pages) {
  assert.equal(routes[route].initialRevalidateSeconds, false, `${route}: precompiled`);
  const html = readFileSync(join(".next/server/app", `${route.slice(1)}.html`), "utf8");
  const lang = route.split("/")[1];
  assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`), `${route}: document language`);
  assert.match(html, new RegExp(`<html[^>]*dir="${["ar","ur","fa"].includes(lang) ? "rtl" : "ltr"}"`), `${route}: direction`);
  assert.equal((html.match(/<html\b/g) ?? []).length, 1);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${route}: canonical URL`);
  if (route.includes("/quiz") || (!['fr','en'].includes(lang) && route.includes('/exercises'))) assert.match(html, /name="robots" content="noindex, follow"/, `${route}: unfinished content is not indexed`);
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const withoutMathSource = visible.replace(/<math\b[^>]*>[\s\S]*?<\/math>/g, "");
  assert.doesNotMatch(withoutMathSource, /(?:^|>)[^<]*\\(?:[,;:{} ]|(?:eqref|url|begin|end)\b)/,
    `${route}: no unconverted TeX commands in visible text`);
  assert.doesNotMatch(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "", /\\/,
    `${route}: metadata title does not expose TeX source`);
  if (visible.includes('class="katex"')) mathPages++;
  for (const [,id] of visible.matchAll(/href="#([^"]+)"/g)) assert.ok(visible.includes(`id="${id}"`), `${route}: anchor ${id}`);
}
assert.ok(mathPages > 0, "Math is visible without JavaScript");
if (!process.argv.includes('--available-only')) {
  const units = [['foundational-experiments','lesson-1'], ['hilbert-spaces','lesson-1'], ['hilbert-spaces','lesson-2'], ['hilbert-spaces','fiche-1'], ['hilbert-spaces','fiche-2']];
  for (const lang of languages) {
    const catalog = JSON.parse(readFileSync(`lib/locales/${lang}.json`, 'utf8'));
    const home = readFileSync(`.next/server/app/${lang}.html`, 'utf8');
    assert.ok(!home.includes('name="robots" content="noindex'), `${lang}: translated home is indexable`);
    assert.ok(home.includes(catalog.ui.book.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;')), `${lang}: localized home title`);
    for (const [theme, ref] of units) {
      const route = `/${lang}/chapters/${theme}/${ref}`;
      assert.ok(routes[route], `${route}: requested translation is generated`);
      const html = readFileSync(`.next/server/app${route}.html`, 'utf8');
      const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
      assert.ok(visible.includes('class="katex"'), `${route}: equations precompiled`);
      assert.ok(!visible.includes('class="katex-error"'), `${route}: no equation rendering errors`);
      assert.ok(!html.includes('name="robots" content="noindex'), `${route}: translated lesson is indexable`);
      if (theme === 'foundational-experiments') assert.ok(visible.includes(`/figs/${lang}/SG_base_prediction.png`), `${route}: localized TikZ figure`);
    }
  }
}
const sitemap = readFileSync('.next/server/app/sitemap.xml.body', 'utf8');
assert.ok(!sitemap.includes('/quiz'), 'Unpublished quizzes absent from sitemap');
assert.ok(!sitemap.includes('/fr/chapitres/experiences-fondatrices/lecon-2'), 'Withdrawn French lesson absent from sitemap');
console.log(`${pages.length} static localized pages checked; ${mathPages} pages with precompiled equations.`);
const serverUrl = process.argv.slice(2).find(arg => /^https?:/.test(arg));
if (serverUrl) {
  for (const lang of languages) {
    const requestedLessons = pages.filter(p => p.startsWith(`/${lang}/chapters/`) && /\/(?:foundational-experiments\/lesson-1|hilbert-spaces\/(?:lesson-[12]|fiche-[12]))$/.test(p));
    for (const route of [`/${lang}`, ...requestedLessons]) {
      const html = readFileSync(join('.next/server/app', `${route.slice(1)}.html`), 'utf8');
      const path = new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]).pathname;
      const response = await fetch(new URL(path, serverUrl));
      assert.equal(response.status, 200, path);
      assert.match(await response.text(), new RegExp(`<html[^>]*lang="${lang}"`));
      assert.ok(!response.redirected, `${path}: canonical route has no redirect loop`);
    }
  }
  const withdrawn = await fetch(new URL('/fr/chapitres/experiences-fondatrices/lecon-2', serverUrl));
  assert.equal(withdrawn.status, 404, 'Withdrawn lesson URL returns 404');
  const legacy = await fetch(new URL('/fr/chapitres/espaces-de-hilbert/lecon-3', serverUrl), {redirect:'manual'});
  assert.equal(legacy.status, 308);
  assert.match(legacy.headers.get('location'), /fiche-1$/);
  console.log('Public multilingual routes and legacy redirects checked.');
}
