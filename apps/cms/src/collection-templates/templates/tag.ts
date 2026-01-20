/**
 * Tag Collection Template
 * 
 * Flat taxonomy for tagging and filtering content.
 * Tags are simple keywords without hierarchy.
 */

import type { CollectionTemplate } from '../types'

export const tagTemplate: CollectionTemplate = {
  id: 'tag',
  name: 'Tag',
  description: 'Flat taxonomy for tagging and filtering content with keywords',
  category: 'taxonomy',
  icon: 'tags',
  defaultSlug: 'tags',
  defaultSingular: 'Tag',
  defaultPlural: 'Tags',
  adminGroup: 'Taxonomy',
  status: 'core', // Tags are a core collection
  hasSeedData: false,
  hasSeedMedia: false,
  seedDataCount: 0,
  
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description for this tag',
      },
    },
  ],
}

export default tagTemplate

