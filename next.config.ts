/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://cloud-sheet.vercel.app/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig;