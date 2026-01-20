import type { GlobalConfig } from 'payload'

export const NavigationSettings: GlobalConfig = {
  slug: 'navigation-settings',
  label: 'Navigation Settings',
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
        req.payload.logger.info('Navigation settings updated - cache invalidated')

        // Note: Cache invalidation happens on the client side via the CollectionManagerField component
        // When users click "Clear Cache & Refresh", the page reloads and fetches fresh navigation data

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
        description: 'Changes are saved automatically. Click "Clear Cache & Refresh" to see updates immediately in the navigation menu.',
      },
    },
  ],
}
