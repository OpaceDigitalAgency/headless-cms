/**
 * Person Collection Template
 * 
 * A person/profile template suitable for:
 * - Team members
 * - Artists/creators
 * - Historical figures
 * - Authors
 * - Contributors
 */

import type { CollectionTemplate } from '../types'
import {
  nameField,
  slugField,
  featuredImageField,
  excerptField,
  contentBlocksField,
  categoriesField,
  tagsField,
  featuredField,
  templateField,
  richContentField,
} from '../shared-fields'

export const personTemplate: CollectionTemplate = {
  id: 'person',
  name: 'People',
  description: 'People profiles like team members, artists, or historical figures',
  category: 'people',
  icon: 'user',
  defaultSlug: 'people',
  defaultSingular: 'Person',
  defaultPlural: 'People',
  adminGroup: 'Collections',
  status: 'installed', // Currently installed
  hasSeedData: true,
  hasSeedMedia: true,
  seedDataCount: 5,
  seedItems: [
    {
      title: 'Leonardo da Vinci',
      slug: 'leonardo-da-vinci',
      excerpt: 'Italian Renaissance polymath known for his art, science, and inventions.',
      content: 'Highlights interdisciplinary practice, notebooks, and artistic legacy.',
      status: 'published',
    },
    {
      title: 'Michelangelo Buonarroti',
      slug: 'michelangelo-buonarroti',
      excerpt: 'Italian sculptor, painter, architect, and poet of the High Renaissance.',
      content: 'Profile of key works, commissions, and artistic impact.',
      status: 'published',
    },
    {
      title: 'Raphael Sanzio',
      slug: 'raphael-sanzio',
      excerpt: 'Italian painter and architect of the High Renaissance.',
      content: 'Profile highlighting collaborative process and stylistic influence.',
      status: 'published',
    },
    {
      title: 'Claude Monet',
      slug: 'claude-monet',
      excerpt: 'French painter and founder of Impressionism.',
      content: 'Overview of series paintings and influence on modern art.',
      status: 'published',
    },
    {
      title: 'Phidias',
      slug: 'phidias',
      excerpt: 'Ancient Greek sculptor, painter, and architect.',
      content: 'Profile focusing on techniques and cultural legacy.',
      status: 'published',
    },
  ],
  
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            nameField('Full Name'),
            {
              name: 'portrait',
              type: 'upload',
              relationTo: 'media',
              label: 'Portrait/Photo',
            },
            excerptField('Short Bio'),
            richContentField('Full Biography'),
            {
              name: 'role',
              type: 'array',
              label: 'Roles/Titles',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'birthDate',
                  type: 'text',
                  label: 'Birth Date',
                  admin: {
                    description: 'e.g., "1452" or "March 15, 1990"',
                  },
                },
                {
                  name: 'deathDate',
                  type: 'text',
                  label: 'Death Date',
                  admin: {
                    description: 'Leave empty if living',
                  },
                },
              ],
            },
            {
              name: 'nationality',
              type: 'text',
              label: 'Nationality',
            },
            {
              name: 'birthPlace',
              type: 'relationship',
              relationTo: 'places',
              label: 'Birth Place',
            },
            {
              name: 'currentLocation',
              type: 'relationship',
              relationTo: 'places',
              label: 'Current Location',
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
            },
            {
              name: 'website',
              type: 'text',
              label: 'Website',
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            categoriesField,
            tagsField,
            {
              name: 'relatedPeople',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true,
              label: 'Related People',
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
          ],
        },
        {
          label: 'Content Sections',
          fields: [
            contentBlocksField,
          ],
        },
      ],
    },
    slugField('name', '/people'),
    featuredField,
    templateField([
      { label: 'Profile Page', value: 'profile' },
      { label: 'Team Card', value: 'card' },
      { label: 'Biography', value: 'biography' },
    ]),
  ],
}

export default personTemplate
