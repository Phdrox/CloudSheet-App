/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cloud-sheet.vercel.app/api/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "https://cloud-sheet.vercel.app/api/auth/:path*",
      },
    ]
  },
};

export default nextConfig;