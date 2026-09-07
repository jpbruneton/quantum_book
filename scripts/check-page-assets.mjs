import assert from "node:assert/strict";
import {readFileSync, existsSync} from "node:fs";
import {join} from "node:path";
const {routes} = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
const styles = new Set();
let figures = 0;
for (const route of Object.keys(routes).filter(p => /^\/[a-z]{2}(?:\/|$)/.test(p))) {
  const html = readFileSync(join('.next/server/app', `${route.slice(1)}.html`), 'utf8');
  for (const [,path] of html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)) styles.add(path);
  for (const [,path] of html.matchAll(/(?:src|data)="(\/figs\/[^"]+)"/g)) {
    assert.ok(existsSync(join('public', decodeURI(path))), `${route}: figure ${path} exists`); figures++;
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
console.log(`${figures} figure references and ${styles.size} local stylesheets checked.`);
