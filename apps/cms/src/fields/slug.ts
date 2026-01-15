import type { Field } from 'payload'

/**
 * Reusable slug field with auto-generation from a source field
 */
export function slugField(sourceField: string = 'title'): Field {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'URL-friendly identifier (auto-generated from title)',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          // If slug is provided, use it
          if (value) {
            return slugify(value)
          }
          
          // Otherwise, generate from source field
          const sourceValue = data?.[sourceField]
          if (sourceValue && typeof sourceValue === 'string') {
            return slugify(sourceValue)
          }
          
          return value
        },
      ],
    },
  }
}

/**
 * Convert a string to a URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export default slugField
