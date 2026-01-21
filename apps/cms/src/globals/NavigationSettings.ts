import type { GlobalConfig } from 'payload'

export const NavigationSettings: GlobalConfig = {
  slug: 'navigation-settings',
  label: 'Admin Navigation',
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
        custom: {
          managerType: 'combined',
          globalsPath: 'globals',
        },
        description: 'Manage collections and global settings links in the left navigation. Globals always live in the Settings section.',
      },
    },
    {
      name: 'globals',
      label: 'Global Navigation',
      type: 'json',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'customLinks',
      label: 'Custom Top Menu Links',
      type: 'array',
      admin: {
        description: 'Add custom links to the top navigation bar. These appear in the horizontal menu at the very top of the admin panel. Save changes and refresh the page to see updates.',
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
          name: 'insertPosition',
          type: 'select',
          defaultValue: 'after-admin',
          required: true,
          options: [
            { label: 'Before Dashboard (leftmost)', value: 'before-dashboard' },
            { label: 'After Dashboard', value: 'after-dashboard' },
            { label: 'After Content', value: 'after-content' },
            { label: 'After Taxonomy', value: 'after-taxonomy' },
            { label: 'After Collections', value: 'after-collections' },
            { label: 'After Shop', value: 'after-shop' },
            { label: 'After Media', value: 'after-media' },
            { label: 'After Forms', value: 'after-forms' },
            { label: 'After Tools', value: 'after-tools' },
            { label: 'After Settings', value: 'after-settings' },
            { label: 'After Admin (rightmost)', value: 'after-admin' },
          ],
          admin: {
            description: 'Choose where to insert this link in the top horizontal menu bar. The link will appear immediately after the selected section.',
          },
        },
      ],
    },
  ],
}
