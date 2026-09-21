// HTTP/resource audit, not a browser FPS or Core Web Vitals measurement.
// Usage: node scripts/audit-page-payload.mjs https://example.org/page [...URLs]
import https from 'node:https';
import http from 'node:http';
import { brotliDecompressSync, gunzipSync } from 'node:zlib';

const cache = new Map();
function download(url) {
  if (cache.has(url)) return cache.get(url);
  const pending = new Promise((resolve, reject) => {
    const start = performance.now();
    const transport = new URL(url).protocol === 'https:' ? https : http;
    const req = transport.get(url, {headers: {'accept-encoding': 'br, gzip'}}, response => {
      const headersMs = performance.now() - start;
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        try {
          const wire = Buffer.concat(chunks);
          const encoding = response.headers['content-encoding'];
          const body = encoding === 'br' ? brotliDecompressSync(wire)
            : encoding === 'gzip' ? gunzipSync(wire) : wire;
          if (response.statusCode !== 200) throw new Error(`${url}: HTTP ${response.statusCode}`);
          resolve({url, body, transferBytes: wire.length, decodedBytes: body.length,
            encoding: encoding || 'identity', headersMs: Math.round(headersMs),
            cache: response.headers['x-vercel-cache'], cacheControl: response.headers['cache-control']});
        } catch (error) { reject(error); }
      });
    });
    req.setTimeout(30000, () => req.destroy(new Error(`Timeout: ${url}`)));
    req.on('error', reject);
  });
  cache.set(url, pending);
  return pending;
}
const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);
for (const url of process.argv.slice(2)) {
  const page = await download(url);
  const html = page.body.toString('utf8');
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  // Modern browsers skip nomodule scripts; don't count legacy polyfills as loaded.
  const scripts = [...new Set([...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)]
    .filter(m => !/\bnomodule\b/i.test(m[0])).map(m => new URL(m[1], url).href))];
  const styles = [...new Set([...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(m => new URL(m[1], url).href))];
  const js = await Promise.all(scripts.map(download));
  const css = await Promise.all(styles.map(download));
  const cssText = css.map(c => c.body.toString('utf8')).join('\n');
  const inlineScripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('');
  console.log(JSON.stringify({url, headersMs: page.headersMs, cache: page.cache,
    encoding: page.encoding, htmlTransferBytes: page.transferBytes, htmlDecodedBytes: page.decodedBytes,
    inlineScriptBytes: Buffer.byteLength(inlineScripts),
    visibleElements: (visible.match(/<[a-z][^>]*>/g) || []).length,
    formulas: (visible.match(/class="katex"/g) || []).length,
    scriptCount: js.length, jsTransferBytes: sum(js, 'transferBytes'), jsDecodedBytes: sum(js, 'decodedBytes'),
    cssTransferBytes: sum(css, 'transferBytes'), cssDecodedBytes: sum(css, 'decodedBytes'),
    preloadedFonts: (html.match(/as="font"/g) || []).length,
    figureCount: (visible.match(/<figure\b/g) || []).length,
    internalLinks: [...new Set([...visible.matchAll(/<a\b[^>]*href="([^"#]+)"/g)].map(m => m[1]).filter(p => p.startsWith('/')))].length,
    tocRules: cssText.match(/\.lesson-toc-(?:sticky|sidebar)\{[^}]+\}/g),
    bodyRules: cssText.match(/(?:^|})body\{[^}]+\}/g),
    largestScripts: js.sort((a,b) => b.transferBytes-a.transferBytes).slice(0,4).map(({url,transferBytes,decodedBytes})=>({url,transferBytes,decodedBytes})),
  }));
}
