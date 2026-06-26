/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
