// @ts-nocheck
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, FixedToolbarFeature, HeadingFeature, LinkFeature, UploadFeature, BlockquoteFeature, OrderedListFeature, UnorderedListFeature, ParagraphFeature, InlineCodeFeature, BoldFeature, ItalicFeature, UnderlineFeature, StrikethroughFeature } from '@payloadcms/richtext-lexical'
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
import { Tags } from './collections/Tags'
import { seoCollectionSlugs } from './lib/seo/seoCollections'

// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Settings } from './globals/Settings'
import { NavigationSettings } from './globals/NavigationSettings'

// Revalidation endpoint
import { revalidateEndpoint } from './endpoints/revalidate'
import { resetDataHandler } from './endpoints/resetData'
import { seedEndpoints } from './endpoints/seed'
import { collectionTemplateEndpoints } from './endpoints/collectionTemplates'
import { navigationEndpoint } from './endpoints/navigation'
import { collectionManagerEndpoint } from './endpoints/collectionManager'
import { toolsEndpoints } from './endpoints/tools'
import { taxonomyEndpoints } from './endpoints/taxonomy'
import { seoEndpoints } from './endpoints/seo'
import { seoTemplatesEndpoints } from './endpoints/seo-templates'
import { seoAdvancedEndpoints } from './endpoints/seo-advanced'

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
    // Push mode (auto-sync schema) is used when:
    // - FRESH_INSTALL=true (for Railway first deploy)
    // - DRIZZLE_PUSH=true (explicit opt-in for local dev)
    // Otherwise we use migrations (controlled schema changes) to avoid interactive prompts
    push: process.env.FRESH_INSTALL === 'true' || process.env.DRIZZLE_PUSH === 'true',
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
        'content-manager': {
          Component: '/admin/views/ContentManager',
          path: '/content-manager',
        },
        'collection-manager': {
          Component: '/admin/views/Collections',
          path: '/collection-manager',
        },
        'shop-manager': {
          Component: '/admin/views/ShopManager',
          path: '/shop-manager',
        },
        'taxonomy-manager': {
          Component: '/admin/views/TaxonomyManager',
          path: '/taxonomy-manager',
        },
        tools: {
          Component: '/admin/views/Tools',
          path: '/tools',
          exact: true,
        },
        'tools-publishing-calendar': {
          Component: '/admin/views/tools/PublishingCalendar',
          path: '/tools/publishing-calendar',
          exact: true,
        },
        'tools-draft-review': {
          Component: '/admin/views/tools/DraftReview',
          path: '/tools/draft-review',
          exact: true,
        },
        'tools-seo-audit': {
          Component: '/admin/views/tools/SeoAudit',
          path: '/tools/seo-audit',
          exact: true,
        },
        'tools-form-submissions': {
          Component: '/admin/views/tools/FormSubmissions',
          path: '/tools/form-submissions',
          exact: true,
        },
        'tools-media-library': {
          Component: '/admin/views/tools/MediaLibrary',
          path: '/tools/media-library',
          exact: true,
        },
        'tools-unused-media': {
          Component: '/admin/views/tools/UnusedMedia',
          path: '/tools/unused-media',
          exact: true,
        },
        'tools-large-files': {
          Component: '/admin/views/tools/LargeFiles',
          path: '/tools/large-files',
          exact: true,
        },
        'tools-redirects': {
          Component: '/admin/views/tools/Redirects',
          path: '/tools/redirects',
          exact: true,
        },
        'tools-forms': {
          Component: '/admin/views/tools/Forms',
          path: '/tools/forms',
          exact: true,
        },
        'tools-user-management': {
          Component: '/admin/views/tools/UserManagement',
          path: '/tools/user-management',
          exact: true,
        },
        'tools-search-index': {
          Component: '/admin/views/tools/SearchIndex',
          path: '/tools/search-index',
          exact: true,
        },
        'seo-settings': {
          Component: '/admin/views/SeoSettings',
          path: '/seo',
          exact: true,
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

    // Live Preview configuration - Defined at collection level for better control
    // See individual collection configs (Pages.ts, Posts.ts, etc.) for livePreview settings
  },

  // ===========================================
  // Rich Text Editor (Lexical) - Full Configuration
  // ===========================================
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      // Filter out default features that we want to customize to avoid duplicates
      const filteredFeatures = defaultFeatures.filter((feature) => {
        // Remove default HeadingFeature, LinkFeature, and UploadFeature so we can add customized versions
        const featureName = feature?.key || ''
        return featureName !== 'heading' && featureName !== 'link' && featureName !== 'upload'
      })

      return [
        ...filteredFeatures,
        // Fixed toolbar (always visible at top)
        FixedToolbarFeature(),
        // Heading feature with all levels enabled
        HeadingFeature({
          enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        }),
        // Link feature with custom rel attribute field
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
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
        // Upload feature for inline images with caption support
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
      ]
    },
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
    Tags,
  ],

  // ===========================================
  // Globals
  // ===========================================
  globals: [
    Header,
    Footer,
    Settings,
    NavigationSettings,
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
    // Note: tabbedUI is set to true, which means SEO fields will be injected
    // into the 'meta' field group defined in each collection's tabs
    seoPlugin({
      collections: [...seoCollectionSlugs],
      tabbedUI: true,
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || doc?.name || 'Untitled'} | CMS`,
      generateDescription: ({ doc }) => doc?.excerpt || doc?.shortDescription || doc?.shortBio || '',
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        if (collectionSlug === 'pages') {
          return doc?.slug === 'home' ? baseUrl : `${baseUrl}/${doc?.slug || ''}`
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
      twitterCreator: '@cms',
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
      collections: ['categories'],
      generateLabel: (_, doc) => (doc.title || doc.name) as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
      parentFieldSlug: 'parent',
    }),

    // Redirects Plugin - URL redirects management
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: {
        admin: {
          group: 'Settings',
        },
      },
    }),

    // Search Plugin - Full-text search across collections
    searchPlugin({
      collections: ['pages', 'posts'],
      defaultPriorities: {
        pages: 10,
        posts: 20,
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
    // Dynamic navigation endpoint
    navigationEndpoint,
    // Collection manager endpoint for admin UI
    collectionManagerEndpoint,
    // Seed data endpoints for admin panel
    ...seedEndpoints,
    // Collection template endpoints for admin panel
    ...collectionTemplateEndpoints,
    // Admin tools endpoints
    ...toolsEndpoints,
    // Taxonomy filtering endpoints
    ...taxonomyEndpoints,
    // SEO bulk update endpoints
    ...seoEndpoints,
    ...seoTemplatesEndpoints,
    ...seoAdvancedEndpoints,
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
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'http://localhost:4321', // Astro dev server
  ].filter(Boolean),

  // ===========================================
  // CSRF Protection
  // ===========================================
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
