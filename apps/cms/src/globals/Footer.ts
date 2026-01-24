import type { GlobalConfig } from 'payload'
import { revalidateFooter } from '../lib/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',

  admin: {
    group: 'Site',
    description: 'Configure the site footer',
  },

  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },

  // Hooks for revalidation and auto-population
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        // Auto-populate description from settings.siteDescription if empty
        if (!data?.description) {
          try {
            const settings = await req.payload.findGlobal({
              slug: 'settings',
              depth: 0,
            })
            if (settings?.siteDescription) {
              data.description = settings.siteDescription
            }
          } catch (error) {
            // Silently fail if settings not available
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        // Direct revalidation - no webhook needed
        revalidateFooter()
        req.payload.logger.info('Revalidated footer global')
        return doc
      },
    ],
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Short description or tagline',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      maxRows: 4,
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Column Heading',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'GitHub', value: 'github' },
            { label: 'Discord', value: 'discord' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© {year} All rights reserved.',
      admin: {
        description: 'Use {year} to insert current year',
      },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
  ],
}

export default Footer
