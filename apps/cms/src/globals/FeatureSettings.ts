// @ts-nocheck
import type { GlobalConfig } from 'payload'

/**
 * Feature Settings Global
 *
 * Admin-facing toggle panel for enabling or disabling CMS feature modules.
 * Changes here are informational — they update this global in the DB and display
 * the current state. Actual feature registration requires a server restart
 * (controlled by cms.features.ts). This gives editors clear visibility of
 * what is enabled and provides a reference point for the developer.
 */
export const FeatureSettings: GlobalConfig = {
  slug: 'feature-settings',
  label: 'Feature Settings',

  admin: {
    group: 'Admin',
    description:
      'View and manage which CMS feature modules are active. Some changes require a server restart to take full effect.',
  },

  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      type: 'ui',
      name: 'featureSettingsInfo',
      admin: {
        components: {
          Field: '/components/EmptyField',
        },
      },
    },

    // ==============================================
    // Content Features
    // ==============================================
    {
      name: 'contentFeatures',
      type: 'group',
      label: 'Content Features',
      admin: {
        description: 'Core content collections — always enabled.',
      },
      fields: [
        {
          name: 'pagesEnabled',
          type: 'checkbox',
          label: 'Pages',
          defaultValue: true,
          admin: {
            description: 'Page collection with block builder support.',
            readOnly: true,
          },
        },
        {
          name: 'postsEnabled',
          type: 'checkbox',
          label: 'Blog Posts',
          defaultValue: true,
          admin: {
            description: 'Blog / news posts collection.',
            readOnly: true,
          },
        },
        {
          name: 'faqsEnabled',
          type: 'checkbox',
          label: 'FAQs',
          defaultValue: true,
          admin: {
            description: 'Frequently Asked Questions collection.',
            readOnly: true,
          },
        },
        {
          name: 'testimonialsEnabled',
          type: 'checkbox',
          label: 'Testimonials',
          defaultValue: true,
          admin: {
            description: 'Client testimonials collection.',
            readOnly: true,
          },
        },
      ],
    },

    // ==============================================
    // Dynamic Collections
    // ==============================================
    {
      name: 'dynamicCollections',
      type: 'group',
      label: 'Dynamic Collections',
      admin: {
        description:
          'People, Places, Events — specialised content modules. Requires server restart to change.',
      },
      fields: [
        {
          name: 'peopleEnabled',
          type: 'checkbox',
          label: 'People & Team Members',
          defaultValue: true,
          admin: {
            description:
              'Enables the People collection for team members, speakers, authors, etc.',
          },
        },
        {
          name: 'placesEnabled',
          type: 'checkbox',
          label: 'Places & Venues',
          defaultValue: true,
          admin: {
            description: 'Enables the Places collection for venues, offices, locations.',
          },
        },
        {
          name: 'eventsEnabled',
          type: 'checkbox',
          label: 'Events',
          defaultValue: true,
          admin: {
            description: 'Enables the Events collection for exhibitions, workshops, performances.',
          },
        },
        {
          name: 'locationsEnabled',
          type: 'checkbox',
          label: 'Locations (Map Data)',
          defaultValue: true,
          admin: {
            description:
              'Enables the Locations collection for geographic data used in maps.',
          },
        },
      ],
    },

    // ==============================================
    // Block Library
    // ==============================================
    {
      name: 'blockLibraryFeatures',
      type: 'group',
      label: 'Block Library',
      admin: {
        description:
          'Reusable blocks, global blocks, and page templates.',
      },
      fields: [
        {
          name: 'blockLibraryEnabled',
          type: 'checkbox',
          label: 'Block Library',
          defaultValue: true,
          admin: {
            description:
              'Enables the Block Library, Global Blocks, and Page Templates collections.',
          },
        },
        {
          name: 'blockLibraryNote',
          type: 'textarea',
          label: 'Notes',
          admin: {
            description:
              'Use /admin/collections/block-library to manage saved reusable blocks. Create a block on any page, then use the "Save to Library" button to store it here.',
            readOnly: true,
          },
        },
      ],
    },

    // ==============================================
    // eCommerce
    // ==============================================
    {
      name: 'ecommerceFeatures',
      type: 'group',
      label: 'eCommerce',
      admin: {
        description:
          'Products, orders, carts, and product categories. Requires server restart + database migration to enable.',
      },
      fields: [
        {
          name: 'ecommerceEnabled',
          type: 'checkbox',
          label: 'eCommerce (Products, Orders, Carts)',
          defaultValue: false,
          admin: {
            description:
              'When enabled in cms.features.ts, adds Products, Product Categories, Product Collections, Orders, and Carts to the Shop nav section.',
          },
        },
        {
          name: 'ecommerceNote',
          type: 'textarea',
          label: 'How to Enable eCommerce',
          defaultValue:
            'To enable eCommerce: (1) Set ecommerce: true in apps/cms/src/cms.features.ts, (2) Run make db-migrate to apply the schema, (3) Restart the dev server. The Shop section will then appear in the top navigation.',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
}
