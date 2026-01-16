'use client'

import React, { useState } from 'react'
import { useConfig } from '@payloadcms/ui'
import { SettingsIcon, TrashIcon } from '../admin/icons'

/**
 * Reset Data Button Component
 * 
 * Provides a button in the admin dashboard to reset/clear sample data
 * or re-seed the database with fresh sample data.
 */
export const ResetDataButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null)
  const [showConfirm, setShowConfirm] = useState<'clear' | 'reseed' | null>(null)
  const config = useConfig()

  const handleClearData = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/reset-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'clear' }),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'All sample data cleared successfully!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to clear data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while clearing data' })
    } finally {
      setIsLoading(false)
      setShowConfirm(null)
    }
  }

  const handleReseedData = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/reset-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'reseed' }),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Database re-seeded successfully!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to reseed data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while reseeding data' })
    } finally {
      setIsLoading(false)
      setShowConfirm(null)
    }
  }

  return (
    <div style={{
      padding: '24px',
      backgroundColor: 'var(--theme-elevation-50)',
      borderRadius: '8px',
      marginBottom: '24px',
    }}>
      <h3 style={{ 
        margin: '0 0 8px 0', 
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--theme-text)',
      }}>
        Sample Data Management
      </h3>
      <p style={{ 
        margin: '0 0 16px 0', 
        fontSize: '14px',
        color: 'var(--theme-elevation-800)',
      }}>
        Clear all sample data or re-seed the database with fresh content.
      </p>

      {message && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '16px',
          borderRadius: '4px',
          backgroundColor: message.type === 'success' 
            ? 'var(--theme-success-100)' 
            : message.type === 'error' 
              ? 'var(--theme-error-100)' 
              : 'var(--theme-warning-100)',
          color: message.type === 'success' 
            ? 'var(--theme-success-500)' 
            : message.type === 'error' 
              ? 'var(--theme-error-500)' 
              : 'var(--theme-warning-500)',
          fontSize: '14px',
        }}>
          {message.text}
        </div>
      )}

      {showConfirm && (
        <div style={{
          padding: '16px',
          marginBottom: '16px',
          borderRadius: '4px',
          backgroundColor: 'var(--theme-error-100)',
          border: '1px solid var(--theme-error-500)',
        }}>
          <p style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--theme-error-500)',
          }}>
            {showConfirm === 'clear'
              ? 'Are you sure you want to clear ALL data? This cannot be undone!'
              : 'This will clear existing data and re-seed with sample content. Continue?'
            }
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={showConfirm === 'clear' ? handleClearData : handleReseedData}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--theme-error-500)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Processing...' : 'Yes, Continue'}
            </button>
            <button
              onClick={() => setShowConfirm(null)}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--theme-elevation-100)',
                color: 'var(--theme-text)',
                border: '1px solid var(--theme-elevation-200)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showConfirm && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowConfirm('reseed')}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--theme-elevation-500)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <SettingsIcon size={16} /> Re-seed Sample Data
          </button>
          <button
            onClick={() => setShowConfirm('clear')}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: 'var(--theme-error-500)',
              border: '1px solid var(--theme-error-500)',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <TrashIcon size={16} /> Clear All Data
          </button>
        </div>
      )}
    </div>
  )
}

export default ResetDataButton
