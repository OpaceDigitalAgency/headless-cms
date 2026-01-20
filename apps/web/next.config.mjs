/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Static export for SSG (optional - can be enabled for full static)
  // output: 'export',

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  // Transpile workspace packages
  transpilePackages: ['@repo/shared', '@repo/templates'],

  // Environment variables
  env: {
    NEXT_PUBLIC_CMS_URL: process.env.CMS_URL || 'http://localhost:3000',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  },

  // Experimental features
  experimental: {
    // Enable React compiler for performance
    reactCompiler: false,
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        // Allow preview routes to be embedded in CMS iframe
        source: '/preview/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost:3000",
          },
        ],
      },
      {
        // Allow API routes to be embedded (for draft mode)
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost:3000",
          },
        ],
      },
      {
        // Deny framing for all other routes
        source: '/((?!preview|api).*)',
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
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/artifacts',
        destination: '/archive-items',
        permanent: true,
      },
      {
        source: '/artifacts/:slug',
        destination: '/archive-items/:slug',
        permanent: true,
      },
    ]
  },

  // Rewrites for preview mode
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
