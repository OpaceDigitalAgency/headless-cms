// @ts-nocheck
'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { RichText } from '../RichText'

interface HeroFormProps {
    form?: {
        id: string
        title: string
        fields?: any[]
        submitButtonLabel?: string
        confirmationType?: string
        confirmationMessage?: any
        redirect?: { url: string }
    }
}

export function HeroForm({ form }: HeroFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form) return
        setIsSubmitting(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const data: Record<string, any> = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'}/api/form-submissions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    form: form.id,
                    submissionData: data,
                }),
            })

            if (response.ok) {
                setIsSubmitted(true)
                if (form.confirmationType === 'redirect' && form.redirect?.url) {
                    window.location.href = form.redirect.url
                }
            } else {
                throw new Error('Failed to submit form')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderField = (field: any) => {
        const baseInputClasses = 'w-full px-3 py-3 bg-gray-50 border border-gray-100 rounded text-[10px] focus:outline-none focus:border-[#2196f3]'

        switch (field.blockType) {
            case 'text':
                return <input type="text" name={field.name} required={field.required} placeholder={field.label + (field.required ? ' *' : '')} className={baseInputClasses} />
            case 'email':
                return <input type="email" name={field.name} required={field.required} placeholder={field.label + (field.required ? ' *' : '')} className={baseInputClasses} />
            case 'textarea':
                return <textarea name={field.name} required={field.required} placeholder={field.label + (field.required ? ' *' : '')} rows={3} className={baseInputClasses} />
            case 'select':
                return (
                    <select name={field.name} required={field.required} className={`${baseInputClasses} text-gray-400 uppercase`}>
                        <option value="">{field.label}{field.required ? ' *' : ''}</option>
                        {field.options?.map((opt: any, i: number) => <option key={i} value={opt.value}>{opt.label}</option>)}
                    </select>
                )
            default:
                return null
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-white">
            <div className="bg-[#2196f3] p-5 text-center">
                <h2 className="text-white text-base font-black uppercase tracking-widest">
                    {form?.title || 'Free Instant Quote'}
                </h2>
            </div>
            <div className="p-6 space-y-4">
                {isSubmitted ? (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-[#7cb342] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                            <Check className="w-6 h-6 stroke-[4px]" />
                        </div>
                        {form?.confirmationMessage ? (
                            <div className="text-xs font-bold text-gray-600 uppercase tracking-tight leading-relaxed">
                                <RichText content={form.confirmationMessage} />
                            </div>
                        ) : (
                            <p className="text-xs font-bold text-gray-600 uppercase">Thank you for your request! We will be in touch shortly.</p>
                        )}
                    </div>
                ) : (
                    <>
                        {form ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-3">
                                    {form.fields?.map((field, i) => {
                                        // First two fields (Name and Phone) in a 2-column grid
                                        if (i === 0) {
                                            return (
                                                <div key={i} className="grid grid-cols-2 gap-3">
                                                    <div>{renderField(field)}</div>
                                                    {form.fields?.[1] && <div>{renderField(form.fields[1])}</div>}
                                                </div>
                                            )
                                        }
                                        // Skip second field since it's already rendered with first
                                        if (i === 1) return null
                                        // All other fields full width
                                        return <div key={i}>{renderField(field)}</div>
                                    })}
                                </div>
                                {error && <p className="text-[10px] text-red-500 font-bold text-center uppercase">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#7cb342] hover:bg-[#8bc34a] text-white py-4 rounded font-black text-xs uppercase tracking-widest shadow-xl transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : form.submitButtonLabel || 'Send your request'}
                                </button>
                                <p className="text-[10px] text-[#263238] font-bold text-center mt-3">
                                    Our prices can NOT be beaten!
                                </p>
                            </form>
                        ) : (
                            <div className="space-y-4 opacity-50 pointer-events-none">
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="Name *" className="px-3 py-3 bg-gray-50 border border-gray-100 rounded text-[10px]" />
                                    <input type="email" placeholder="Email *" className="px-3 py-3 bg-gray-50 border border-gray-100 rounded text-[10px]" />
                                </div>
                                <input type="text" placeholder="Tel Number *" className="w-full px-3 py-3 bg-gray-50 border border-gray-100 rounded text-[10px]" />
                                <button className="w-full bg-[#7cb342] text-white py-4 rounded font-black text-xs uppercase tracking-widest">
                                    Send your request
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
