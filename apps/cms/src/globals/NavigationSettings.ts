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
  fields: [
    {
      name: 'collections',
      label: 'Collection Navigation',
      type: 'json',
      admin: {
        components: {
          Field: '/components/CollectionManagerField',
        },
      },
    },
  ],
}
