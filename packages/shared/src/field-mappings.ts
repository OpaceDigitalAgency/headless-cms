/**
 * Field Mappings for Template System
 * Maps collection fields to template slots
 */

import type { CollectionTemplateConfig, FieldMapping, TemplateType } from './types';

// ===========================================
// Collection Field Mappings
// ===========================================

/**
 * Pages collection field mapping
 */
export const pagesFieldMapping: FieldMapping = {
  title: 'heading',
  hero: 'hero',
  content: 'body',
  meta: 'metadata',
};

export const pagesTemplateConfig: CollectionTemplateConfig = {
  defaultTemplate: 'landing',
  availableTemplates: ['landing', 'detail', 'article', 'home'],
  fieldMapping: pagesFieldMapping,
};

/**
 * Posts collection field mapping
 */
export const postsFieldMapping: FieldMapping = {
  title: 'heading',
  excerpt: 'excerpt',
  content: 'body',
  featuredImage: 'featuredImage',
  categories: 'categories',
  author: 'author',
  publishedAt: 'date',
  meta: 'metadata',
};

export const postsTemplateConfig: CollectionTemplateConfig = {
  defaultTemplate: 'article',
  availableTemplates: ['article', 'detail'],
  fieldMapping: postsFieldMapping,
};

/**
 * Archive Items collection field mapping (museum example)
 */
export const archiveItemsFieldMapping: FieldMapping = {
  title: 'heading',
  description: 'body',
  gallery: 'gallery',
  creators: 'relatedItems',
  origins: 'relatedItems',
  collections: 'categories',
  meta: 'metadata',
};

export const archiveItemsTemplateConfig: CollectionTemplateConfig = {
  defaultTemplate: 'detail',
  availableTemplates: ['detail', 'timeline', 'list'],
  fieldMapping: archiveItemsFieldMapping,
};

/**
 * People collection field mapping (museum example)
 */
export const peopleFieldMapping: FieldMapping = {
  name: 'heading',
  biography: 'body',
  portrait: 'featuredImage',
  birthDate: 'date',
  relatedItems: 'relatedItems',
};

export const peopleTemplateConfig: CollectionTemplateConfig = {
  defaultTemplate: 'detail',
  availableTemplates: ['detail', 'timeline'],
  fieldMapping: peopleFieldMapping,
};

/**
 * Places collection field mapping (museum example)
 */
export const placesFieldMapping: FieldMapping = {
  name: 'heading',
  description: 'body',
  featuredImage: 'featuredImage',
  location: 'metadata',
  relatedItems: 'relatedItems',
};

export const placesTemplateConfig: CollectionTemplateConfig = {
  defaultTemplate: 'detail',
  availableTemplates: ['detail', 'list'],
  fieldMapping: placesFieldMapping,
};

/**
 * Collections collection field mapping (museum example - hierarchical)
 */
export const collectionsFieldMapping: FieldMapping = {
  title: 'heading',
  description: 'body',
  featuredImage: 'featuredImage',
  parent: 'metadata',
  children: 'relatedItems',
  archiveItems: 'relatedItems',
};

export const collectionsTemplateConfig: CollectionTemplateConfig = {
  defaultTemplate: 'list',
  availableTemplates: ['list', 'detail', 'archive'],
  fieldMapping: collectionsFieldMapping,
};

// ===========================================
// Template Configuration Registry
// ===========================================

export const templateConfigs: Record<string, CollectionTemplateConfig> = {
  pages: pagesTemplateConfig,
  posts: postsTemplateConfig,
  artifacts: artifactsTemplateConfig,
  people: peopleTemplateConfig,
  places: placesTemplateConfig,
  collections: collectionsTemplateConfig,
};

/**
 * Get template configuration for a collection
 */
export function getTemplateConfig(collection: string): CollectionTemplateConfig | null {
  return templateConfigs[collection] || null;
}

/**
 * Get field mapping for a collection
 */
export function getFieldMapping(collection: string): FieldMapping | null {
  const config = templateConfigs[collection];
  return config?.fieldMapping || null;
}

/**
 * Get available templates for a collection
 */
export function getAvailableTemplates(collection: string): TemplateType[] {
  const config = templateConfigs[collection];
  return config?.availableTemplates || ['detail'];
}

/**
 * Get default template for a collection
 */
export function getDefaultTemplate(collection: string): TemplateType {
  const config = templateConfigs[collection];
  return config?.defaultTemplate || 'detail';
}

/**
 * Map document fields to template slots
 */
export function mapFieldsToSlots<T extends Record<string, any>>(
  document: T,
  collection: string
): Record<string, any> {
  const mapping = getFieldMapping(collection);
  if (!mapping) return document;

  const mapped: Record<string, any> = {};

  for (const [fieldName, slotName] of Object.entries(mapping)) {
    if (fieldName in document) {
      mapped[slotName] = document[fieldName];
    }
  }

  // Include unmapped fields
  for (const [key, value] of Object.entries(document)) {
    if (!Object.keys(mapping).includes(key)) {
      mapped[key] = value;
    }
  }

  return mapped;
}
