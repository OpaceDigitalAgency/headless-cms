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
  seoTabFields,
  richContentField,
} from '../shared-fields'

export const personTemplate: CollectionTemplate = {
  id: 'person',
  name: 'Person',
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
  seedDataCount: 6,
  
  fields: [
    nameField('Full Name'),
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
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
        {
          label: 'SEO',
          name: 'meta',
          fields: seoTabFields,
        },
      ],
    },
    featuredField,
    templateField([
      { label: 'Profile Page', value: 'profile' },
      { label: 'Team Card', value: 'card' },
      { label: 'Biography', value: 'biography' },
    ]),
  ],
}

export default personTemplate
