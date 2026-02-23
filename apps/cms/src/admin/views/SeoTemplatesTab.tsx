// @ts-nocheck
'use client'

import React, { useEffect, useState } from 'react'

interface SeoTemplates {
    defaultMetaTitlePattern?: string
    defaultMetaDescription?: string
    titleSeparator?: string
    defaultOgImageId?: string
    twitterCardType?: string
}

const SeoTemplatesTab: React.FC = () => {
    const [templates, setTemplates] = useState<SeoTemplates>({
        titleSeparator: '|',
        twitterCardType: 'summary_large_image',
    })
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const response = await fetch('/api/admin/seo/templates')
                if (response.ok) {
                    const data = await response.json()
                    if (data.templates) {
                        setTemplates(data.templates)
                    }
                }
            } catch (err) {
                console.error('Failed to load SEO templates:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadTemplates()
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage(null)

        try {
            const response = await fetch('/api/admin/seo/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templates }),
            })

            if (response.ok) {
                setMessage({ type: 'success', text: 'SEO templates saved successfully' })
            } else {
                const error = await response.json()
                setMessage({ type: 'error', text: error.message || 'Failed to save templates' })
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network error while saving' })
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div style={{ padding: '2rem 0', color: 'var(--theme-elevation-500)' }}>
                Loading templates...
            </div>
        )
    }

    return (
        <div className="ra-seo-settings" style={{ padding: '2rem 0' }}>
            <div className="ra-seo-section">
                <h3>SEO Defaults</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
                    Set default patterns for meta titles and descriptions across your site
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="field-type">
                        <label className="field-label" htmlFor="defaultMetaTitlePattern">
                            Default Meta Title Pattern
                        </label>
                        <input
                            id="defaultMetaTitlePattern"
                            type="text"
                            className="input"
                            value={templates.defaultMetaTitlePattern || ''}
                            onChange={(e) => setTemplates({ ...templates, defaultMetaTitlePattern: e.target.value })}
                            placeholder="%title% | Site Name"
                        />
                        <div className="field-description">
                            Use %title% as placeholder for page title. Example: %title% | My Site
                        </div>
                    </div>

                    <div className="field-type">
                        <label className="field-label" htmlFor="titleSeparator">
                            Title Separator
                        </label>
                        <select
                            id="titleSeparator"
                            className="select"
                            value={templates.titleSeparator || '|'}
                            onChange={(e) => setTemplates({ ...templates, titleSeparator: e.target.value })}
                        >
                            <option value="|">| (Pipe)</option>
                            <option value="-">- (Dash)</option>
                            <option value="·">· (Middle Dot)</option>
                            <option value="/">"/" (Slash)</option>
                            <option value=">>">&gt;&gt; (Double Arrow)</option>
                        </select>
                    </div>

                    <div className="field-type">
                        <label className="field-label" htmlFor="defaultMetaDescription">
                            Default Meta Description
                        </label>
                        <textarea
                            id="defaultMetaDescription"
                            className="textarea"
                            rows={3}
                            value={templates.defaultMetaDescription || ''}
                            onChange={(e) => setTemplates({ ...templates, defaultMetaDescription: e.target.value })}
                            placeholder="A brief description of your site (100-155 characters recommended)"
                        />
                        <div className="field-description">
                            This will be used when no specific description is set ({(templates.defaultMetaDescription || '').length}/155 characters)
                        </div>
                    </div>

                    <div className="field-type">
                        <label className="field-label" htmlFor="twitterCardType">
                            Twitter Card Type
                        </label>
                        <select
                            id="twitterCardType"
                            className="select"
                            value={templates.twitterCardType || 'summary_large_image'}
                            onChange={(e) => setTemplates({ ...templates, twitterCardType: e.target.value })}
                        >
                            <option value="summary">Summary</option>
                            <option value="summary_large_image">Summary with Large Image</option>
                            <option value="app">App</option>
                            <option value="player">Player</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                    type="button"
                    className="btn btn--style-primary btn--size-medium"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>

                {message && (
                    <span
                        style={{
                            fontSize: '0.875rem',
                            color: message.type === 'success' ? 'var(--theme-success-600)' : 'var(--theme-error-600)',
                        }}
                    >
                        {message.text}
                    </span>
                )}
            </div>
        </div>
    )
}

export default SeoTemplatesTab
