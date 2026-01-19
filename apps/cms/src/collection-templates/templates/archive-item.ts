/**
 * Archive Item Collection Template
 * 
 * A flexible archive item template suitable for:
 * - Museum artifacts
 * - Gallery pieces
 * - Portfolio projects
 * - Classic cars
 * - Historical items
 * - Any catalogued collection
 */

import type { CollectionTemplate } from '../types'
import {
  titleField,
  slugField,
  featuredImageField,
  excerptField,
  contentBlocksField,
  categoriesField,
  tagsField,
  publishedAtField,
  featuredField,
  templateField,
  seoTabFields,
  richContentField,
  mediaGalleryField,
} from '../shared-fields'

export const archiveItemTemplate: CollectionTemplate = {
  id: 'archive-item',
  name: 'Archive Item',
  description: 'Catalogued items like museum artifacts, portfolio pieces, or collectibles',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'archive-items',
  defaultSingular: 'Archive Item',
  defaultPlural: 'Archive Items',
  adminGroup: 'Archive',
  status: 'installed', // Currently installed
  includesRelated: ['person', 'place'],
  hasSeedData: true,
  hasSeedMedia: true,
  seedDataCount: 10,
  
  fields: [
    titleField('Item Title'),
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            featuredImageField,
            excerptField('Short Description'),
            richContentField('Full Description'),
            mediaGalleryField,
            {
              name: 'specifications',
              type: 'group',
              label: 'Specifications',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'height', type: 'text', label: 'Height' },
                    { name: 'width', type: 'text', label: 'Width' },
                    { name: 'depth', type: 'text', label: 'Depth' },
                  ],
                },
                { name: 'weight', type: 'text', label: 'Weight' },
                { name: 'materials', type: 'textarea', label: 'Materials' },
                { name: 'condition', type: 'text', label: 'Condition' },
              ],
            },
          ],
        },
        {
          label: 'Provenance',
          fields: [
            {
              name: 'dateCreated',
              type: 'text',
              label: 'Date Created/Made',
              admin: {
                description: 'e.g., "circa 1965" or "1920-1925"',
              },
            },
            {
              name: 'dateAcquired',
              type: 'date',
              label: 'Date Acquired',
            },
            {
              name: 'provenance',
              type: 'richText',
              label: 'Provenance History',
            },
            {
              name: 'catalogNumber',
              type: 'text',
              label: 'Catalog/Accession Number',
              unique: true,
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'creators',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true,
              label: 'Creators/Artists',
              admin: {
                description: 'People who created or owned this item',
              },
            },
            {
              name: 'origins',
              type: 'relationship',
              relationTo: 'places',
              hasMany: true,
              label: 'Places of Origin',
              admin: {
                description: 'Where this item was made or found',
              },
            },
            {
              name: 'relatedItems',
              type: 'relationship',
              relationTo: 'archive-items',
              hasMany: true,
              label: 'Related Items',
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            categoriesField,
            tagsField,
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
    {
      name: 'onDisplay',
      type: 'checkbox',
      label: 'On Display',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Display Location',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.onDisplay,
      },
    },
    templateField([
      { label: 'Detail View', value: 'detail' },
      { label: 'Gallery View', value: 'gallery' },
      { label: 'Timeline View', value: 'timeline' },
    ]),
  ],
}

export default archiveItemTemplate
