import type { CollectionConfig } from 'payload'
import { isCollectionEnabled } from '../lib/collectionVisibility'

/**
 * Content Types Collection
 * 
 * Allows users to define custom content types dynamically without server restart.
 * Similar to WordPress Custom Post Types but managed entirely through the admin UI.
 * 
 * Each content type defines:
 * - Name and slug
 * - Icon for admin display
 * - Which base template to use (archive, product, person, etc.)
 * - Custom fields specific to this type
 * - Whether it has its own archive page
 */
export const ContentTypes: CollectionConfig = {
  slug: 'content-types',
  labels: {
    singular: 'Custom Collection',
    plural: 'Custom Collections',
  },
  admin: {
    group: 'Collections',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'template', 'itemCount', 'updatedAt', 'preview'],
    description: 'Define custom collections like "Services", "FAQs", or "Galleries"',
  },
  access: {
    read: async ({ req }) => (await isCollectionEnabled(req.payload, 'content-types')),
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'content-types')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'content-types')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'content-types')) && Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Display name (e.g., "Classic Cars")',
            width: '50%',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly identifier (e.g., "classic-cars")',
            width: '50%',
          },
          hooks: {
            beforeValidate: [
              ({ value, data }) => {
                if (!value && data?.name) {
                  return data.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')
                }
                return value
              },
            ],
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'singularLabel',
          type: 'text',
          required: true,
          admin: {
            description: 'Singular form (e.g., "Classic Car")',
            width: '50%',
          },
        },
        {
          name: 'pluralLabel',
          type: 'text',
          required: true,
          admin: {
            description: 'Plural form (e.g., "Classic Cars")',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'box',
      options: [
        { label: 'Box', value: 'box' },
        { label: 'Product', value: 'product' },
        { label: 'Archive', value: 'archive' },
        { label: 'Shopping Bag', value: 'shopping-bag' },
        { label: 'Person', value: 'person' },
        { label: 'Location', value: 'location' },
        { label: 'Event', value: 'event' },
        { label: 'Document', value: 'document' },
        { label: 'Archive Item', value: 'archive-item' },
        { label: 'Image', value: 'image' },
        { label: 'Settings', value: 'settings' },
        { label: 'Users', value: 'users' },
      ],
      admin: {
        description: 'Icon shown in the admin sidebar',
      },
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'archive-item',
      options: [
        { label: 'Archive Item (Museum, Gallery, Portfolio)', value: 'archive-item' },
        { label: 'Product (Ecommerce, Catalog)', value: 'product' },
        { label: 'Person (Team, Authors, Historical)', value: 'person' },
        { label: 'Place (Locations, Venues)', value: 'place' },
        { label: 'Event (Time-based)', value: 'event' },
        { label: 'Article (Blog-style)', value: 'article' },
      ],
      admin: {
        description: 'Base template determines the default fields available',
      },
    },
    {
      name: 'templateId',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Internal reference for template-based collections',
      },
    },
    {
      name: 'uninstalled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description shown in the admin',
      },
    },
    {
      name: 'hasArchive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Create an archive/listing page for this content type',
      },
    },
    {
      name: 'archiveSlug',
      type: 'text',
      admin: {
        description: 'URL path for the archive page (defaults to content type slug)',
        condition: (data) => data.hasArchive,
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.slug) {
              return `items/${data.slug}`
            }
            return value
          },
        ],
      },
    },
    // Custom Fields Definition
    {
      name: 'customFields',
      type: 'array',
      admin: {
        description: 'Define additional fields specific to this content type',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Field name (e.g., "engineSize")',
                width: '40%',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Display label (e.g., "Engine Size")',
                width: '40%',
              },
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'text',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Number', value: 'number' },
                { label: 'Date', value: 'date' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Select', value: 'select' },
                { label: 'URL', value: 'url' },
                { label: 'Email', value: 'email' },
              ],
              admin: {
                width: '20%',
              },
            },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'options',
          type: 'textarea',
          admin: {
            description: 'For select fields: one option per line',
            condition: (data, siblingData) => siblingData?.type === 'select',
          },
        },
      ],
    },
    // Seed Data Configuration
    {
      name: 'seedData',
      type: 'group',
      admin: {
        description: 'Sample data configuration for this content type',
      },
      fields: [
        {
          name: 'hasSeedData',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable sample data for this content type',
          },
        },
        {
          name: 'sampleCount',
          type: 'number',
          defaultValue: 5,
          admin: {
            description: 'Number of sample items to create',
            condition: (data, siblingData) => siblingData?.hasSeedData,
          },
        },
      ],
    },
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '/components/PreviewButtonCells/ContentTypesPreviewCell',
        },
        condition: () => false, // Hide from form, only show in list
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Log content type changes for debugging
        console.log(`Content type ${operation}: ${doc.name} (${doc.slug})`)
        const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        const archiveSlug = doc.archiveSlug || `items/${doc.slug}`
        const archiveTail = archiveSlug.replace(/^\/?items\//, '')
        try {
          await fetch(`${revalidateUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: process.env.REVALIDATION_SECRET,
              collection: 'content-types',
              slug: archiveTail,
            }),
          })
          req.payload.logger.info(`Revalidated content type: ${doc.slug}`)
        } catch (error) {
          req.payload.logger.error(`Failed to revalidate content type: ${doc.slug}`)
        }
      },
    ],
  },
}

export default ContentTypes
