/**
 * Collection Templates Index
 * 
 * Exports all available collection templates.
 */

export { blogPostTemplate } from './blog-post'
export { archiveItemTemplate } from './archive-item'
export { productTemplate } from './product'
export { personTemplate } from './person'
export { placeTemplate } from './place'
export { eventTemplate } from './event'

import { blogPostTemplate } from './blog-post'
import { archiveItemTemplate } from './archive-item'
import { productTemplate } from './product'
import { personTemplate } from './person'
import { placeTemplate } from './place'
import { eventTemplate } from './event'
import type { CollectionTemplate, TemplateCategory } from '../types'

/**
 * All available collection templates
 */
export const allTemplates: CollectionTemplate[] = [
  blogPostTemplate,
  archiveItemTemplate,
  productTemplate,
  personTemplate,
  placeTemplate,
  eventTemplate,
]

/**
 * Get template by ID
 */
export function getTemplateById(id: string): CollectionTemplate | undefined {
  return allTemplates.find(t => t.id === id)
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: TemplateCategory): CollectionTemplate[] {
  return allTemplates.filter(t => t.category === category)
}

/**
 * Template IDs
 */
export const TEMPLATE_IDS = allTemplates.map(t => t.id)

/**
 * Check if a template ID is valid
 */
export function isValidTemplateId(id: string): boolean {
  return TEMPLATE_IDS.includes(id)
}
