/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: true }]
  },
}

export default nextConfig;
