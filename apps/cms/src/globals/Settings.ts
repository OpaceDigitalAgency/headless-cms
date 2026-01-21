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

  // Hooks for revalidation - direct calls since we're in the same Next.js app
  hooks: {
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
              name: 'siteName',
              type: 'text',
              required: true,
              label: 'Site Name',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Site Description',
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
                    { label: 'Archive / Gallery', value: 'museum' },
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
          label: 'SEO',
          fields: [
            {
              name: 'defaultMeta',
              type: 'group',
              label: 'Default Meta Tags',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Default Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Default Description',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Default OG Image',
                },
              ],
            },
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics ID',
              admin: {
                description: 'e.g., G-XXXXXXXXXX',
              },
            },
            {
              name: 'googleTagManagerId',
              type: 'text',
              label: 'Google Tag Manager ID',
              admin: {
                description: 'e.g., GTM-XXXXXXX',
              },
            },
            {
              name: 'robotsTxt',
              type: 'code',
              label: 'robots.txt',
              admin: {
                language: 'plaintext',
                description: 'Custom robots.txt content',
              },
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
