import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Transpile workspace packages
  transpilePackages: ['@repo/shared', '@repo/templates'],

  // Experimental features
  experimental: {
    // Enable React compiler for performance
    reactCompiler: false,
  },

  // Keep server-only packages on the server
  serverExternalPackages: ['nodemailer'],

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

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle node modules that need to be transpiled
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }

    // Fix for Payload CMS client components bundling issue
    // This prevents the "__webpack_modules__[moduleId] is not a function" error
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
      }
    }

    return config
  },

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    // Expose REVALIDATION_SECRET for preview URL generation in the browser
    // This is safe because the secret is already visible in preview URLs
    NEXT_PUBLIC_REVALIDATION_SECRET: process.env.REVALIDATION_SECRET || 'revalidation-secret-key',
  },

  // Headers for security
  async headers() {
    return [
      {
        // Allow all routes to be embedded in same-origin iframes for CMS live preview
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
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
    ]
  },
}

export default withPayload(nextConfig)
