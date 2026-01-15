/**
 * Base Seed Utilities
 * 
 * Provides reusable, OOP-style utilities for seeding data.
 * All preset-specific seed modules should extend these base utilities.
 */

import type { Payload } from 'payload'

/**
 * Seed configuration options
 */
export interface SeedOptions {
  /** Whether to download and seed sample media */
  downloadMedia?: boolean
  /** Whether to clear existing data before seeding */
  clearExisting?: boolean
  /** Specific collections to seed (empty = all) */
  collections?: string[]
  /** Number of items to create per collection */
  itemCounts?: Record<string, number>
}

/**
 * Default seed options
 */
export const DEFAULT_SEED_OPTIONS: SeedOptions = {
  downloadMedia: false,
  clearExisting: false,
  collections: [],
  itemCounts: {},
}

/**
 * Rich text content helper - creates a simple paragraph
 */
export function createRichText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ text }],
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Rich text content helper - creates multiple paragraphs
 */
export function createRichTextParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map(text => ({
        type: 'paragraph',
        children: [{ text }],
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Base seeder class - extend this for preset-specific seeders
 */
export abstract class BaseSeeder {
  protected payload: Payload
  protected options: SeedOptions
  protected createdIds: Record<string, string[]> = {}

  constructor(payload: Payload, options: SeedOptions = {}) {
    this.payload = payload
    this.options = { ...DEFAULT_SEED_OPTIONS, ...options }
  }

  /**
   * Main seed method - must be implemented by subclasses
   */
  abstract seed(): Promise<void>

  /**
   * Clear all data for this preset
   */
  abstract clear(): Promise<void>

  /**
   * Get the preset ID
   */
  abstract getPresetId(): string

  /**
   * Get collections this seeder manages
   */
  abstract getCollections(): string[]

  /**
   * Log info message
   */
  protected log(message: string): void {
    this.payload.logger.info(`[${this.getPresetId()}] ${message}`)
  }

  /**
   * Log error message
   */
  protected error(message: string): void {
    this.payload.logger.error(`[${this.getPresetId()}] ${message}`)
  }

  /**
   * Track created document ID
   */
  protected trackId(collection: string, id: string): void {
    if (!this.createdIds[collection]) {
      this.createdIds[collection] = []
    }
    this.createdIds[collection].push(id)
  }

  /**
   * Get all created IDs for a collection
   */
  protected getCreatedIds(collection: string): string[] {
    return this.createdIds[collection] || []
  }

  /**
   * Seed a specific collection (public method)
   * Override in subclasses to provide collection-specific seeding
   */
  public async seedCollection(collection: string): Promise<void> {
    this.log(`Seeding collection: ${collection}`)
    // Default implementation - subclasses should override
    // to provide collection-specific seeding logic
  }

  /**
   * Clear a specific collection (public method)
   */
  public async clearCollection(collection: string): Promise<void> {
    try {
      const docs = await this.payload.find({
        collection: collection as any,
        limit: 1000,
      })
      
      for (const doc of docs.docs) {
        await this.payload.delete({
          collection: collection as any,
          id: doc.id,
        })
      }
      
      this.log(`Cleared ${docs.docs.length} items from ${collection}`)
    } catch (error) {
      this.error(`Failed to clear ${collection}: ${error}`)
    }
  }

  /**
   * Create a document and track its ID
   */
  protected async create<T = any>(
    collection: string,
    data: Record<string, any>
  ): Promise<T> {
    const doc = await this.payload.create({
      collection,
      data,
    })
    this.trackId(collection, doc.id)
    return doc as T
  }

  /**
   * Update a global
   */
  protected async updateGlobal(
    slug: string,
    data: Record<string, any>
  ): Promise<void> {
    await this.payload.updateGlobal({
      slug,
      data,
    })
  }

  /**
   * Check if a collection should be seeded
   */
  protected shouldSeedCollection(collection: string): boolean {
    if (this.options.collections && this.options.collections.length > 0) {
      return this.options.collections.includes(collection)
    }
    return true
  }

  /**
   * Get item count for a collection
   */
  protected getItemCount(collection: string, defaultCount: number): number {
    return this.options.itemCounts?.[collection] || defaultCount
  }
}

/**
 * Seeder registry - manages all available seeders
 */
export class SeederRegistry {
  private seeders: Map<string, BaseSeeder> = new Map()

  /**
   * Register a seeder
   */
  register(seeder: BaseSeeder): void {
    this.seeders.set(seeder.getPresetId(), seeder)
  }

  /**
   * Get a seeder by preset ID
   */
  get(presetId: string): BaseSeeder | undefined {
    return this.seeders.get(presetId)
  }

  /**
   * Get all registered seeders
   */
  getAll(): BaseSeeder[] {
    return Array.from(this.seeders.values())
  }

  /**
   * Get all preset IDs
   */
  getPresetIds(): string[] {
    return Array.from(this.seeders.keys())
  }

  /**
   * Seed a specific preset
   */
  async seedPreset(presetId: string): Promise<void> {
    const seeder = this.get(presetId)
    if (!seeder) {
      throw new Error(`Unknown preset: ${presetId}`)
    }
    await seeder.seed()
  }

  /**
   * Clear data for a specific preset
   */
  async clearPreset(presetId: string): Promise<void> {
    const seeder = this.get(presetId)
    if (!seeder) {
      throw new Error(`Unknown preset: ${presetId}`)
    }
    await seeder.clear()
  }
}

/**
 * Global seeder registry instance
 */
export const seederRegistry = new SeederRegistry()
