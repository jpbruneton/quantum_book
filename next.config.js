/** @type {import('next').NextConfig} */
const legacyExerciseSlugRedirects = require("./lib/legacyExerciseSlugRedirects.json");

const nextConfig = {
  output: "standalone",
  async redirects() {
    const out = [];
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
  async headers() {
    return [
      {
        source: "/pdfs/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
