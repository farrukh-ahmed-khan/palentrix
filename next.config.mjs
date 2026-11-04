/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [
      { source: "/software-house-pakistan", destination: "/software-house-usa", permanent: true },
    ];
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
