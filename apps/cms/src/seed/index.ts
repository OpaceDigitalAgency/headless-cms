import { getPayload } from 'payload'
import config from '../payload.config'
import { downloadAllMedia, SAMPLE_IMAGES, getMediaPath, mediaExists } from './download-media'
import { createSeeder, isValidPresetId, PRESET_IDS, PRESET_METADATA, type PresetId } from './presets'
import { ensureShowcasePage } from './showcase'
import type { SeedOptions } from './base'

/**
 * Seed script to populate the database with sample data
 *
 * Environment variables:
 * - SEED_PRESET: Preset to seed (blog, brochure, archive, ecommerce)
 * - SEED_MEDIA: Whether to download sample media (true/false)
 * - SEED_CLEAR: Whether to clear existing data before seeding (true/false)
 *
 * Run with: pnpm seed
 * Or with preset: SEED_PRESET=blog pnpm seed
 */

// ===========================================
// Configuration
// ===========================================

const SEED_PRESET = process.env.SEED_PRESET || 'blog'
const SEED_MEDIA = process.env.SEED_MEDIA === 'true'
const SEED_CLEAR = process.env.SEED_CLEAR === 'true'

// ===========================================
// Main Seed Function
// ===========================================

async function seed() {
  console.log('🌱 Starting database seed...')
  console.log('')
  console.log(`📦 Preset: ${SEED_PRESET}`)
  console.log(`🖼️  Download Media: ${SEED_MEDIA}`)
  console.log(`🗑️  Clear Existing: ${SEED_CLEAR}`)
  console.log('')

  const payload = await getPayload({ config })

  try {
    // Validate preset
    if (!isValidPresetId(SEED_PRESET)) {
      console.error(`❌ Invalid preset: ${SEED_PRESET}`)
      console.log(`Available presets: ${PRESET_IDS.join(', ')}`)
      process.exit(1)
    }

    const presetId = SEED_PRESET as PresetId
    const metadata = PRESET_METADATA[presetId]

    console.log(`📋 Preset: ${metadata.name}`)
    console.log(`   ${metadata.description}`)
    console.log(`   Collections: ${metadata.collections.join(', ')}`)
    console.log('')

    // ===========================================
    // Create Admin User (always needed)
    // ===========================================
    console.log('Creating admin user...')

    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@example.com' } },
      limit: 1,
    })

    if (existingAdmin.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
        },
      })
      console.log('✅ Admin user created')
    } else {
      console.log('ℹ️ Admin user already exists')
    }

    // ===========================================
    // Download Sample Media (if enabled)
    // ===========================================
    if (SEED_MEDIA && metadata.hasSampleMedia) {
      console.log('')
      console.log('Downloading sample media...')
      await downloadAllMedia()
      console.log('✅ Sample media downloaded')
    }

    // ===========================================
    // Create Seeder and Run
    // ===========================================
    const options: SeedOptions = {
      downloadMedia: SEED_MEDIA,
      clearExisting: SEED_CLEAR,
    }

    const seeder = createSeeder(presetId, payload, options)

    // Clear existing data if requested
    if (SEED_CLEAR) {
      console.log('')
      console.log('Clearing existing data...')
      await seeder.clear()
    }

    // Run the seed
    console.log('')
    console.log('Seeding data...')
    await seeder.seed()

    // Global step: Showcase Page
    console.log('Building Blocks Showcase page...')
    await ensureShowcasePage(payload, { updateHeader: true })

    console.log('')
    console.log('✅ Database seeded successfully!')
    console.log('')
    console.log('Default admin credentials:')
    console.log('  Email: admin@example.com')
    console.log('  Password: admin123')
    console.log('')

  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

// ===========================================
// Exported Functions for API Use
// ===========================================

/**
 * Seed a specific preset programmatically
 */
export async function seedPreset(
  presetId: PresetId,
  options: SeedOptions = {}
): Promise<{ success: boolean; message: string }> {
  const payload = await getPayload({ config })

  try {
    if (!isValidPresetId(presetId)) {
      return { success: false, message: `Invalid preset: ${presetId}` }
    }

    const seeder = createSeeder(presetId, payload, options)

    if (options.clearExisting) {
      await seeder.clear()
    }

    await seeder.seed()

    // Global step: Showcase Page
    await ensureShowcasePage(payload, { updateHeader: true })

    return { success: true, message: `Successfully seeded ${presetId}` }
  } catch (error) {
    return { success: false, message: `Seed failed: ${error}` }
  }
}

/**
 * Clear data for a specific preset
 */
export async function clearPreset(
  presetId: PresetId
): Promise<{ success: boolean; message: string }> {
  const payload = await getPayload({ config })

  try {
    if (!isValidPresetId(presetId)) {
      return { success: false, message: `Invalid preset: ${presetId}` }
    }

    const seeder = createSeeder(presetId, payload, {})
    await seeder.clear()

    return { success: true, message: `Successfully cleared ${presetId}` }
  } catch (error) {
    return { success: false, message: `Clear failed: ${error}` }
  }
}

/**
 * Get available presets
 */
export function getAvailablePresets() {
  return PRESET_IDS.map(id => ({
    id,
    ...PRESET_METADATA[id],
  }))
}

// Run seed if called directly
seed()
