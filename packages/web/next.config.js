/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false, // Disable SWC minification to avoid issues
  env: {
    NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL,
    NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
  trailingSlash: false,
  // Force server-side rendering only - no static generation
  output: 'standalone',
  distDir: '.next',
  experimental: {
    esmExternals: false,
    // Disable static optimization completely
    staticPageGenerationTimeout: 0,
  },
  // Disable static generation for all pages
  generateStaticParams: false,
  // Force dynamic rendering
  dynamicParams: true,
  // Disable styled-jsx completely to avoid context issues
  compiler: {
    styledJsx: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
