/** @type {import('next').NextConfig} */
const legacyExerciseSlugRedirects = require("./lib/legacyExerciseSlugRedirects.json");

const nextConfig = {
  output: "standalone",
  experimental: { outputFileTracingIncludes: { "*": ["./content/tex/exos_*/**/*.tex", "./content/tex/theme*_*/**/*.tex"] } },
  async redirects() {
    const out = [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
    for (const [from, to] of Object.entries(legacyExerciseSlugRedirects)) {
      out.push({
        source: `/chapters/${from}`,
        destination: `/chapters/${to}`,
        permanent: true,
      });
      out.push({
        source: `/exercises/${from}`,
        destination: `/exercises/${to}`,
        permanent: true,
      });
    }
    return out;
  },
};

module.exports = nextConfig;
