'use client'

import { useState } from 'react'
import { RichText } from '../RichText'

interface FormBlockProps {
  block: {
    form?: {
      id: string
      title: string
      fields?: any[]
      submitButtonLabel?: string
      confirmationType?: string
      confirmationMessage?: any
      redirect?: { url: string }
    }
    enableIntro?: boolean
    introContent?: any
    style?: string
    backgroundColor?: string
  }
}

export function FormBlock({ block }: FormBlockProps) {
  const {
    form,
    enableIntro,
    introContent,
    style = 'default',
    backgroundColor = 'none',
  } = block

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!form) {
    return null
  }

  const bgClasses = {
    none: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, any> = {}
    
    formData.forEach((value, key) => {
      data[key] = value
    })

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    const baseInputClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
    
    switch (field.blockType) {
      case 'text':
        return (
          <input
            type="text"
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        )
      case 'email':
        return (
          <input
            type="email"
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        )
      case 'textarea':
        return (
          <textarea
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            rows={4}
            className={baseInputClasses}
          />
        )
      case 'select':
        return (
          <select
            name={field.name}
            required={field.required}
            className={baseInputClasses}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option: any, index: number) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'checkbox':
        return (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field.name}
              required={field.required}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">{field.label}</span>
          </label>
        )
      default:
        return null
    }
  }

  const styleClasses = {
    default: '',
    card: 'card p-8',
    inline: 'flex flex-wrap gap-4 items-end',
    fullWidth: '',
  }

  return (
    <section className={`${bgClasses[backgroundColor as keyof typeof bgClasses]} py-16`}>
      <div className="container">
        {enableIntro && introContent && (
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <RichText content={introContent} />
          </div>
        )}

        <div className={`mx-auto max-w-xl ${styleClasses[style as keyof typeof styleClasses]}`}>
          {isSubmitted ? (
            <div className="rounded-lg bg-green-50 p-6 text-center text-green-800">
              {form.confirmationMessage ? (
                <RichText content={form.confirmationMessage} />
              ) : (
                <p>Thank you for your submission!</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {form.fields?.map((field: any, index: number) => (
                <div key={index}>
                  {field.blockType !== 'checkbox' && field.label && (
                    <label className="mb-2 block text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500"> *</span>}
                    </label>
                  )}
                  {renderField(field)}
                </div>
              ))}

              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
