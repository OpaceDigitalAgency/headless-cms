'use client'

import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'

/**
 * Clear Cache Button Component
 * Displays in the Payload admin UI to allow admins to clear the Next.js cache
 */
export const ClearCacheButton: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const handleClearCache = async () => {
        setLoading(true)
        setMessage(null)

        try {
            const response = await fetch('/api/clear-cache', {
                method: 'POST',
                credentials: 'include', // Include cookies for authentication
            })

            const data = await response.json()

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: data.message || 'Cache cleared successfully!',
                })
            } else {
                setMessage({
                    type: 'error',
                    text: data.error || 'Failed to clear cache',
                })
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'An error occurred',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: '1rem', borderRadius: '4px', background: '#f5f5f5' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Cache Management</h3>
            <p style={{ marginBottom: '1rem', fontSize: '14px', color: '#666' }}>
                Clear the Next.js cache to ensure all pages display the latest content. Use this after bulk updates or if pages are showing outdated information.
            </p>

            <Button
                onClick={handleClearCache}
                disabled={loading}
                buttonStyle="primary"
            >
                {loading ? 'Clearing Cache...' : '🔄 Clear All Page Cache'}
            </Button>

            {message && (
                <div
                    style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        background: message.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: message.type === 'success' ? '#155724' : '#721c24',
                        border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                    }}
                >
                    {message.text}
                </div>
            )}
        </div>
    )
}

export default ClearCacheButton
