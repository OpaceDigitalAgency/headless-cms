'use client'

import React, { useEffect, useState } from 'react'

interface SeoAdvanced {
    defaultRobotsMeta?: string
    googleSiteVerification?: string
    bingSiteVerification?: string
    facebookDomainVerification?: string
    organizationType?: string
    organizationName?: string
}

const SeoAdvancedTab: React.FC = () => {
    const [advanced, setAdvanced] = useState<SeoAdvanced>({
        defaultRobotsMeta: 'index,follow', organizationType: 'Organization',
    })
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        const loadAdvanced = async () => {
            try {
                const response = await fetch('/api/admin/seo/advanced')
                if (response.ok) {
                    const data = await response.json()
                    if (data.advanced) {
                        setAdvanced(data.advanced)
                    }
                }
            } catch (err) {
                console.error('Failed to load SEO advanced settings:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadAdvanced()
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage(null)

        try {
            const response = await fetch('/api/admin/seo/advanced', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ advanced }),
            })

            if (response.ok) {
                setMessage({ type: 'success', text: 'Advanced settings saved successfully' })
            } else {
                const error = await response.json()
                setMessage({ type: 'error', text: error.message || 'Failed to save settings' })
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
                Loading advanced settings...
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem 0' }}>
            {/* Search Engine Verification */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                    Search Engine Verification
                </h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
                    Meta tags for verifying site ownership with search engines
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="field-type">
                        <label className="field-label" htmlFor="googleSiteVerification">
                            Google Site Verification
                        </label>
                        <input
                            id="googleSiteVerification"
                            type="text"
                            className="input"
                            value={advanced.googleSiteVerification || ''}
                            onChange={(e) => setAdvanced({ ...advanced, googleSiteVerification: e.target.value })}
                            placeholder="your-verification-code"
                        />
                        <div className="field-description" style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--theme-elevation-500)' }}>
                            From Google Search Console verification
                        </div>
                    </div>

                    <div className="field-type">
                        <label className="field-label" htmlFor="bingSiteVerification">
                            Bing Site Verification
                        </label>
                        <input
                            id="bingSiteVerification"
                            type="text"
                            className="input"
                            value={advanced.bingSiteVerification || ''}
                            onChange={(e) => setAdvanced({ ...advanced, bingSiteVerification: e.target.value })}
                            placeholder="your-verification-code"
                        />
                    </div>

                    <div className="field-type">
                        <label className="field-label" htmlFor="facebookDomainVerification">
                            Facebook Domain Verification
                        </label>
                        <input
                            id="facebookDomainVerification"
                            type="text"
                            className="input"
                            value={advanced.facebookDomainVerification || ''}
                            onChange={(e) => setAdvanced({ ...advanced, facebookDomainVerification: e.target.value })}
                            placeholder="your-verification-code"
                        />
                    </div>
                </div>
            </div>

            {/* Robots Meta Defaults */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                    Default Robots Meta
                </h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
                    Default robots directive for pages without specific SEO settings
                </p>

                <div className="field-type">
                    <label className="field-label" htmlFor="defaultRobotsMeta">
                        Robots Meta Tag
                    </label>
                    <select
                        id="defaultRobotsMeta"
                        className="select"
                        value={advanced.defaultRobotsMeta || 'index,follow'}
                        onChange={(e) => setAdvanced({ ...advanced, defaultRobotsMeta: e.target.value })}
                    >
                        <option value="index,follow">index, follow</option>
                        <option value="index,nofollow">index, nofollow</option>
                        <option value="noindex,follow">noindex, follow</option>
                        <option value="noindex,nofollow">noindex, nofollow</option>
                    </select>
                </div>
            </div>

            {/* Organization Schema */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                    Organization Schema
                </h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
                    Structured data about your organization for search engines
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="field-type">
                        <label className="field-label" htmlFor="organizationType">
                            Organization Type
                        </label>
                        <select
                            id="organizationType"
                            className="select"
                            value={advanced.organizationType || 'Organization'}
                            onChange={(e) => setAdvanced({ ...advanced, organizationType: e.target.value })}
                        >
                            <option value="Organization">Organization</option>
                            <option value="Corporation">Corporation</option>
                            <option value="EducationalOrganization">Educational Organization</option>
                            <option value="GovernmentOrganization">Government Organization</option>
                            <option value="LocalBusiness">Local Business</option>
                            <option value="NGO">NGO</option>
                        </select>
                    </div>

                    <div className="field-type">
                        <label className="field-label" htmlFor="organizationName">
                            Organization Name
                        </label>
                        <input
                            id="organizationName"
                            type="text"
                            className="input"
                            value={advanced.organizationName || ''}
                            onChange={(e) => setAdvanced({ ...advanced, organizationName: e.target.value })}
                            placeholder="Your Organization Name"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
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

export default SeoAdvancedTab
