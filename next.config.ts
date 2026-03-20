/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [{
      source:"/api/:path*",
      destination:"https://cloud-sheet.vercel.app/api/:path*"
    }]
  }
};

export default nextConfig;