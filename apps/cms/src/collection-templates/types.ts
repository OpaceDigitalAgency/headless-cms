/**
 * Collection Templates Type Definitions
 * 
 * Defines the structure for collection templates that users can
 * add to their CMS instance. Each template represents a content type
 * that can be cloned and customized.
 */

import type { CollectionConfig, Field } from 'payload'

/**
 * Template category for grouping in the UI
 */
export type TemplateCategory = 
  | 'content'      // Blog posts, articles, news
  | 'archive'      // Museum, gallery, portfolio items
  | 'commerce'     // Products, services, inventory
  | 'people'       // Team members, artists, authors
  | 'places'       // Locations, venues, origins
  | 'events'       // Events, exhibitions, shows
  | 'media'        // Video, audio, documents

/**
 * Collection Template Definition
 * 
 * Describes a template that can be instantiated as a new collection.
 */
export interface CollectionTemplate {
  /** Unique template identifier */
  id: string
  
  /** Display name in the UI */
  name: string
  
  /** Brief description of what this template is for */
  description: string
  
  /** Category for grouping in the UI */
  category: TemplateCategory
  
  /** Icon identifier for the UI */
  icon: string
  
  /** Default slug for the collection (can be customized) */
  defaultSlug: string
  
  /** Default singular label */
  defaultSingular: string
  
  /** Default plural label */
  defaultPlural: string
  
  /** Admin group this collection appears in */
  adminGroup: string
  
  /** Whether this template includes related sub-collections */
  includesRelated?: string[]
  
  /** Field definitions for this template */
  fields: Field[]
  
  /** Whether sample data is available */
  hasSeedData: boolean
  
  /** Whether sample media is available */
  hasSeedMedia: boolean
  
  /** Sample data count hint */
  seedDataCount?: number
}

/**
 * Installed Collection Instance
 * 
 * Represents a collection that has been created from a template.
 */
export interface InstalledCollection {
  /** Unique instance ID */
  id: string
  
  /** Template this was created from */
  templateId: string
  
  /** Custom name given by user */
  customName: string
  
  /** Collection slug */
  slug: string
  
  /** Singular label */
  singular: string
  
  /** Plural label */
  plural: string
  
  /** When this was installed */
  installedAt: string
  
  /** Whether seed data has been loaded */
  hasSeededData: boolean
  
  /** Custom field modifications (future use) */
  fieldOverrides?: Record<string, any>
}

/**
 * Template Registry State
 * 
 * Stored in a global to track installed collections.
 */
export interface TemplateRegistryState {
  /** List of installed collection instances */
  installedCollections: InstalledCollection[]
  
  /** Last updated timestamp */
  updatedAt: string
}

/**
 * Seed Data Action
 */
export type SeedAction = 'seed' | 'clear' | 'reseed'

/**
 * Seed Data Request
 */
export interface SeedDataRequest {
  action: SeedAction
  collectionSlug: string
  templateId: string
  includeMedia?: boolean
}

/**
 * Seed Data Response
 */
export interface SeedDataResponse {
  success: boolean
  message: string
  itemsAffected?: number
}

/**
 * Category metadata for UI display
 */
export const TEMPLATE_CATEGORIES: Record<TemplateCategory, { label: string; description: string; icon: string }> = {
  content: {
    label: 'Content',
    description: 'Blog posts, articles, and written content',
    icon: '📝',
  },
  archive: {
    label: 'Archive',
    description: 'Collections of items like museum artifacts, portfolio pieces',
    icon: '🏛️',
  },
  commerce: {
    label: 'Commerce',
    description: 'Products, services, and inventory items',
    icon: '🛒',
  },
  people: {
    label: 'People',
    description: 'Team members, artists, authors, historical figures',
    icon: '👤',
  },
  places: {
    label: 'Places',
    description: 'Locations, venues, geographic origins',
    icon: '📍',
  },
  events: {
    label: 'Events',
    description: 'Events, exhibitions, shows, appointments',
    icon: '📅',
  },
  media: {
    label: 'Media',
    description: 'Video, audio, documents, downloads',
    icon: '🎬',
  },
}
