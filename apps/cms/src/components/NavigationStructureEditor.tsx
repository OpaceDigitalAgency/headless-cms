'use client'

import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'
import type { SectionId } from '../lib/navigationConfig'
import { sectionLabels, sectionOrder } from '../lib/navigationConfig'

interface NavItem {
  slug: string
  label: string
  section: SectionId
  enabled: boolean
}

interface NavSection {
  id: SectionId
  label: string
  items: NavItem[]
}

/**
 * Navigation Structure Editor
 * 
 * Displays the complete admin navigation structure with the ability to:
 * - Reorder sections
 * - Reorder items within sections
 * - Move items between sections
 * - Toggle item visibility
 * - Customize labels
 */
export const NavigationStructureEditor: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<any[]>({ path })
  const [sections, setSections] = useState<NavSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setError(null)
        const response = await fetch('/api/admin/navigation')
        if (!response.ok) throw new Error('Failed to load navigation')
        
        const data = await response.json()
        const navSections: NavSection[] = sectionOrder.map((sectionId) => ({
          id: sectionId,
          label: sectionLabels[sectionId],
          items: [],
        }))

        // Populate sections with items
        data.navSections?.forEach((section: any) => {
          const navSection = navSections.find(s => s.id === section.id)
          if (navSection) {
            navSection.items = section.items?.map((item: any) => ({
              slug: item.slug,
              label: item.label,
              section: section.id,
              enabled: true,
            })) || []
          }
        })

        setSections(navSections)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setIsLoading(false)
      }
    }

    fetchNavigation()
  }, [])

  if (isLoading) return <div style={{ padding: '16px', color: '#666' }}>Loading navigation structure...</div>
  if (error) return <div style={{ padding: '16px', color: '#dc2626' }}>Error: {error}</div>

  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
        Navigation structure editor coming soon. This will allow you to reorder sections and items, move items between sections, and customize labels.
      </p>
      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', fontSize: '12px', color: '#666' }}>
        <strong>Sections:</strong> {sections.length}<br />
        <strong>Total Items:</strong> {sections.reduce((sum, s) => sum + s.items.length, 0)}
      </div>
    </div>
  )
}

export default NavigationStructureEditor

