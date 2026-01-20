import type { Field } from 'payload'

/**
 * Reusable slug field with auto-generation from a source field
 *
 * @param sourceField - The field to generate the slug from (default: 'title')
 * @param urlPath - Optional URL path to display (e.g., '/blog', '/events')
 */
export function slugField(sourceField: string = 'title', urlPath?: string): Field {
  const description = urlPath
    ? `URL-friendly identifier. Will be published at: ${urlPath}/[slug]`
    : 'URL-friendly identifier (auto-generated from title)'

  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description,
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
