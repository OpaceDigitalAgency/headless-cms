import type { GlobalConfig } from 'payload'
import { revalidateSettings } from '../lib/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',

  admin: {
    group: 'Site',
    description: 'Global site settings and configuration',
  },

  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },

  // Hooks for revalidation and auto-population
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        // Auto-populate frontendUrl from siteUrl if empty
        if (!data?.frontend?.frontendUrl && data?.siteUrl) {
          if (!data.frontend) data.frontend = {}
          data.frontend.frontendUrl = data.siteUrl
        }

        // Auto-generate revalidation secret if empty
        if (!data?.frontend?.revalidationSecret) {
          if (!data.frontend) data.frontend = {}
          // Generate cryptographically secure 32-character random string
          const array = new Uint8Array(24)
          crypto.getRandomValues(array)
          data.frontend.revalidationSecret = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        // Direct revalidation - no webhook needed
        revalidateSettings()
        req.payload.logger.info('Revalidated settings global')
        return doc
      },
    ],
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'activePreset',
              type: 'select',
              required: true,
              defaultValue: 'blog',
              label: 'Seed Preset',
              admin: {
                description: 'The type of site you are building. This determines which seed data and collections are used.',
              },
              options: [
                { label: 'Blog', value: 'blog' },
                { label: 'Brochure', value: 'brochure' },
                { label: 'Archive', value: 'archive' },
                { label: 'Ecommerce', value: 'ecommerce' },
              ],
            },
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'My Site',
              label: 'Site Name',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Site Description',
              defaultValue: 'A blog about technology, design, business, and lifestyle.',
              admin: {
                description: 'Brief description of your site for SEO and about sections',
              },
            },
            {
              name: 'siteUrl',
              type: 'text',
              label: 'Site URL',
              admin: {
                description: 'The public URL of your site',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Site Logo',
            },
          ],
        },
        {
          label: 'Appearance',
          description: 'Configure the default theme and appearance for your site',
          fields: [
            {
              name: 'defaultSkin',
              type: 'select',
              label: 'Default Skin',
              defaultValue: 'minimal',
              options: [
                { label: 'Minimal', value: 'minimal' },
                { label: 'Editorial', value: 'editorial' },
                { label: 'SaaS', value: 'saas' },
                { label: 'Soft', value: 'soft' },
                { label: 'Bold', value: 'bold' },
                { label: 'Monochrome', value: 'monochrome' },
                { label: 'Glass', value: 'glass' },
                { label: 'High Contrast', value: 'high-contrast' },
                { label: 'Neon Grid', value: 'neon-grid' },
                { label: 'Agency', value: 'agency' },
                { label: 'Retro', value: 'retro' },
              ],
              admin: {
                description: 'Choose the default visual theme for your site. Users can override this preference.',
              },
            },
            {
              name: 'defaultMode',
              type: 'select',
              label: 'Default Mode',
              defaultValue: 'light',
              options: [
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
                { label: 'System Preference', value: 'system' },
              ],
              admin: {
                description: 'Choose the default colour mode. Users can override this preference.',
              },
            },
          ],
        },
        {
          label: 'Frontend',
          description: 'Configure your frontend framework and site type',
          fields: [
            {
              name: 'frontend',
              type: 'group',
              label: 'Frontend Configuration',
              fields: [
                {
                  name: 'framework',
                  type: 'select',
                  label: 'Frontend Framework',
                  defaultValue: 'next',
                  options: [
                    { label: 'Next.js (Recommended for dynamic sites)', value: 'next' },
                    { label: 'Astro (Recommended for static/content sites)', value: 'astro' },
                  ],
                  admin: {
                    description: 'Choose the frontend framework for your site',
                  },
                },
                {
                  name: 'siteType',
                  type: 'select',
                  label: 'Site Type',
                  defaultValue: 'brochure',
                  options: [
                    { label: 'Brochure / Marketing Site', value: 'brochure' },
                    { label: 'Blog / Content Site', value: 'blog' },
                    { label: 'Archive / Gallery', value: 'archive' },
                    { label: 'Ecommerce / Product Catalog', value: 'ecommerce' },
                    { label: 'Portfolio / Showcase', value: 'portfolio' },
                    { label: 'Custom', value: 'custom' },
                  ],
                  admin: {
                    description: 'This determines which collection templates are recommended',
                  },
                },
                {
                  name: 'frontendUrl',
                  type: 'text',
                  label: 'Frontend URL',
                  admin: {
                    description: 'URL where your frontend is deployed (for preview links)',
                  },
                },
                {
                  name: 'revalidationSecret',
                  type: 'text',
                  label: 'Revalidation Secret',
                  admin: {
                    description: 'Secret key for on-demand revalidation (ISR)',
                  },
                },
              ],
            },
            {
              name: 'features',
              type: 'group',
              label: 'Enabled Features',
              admin: {
                description: 'Toggle site features on/off',
              },
              fields: [
                {
                  name: 'blog',
                  type: 'checkbox',
                  label: 'Blog / Posts',
                  defaultValue: true,
                },
                {
                  name: 'search',
                  type: 'checkbox',
                  label: 'Site Search',
                  defaultValue: true,
                },
                {
                  name: 'forms',
                  type: 'checkbox',
                  label: 'Contact Forms',
                  defaultValue: true,
                },
                {
                  name: 'comments',
                  type: 'checkbox',
                  label: 'Comments',
                  defaultValue: false,
                },
                {
                  name: 'newsletter',
                  type: 'checkbox',
                  label: 'Newsletter Signup',
                  defaultValue: false,
                },
                {
                  name: 'multiLanguage',
                  type: 'checkbox',
                  label: 'Multi-Language Support',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socialProfiles',
              type: 'array',
              label: 'Social Profiles',
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
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'handle',
                  type: 'text',
                  admin: {
                    description: 'e.g., @username',
                  },
                },
              ],
            },
            {
              name: 'twitterHandle',
              type: 'text',
              label: 'Twitter Handle',
              admin: {
                description: 'For Twitter cards (without @)',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
              label: 'Contact Email',
            },
            {
              name: 'contactPhone',
              type: 'text',
              label: 'Contact Phone',
            },
            {
              name: 'address',
              type: 'group',
              label: 'Address',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                },
                {
                  name: 'city',
                  type: 'text',
                },
                {
                  name: 'state',
                  type: 'text',
                },
                {
                  name: 'postalCode',
                  type: 'text',
                },
                {
                  name: 'country',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Advanced',
          fields: [
            {
              name: 'customCss',
              type: 'code',
              label: 'Custom CSS',
              admin: {
                language: 'css',
                description: 'Add custom CSS to the site',
              },
            },
            {
              name: 'headScripts',
              type: 'code',
              label: 'Head Scripts',
              admin: {
                language: 'html',
                description: 'Scripts to add to the <head> section',
              },
            },
            {
              name: 'bodyScripts',
              type: 'code',
              label: 'Body Scripts',
              admin: {
                language: 'html',
                description: 'Scripts to add before </body>',
              },
            },
            {
              name: 'maintenanceMode',
              type: 'checkbox',
              label: 'Maintenance Mode',
              admin: {
                description: 'Show maintenance page to visitors',
              },
            },
            {
              name: 'maintenanceMessage',
              type: 'textarea',
              label: 'Maintenance Message',
              defaultValue: 'We\'re currently performing scheduled maintenance. We\'ll be back shortly!',
              admin: {
                condition: (data) => data?.maintenanceMode,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Settings
