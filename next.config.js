/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    const chapterRedirects = [
      ["experiences-fondatrices", "foundational-experiments"],
      ["espaces-de-hilbert", "hilbert-spaces"],
      ["postulats", "postulates"],
      ["systemes-en-interaction", "interacting-systems"],
      ["decoherence-et-mesure-quantique", "decoherence-and-quantum-measurement"],
    ];
    const out = [];
    for (const [from, to] of chapterRedirects) {
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
