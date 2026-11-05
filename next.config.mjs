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
      // retired case studies
      { source: "/work/aegisiq-investor-portal", destination: "/work", permanent: true },
      { source: "/work/saas-ai-platform", destination: "/work", permanent: true },
      { source: "/work/jstyle-ecommerce-platform", destination: "/work", permanent: true },
    ];
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
