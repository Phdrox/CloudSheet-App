/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cloud-sheet.vercel.app/:path*",
      },
      {
        source: "/api/:path*",
        destination: "https://cloud-sheet.vercel.app/auth/:path*",
      },
    ]
  },
};

export default nextConfig;