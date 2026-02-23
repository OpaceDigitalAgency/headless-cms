'use client'

import { useState } from 'react'
import { Form } from '@payloadcms/ui'

interface ContactFormBlockProps {
    block: {
        heading?: string
        description?: string
        variant?: 'modern' | 'classic' | 'minimal'
        showContactInfo?: boolean
        officeAddress?: string
        email?: string
        phone?: string
        disclaimer?: string
        form?: any
        submitButtonText?: string
        successMessage?: string
    }
}

export function ContactFormBlock({ block }: ContactFormBlockProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch('/api/form-submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    form: typeof block.form === 'object' ? block.form.id : block.form,
                    submissionData: data,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit form')
            }

            setIsSuccess(true)
                ; (e.target as HTMLFormElement).reset()
        } catch (err) {
            setError('Something went wrong. Please try again.')
            console.error('Form submission error:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const variant = block.variant || 'modern'

    // Modern variant - two column layout with contact info
    if (variant === 'modern' && block.showContactInfo) {
        return (
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information Column */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-black text-[#263238] mb-4">
                                    {block.heading || 'Get in Touch'}
                                </h2>
                                <p className="text-lg text-gray-600">
                                    {block.description || 'Have a question? Fill out the form and we\'ll get back to you as soon as possible.'}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {block.officeAddress && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#2196f3] rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#263238] mb-1">Office</h3>
                                            <p className="text-gray-600 whitespace-pre-line">{block.officeAddress}</p>
                                        </div>
                                    </div>
                                )}

                                {block.email && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#7cb342] rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#263238] mb-1">Email</h3>
                                            <a href={`mailto:${block.email}`} className="text-[#2196f3] hover:underline">
                                                {block.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {block.phone && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#ff9800] rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#263238] mb-1">Phone</h3>
                                            <a href={`tel:${block.phone.replace(/\s/g, '')}`} className="text-[#2196f3] hover:underline text-xl font-bold">
                                                {block.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {block.disclaimer && (
                                <p className="text-sm text-gray-500 italic border-l-4 border-gray-300 pl-4">
                                    {block.disclaimer}
                                </p>
                            )}

                            {/* Social Media Links */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="font-bold text-[#263238] mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.facebook.com/theonlineboilercompany/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-[#2196f3] hover:bg-[#1976d2] rounded-lg flex items-center justify-center text-white transition-all transform hover:scale-110"
                                        aria-label="Facebook"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/onlineboilerco"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-[#2196f3] hover:bg-[#1976d2] rounded-lg flex items-center justify-center text-white transition-all transform hover:scale-110"
                                        aria-label="Twitter/X"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/theonlineboilercompany"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-[#2196f3] hover:bg-[#1976d2] rounded-lg flex items-center justify-center text-white transition-all transform hover:scale-110"
                                        aria-label="Instagram"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.tiktok.com/@the.online.boiler"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-[#2196f3] hover:bg-[#1976d2] rounded-lg flex items-center justify-center text-white transition-all transform hover:scale-110"
                                        aria-label="TikTok"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#263238] mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">{block.successMessage || 'Thank you for your message! We\'ll get back to you soon.'}</p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-6 text-[#2196f3] hover:underline font-medium"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {block.form?.fields?.map((field: any, idx: number) => {
                                        const baseInputClasses = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196f3] focus:border-transparent transition-all'

                                        return (
                                            <div key={idx} style={{ width: field.width === 50 ? '48%' : '100%' }} className={field.width === 50 ? 'inline-block' : ''}>
                                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                                                    {field.label} {field.required && '*'}
                                                </label>
                                                {field.blockType === 'text' && (
                                                    <input
                                                        type="text"
                                                        id={field.name}
                                                        name={field.name}
                                                        required={field.required}
                                                        className={baseInputClasses}
                                                        placeholder={field.label}
                                                    />
                                                )}
                                                {field.blockType === 'email' && (
                                                    <input
                                                        type="email"
                                                        id={field.name}
                                                        name={field.name}
                                                        required={field.required}
                                                        className={baseInputClasses}
                                                        placeholder={field.label}
                                                    />
                                                )}
                                                {field.blockType === 'textarea' && (
                                                    <textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        required={field.required}
                                                        rows={6}
                                                        className={`${baseInputClasses} resize-none`}
                                                        placeholder={field.label}
                                                    />
                                                )}
                                            </div>
                                        )
                                    })}

                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#2196f3] hover:bg-[#1976d2] text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            block.submitButtonText || block.form?.submitButtonLabel || 'Send Message'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Classic variant - single column centered
    return (
        <section className="py-16 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-[#263238] mb-4">
                        {block.heading || 'Get in Touch'}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {block.description || 'Have a question? Fill out the form and we\'ll get back to you as soon as possible.'}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-2xl shadow-lg p-8 border border-gray-200">
                    {isSuccess ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-[#263238] mb-2">Message Sent!</h3>
                            <p className="text-gray-600">{block.successMessage || 'Thank you for your message! We\'ll get back to you soon.'}</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="mt-6 text-[#2196f3] hover:underline font-medium"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {block.form?.fields?.map((field: any, idx: number) => {
                                const baseInputClasses = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196f3] focus:border-transparent transition-all bg-white'

                                return (
                                    <div key={idx} style={{ width: field.width === 50 ? '48%' : '100%' }} className={field.width === 50 ? 'inline-block' : ''}>
                                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label} {field.required && '*'}
                                        </label>
                                        {field.blockType === 'text' && (
                                            <input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                required={field.required}
                                                className={baseInputClasses}
                                                placeholder={field.label}
                                            />
                                        )}
                                        {field.blockType === 'email' && (
                                            <input
                                                type="email"
                                                id={field.name}
                                                name={field.name}
                                                required={field.required}
                                                className={baseInputClasses}
                                                placeholder={field.label}
                                            />
                                        )}
                                        {field.blockType === 'textarea' && (
                                            <textarea
                                                id={field.name}
                                                name={field.name}
                                                required={field.required}
                                                rows={6}
                                                className={`${baseInputClasses} resize-none`}
                                                placeholder={field.label}
                                            />
                                        )}
                                    </div>
                                )
                            })}

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#2196f3] hover:bg-[#1976d2] text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    block.submitButtonText || block.form?.submitButtonLabel || 'Send Message'
                                )}
                            </button>

                            {block.disclaimer && (
                                <p className="text-xs text-gray-500 text-center italic">
                                    {block.disclaimer}
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
