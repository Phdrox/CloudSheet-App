/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
async rewrites() {
  return [
    {
      source: "/api/auth/:path*",
      destination: "https://cloud-sheet.vercel.app/auth/:path*",
    },
    {
      source: "/api/:path*",
      destination: "https://cloud-sheet.vercel.app/:path*",
    },
  ];
}
};

export default nextConfig;