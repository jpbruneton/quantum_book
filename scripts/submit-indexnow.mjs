// Submits all URLs from the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver...).
// Usage: node scripts/submit-indexnow.mjs
const SITE_URL = "https://quantumlectures.org";
const KEY = "1a2b8cc1eaee48dd8ec10539b885ee7d";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

async function fetchSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap.xml: ${res.status}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    throw new Error("No URLs found in sitemap.xml");
  }
  return urls;
}

async function submitBatch(urls) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`IndexNow submission failed: ${res.status} ${body}`);
  }
  console.log(`Submitted ${urls.length} URLs to IndexNow (status ${res.status}).`);
}

const BATCH_SIZE = 10000; // IndexNow allows up to 10,000 URLs per request

async function main() {
  const urls = await fetchSitemapUrls();
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    await submitBatch(urls.slice(i, i + BATCH_SIZE));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
