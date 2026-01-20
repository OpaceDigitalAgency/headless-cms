/**
 * Collection Templates Index
 * 
 * Exports all available collection templates.
 */

export { pageTemplate } from './page'
export { blogPostTemplate } from './blog-post'
export { archiveItemTemplate } from './archive-item'
export { productTemplate } from './product'
export { productCategoryTemplate } from './product-category'
export { productCollectionTemplate } from './product-collection'
export { personTemplate } from './person'
export { placeTemplate } from './place'
export { eventTemplate } from './event'
export { categoryTemplate } from './category'
export { tagTemplate } from './tag'
export { serviceTemplate } from './service'
export { courseTemplate } from './course'
export { caseStudyTemplate } from './case-study'
export { galleryTemplate } from './gallery'
export { faqTemplate } from './faq'
export { testimonialTemplate } from './testimonial'

import { pageTemplate } from './page'
import { blogPostTemplate } from './blog-post'
import { archiveItemTemplate } from './archive-item'
import { productTemplate } from './product'
import { productCategoryTemplate } from './product-category'
import { productCollectionTemplate } from './product-collection'
import { personTemplate } from './person'
import { placeTemplate } from './place'
import { eventTemplate } from './event'
import { categoryTemplate } from './category'
import { tagTemplate } from './tag'
import { serviceTemplate } from './service'
import { courseTemplate } from './course'
import { caseStudyTemplate } from './case-study'
import { galleryTemplate } from './gallery'
import { faqTemplate } from './faq'
import { testimonialTemplate } from './testimonial'
import type { CollectionTemplate, TemplateCategory } from '../types'

/**
 * All available collection templates
 */
export const allTemplates: CollectionTemplate[] = [
  pageTemplate,
  blogPostTemplate,
  categoryTemplate,
  tagTemplate,
  archiveItemTemplate,
  productTemplate,
  productCategoryTemplate,
  productCollectionTemplate,
  personTemplate,
  placeTemplate,
  eventTemplate,
  serviceTemplate,
  courseTemplate,
  caseStudyTemplate,
  galleryTemplate,
  faqTemplate,
  testimonialTemplate,
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
