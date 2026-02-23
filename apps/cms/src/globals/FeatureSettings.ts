// @ts-nocheck
import type { GlobalConfig } from 'payload'

/**
 * Feature Settings Global
 *
 * Admin-facing reference panel showing which CMS feature modules are active.
 * Checkboxes are informational — actual feature registration is controlled by
 * cms.features.ts and requires a server restart to change.
 */
export const FeatureSettings: GlobalConfig = {
  slug: 'feature-settings',
  label: 'Feature Settings',

  admin: {
    group: 'Admin',
    description:
      'View which CMS feature modules are currently active. Changes to features require editing cms.features.ts and restarting the server.',
  },

  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    // ==============================================
    // Core Content (always on)
    // ==============================================
    {
      name: 'pagesEnabled',
      type: 'checkbox',
      label: 'Pages',
      defaultValue: true,
      admin: {
        description: 'Page collection with block builder. Always enabled.',
        readOnly: true,
      },
    },
    {
      name: 'postsEnabled',
      type: 'checkbox',
      label: 'Blog Posts',
      defaultValue: true,
      admin: {
        description: 'Blog/news posts collection. Always enabled.',
        readOnly: true,
      },
    },
    {
      name: 'faqsEnabled',
      type: 'checkbox',
      label: 'FAQs',
      defaultValue: true,
      admin: {
        description: 'Frequently Asked Questions. Always enabled.',
        readOnly: true,
      },
    },
    {
      name: 'testimonialsEnabled',
      type: 'checkbox',
      label: 'Testimonials',
      defaultValue: true,
      admin: {
        description: 'Client testimonials. Always enabled.',
        readOnly: true,
      },
    },

    // ==============================================
    // Dynamic Collections
    // ==============================================
    {
      name: 'peopleEnabled',
      type: 'checkbox',
      label: 'People & Team Members',
      defaultValue: true,
      admin: {
        description:
          'People collection for team members, speakers, authors. Controlled by features.people in cms.features.ts.',
      },
    },
    {
      name: 'eventsEnabled',
      type: 'checkbox',
      label: 'Events',
      defaultValue: true,
      admin: {
        description:
          'Events collection for exhibitions, workshops, performances. Controlled by features.events in cms.features.ts.',
      },
    },
    {
      name: 'locationsEnabled',
      type: 'checkbox',
      label: 'Locations',
      defaultValue: true,
      admin: {
        description:
          'Locations collection for geographic data. Controlled by features.dynamicCollections in cms.features.ts.',
      },
    },

    // ==============================================
    // Block Library
    // ==============================================
    {
      name: 'blockLibraryEnabled',
      type: 'checkbox',
      label: 'Block Library & Global Blocks',
      defaultValue: true,
      admin: {
        description:
          'Enables the Block Library, Global Blocks, and Page Templates. Controlled by features.blockLibrary in cms.features.ts.',
      },
    },

    // ==============================================
    // eCommerce
    // ==============================================
    {
      name: 'ecommerceEnabled',
      type: 'checkbox',
      label: 'eCommerce (Products, Orders, Carts)',
      defaultValue: false,
      admin: {
        description:
          'When enabled, adds Products, Orders, and Carts to the Shop nav section. Controlled by features.ecommerce in cms.features.ts.',
      },
    },
    {
      name: 'ecommerceInstructions',
      type: 'textarea',
      label: 'How to Enable eCommerce',
      defaultValue:
        'To enable eCommerce: (1) Open apps/cms/src/cms.features.ts, (2) Set ecommerce: true, (3) Run make db-migrate in the terminal, (4) Restart the dev server. The Shop section will then appear in the top navigation.',
      admin: {
        description: 'Follow these steps to activate eCommerce features.',
        readOnly: true,
      },
    },
  ],
}
