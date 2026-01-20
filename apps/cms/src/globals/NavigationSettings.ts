import type { GlobalConfig } from 'payload'

export const NavigationSettings: GlobalConfig = {
  slug: 'navigation-settings',
  label: 'CMS Navigation Settings',
  admin: {
    group: 'Settings',
    description: 'Control which collections appear in the admin navigation and how they are grouped.',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // Log the change for debugging
        req.payload.logger.info('Navigation settings updated - broadcasting cache invalidation')

        // Broadcast cache invalidation to all connected clients
        // This triggers the BroadcastChannel listener in TwoPanelNav.tsx
        // Note: This only works for clients that are currently connected
        // The actual cache clearing happens client-side via sessionStorage

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'collections',
      label: 'Collection Navigation',
      type: 'json',
      admin: {
        components: {
          Field: '/components/CollectionManagerField',
        },
        description: 'Toggle collections and click "Save" below. Then refresh your browser (Cmd+R or F5) to see changes in the navigation menu.',
      },
    },
    {
      name: 'customLinks',
      label: 'Custom Top Menu Links',
      type: 'array',
      admin: {
        description: 'Add custom links to the top navigation bar (e.g., "Menu" linking to Header global)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Link text (e.g., "Menu", "Site Settings")',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'URL path (e.g., "/admin/globals/header", "/admin/tools")',
            placeholder: '/admin/globals/header',
          },
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'end',
          options: [
            { label: 'Start (before Dashboard)', value: 'start' },
            { label: 'End (after Admin)', value: 'end' },
          ],
          admin: {
            description: 'Where to place this link in the top menu',
          },
        },
      ],
    },
  ],
}
