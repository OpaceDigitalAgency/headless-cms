/**
 * Preset Registry
 * 
 * Central registry for all available presets and feature packs.
 * Provides utilities for loading, validating, and applying presets.
 */

import type { 
  PresetManifest, 
  PackManifest, 
  PresetRegistryEntry, 
  AvailablePreset,
  AvailablePack,
  SeedConfig,
} from './types'
import { AVAILABLE_PRESETS, AVAILABLE_PACKS } from './types'
import * as fs from 'fs'
import * as path from 'path'

// ===========================================
// Preset Registry
// ===========================================

const presetRegistry: Map<string, PresetRegistryEntry> = new Map()
const packRegistry: Map<string, PackManifest> = new Map()

/**
 * Load a preset manifest from disk
 */
export function loadPresetManifest(presetId: AvailablePreset): PresetManifest | null {
  const manifestPath = path.join(__dirname, presetId, 'manifest.json')
  
  try {
    const content = fs.readFileSync(manifestPath, 'utf-8')
    return JSON.parse(content) as PresetManifest
  } catch (error) {
    console.error(`Failed to load preset manifest: ${presetId}`, error)
    return null
  }
}

/**
 * Load a pack manifest from disk
 */
export function loadPackManifest(packId: AvailablePack): PackManifest | null {
  const manifestPath = path.join(__dirname, '..', 'packs', packId, 'manifest.json')
  
  try {
    const content = fs.readFileSync(manifestPath, 'utf-8')
    return JSON.parse(content) as PackManifest
  } catch (error) {
    console.error(`Failed to load pack manifest: ${packId}`, error)
    return null
  }
}

/**
 * Get all available presets
 */
export function getAvailablePresets(): PresetManifest[] {
  return AVAILABLE_PRESETS
    .map(id => loadPresetManifest(id))
    .filter((manifest): manifest is PresetManifest => manifest !== null)
}

/**
 * Get all available packs
 */
export function getAvailablePacks(): PackManifest[] {
  return AVAILABLE_PACKS
    .map(id => loadPackManifest(id))
    .filter((manifest): manifest is PackManifest => manifest !== null)
}

/**
 * Get a preset by ID
 */
export function getPreset(presetId: AvailablePreset): PresetManifest | null {
  return loadPresetManifest(presetId)
}

/**
 * Get a pack by ID
 */
export function getPack(packId: AvailablePack): PackManifest | null {
  return loadPackManifest(packId)
}

/**
 * Validate a preset manifest
 */
export function validatePresetManifest(manifest: PresetManifest): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!manifest.id) errors.push('Missing required field: id')
  if (!manifest.name) errors.push('Missing required field: name')
  if (!manifest.description) errors.push('Missing required field: description')
  if (!manifest.category) errors.push('Missing required field: category')
  if (!manifest.frontend) errors.push('Missing required field: frontend')
  if (!manifest.version) errors.push('Missing required field: version')
  if (!manifest.collections || !Array.isArray(manifest.collections)) {
    errors.push('Missing or invalid field: collections')
  }
  if (!manifest.globals || !Array.isArray(manifest.globals)) {
    errors.push('Missing or invalid field: globals')
  }
  if (!manifest.templates || !Array.isArray(manifest.templates)) {
    errors.push('Missing or invalid field: templates')
  }
  if (!manifest.blocks || !Array.isArray(manifest.blocks)) {
    errors.push('Missing or invalid field: blocks')
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Get collections for a preset
 */
export function getPresetCollections(presetId: AvailablePreset): string[] {
  const manifest = loadPresetManifest(presetId)
  return manifest?.collections || []
}

/**
 * Get templates for a preset
 */
export function getPresetTemplates(presetId: AvailablePreset): string[] {
  const manifest = loadPresetManifest(presetId)
  return manifest?.templates || []
}

/**
 * Get blocks for a preset
 */
export function getPresetBlocks(presetId: AvailablePreset): string[] {
  const manifest = loadPresetManifest(presetId)
  return manifest?.blocks || []
}

/**
 * Check if a preset has seed data
 */
export function presetHasSeedData(presetId: AvailablePreset): boolean {
  const manifest = loadPresetManifest(presetId)
  return manifest?.hasSeedData || false
}

/**
 * Check if a preset has sample media
 */
export function presetHasSampleMedia(presetId: AvailablePreset): boolean {
  const manifest = loadPresetManifest(presetId)
  return manifest?.hasSampleMedia || false
}

/**
 * Get preset seed configuration
 */
export function getPresetSeedConfig(presetId: AvailablePreset): SeedConfig {
  const manifest = loadPresetManifest(presetId)
  
  // Default seed configurations per preset type
  const defaultConfigs: Record<string, Partial<SeedConfig>> = {
    'blog-astro': {
      itemCounts: {
        pages: 3,
        posts: 5,
        categories: 4,
      },
    },
    'brochure-astro': {
      itemCounts: {
        pages: 5,
      },
    },
    'museum-next': {
      itemCounts: {
        pages: 3,
        posts: 3,
        categories: 3,
        artifacts: 10,
        people: 5,
        places: 5,
        'museum-collections': 3,
      },
    },
    'ecommerce-next': {
      itemCounts: {
        pages: 3,
        products: 12,
        'product-categories': 5,
        'product-collections': 3,
      },
    },
  }
  
  return {
    presetId,
    downloadMedia: manifest?.hasSampleMedia || false,
    ...defaultConfigs[presetId],
  }
}

// ===========================================
// Exports
// ===========================================

export { AVAILABLE_PRESETS, AVAILABLE_PACKS } from './types'
export type { 
  PresetManifest, 
  PackManifest, 
  PresetRegistryEntry,
  SeedConfig,
  AvailablePreset,
  AvailablePack,
} from './types'
