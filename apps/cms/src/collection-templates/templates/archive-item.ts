/**
 * Archive Item Collection Template
 * 
 * A flexible archive item template suitable for:
 * - Archive items
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
  name: 'Archives',
  description: 'Catalogued items like archive entries, portfolio pieces, or collectibles',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'archive-items',
  defaultSingular: 'Archive Item',
  defaultPlural: 'Archive Items',
  adminGroup: 'Collections',
  status: 'installed', // Currently installed
  includesRelated: ['person', 'place'],
  hasSeedData: true,
  hasSeedMedia: true,
  seedDataCount: 10,
  seedItems: [
    {
      title: 'Leonardo\'s Notebook',
      slug: 'leonardos-notebook',
      excerpt: 'Original notebook containing sketches and notes by Leonardo da Vinci.',
      content: 'A rare notebook showcasing sketches, anatomical studies, and engineering notes.',
      status: 'published',
    },
    {
      title: 'Renaissance Painting Techniques Manual',
      slug: 'renaissance-painting-techniques-manual',
      excerpt: 'A comprehensive guide to painting techniques used during the Renaissance.',
      content: 'Includes pigment preparation, glazing methods, and workshop practices.',
      status: 'published',
    },
    {
      title: 'Ancient Roman Coin Collection',
      slug: 'ancient-roman-coin-collection',
      excerpt: 'A collection of coins from the Roman Empire period.',
      content: 'Curated coins featuring emperors, civic iconography, and regional mints.',
      status: 'published',
    },
    {
      title: 'Medieval Manuscript',
      slug: 'medieval-manuscript',
      excerpt: 'Illuminated manuscript from the medieval period.',
      content: 'Gold leaf marginalia and devotional readings preserved on vellum.',
      status: 'published',
    },
    {
      title: 'Victorian Era Photographs',
      slug: 'victorian-era-photographs',
      excerpt: 'Collection of photographs from the Victorian era.',
      content: 'Early photographic studies of industry, portraiture, and city life.',
      status: 'published',
    },
    {
      title: 'Egyptian Funerary Mask',
      slug: 'egyptian-funerary-mask',
      excerpt: 'Gilded funerary mask from an Egyptian burial chamber.',
      content: 'Ceremonial mask with layered gold leaf and symbolic motifs.',
      status: 'published',
    },
    {
      title: 'Byzantine Mosaic Panel',
      slug: 'byzantine-mosaic-panel',
      excerpt: 'Mosaic panel depicting a ceremonial procession.',
      content: 'Glass tesserae and gold leaf create vivid depth and texture.',
      status: 'published',
    },
    {
      title: 'Islamic Astronomical Chart',
      slug: 'islamic-astronomical-chart',
      excerpt: 'Hand-inked star chart from a medieval observatory.',
      content: 'Constellation notes and instrument references fill the margins.',
      status: 'published',
    },
    {
      title: 'Japanese Woodblock Prints',
      slug: 'japanese-woodblock-prints',
      excerpt: 'Series of Edo-period woodblock prints.',
      content: 'Ukiyo-e scenes with layered pigments and seasonal motifs.',
      status: 'published',
    },
    {
      title: 'Aztec Ceremonial Knife',
      slug: 'aztec-ceremonial-knife',
      excerpt: 'Obsidian-bladed ceremonial knife with carved handle.',
      content: 'Ritual tool featuring symbolic carving and obsidian craftsmanship.',
      status: 'published',
    },
  ],
  
  fields: [
    titleField('Item Title'),
    slugField('title', '/archive-items'),
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
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '/components/PreviewButtonCells/ArchiveItemsPreviewCell',
        },
        condition: () => false, // Hide from form, only show in list
      },
    },
  ],
}

export default archiveItemTemplate
