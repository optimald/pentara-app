/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL,
    NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
  trailingSlash: false,
  experimental: {
    esmExternals: false,
  },
          // Force server-side rendering only - no static generation
        output: 'standalone',
        distDir: '.next',
        // Disable static generation completely
        generateStaticParams: false,
        // Force all pages to be dynamic
        dynamicParams: false,
        // Disable static optimization
        staticPageGenerationTimeout: 0,
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
