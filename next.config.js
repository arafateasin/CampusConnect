/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.netlify.app"],
    },
  },
  // Netlify specific configuration
  poweredByHeader: false,
  distDir: '.next',
};

module.exports = nextConfig;
