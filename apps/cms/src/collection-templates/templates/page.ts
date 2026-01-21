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
  seoTabFields,
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
  seedDataCount: 3,
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
      title: 'Blocks Showcase',
      slug: 'blocks-showcase',
      excerpt: 'Demonstration of all available content blocks',
      status: 'published',
    },
  ],

  fields: [
    titleField('Page Title'),
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
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
        {
          label: 'SEO',
          name: 'meta',
          fields: seoTabFields,
        },
      ],
    },
    templateField([
      { label: 'Default', value: 'default' },
      { label: 'Landing Page', value: 'landing' },
      { label: 'Full Width', value: 'full-width' },
    ]),
  ],
}

export default pageTemplate

