import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, HeadingFeature, LinkFeature, UploadFeature, BlockquoteFeature, OrderedListFeature, UnorderedListFeature, ParagraphFeature, InlineCodeFeature, BoldFeature, ItalicFeature, UnderlineFeature, StrikethroughFeature } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

// Environment validation
import { validateEnv } from './lib/validateEnv'

// Validate environment variables before starting
validateEnv()

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
import { ContentTypes } from './collections/ContentTypes'
import { CustomItems } from './collections/CustomItems'

// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Settings } from './globals/Settings'

// Revalidation endpoint
import { revalidateEndpoint } from './endpoints/revalidate'
import { resetDataHandler } from './endpoints/resetData'
import { seedEndpoints } from './endpoints/seed'
import { collectionTemplateEndpoints } from './endpoints/collectionTemplates'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ===========================================
// Email Transport Configuration
// ===========================================
const emailTransport = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : undefined

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
      connectionString: process.env.DATABASE_URL || 'postgresql://payload:payload_secret@localhost:5432/payload',
    },
    // In production, disable auto-push and use migrations
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, '../../db/migrations'),
  }),

  // ===========================================
  // Email Configuration
  // ===========================================
  email: emailTransport
    ? {
        transport: emailTransport,
        fromName: process.env.EMAIL_FROM_NAME || 'Payload CMS',
        fromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com',
      }
    : undefined,

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

    // Theme configuration - supports light and dark mode
    theme: 'all', // 'light' | 'dark' | 'all' (allows user to choose)

    components: {
      // Custom two-panel navigation
      Nav: '/admin/TwoPanelNav',
      // Custom views
      views: {
        dashboard: {
          Component: '/admin/views/Dashboard',
        },
        tools: {
          Component: '/admin/views/Tools',
          path: '/tools',
        },
      },
      // graphics: {
      //   Logo: '/components/Logo',
      //   Icon: '/components/Icon',
      // },
    },

    // Import map base directory for custom components
    importMap: {
      baseDir: path.resolve(dirname),
    },

    // Date format configuration
    dateFormat: 'MMMM dd, yyyy',

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
  // Rich Text Editor (Lexical) - Full Configuration
  // ===========================================
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Heading feature with all levels
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      }),
      // Link feature with custom fields
      LinkFeature({
        enabledCollections: ['pages', 'posts', 'artifacts'],
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            options: [
              { label: 'None', value: '' },
              { label: 'No Follow', value: 'nofollow' },
              { label: 'No Opener', value: 'noopener' },
              { label: 'No Referrer', value: 'noreferrer' },
            ],
          },
        ],
      }),
      // Upload feature for inline images
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'caption',
                type: 'text',
                label: 'Caption',
              },
            ],
          },
        },
      }),
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
    // Dynamic content types system
    ContentTypes,
    CustomItems,
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
  // Localization (Optional - uncomment to enable)
  // ===========================================
  // localization: {
  //   locales: [
  //     { label: 'English', code: 'en' },
  //     { label: 'Spanish', code: 'es' },
  //     { label: 'French', code: 'fr' },
  //     { label: 'German', code: 'de' },
  //   ],
  //   defaultLocale: 'en',
  //   fallback: true,
  // },

  // ===========================================
  // Plugins
  // ===========================================
  plugins: [
    // SEO Plugin - Meta tags, Open Graph, Twitter Cards
    seoPlugin({
      collections: ['pages', 'posts', 'artifacts', 'people', 'places', 'museum-collections', 'custom-items', 'content-types'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || doc?.name || 'Untitled'} | Museum Collection`,
      generateDescription: ({ doc }) => doc?.excerpt || doc?.shortDescription || doc?.shortBio || '',
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        if (collectionSlug === 'pages') {
          return doc?.slug === 'home' ? baseUrl : `${baseUrl}/${doc?.slug || ''}`
        }
        if (collectionSlug === 'museum-collections') {
          return `${baseUrl}/collections/${doc?.slug || ''}`
        }
        if (collectionSlug === 'custom-items') {
          const typeSlug = typeof doc?.contentType === 'object' ? doc?.contentType?.slug : undefined
          return typeSlug
            ? `${baseUrl}/items/${typeSlug}/${doc?.slug || ''}`
            : `${baseUrl}/items/${doc?.slug || ''}`
        }
        if (collectionSlug === 'content-types') {
          return `${baseUrl}/items/${doc?.slug || ''}`
        }
        return `${baseUrl}/${collectionSlug}/${doc?.slug || ''}`
      },
      twitterCreator: '@museum',
    }),

    // Form Builder Plugin - Contact forms, surveys, etc.
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        payment: false, // Enable if using Stripe
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
      // Email notifications for form submissions
      ...(emailTransport && {
        handlePayment: undefined,
        beforeEmail: (emails) => emails,
      }),
    }),

    // Nested Docs Plugin - Hierarchical collections
    nestedDocsPlugin({
      collections: ['museum-collections', 'categories'],
      generateLabel: (_, doc) => (doc.title || doc.name) as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),

    // Redirects Plugin - URL redirects management
    redirectsPlugin({
      collections: ['pages', 'posts', 'artifacts'],
      overrides: {
        admin: {
          group: 'Settings',
        },
      },
    }),

    // Search Plugin - Full-text search across collections
    searchPlugin({
      collections: ['pages', 'posts', 'artifacts', 'people', 'places', 'museum-collections', 'custom-items', 'content-types'],
      defaultPriorities: {
        pages: 10,
        posts: 20,
        artifacts: 30,
        people: 40,
        places: 50,
        'museum-collections': 60,
        'custom-items': 25,
        'content-types': 5,
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        excerpt: originalDoc?.excerpt || originalDoc?.shortDescription || originalDoc?.shortBio || '',
      }),
    }),

    // S3 Storage Plugin (optional, configured via env vars)
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'media',
                generateFileURL: ({ filename }) => {
                  return `${process.env.S3_CDN_URL || `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION || 'us-east-1'}.amazonaws.com`}/media/${filename}`
                },
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
  // Jobs Queue Configuration (Background Tasks)
  // ===========================================
  jobs: {
    // Enable jobs queue for background processing
    // Useful for: email sending, image processing, scheduled tasks
    access: {
      run: ({ req }) => {
        // Only allow authenticated admin users to run jobs
        return req.user?.role === 'admin'
      },
    },
    // Job tasks can be defined here
    tasks: [],
  },

  // ===========================================
  // Custom Endpoints
  // ===========================================
  endpoints: [
    revalidateEndpoint,
    // Reset data endpoint for admin panel
    {
      path: '/admin/reset-data',
      method: 'post',
      handler: resetDataHandler,
    },
    // Seed data endpoints for admin panel
    ...seedEndpoints,
    // Collection template endpoints for admin panel
    ...collectionTemplateEndpoints,
  ],

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
  // Upload Configuration
  // ===========================================
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  },

  // ===========================================
  // Rate Limiting
  // ===========================================
  rateLimit: {
    max: 500, // Max requests per window
    window: 60 * 1000, // 1 minute window
    trustProxy: true,
  },

  // ===========================================
  // CORS Configuration
  // ===========================================
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
    'http://localhost:4321', // Astro dev server
  ].filter(Boolean),

  // ===========================================
  // CSRF Protection
  // ===========================================
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
    'http://localhost:4321', // Astro dev server
  ].filter(Boolean),

  // ===========================================
  // Query Depth Limits
  // ===========================================
  defaultDepth: 2,
  maxDepth: 10,

  // ===========================================
  // Debug Mode (Development Only)
  // ===========================================
  debug: process.env.NODE_ENV !== 'production',

  // ===========================================
  // Telemetry (Disable in production if needed)
  // ===========================================
  telemetry: process.env.PAYLOAD_TELEMETRY !== 'false',

  // ===========================================
  // Initialization Hook
  // ===========================================
  onInit: async (payload) => {
    payload.logger.info('═══════════════════════════════════════════════════════')
    payload.logger.info('Payload CMS initialized successfully')
    payload.logger.info('═══════════════════════════════════════════════════════')
    payload.logger.info(`Server URL: ${payload.config.serverURL}`)
    payload.logger.info(`Admin URL: ${payload.config.serverURL}/admin`)
    payload.logger.info(`GraphQL: ${payload.config.serverURL}/api/graphql`)
    payload.logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
    
    if (process.env.S3_BUCKET) {
      payload.logger.info(`S3 Storage: Enabled (${process.env.S3_BUCKET})`)
    }
    
    if (emailTransport) {
      payload.logger.info(`Email: Enabled (${process.env.SMTP_HOST})`)
    }
    
    payload.logger.info('═══════════════════════════════════════════════════════')
  },
})
