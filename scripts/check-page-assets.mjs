import assert from "node:assert/strict";
import {readFileSync, existsSync} from "node:fs";
import {join} from "node:path";
const {routes} = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
const styles = new Set();
let figures = 0;
let responsiveFigures = 0;
for (const route of Object.keys(routes).filter(p => /^\/[a-z]{2}(?:\/|$)/.test(p))) {
  const html = readFileSync(join('.next/server/app', `${route.slice(1)}.html`), 'utf8');
  for (const [,path] of html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)) styles.add(path);
  for (const [,path] of html.matchAll(/(?:src|data)="(\/figs\/[^"]+)"/g)) {
    assert.ok(existsSync(join('public', decodeURI(path))), `${route}: figure ${path} exists`); figures++;
  }
  for (const [tag, path] of html.matchAll(/(<img\b[^>]*\bsrc="(\/figs\/[^"]+)"[^>]*>)/g)) {
    assert.match(tag, /\bwidth="\d+"/, `${route}: figure ${path} has an intrinsic width`);
    assert.match(tag, /\bheight="\d+"/, `${route}: figure ${path} has an intrinsic height`);
    assert.match(tag, /\bdecoding="async"/, `${route}: figure ${path} decodes asynchronously`);
  }
  for (const [,srcset] of html.matchAll(/<source\b[^>]*\bsrcset="([^"]+)"[^>]*>/g)) {
    for (const candidate of srcset.split(',')) {
      const [path, width] = candidate.trim().split(/\s+/);
      if (!path.startsWith('/figs/_optimized/')) continue;
      assert.match(width, /^\d+w$/, `${route}: responsive candidate ${path} has a width descriptor`);
      assert.ok(existsSync(join('public', decodeURI(path))), `${route}: responsive figure ${path} exists`);
      responsiveFigures++;
    }
  }
}
for (const path of styles) {
  const css = readFileSync(join('.next', path.replace('/_next/', '')), 'utf8');
  assert.doesNotMatch(css, /@import\b/, `${path}: no external stylesheet waterfall`);
  for (const [,raw] of css.matchAll(/url\(([^)]+)\)/g)) {
    const url = raw.replace(/^["']|["']$/g, '');
    if (url.startsWith('data:')) continue;
    assert.ok(url.startsWith('/_next/static/media/'), `${url}: local font`);
    assert.ok(existsSync(join('.next', url.slice('/_next/'.length))), `${url}: font exists`);
  }
}
assert.ok(styles.size > 0);
assert.ok(responsiveFigures > 0, 'responsive figure variants are present');
console.log(`${figures} figure references, ${responsiveFigures} responsive candidates and ${styles.size} local stylesheets checked.`);
