/**
 * Collection Templates System
 * 
 * Provides a library of collection templates that users can add to their CMS.
 * Each template can be cloned and customized with a custom name.
 */

export * from './types'
export * from './templates'
export * from './shared-fields'

import type { CollectionTemplate, InstalledCollection, TemplateRegistryState } from './types'
import { allTemplates, getTemplateById } from './templates'

/**
 * Collection Templates Registry
 * 
 * Manages the state of installed collections.
 * In production, this would be stored in a database global.
 */
class TemplateRegistry {
  private state: TemplateRegistryState = {
    installedCollections: [],
    updatedAt: new Date().toISOString(),
  }

  /**
   * Get all available templates
   */
  getAvailableTemplates(): CollectionTemplate[] {
    return allTemplates
  }

  /**
   * Get a template by ID
   */
  getTemplate(id: string): CollectionTemplate | undefined {
    return getTemplateById(id)
  }

  /**
   * Get installed collections
   */
  getInstalledCollections(): InstalledCollection[] {
    return this.state.installedCollections
  }

  /**
   * Check if a collection is installed
   */
  isInstalled(slug: string): boolean {
    return this.state.installedCollections.some(c => c.slug === slug)
  }

  /**
   * Install a collection from a template
   */
  installCollection(
    templateId: string,
    customName: string,
    slug: string,
    singular: string,
    plural: string
  ): InstalledCollection {
    const template = this.getTemplate(templateId)
    if (!template) {
      throw new Error(`Template not found: ${templateId}`)
    }

    if (this.isInstalled(slug)) {
      throw new Error(`Collection already exists: ${slug}`)
    }

    const installed: InstalledCollection = {
      id: `${templateId}-${Date.now()}`,
      templateId,
      customName,
      slug,
      singular,
      plural,
      installedAt: new Date().toISOString(),
      hasSeededData: false,
    }

    this.state.installedCollections.push(installed)
    this.state.updatedAt = new Date().toISOString()

    return installed
  }

  /**
   * Uninstall a collection
   */
  uninstallCollection(slug: string): boolean {
    const index = this.state.installedCollections.findIndex(c => c.slug === slug)
    if (index === -1) {
      return false
    }

    this.state.installedCollections.splice(index, 1)
    this.state.updatedAt = new Date().toISOString()
    return true
  }

  /**
   * Mark collection as seeded
   */
  markAsSeeded(slug: string): void {
    const collection = this.state.installedCollections.find(c => c.slug === slug)
    if (collection) {
      collection.hasSeededData = true
      this.state.updatedAt = new Date().toISOString()
    }
  }

  /**
   * Mark collection as unseeded
   */
  markAsUnseeded(slug: string): void {
    const collection = this.state.installedCollections.find(c => c.slug === slug)
    if (collection) {
      collection.hasSeededData = false
      this.state.updatedAt = new Date().toISOString()
    }
  }

  /**
   * Load state from storage
   */
  loadState(state: TemplateRegistryState): void {
    this.state = state
  }

  /**
   * Get current state for storage
   */
  getState(): TemplateRegistryState {
    return this.state
  }
}

/**
 * Singleton registry instance
 */
export const templateRegistry = new TemplateRegistry()

/**
 * Pre-installed collections (these are always available)
 * The core collections that come with every installation.
 */
export const CORE_COLLECTIONS = [
  'pages',
  'categories',
  'tags',
  'media',
  'users',
]

/**
 * Pre-configured collection bundles
 * These are common combinations that users can install together.
 */
export const COLLECTION_BUNDLES = {
  blog: {
    name: 'Blog',
    description: 'A complete blog with posts, categories, and tags',
    templates: ['blog-post'],
    icon: '📝',
  },
  museum: {
    name: 'Museum/Archive',
    description: 'Archive items with people and places',
    templates: ['archive-item', 'person', 'place'],
    icon: '🏛️',
  },
  ecommerce: {
    name: 'Ecommerce',
    description: 'Product catalog with inventory',
    templates: ['product'],
    icon: '🛒',
  },
  directory: {
    name: 'Directory',
    description: 'People and places directory',
    templates: ['person', 'place'],
    icon: '📇',
  },
  events: {
    name: 'Events',
    description: 'Events with venues',
    templates: ['event', 'place'],
    icon: '📅',
  },
}

export type BundleId = keyof typeof COLLECTION_BUNDLES
