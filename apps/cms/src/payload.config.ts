import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Artifacts } from './collections/Artifacts'
import { People } from './collections/People'
import { Places } from './collections/Places'
import { Collections as MuseumCollections } from './collections/Collections'

// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Settings } from './globals/Settings'

// Revalidation endpoint
import { revalidateEndpoint } from './endpoints/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // ===========================================
  // Core Configuration
  // ===========================================
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
  
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // ===========================================
  // Database Configuration (PostgreSQL)
  // ===========================================
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/payload',
    },
    // In production, disable auto-push and use migrations
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, '../../db/migrations'),
  }),

  // ===========================================
  // Admin Panel Configuration
  // ===========================================
  admin: {
    user: Users.slug,
    
    meta: {
      titleSuffix: '- Payload CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },

    components: {
      // Custom admin components can be added here
      // graphics: {
      //   Logo: '/components/Logo',
      //   Icon: '/components/Icon',
      // },
    },

    // Live Preview configuration
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      collections: ['pages', 'posts', 'artifacts'],
      globals: ['header', 'footer'],
      url: ({ data, collectionConfig, globalConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        
        if (collectionConfig) {
          const slug = data?.slug || data?.id
          return `${baseUrl}/preview/${collectionConfig.slug}/${slug}`
        }
        
        if (globalConfig) {
          return `${baseUrl}/preview/globals/${globalConfig.slug}`
        }
        
        return baseUrl
      },
    },
  },

  // ===========================================
  // Rich Text Editor (Lexical)
  // ===========================================
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Additional Lexical features can be added here
    ],
  }),

  // ===========================================
  // Collections
  // ===========================================
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Categories,
    // Museum example collections
    Artifacts,
    People,
    Places,
    MuseumCollections,
  ],

  // ===========================================
  // Globals
  // ===========================================
  globals: [
    Header,
    Footer,
    Settings,
  ],

  // ===========================================
  // Plugins
  // ===========================================
  plugins: [
    // SEO Plugin
    seoPlugin({
      collections: ['pages', 'posts', 'artifacts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || 'Untitled'} | My Site`,
      generateDescription: ({ doc }) => doc?.excerpt || doc?.description || '',
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        if (collectionSlug === 'pages') {
          return `${baseUrl}/${doc?.slug || ''}`
        }
        return `${baseUrl}/${collectionSlug}/${doc?.slug || ''}`
      },
    }),

    // Form Builder Plugin
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: false,
        country: false,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
      formOverrides: {
        admin: {
          group: 'Forms',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Forms',
        },
      },
    }),

    // Nested Docs Plugin (for hierarchical collections)
    nestedDocsPlugin({
      collections: ['museum-collections', 'categories'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),

    // Redirects Plugin
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: {
        admin: {
          group: 'Settings',
        },
      },
    }),

    // Search Plugin
    searchPlugin({
      collections: ['pages', 'posts', 'artifacts', 'people', 'places'],
      defaultPriorities: {
        pages: 10,
        posts: 20,
        artifacts: 30,
        people: 40,
        places: 50,
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        excerpt: originalDoc?.excerpt || originalDoc?.description || '',
      }),
    }),

    // S3 Storage Plugin (optional, configured via env vars)
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'media',
              },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'us-east-1',
              ...(process.env.S3_ENDPOINT && { endpoint: process.env.S3_ENDPOINT }),
            },
          }),
        ]
      : []),
  ],

  // ===========================================
  // Custom Endpoints
  // ===========================================
  endpoints: [revalidateEndpoint],

  // ===========================================
  // TypeScript Configuration
  // ===========================================
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ===========================================
  // GraphQL Configuration
  // ===========================================
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
    disablePlaygroundInProduction: true,
  },

  // ===========================================
  // Image Processing (Sharp)
  // ===========================================
  sharp,

  // ===========================================
  // CORS Configuration
  // ===========================================
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  ].filter(Boolean),

  // ===========================================
  // CSRF Protection
  // ===========================================
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  ].filter(Boolean),

  // ===========================================
  // Query Depth Limits
  // ===========================================
  defaultDepth: 2,
  maxDepth: 10,

  // ===========================================
  // Initialization Hook
  // ===========================================
  onInit: async (payload) => {
    payload.logger.info('Payload CMS initialized successfully')
    payload.logger.info(`Server URL: ${payload.config.serverURL}`)
    payload.logger.info(`Admin URL: ${payload.config.serverURL}/admin`)
  },
})
