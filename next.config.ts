/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [{
      source:"/auth/:path*",
      destination:"https://cloud-sheet.vercel.app/auth/:path*",
    },{
      source:"/main/:path*",
      destination:"https://cloud-sheet.vercel.app/main/:path*"
    }]
  }
};

export default nextConfig;