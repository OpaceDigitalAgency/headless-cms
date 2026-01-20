/**
 * Preset Seeders Index
 * 
 * Central export for all preset-specific seeders.
 * Each preset has its own seeder class that extends BaseSeeder.
 */

export { BlogSeeder } from './blog'
export { BrochureSeeder } from './brochure'
export { CoreSeeder } from './core'
export { EcommerceSeeder } from './ecommerce'

import type { Payload } from 'payload'
import type { SeedOptions, BaseSeeder } from '../base'
import { seederRegistry } from '../base'
import { BlogSeeder } from './blog'
import { BrochureSeeder } from './brochure'
import { CoreSeeder } from './core'
import { EcommerceSeeder } from './ecommerce'

/**
 * Available preset IDs
 */
export const PRESET_IDS = [
  'blog-astro',
  'brochure-astro',
  'museum-next',
  'ecommerce-next',
] as const

export type PresetId = typeof PRESET_IDS[number]

/**
 * Preset metadata for UI display
 */
export const PRESET_METADATA: Record<PresetId, {
  name: string
  description: string
  collections: string[]
  hasSeedData: boolean
  hasSampleMedia: boolean
}> = {
  'blog-astro': {
    name: 'Blog (Astro)',
    description: 'A blog site with posts, categories, and pages',
    collections: ['pages', 'posts', 'categories', 'content-types', 'custom-items'],
    hasSeedData: true,
    hasSampleMedia: false,
  },
  'brochure-astro': {
    name: 'Brochure (Astro)',
    description: 'A marketing/brochure website with landing pages',
    collections: ['pages', 'content-types', 'custom-items'],
    hasSeedData: true,
    hasSampleMedia: false,
  },
  'museum-next': {
    name: 'Archive (Next.js)',
    description: 'An archive-focused site with archive items, people, and places',
    collections: ['pages', 'posts', 'categories', 'archive-items', 'people', 'places', 'content-types', 'custom-items'],
    hasSeedData: true,
    hasSampleMedia: true,
  },
  'ecommerce-next': {
    name: 'Ecommerce (Next.js)',
    description: 'An ecommerce catalog with products and collections',
    collections: ['pages', 'products', 'product-categories', 'product-collections', 'content-types', 'custom-items'],
    hasSeedData: true,
    hasSampleMedia: true,
  },
}

/**
 * Create a seeder instance for a preset
 */
export function createSeeder(
  presetId: PresetId,
  payload: Payload,
  options: SeedOptions = {}
): BaseSeeder {
  switch (presetId) {
    case 'blog-astro':
      return new BlogSeeder(payload, options)
    case 'brochure-astro':
      return new BrochureSeeder(payload, options)
    case 'museum-next':
      return new CoreSeeder(payload, options)
    case 'ecommerce-next':
      return new EcommerceSeeder(payload, options)
    default:
      throw new Error(`Unknown preset: ${presetId}`)
  }
}

/**
 * Initialize all seeders and register them
 */
export function initializeSeeders(payload: Payload, options: SeedOptions = {}): void {
  for (const presetId of PRESET_IDS) {
    const seeder = createSeeder(presetId, payload, options)
    seederRegistry.register(seeder)
  }
}

/**
 * Get preset metadata
 */
export function getPresetMetadata(presetId: PresetId) {
  return PRESET_METADATA[presetId]
}

/**
 * Check if a preset ID is valid
 */
export function isValidPresetId(id: string): id is PresetId {
  return PRESET_IDS.includes(id as PresetId)
}
