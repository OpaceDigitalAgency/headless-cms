// @ts-nocheck
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
  /** Seed only a specific item by slug */
  seedOnlyItem?: string
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
          children: [
            {
              type: 'text',
              text,
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
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
        children: [
          {
            type: 'text',
            text,
            format: 0,
            mode: 'normal',
            style: '',
            detail: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
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
   * Seed a custom content type and optional items
   */
  protected async seedCustomContentType(data: {
    name: string
    slug: string
    singularLabel: string
    pluralLabel: string
    icon?: string
    template: string
    customFields?: Array<{ name: string; label: string; type: string; required?: boolean; options?: string }>
    items?: Array<{
      title: string
      slug: string
      excerpt?: string
      content?: any
      blocks?: any[]
      featuredImage?: string
      gallery?: Array<{ image: string; caption?: string }>
      status?: 'draft' | 'published' | 'archived'
      customData?: Record<string, any>
    }>
  }): Promise<string | null> {
    try {
      // Check if content type already exists
      const existing = await this.payload.find({
        collection: 'content-types',
        where: { slug: { equals: data.slug } },
        limit: 1,
        depth: 0,
      })

      let contentType: any
      if (existing.docs.length > 0) {
        this.log(`Content type "${data.name}" already exists, skipping creation.`)
        contentType = existing.docs[0]
      } else {
        contentType = await this.payload.create({
          collection: 'content-types',
          data: {
            name: data.name,
            slug: data.slug,
            singularLabel: data.singularLabel,
            pluralLabel: data.pluralLabel,
            icon: (data.icon as any) || 'box',
            template: data.template as any,
            hasArchive: true,
            archiveSlug: `items/${data.slug}`,
            customFields: (data.customFields as any) || [],
          },
        })
        this.trackId('content-types', contentType.id)
      }

      if (data.items && data.items.length > 0) {
        for (const item of data.items) {
          // Check if item already exists
          const existing = await this.payload.find({
            collection: 'custom-items',
            where: {
              and: [
                { slug: { equals: item.slug } },
                { contentType: { equals: contentType.id } }
              ]
            },
            limit: 1,
            depth: 0,
          })

          if (existing.docs.length > 0) {
            this.log(`Skipping existing custom item: ${item.slug}`)
            continue
          }

          const created = await this.payload.create({
            collection: 'custom-items',
            data: {
              title: item.title,
              slug: item.slug,
              excerpt: item.excerpt,
              content: item.content,
              blocks: item.blocks || [],
              featuredImage: item.featuredImage,
              gallery: item.gallery || [],
              contentType: contentType.id,
              status: item.status || 'published',
              customData: item.customData || {},
            },
          })
          this.trackId('custom-items', created.id)
        }
      }

      return contentType.id
    } catch (error) {
      this.error(`Failed to seed custom content type ${data.name}: ${error}`)
      return null
    }
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
   * Special handling for custom-items: also clears associated content-types
   */
  public async clearCollection(collection: string): Promise<void> {
    try {
      // Special case: when clearing custom-items, also clear content-types
      if (collection === 'custom-items') {
        this.log('Clearing custom-items and associated content-types...')
        await this.clearCollection('content-types')
      }

      let totalCleared = 0
      let hasMore = true

      while (hasMore) {
        const docs = await this.payload.find({
          collection: collection as any,
          limit: 1000,
          depth: 0,
        })

        if (docs.docs.length === 0) {
          hasMore = false
          break
        }

        for (const doc of docs.docs) {
          try {
            await this.payload.delete({
              collection: collection as any,
              id: doc.id,
              overrideAccess: true,
            })
            totalCleared++
          } catch (error) {
            this.error(`Failed to delete ${collection} item ${doc.id}: ${error}`)
          }
        }
      }

      this.log(`Cleared ${totalCleared} items from ${collection}`)
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
      collection: collection as any,
      data,
      overrideAccess: true, // Bypass access control for seeding
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
      slug: slug as any,
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
   * Check if a specific item should be seeded
   */
  protected shouldSeedItem(itemSlug: string): boolean {
    if (this.options.seedOnlyItem) {
      return this.options.seedOnlyItem === itemSlug
    }
    return true
  }

  /**
   * Get item count for a collection
   */
  protected getItemCount(collection: string, defaultCount: number): number {
    return this.options.itemCounts?.[collection] || defaultCount
  }

  /**
   * Get or create an admin user to use as author for posts
   */
  protected async getOrCreateAdminUser(): Promise<string> {
    const existing = await this.payload.find({
      collection: 'users',
      where: { role: { equals: 'admin' } },
      limit: 1,
    })

    if (existing.docs[0]) {
      return existing.docs[0].id
    }

    // Create a default admin user if none exists (bypass access control)
    const admin = await this.payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
      },
      overrideAccess: true, // Bypass access control for seeding
    })

    return admin.id
  }

  /**
   * Create a placeholder media file
   */
  protected async createPlaceholderMedia(filename: string, alt: string): Promise<any> {
    try {
      // Check if media already exists
      const existing = await this.payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
        depth: 0,
      })

      if (existing.docs[0]) {
        return existing.docs[0]
      }

      // Create a simple placeholder image (1x1 transparent PNG)
      const placeholderBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+4x8UAAAAASUVORK5CYII='
      const buffer = Buffer.from(placeholderBase64, 'base64')

      const media = await this.payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: buffer,
          mimetype: 'image/png',
          name: filename,
          size: buffer.length,
        },
        overrideAccess: true,
      })

      return media
    } catch (error) {
      this.error(`Failed to create placeholder media ${filename}: ${error}`)
      return null
    }
  }

  /**
   * Check if a document already exists by slug
   */
  protected async checkIfExists(collection: string, slug: string): Promise<boolean> {
    try {
      const existing = await this.payload.find({
        collection: collection as any,
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      })
      return existing.docs.length > 0
    } catch (error) {
      this.error(`Failed to check existence for ${collection}/${slug}: ${error}`)
      return false
    }
  }
  /**
   * Download media helper
   */
  protected async downloadMedia(url: string, filename: string, alt: string): Promise<any> {
    if (!this.options.downloadMedia) {
      return this.createPlaceholderMedia(filename, alt)
    }

    try {
      this.log(`Downloading media: ${url}`)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Determine mimetype from URL or default to jpeg
      const mimetype = filename.endsWith('.png') ? 'image/png' :
        filename.endsWith('.webp') ? 'image/webp' :
          'image/jpeg'

      // Check if media already exists to avoid duplicates
      const existing = await this.payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
        depth: 0,
      })

      if (existing.docs.length > 0) {
        return existing.docs[0]
      }

      const media = await this.payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: buffer,
          mimetype,
          name: filename,
          size: buffer.length,
        },
        overrideAccess: true,
      })

      return media
    } catch (error) {
      this.error(`Failed to download media ${url}: ${error}`)
      return this.createPlaceholderMedia(filename, alt)
    }
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
