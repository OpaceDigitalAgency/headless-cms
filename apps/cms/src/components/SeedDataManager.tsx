'use client'

import React, { useState, useEffect } from 'react'

/**
 * Preset metadata type
 */
interface PresetInfo {
  id: string
  name: string
  description: string
  collections: string[]
  hasSeedData: boolean
  hasSampleMedia: boolean
}

/**
 * Seed Data Manager Component
 * 
 * Provides a comprehensive UI for managing sample data:
 * - Preset selection (blog, brochure, museum, ecommerce)
 * - Seed sample data with optional media
 * - Re-seed existing data
 * - Clear all sample data
 * 
 * All options are OPTIONAL - users only click if desired.
 * Options are CONDITIONAL based on the selected preset type.
 */
export const SeedDataManager: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('museum-next')
  const [includeMedia, setIncludeMedia] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const [presets, setPresets] = useState<PresetInfo[]>([])
  const [hasExistingData, setHasExistingData] = useState<boolean>(false)

  // Fetch available presets on mount
  useEffect(() => {
    fetchPresets()
    checkExistingData()
  }, [])

  const fetchPresets = async () => {
    try {
      const response = await fetch('/api/seed/presets')
      if (response.ok) {
        const data = await response.json()
        setPresets(data.presets)
      }
    } catch (error) {
      // Use default presets if API fails
      setPresets([
        {
          id: 'blog-astro',
          name: 'Blog (Astro)',
          description: 'A blog site with posts, categories, and pages',
          collections: ['pages', 'posts', 'categories'],
          hasSeedData: true,
          hasSampleMedia: false,
        },
        {
          id: 'brochure-astro',
          name: 'Brochure (Astro)',
          description: 'A marketing/brochure website with landing pages',
          collections: ['pages'],
          hasSeedData: true,
          hasSampleMedia: false,
        },
        {
          id: 'museum-next',
          name: 'Museum (Next.js)',
          description: 'A museum/archive site with artifacts, people, and places',
          collections: ['pages', 'posts', 'categories', 'artifacts', 'people', 'places', 'museum-collections'],
          hasSeedData: true,
          hasSampleMedia: true,
        },
        {
          id: 'ecommerce-next',
          name: 'Ecommerce (Next.js)',
          description: 'An ecommerce catalog with products and collections',
          collections: ['pages', 'products', 'product-categories', 'product-collections'],
          hasSeedData: true,
          hasSampleMedia: true,
        },
      ])
    }
  }

  const checkExistingData = async () => {
    try {
      const response = await fetch('/api/seed/status')
      if (response.ok) {
        const data = await response.json()
        setHasExistingData(data.hasData)
      }
    } catch (error) {
      // Assume no data if check fails
      setHasExistingData(false)
    }
  }

  const selectedPresetInfo = presets.find(p => p.id === selectedPreset)

  const handleSeedData = async () => {
    if (!selectedPreset) {
      setMessage({ type: 'error', text: 'Please select a preset first' })
      return
    }

    setIsLoading(true)
    setMessage({ type: 'info', text: 'Seeding sample data... This may take a moment.' })

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'seed',
          preset: selectedPreset,
          includeMedia,
          clearExisting: false,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Sample data seeded successfully!' })
        setHasExistingData(true)
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to seed data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while seeding data' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReseedData = async () => {
    if (!selectedPreset) {
      setMessage({ type: 'error', text: 'Please select a preset first' })
      return
    }

    const confirmed = window.confirm(
      'This will clear existing sample data and re-seed with fresh data. Are you sure?'
    )

    if (!confirmed) return

    setIsLoading(true)
    setMessage({ type: 'info', text: 'Re-seeding sample data... This may take a moment.' })

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reseed',
          preset: selectedPreset,
          includeMedia,
          clearExisting: true,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Sample data re-seeded successfully!' })
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to re-seed data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while re-seeding data' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearData = async () => {
    const confirmed = window.confirm(
      'This will permanently delete all sample data. This action cannot be undone. Are you sure?'
    )

    if (!confirmed) return

    setIsLoading(true)
    setMessage({ type: 'info', text: 'Clearing sample data...' })

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'clear',
          preset: selectedPreset,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Sample data cleared successfully!' })
        setHasExistingData(false)
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to clear data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while clearing data' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      backgroundColor: 'var(--theme-elevation-50)',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
    }}>
      <h2 style={{
        margin: '0 0 8px 0',
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--theme-text)',
      }}>
        Sample Data Manager
      </h2>
      
      <p style={{
        margin: '0 0 20px 0',
        fontSize: '14px',
        color: 'var(--theme-elevation-800)',
      }}>
        Seed your CMS with sample data to get started quickly. Choose a preset that matches your site type.
      </p>

      {/* Preset Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--theme-text)',
        }}>
          Select Preset
        </label>
        <select
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid var(--theme-elevation-200)',
            backgroundColor: 'var(--theme-input-bg)',
            color: 'var(--theme-text)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {presets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      {/* Preset Description */}
      {selectedPresetInfo && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'var(--theme-elevation-100)',
          borderRadius: '6px',
          marginBottom: '20px',
        }}>
          <p style={{
            margin: '0 0 8px 0',
            fontSize: '14px',
            color: 'var(--theme-text)',
          }}>
            {selectedPresetInfo.description}
          </p>
          <p style={{
            margin: 0,
            fontSize: '12px',
            color: 'var(--theme-elevation-700)',
          }}>
            <strong>Collections:</strong> {selectedPresetInfo.collections.join(', ')}
          </p>
        </div>
      )}

      {/* Include Media Option (conditional) */}
      {selectedPresetInfo?.hasSampleMedia && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}>
            <input
              type="checkbox"
              checked={includeMedia}
              onChange={(e) => setIncludeMedia(e.target.checked)}
              disabled={isLoading}
              style={{
                width: '18px',
                height: '18px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            />
            <span style={{
              fontSize: '14px',
              color: 'var(--theme-text)',
            }}>
              Include sample images (downloads from Unsplash)
            </span>
          </label>
          <p style={{
            margin: '4px 0 0 28px',
            fontSize: '12px',
            color: 'var(--theme-elevation-700)',
          }}>
            This will download sample images for artifacts, products, etc.
          </p>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '20px',
          backgroundColor: message.type === 'success' 
            ? 'rgba(34, 197, 94, 0.1)' 
            : message.type === 'error' 
              ? 'rgba(239, 68, 68, 0.1)' 
              : 'rgba(59, 130, 246, 0.1)',
          color: message.type === 'success' 
            ? 'rgb(22, 163, 74)' 
            : message.type === 'error' 
              ? 'rgb(220, 38, 38)' 
              : 'rgb(37, 99, 235)',
          fontSize: '14px',
        }}>
          {message.text}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Seed Sample Data Button */}
        <button
          onClick={handleSeedData}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 500,
            borderRadius: '6px',
            border: 'none',
            backgroundColor: 'var(--theme-success-500, #22c55e)',
            color: 'white',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {isLoading ? 'Processing...' : '🌱 Seed Sample Data'}
        </button>

        {/* Re-seed Button (only show if data exists) */}
        {hasExistingData && (
          <button
            onClick={handleReseedData}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '6px',
              border: '1px solid var(--theme-elevation-300)',
              backgroundColor: 'var(--theme-elevation-100)',
              color: 'var(--theme-text)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            🔄 Re-seed Sample Data
          </button>
        )}

        {/* Clear Data Button (only show if data exists) */}
        {hasExistingData && (
          <button
            onClick={handleClearData}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '6px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'rgb(220, 38, 38)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            🗑️ Delete Sample Data
          </button>
        )}
      </div>

      {/* Help Text */}
      <p style={{
        margin: '16px 0 0 0',
        fontSize: '12px',
        color: 'var(--theme-elevation-600)',
      }}>
        <strong>Note:</strong> These actions only affect sample/seed data. Your custom content will not be affected.
      </p>
    </div>
  )
}

export default SeedDataManager
