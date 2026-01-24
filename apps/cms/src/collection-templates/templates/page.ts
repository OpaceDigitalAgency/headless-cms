/**
 * Page Collection Template
 * 
 * Static pages with flexible content blocks and hero sections.
 * Perfect for landing pages, about pages, and other static content.
 */

import type { CollectionTemplate } from '../types'
import {
  titleField,
  slugField,
  contentBlocksField,
  templateField,
} from '../shared-fields'

export const pageTemplate: CollectionTemplate = {
  id: 'page',
  name: 'Page',
  description: 'Static pages with flexible content blocks and hero sections',
  category: 'content',
  icon: 'page',
  defaultSlug: 'pages',
  defaultSingular: 'Page',
  defaultPlural: 'Pages',
  adminGroup: 'Content',
  status: 'core', // Pages are a core collection
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 4,
  seedItems: [
    {
      title: 'Home',
      slug: 'home',
      excerpt: 'Welcome page with hero section and featured content',
      status: 'published',
    },
    {
      title: 'About Us',
      slug: 'about',
      excerpt: 'Learn more about our organisation and mission',
      status: 'published',
    },
    {
      title: 'Contact',
      slug: 'contact',
      excerpt: 'Send us a message and we will respond as soon as possible',
      status: 'published',
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy',
      excerpt: 'How we collect, use, and protect your personal information',
      status: 'published',
    },
    {
      title: 'Services',
      slug: 'services',
      excerpt: 'Comprehensive solutions for modern businesses (Brochure preset)',
      status: 'published',
    },
    {
      title: 'Collections',
      slug: 'collections',
      excerpt: 'Browse our archives by category and theme (Archive preset)',
      status: 'published',
    },
    {
      title: 'Search',
      slug: 'search',
      excerpt: 'Search archives (Archive preset)',
      status: 'published',
    },
    {
      title: 'Shop',
      slug: 'shop',
      excerpt: 'Browse all products (Ecommerce preset)',
      status: 'published',
    },
    {
      title: 'Cart',
      slug: 'cart',
      excerpt: 'Shopping cart (Ecommerce preset)',
      status: 'published',
    },
    {
      title: 'Checkout',
      slug: 'checkout',
      excerpt: 'Secure checkout (Ecommerce preset)',
      status: 'published',
    },
    {
      title: 'My Account',
      slug: 'account',
      excerpt: 'Manage orders and profile (Ecommerce preset)',
      status: 'published',
    },
    {
      title: 'Shipping Policy',
      slug: 'shipping',
      excerpt: 'Shipping information (Ecommerce preset)',
      status: 'published',
    },
    {
      title: 'Returns Policy',
      slug: 'returns',
      excerpt: 'Returns and refunds (Ecommerce preset)',
      status: 'published',
    },
    {
      title: 'Terms of Service',
      slug: 'terms',
      excerpt: 'Terms and conditions (Ecommerce preset)',
      status: 'published',
    },
    {
      title: 'Blocks Showcase',
      slug: 'blocks-showcase',
      excerpt: 'Demonstration of all available content blocks',
      status: 'published',
    },
  ],

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            titleField('Page Title'),
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Section',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  label: 'Hero Type',
                  defaultValue: 'standard',
                  options: [
                    { label: 'Standard', value: 'standard' },
                    { label: 'Fullscreen', value: 'fullscreen' },
                    { label: 'Minimal', value: 'minimal' },
                  ],
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Heading',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  label: 'Subheading',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Image',
                },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Call-to-Action Links',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label',
                      required: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: 'URL',
                      required: true,
                    },
                    {
                      name: 'variant',
                      type: 'select',
                      label: 'Style',
                      defaultValue: 'primary',
                      options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            contentBlocksField,
          ],
        },
      ],
    },
    slugField(),
    templateField([
      { label: 'Default', value: 'default' },
      { label: 'Landing Page', value: 'landing' },
      { label: 'Full Width', value: 'full-width' },
    ]),
  ],
}

export default pageTemplate
