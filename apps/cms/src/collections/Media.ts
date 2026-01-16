import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  admin: {
    useAsTitle: 'filename',
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'filesize', 'generatedSizes', 'mimeType', 'createdAt'],
    description: 'Upload and manage media files with automatic optimisation',
  },

  // Enable file uploads with full optimization
  upload: {
    staticDir: 'media',
    
    // Image sizes for responsive images - WebP format for best compression
    imageSizes: [
      // Blur placeholder for lazy loading (tiny, heavily compressed)
      {
        name: 'blur',
        width: 20,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 20,
          },
        },
      },
      // Thumbnail for admin and small previews
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
      },
      // Small size for mobile
      {
        name: 'small',
        width: 480,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      // Card size for grid layouts
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
      // Medium size for content images
      {
        name: 'medium',
        width: 768,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 82,
          },
        },
      },
      // Tablet size
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 82,
          },
        },
      },
      // Large size for hero images
      {
        name: 'large',
        width: 1440,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      // Desktop/Hero size
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
      // 2K for high-res displays
      {
        name: 'xlarge',
        width: 2560,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      // Open Graph / Social sharing
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
      // AVIF versions for browsers that support it (even better compression)
      {
        name: 'avif_small',
        width: 480,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'avif',
          options: {
            quality: 65,
          },
        },
      },
      {
        name: 'avif_medium',
        width: 768,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'avif',
          options: {
            quality: 70,
          },
        },
      },
      {
        name: 'avif_large',
        width: 1440,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'avif',
          options: {
            quality: 75,
          },
        },
      },
      {
        name: 'avif_desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'avif',
          options: {
            quality: 75,
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

    // Resize options - limit max size for original
    resizeOptions: {
      width: 2560,
      height: 2560,
      fit: 'inside',
      withoutEnlargement: true,
    },

    // Format options for the original file
    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
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
      required: false,
      admin: {
        description: 'Describe the image for accessibility and SEO. Defaults to filename if not provided.',
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
    // Blur data URL field - auto-generated
    {
      name: 'blurDataURL',
      type: 'text',
      label: 'Blur Data URL',
      admin: {
        description: 'Auto-generated base64 blur placeholder for lazy loading',
        readOnly: true,
        position: 'sidebar',
      },
    },
    // Dominant color for placeholder
    {
      name: 'dominantColor',
      type: 'text',
      label: 'Dominant Color',
      admin: {
        description: 'Auto-extracted dominant color (hex)',
        readOnly: true,
        position: 'sidebar',
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
        description: 'Tags for organising media',
      },
    },
    {
      name: 'imageSizesInfo',
      type: 'ui',
      admin: {
        components: {
          Field: () => null,
        },
        description: '📐 Image Sizes: When you upload an image, multiple optimised sizes are automatically generated (blur, thumbnail, small, card, medium, tablet, large, desktop, xlarge, og, plus AVIF versions). The front-end automatically selects the optimal size based on the viewport and device. You don\'t need to manually choose a size - the system handles this for responsive images. Click "Edit Image" to see all generated sizes.',
        position: 'sidebar',
      },
    },
    {
      name: 'generatedSizes',
      type: 'text',
      admin: {
        components: {
          Cell: '/components/GeneratedSizesCell#default',
        },
        description: 'Image sizes that were generated',
        readOnly: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data?.sizes && typeof data.sizes === 'object') {
              const sizeNames = Object.keys(data.sizes).filter(key => data.sizes[key]?.filename)
              return sizeNames.length > 0 ? sizeNames.join(', ') : 'None'
            }
            return 'None'
          },
        ],
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
    afterChange: [
      async ({ doc, req, operation }) => {
        let needsUpdate = false
        const updateData: any = {}

        // Auto-generate alt text from filename if not provided (for new uploads)
        if (operation === 'create' && !doc.alt && doc.filename) {
          updateData.alt = doc.filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
            .replace(/\b\w/g, (l: string) => l.toUpperCase()) // Capitalize words
          needsUpdate = true
        }

        // Generate blur data URL after upload
        if (doc.mimeType?.startsWith('image/') && doc.sizes?.blur?.url) {
          try {
            const sharp = (await import('sharp')).default
            const fs = await import('fs')
            const path = await import('path')
            
            // Get the blur image path
            const blurPath = path.join(process.cwd(), 'media', doc.sizes.blur.filename)
            
            if (fs.existsSync(blurPath)) {
              // Read the blur image and convert to base64
              const blurBuffer = await sharp(blurPath)
                .resize(10, 10, { fit: 'inside' })
                .webp({ quality: 20 })
                .toBuffer()
              
              const blurDataURL = `data:image/webp;base64,${blurBuffer.toString('base64')}`

              // Get dominant color
              const { dominant } = await sharp(blurPath).stats()
              const dominantColor = `#${dominant.r.toString(16).padStart(2, '0')}${dominant.g.toString(16).padStart(2, '0')}${dominant.b.toString(16).padStart(2, '0')}`

              updateData.blurDataURL = blurDataURL
              updateData.dominantColor = dominantColor
              needsUpdate = true
            }
          } catch (error) {
            console.error('Error generating blur placeholder:', error)
          }
        }

        // Update the document if needed
        if (needsUpdate) {
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: updateData,
          })
        }

        return doc
      },
    ],
  },

  timestamps: true,
}
