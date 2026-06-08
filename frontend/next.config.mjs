/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  allowedDevOrigins: ['192.168.1.109'],
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}           

export default nextConfig
