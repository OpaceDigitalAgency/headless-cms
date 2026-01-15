import type { GlobalConfig } from 'payload'

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
