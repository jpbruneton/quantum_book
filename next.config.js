/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
