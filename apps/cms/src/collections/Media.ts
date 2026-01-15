import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  admin: {
    useAsTitle: 'filename',
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'mimeType', 'createdAt'],
    description: 'Upload and manage media files',
  },

  // Enable file uploads
  upload: {
    staticDir: 'media',
    
    // Image sizes for responsive images
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 640,
        height: 480,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
    ],

    // Allowed file types
    mimeTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf'],

    // Admin thumbnail
    adminThumbnail: 'thumbnail',

    // Enable cropping and focal point
    crop: true,
    focalPoint: true,

    // Bulk upload
    bulkUpload: true,

    // Resize options
    resizeOptions: {
      width: 2560,
      height: undefined,
      fit: 'inside',
      withoutEnlargement: true,
    },
  },

  // Access control
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption',
      admin: {
        description: 'Optional caption to display with the image',
      },
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Credit',
      admin: {
        description: 'Photo credit or attribution',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        description: 'Tags for organizing media',
      },
    },
  ],

  // Hooks for processing
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Auto-generate alt text from filename if not provided
        if (!data.alt && data.filename) {
          data.alt = data.filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
            .replace(/\b\w/g, (l: string) => l.toUpperCase()) // Capitalize words
        }
        return data
      },
    ],
  },

  timestamps: true,
}
