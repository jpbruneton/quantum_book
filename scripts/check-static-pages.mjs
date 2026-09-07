import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
const {routes} = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
const languages = ["fr","en","de","es","pt","it","pl","ru","zh","ja","ko","hi","vi","ar","id","tr","bn","ur","sw","fa"];
const pages = Object.keys(routes).filter(path => /^\/[a-z]{2}(?:\/|$)/.test(path));
for (const lang of languages) assert.ok(routes[`/${lang}`], `${lang}: static home`);
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
  if (route.includes("/quiz") || (!['fr','en'].includes(lang) && !route.includes('/chapters/'))) assert.match(html, /name="robots" content="noindex, follow"/, `${route}: unfinished content is not indexed`);
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  if (visible.includes('class="katex"')) mathPages++;
  for (const [,id] of visible.matchAll(/href="#([^"]+)"/g)) assert.ok(visible.includes(`id="${id}"`), `${route}: anchor ${id}`);
}
assert.ok(mathPages > 0, "Math is visible without JavaScript");
const sitemap = readFileSync('.next/server/app/sitemap.xml.body', 'utf8');
assert.ok(!sitemap.includes('/quiz'), 'Unpublished quizzes absent from sitemap');
console.log(`${pages.length} static localized pages checked; ${mathPages} pages with precompiled equations.`);
if (process.argv[2]) {
  for (const lang of languages) {
    for (const route of [`/${lang}`, ...pages.filter(p => p.startsWith(`/${lang}/chapters/`) && p.split('/').length === 5).slice(0,1)]) {
      const html = readFileSync(join('.next/server/app', `${route.slice(1)}.html`), 'utf8');
      const path = new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]).pathname;
      const response = await fetch(new URL(path, process.argv[2]));
      assert.equal(response.status, 200, path);
      assert.match(await response.text(), new RegExp(`<html[^>]*lang="${lang}"`));
      assert.ok(!response.redirected, `${path}: canonical route has no redirect loop`);
    }
  }
  const legacy = await fetch(new URL('/fr/chapitres/espaces-de-hilbert/lecon-3', process.argv[2]), {redirect:'manual'});
  assert.equal(legacy.status, 308);
  assert.match(legacy.headers.get('location'), /fiche-1$/);
  console.log('Public multilingual routes and legacy redirects checked.');
}
