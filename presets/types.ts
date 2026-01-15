/**
 * Preset System Types
 * 
 * Defines the structure for site type presets and feature packs.
 * All presets follow this contract for consistency and interoperability.
 */

/**
 * Supported frontend frameworks
 */
export type FrontendType = 'next' | 'astro'

/**
 * Preset categories
 */
export type PresetCategory = 'blog' | 'brochure' | 'museum' | 'ecommerce' | 'portfolio' | 'docs'

/**
 * Preset manifest - defines a complete site type preset
 */
export interface PresetManifest {
  /** Unique identifier for the preset */
  id: string
  
  /** Human-readable name */
  name: string
  
  /** Short description */
  description: string
  
  /** Preset category */
  category: PresetCategory
  
  /** Target frontend framework */
  frontend: FrontendType
  
  /** Version of the preset */
  version: string
  
  /** Author information */
  author?: string
  
  /** Collections included in this preset */
  collections: string[]
  
  /** Globals included in this preset */
  globals: string[]
  
  /** Templates used by this preset */
  templates: string[]
  
  /** Blocks used by this preset */
  blocks: string[]
  
  /** Whether this preset includes sample seed data */
  hasSeedData: boolean
  
  /** Whether this preset includes sample media */
  hasSampleMedia: boolean
  
  /** Dependencies on feature packs */
  packs?: string[]
  
  /** Minimum Payload CMS version required */
  payloadVersion?: string
  
  /** Environment variables required by this preset */
  requiredEnvVars?: string[]
  
  /** Optional environment variables */
  optionalEnvVars?: string[]
}

/**
 * Feature pack manifest - defines an installable feature pack
 */
export interface PackManifest {
  /** Unique identifier for the pack */
  id: string
  
  /** Human-readable name */
  name: string
  
  /** Short description */
  description: string
  
  /** Version of the pack */
  version: string
  
  /** Collections added by this pack */
  collections?: string[]
  
  /** Globals added by this pack */
  globals?: string[]
  
  /** Plugins required by this pack */
  plugins?: string[]
  
  /** NPM packages required */
  dependencies?: Record<string, string>
  
  /** Environment variables required */
  requiredEnvVars?: string[]
}

/**
 * Seed data configuration for a preset
 */
export interface SeedConfig {
  /** Preset ID this seed data belongs to */
  presetId: string
  
  /** Whether to download sample media */
  downloadMedia: boolean
  
  /** Sample media URLs */
  mediaUrls?: Record<string, { url: string; alt: string; filename: string }>
  
  /** Number of sample items to create per collection */
  itemCounts?: Record<string, number>
}

/**
 * Preset registry entry
 */
export interface PresetRegistryEntry {
  manifest: PresetManifest
  seedConfig?: SeedConfig
  path: string
}

/**
 * Available presets in the system
 */
export const AVAILABLE_PRESETS = [
  'blog-astro',
  'brochure-astro',
  'museum-next',
  'ecommerce-next',
] as const

export type AvailablePreset = typeof AVAILABLE_PRESETS[number]

/**
 * Available feature packs
 */
export const AVAILABLE_PACKS = [
  'search',
  'forms',
  'redirects',
  'seo',
] as const

export type AvailablePack = typeof AVAILABLE_PACKS[number]
