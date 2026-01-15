'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'

interface CustomFieldDefinition {
  name: string
  label: string
  type: string
  required?: boolean
  options?: string
}

interface ContentTypeDoc {
  id: string
  name: string
  customFields?: CustomFieldDefinition[]
}

interface CustomDataFieldProps {
  path: string
  label?: string
  data?: Record<string, any>
}

const parseOptions = (options?: string): string[] => {
  if (!options) return []
  return options
    .split('\n')
    .map((opt) => opt.trim())
    .filter(Boolean)
}

export const CustomDataField: React.FC<CustomDataFieldProps> = ({ path, label, data }) => {
  const { value, setValue } = useField<Record<string, any>>({ path })
  const [contentType, setContentType] = useState<ContentTypeDoc | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const formFields = useFormFields(([fields]) => fields)
  const contentTypeId = useMemo(() => {
    const fieldValue = (formFields as any)?.contentType?.value
    return fieldValue || data?.contentType || null
  }, [formFields, data])

  useEffect(() => {
    const fetchContentType = async () => {
      if (!contentTypeId) {
        setContentType(null)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/content-types/${contentTypeId}`)
        if (response.ok) {
          const doc = await response.json()
          setContentType(doc)
        } else {
          setContentType(null)
        }
      } catch {
        setContentType(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContentType()
  }, [contentTypeId])

  const customFields = contentType?.customFields || []
  const currentValue = value && typeof value === 'object' ? value : {}

  const updateField = (fieldName: string, fieldValue: any) => {
    setValue({ ...currentValue, [fieldName]: fieldValue })
  }

  return (
    <div className="custom-data-field">
      <div className="field-type text">
        <label className="field-label">
          {label || 'Custom Fields'}
        </label>
        <div className="field-description">
          Values are based on the selected content type.
        </div>
      </div>

      {!contentTypeId && (
        <div className="field-description">Select a content type to define custom fields.</div>
      )}

      {isLoading && <div className="field-description">Loading custom fields...</div>}

      {!isLoading && contentTypeId && customFields.length === 0 && (
        <div className="field-description">No custom fields defined for this content type.</div>
      )}

      {!isLoading && customFields.length > 0 && (
        <div className="custom-data-field__fields">
          {customFields.map((field) => {
            const fieldValue = currentValue?.[field.name]
            const required = Boolean(field.required)

            switch (field.type) {
              case 'textarea':
                return (
                  <div key={field.name} className="field-type textarea">
                    <label className="field-label">
                      {field.label}{required ? ' *' : ''}
                    </label>
                    <textarea
                      className="field-input"
                      value={fieldValue || ''}
                      onChange={(event) => updateField(field.name, event.target.value)}
                    />
                  </div>
                )
              case 'number':
                return (
                  <div key={field.name} className="field-type number">
                    <label className="field-label">
                      {field.label}{required ? ' *' : ''}
                    </label>
                    <input
                      className="field-input"
                      type="number"
                      value={fieldValue ?? ''}
                      onChange={(event) => {
                        const nextValue = event.target.value === '' ? '' : Number(event.target.value)
                        updateField(field.name, nextValue)
                      }}
                    />
                  </div>
                )
              case 'checkbox':
                return (
                  <div key={field.name} className="field-type checkbox">
                    <label className="field-label">
                      <input
                        type="checkbox"
                        checked={Boolean(fieldValue)}
                        onChange={(event) => updateField(field.name, event.target.checked)}
                      />
                      {field.label}{required ? ' *' : ''}
                    </label>
                  </div>
                )
              case 'date':
                return (
                  <div key={field.name} className="field-type date">
                    <label className="field-label">
                      {field.label}{required ? ' *' : ''}
                    </label>
                    <input
                      className="field-input"
                      type="date"
                      value={fieldValue || ''}
                      onChange={(event) => updateField(field.name, event.target.value)}
                    />
                  </div>
                )
              case 'select':
                return (
                  <div key={field.name} className="field-type select">
                    <label className="field-label">
                      {field.label}{required ? ' *' : ''}
                    </label>
                    <select
                      className="field-input"
                      value={fieldValue || ''}
                      onChange={(event) => updateField(field.name, event.target.value)}
                    >
                      <option value="">Select...</option>
                      {parseOptions(field.options).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              default:
                return (
                  <div key={field.name} className="field-type text">
                    <label className="field-label">
                      {field.label}{required ? ' *' : ''}
                    </label>
                    <input
                      className="field-input"
                      type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
                      value={fieldValue || ''}
                      onChange={(event) => updateField(field.name, event.target.value)}
                    />
                  </div>
                )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default CustomDataField
