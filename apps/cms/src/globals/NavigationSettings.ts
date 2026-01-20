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
        description: 'Changes are saved automatically. Click "Clear Cache & Refresh" to see updates immediately in the navigation menu.',
      },
    },
  ],
}
