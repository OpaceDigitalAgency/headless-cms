/**
 * Category Collection Template
 * 
 * Hierarchical taxonomy for organising content.
 * Supports nested categories with unlimited depth.
 */

import type { CollectionTemplate } from '../types'

export const categoryTemplate: CollectionTemplate = {
  id: 'category',
  name: 'Category',
  description: 'Hierarchical taxonomy for organising content across collections',
  category: 'taxonomy',
  icon: 'category',
  defaultSlug: 'categories',
  defaultSingular: 'Category',
  defaultPlural: 'Categories',
  adminGroup: 'Taxonomy',
  status: 'core', // Categories are a core collection
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,
  
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
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
      admin: {
        description: 'Optional parent category for hierarchical organisation',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description for this category',
      },
    },
  ],
}

export default categoryTemplate
