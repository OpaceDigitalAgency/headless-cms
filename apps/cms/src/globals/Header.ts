import type { GlobalConfig } from 'payload'
import { revalidateHeader } from '../lib/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',

  admin: {
    group: 'Site',
    description: 'Configure the site header and navigation',
  },

  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },

  // Hooks for revalidation and auto-population
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        // Auto-populate logoText from settings.siteName if empty
        if (!data?.logoText) {
          try {
            const settings = await req.payload.findGlobal({
              slug: 'settings',
              depth: 0,
            })
            if (settings?.siteName) {
              data.logoText = settings.siteName
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
        revalidateHeader()
        req.payload.logger.info('Revalidated header global')
        return doc
      },
    ],
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo Text',
      admin: {
        description: 'Displayed if no logo image is set',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      maxRows: 10,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
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
              name: 'description',
              type: 'text',
              admin: {
                description: 'Optional description for mega menu',
              },
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
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show CTA Button',
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
      ],
    },
  ],
}

export default Header
