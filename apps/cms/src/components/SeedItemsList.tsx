import React, { useState } from 'react'
import type { CollectionTemplate } from '../collection-templates/types'

interface SeedItemsListProps {
  template: CollectionTemplate
  onSeedItem?: (slug: string) => void
  onSeedAll?: () => void
  isSeeding?: boolean
  seedingItems?: Set<string>
  disabledItems?: Set<string>
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

/**
 * SeedItemsList Component
 *
 * Displays individual seed items with individual seed buttons and a "Seed All" option.
 * Clean, scannable list with meaningful descriptions for each item.
 * Can be controlled externally via expanded and onExpandedChange props.
 */
export const SeedItemsList: React.FC<SeedItemsListProps> = ({
  template,
  onSeedItem,
  onSeedAll,
  isSeeding = false,
  seedingItems = new Set(),
  disabledItems = new Set(),
  expanded: controlledExpanded,
  onExpandedChange,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded

  const handleToggle = (newState: boolean) => {
    if (isControlled) {
      onExpandedChange?.(newState)
    } else {
      setInternalExpanded(newState)
    }
  }

  const seedItems = template.seedItems || []

  if (!seedItems || seedItems.length === 0) {
    return null
  }

  // Only show the toggle button if not controlled externally
  if (isControlled && !expanded) {
    return null
  }

  return (
    <div style={{ marginBottom: '12px' }}>
      {!isControlled && (
        <button
          onClick={() => handleToggle(!expanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--theme-elevation-600)',
            textAlign: 'left',
          }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
            transition: 'transform 0.2s ease',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          }}>
            ▶
          </span>
          <span>Sample items ({seedItems.length})</span>
        </button>
      )}

      {expanded && (
        <div style={{
          marginTop: '12px',
          paddingLeft: '24px',
          borderLeft: '2px solid var(--theme-elevation-200)',
          maxHeight: seedItems.length > 4 ? '280px' : 'none',
          overflowY: seedItems.length > 4 ? 'auto' : 'visible',
          paddingRight: seedItems.length > 4 ? '8px' : '0',
        }}>
          {seedItems.map((item, index) => {
            const isSeedingThis = seedingItems.has(item.slug)
            const isDisabled = disabledItems.has(item.slug)
            return (
              <div
                key={`${item.slug}-${index}`}
                style={{
                  paddingBottom: '12px',
                  marginBottom: index < seedItems.length - 1 ? '12px' : '0',
                  borderBottom: index < seedItems.length - 1 ? '1px solid var(--theme-elevation-100)' : 'none',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--theme-text)',
                      marginBottom: '4px',
                    }}>
                      {item.title}
                    </div>
                    {item.excerpt && (
                      <div style={{
                        fontSize: '11px',
                        color: 'var(--theme-elevation-600)',
                        lineHeight: '1.4',
                      }}>
                        {item.excerpt}
                      </div>
                    )}
                  </div>
                  {onSeedItem && (
                    <button
                      onClick={() => onSeedItem(item.slug)}
                      disabled={isSeeding || isSeedingThis || isDisabled}
                      style={{
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 500,
                        borderRadius: '4px',
                        border: 'none',
                        background: isDisabled ? '#e2e8f0' : '#3b82f6',
                        color: 'white',
                        cursor: isSeeding || isSeedingThis || isDisabled ? 'not-allowed' : 'pointer',
                        opacity: isSeeding || isSeedingThis || isDisabled ? 0.6 : 1,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {isSeedingThis ? 'Seeding...' : isDisabled ? 'Seeded' : 'Seed'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}

          {onSeedAll && (
            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid var(--theme-elevation-200)',
            }}>
              <button
                onClick={onSeedAll}
                disabled={isSeeding}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  background: '#10b981',
                  color: 'white',
                  cursor: isSeeding ? 'not-allowed' : 'pointer',
                  opacity: isSeeding ? 0.6 : 1,
                }}
              >
                {isSeeding ? 'Seeding All...' : 'Seed All Items'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SeedItemsList
