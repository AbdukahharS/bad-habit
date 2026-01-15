/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Enable static export for SSG
  output: 'export',
  // Optimize images for static export
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
