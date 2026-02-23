/**
 * Shared Fields for Collection Templates
 * 
 * These field definitions are reused across all collection templates
 * to ensure consistency and reduce duplication.
 */

import type { Field, Block } from 'payload'
import { slugField } from '../fields/slug'

// Import all blocks for content sections
import { heroBlock } from '../blocks/Hero'
import { contentBlock } from '../blocks/Content'
import { mediaBlock } from '../blocks/Media'
import { ctaBlock } from '../blocks/CallToAction'
import { archiveBlock } from '../blocks/Archive'
import { formBlock } from '../blocks/Form'
import { galleryBlock } from '../blocks/Gallery'
import { gridBlock } from '../blocks/Grid'
import { timelineBlock } from '../blocks/Timeline'

/**
 * All available content blocks
 */
export const allBlocks: Block[] = [
  heroBlock,
  contentBlock,
  mediaBlock,
  ctaBlock,
  archiveBlock,
  formBlock,
  galleryBlock,
  gridBlock,
  timelineBlock,
]

/**
 * Title field - used by all content types
 */
export const titleField = (label: string = 'Title'): Field => ({
  name: 'title',
  type: 'text',
  required: true,
  label,
})

/**
 * Name field - used by people/places
 */
export const nameField = (label: string = 'Name'): Field => ({
  name: 'name',
  type: 'text',
  required: true,
  label,
})

/**
 * Slug field - exported from fields/slug
 */
export { slugField }

/**
 * Featured image field
 */
export const featuredImageField: Field = {
  name: 'featuredImage',
  type: 'upload',
  relationTo: 'media',
  label: 'Featured Image',
}

/**
 * Excerpt/summary field
 */
export const excerptField = (label: string = 'Excerpt'): Field => ({
  name: 'excerpt',
  type: 'textarea',
  label,
  admin: {
    description: 'Brief summary for listings and SEO',
  },
})

/**
 * Rich text content field
 */
export const richContentField = (label: string = 'Content'): Field => ({
  name: 'richContent',
  type: 'richText',
  label,
})

/**
 * Content blocks field - allows flexible page building
 */
export const contentBlocksField: Field = {
  name: 'contentBlocks',
  type: 'blocks',
  label: 'Content Sections',
  blocks: allBlocks,
  admin: {
    description: 'Add and arrange content sections',
  },
}

/**
 * Categories relationship field
 */
export const categoriesField: Field = {
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true,
  label: 'Categories',
  admin: {
    description: 'Select one or more categories',
  },
}

/**
 * Tags array field
 */
export const tagsField: Field = {
  name: 'tags',
  type: 'relationship',
  relationTo: 'tags',
  hasMany: true,
  label: 'Tags',
  admin: {
    description: 'Add tags for filtering and search',
  },
}

/**
 * Published date field
 */
export const publishedAtField: Field = {
  name: 'publishedAt',
  type: 'date',
  label: 'Published Date',
  admin: {
    position: 'sidebar',
    date: {
      pickerAppearance: 'dayAndTime',
    },
  },
  hooks: {
    beforeChange: [
      ({ siblingData, value }) => {
        if (siblingData._status === 'published' && !value) {
          return new Date().toISOString()
        }
        return value
      },
    ],
  },
}

/**
 * Featured checkbox field
 */
export const featuredField: Field = {
  name: 'featured',
  type: 'checkbox',
  label: 'Featured',
  admin: {
    position: 'sidebar',
    description: 'Show in featured sections',
  },
}

/**
 * Template selector field
 */
export const templateField = (options: { label: string; value: string }[]): Field => ({
  name: 'template',
  type: 'select',
  required: true,
  defaultValue: options[0]?.value || 'default',
  options,
  admin: {
    position: 'sidebar',
    description: 'Select the display template',
  },
})

/**
 * Author/creator relationship field
 */
export const authorField: Field = {
  name: 'author',
  type: 'relationship',
  relationTo: 'users',
  label: 'Author',
  admin: {
    position: 'sidebar',
  },
  defaultValue: ({ user }) => user?.id,
}

/**
 * Media gallery field
 */
export const mediaGalleryField: Field = {
  name: 'gallery',
  type: 'array',
  label: 'Media Gallery',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

/**
 * Standard content tabs structure
 */
export const createContentTabs = (
  mainFields: Field[],
  metaFields: Field[] = [],
  additionalTabs: { label: string; fields: Field[] }[] = []
): Field => ({
  type: 'tabs',
  tabs: [
    {
      label: 'Content',
      fields: mainFields,
    },
    {
      label: 'Meta',
      fields: [
        categoriesField,
        tagsField,
        ...metaFields,
      ],
    },
    ...additionalTabs,
  ],
})

/**
 * Standard version configuration
 */
export const standardVersions = {
  drafts: {
    autosave: {
      interval: 300, // 5 minutes
    },
    schedulePublish: true,
  },
  maxPerDoc: 25,
}

/**
 * Standard access control
 */
export const standardAccess = {
  read: ({ req: { user } }: any) => {
    if (!user) {
      return { _status: { equals: 'published' } }
    }
    return true
  },
  create: ({ req: { user } }: any) => Boolean(user),
  update: ({ req: { user } }: any) => Boolean(user),
  delete: ({ req: { user } }: any) => user?.role === 'admin',
}

/**
 * Create revalidation hook
 */
export const createRevalidationHook = (collectionSlug: string) => ({
  afterChange: [
    async ({ doc, req }: any) => {
      if (doc._status === 'published') {
        const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        try {
          await fetch(`${revalidateUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: process.env.REVALIDATION_SECRET,
              collection: collectionSlug,
              slug: doc.slug,
            }),
          })
          req.payload.logger.info(`Revalidated ${collectionSlug}: ${doc.slug}`)
        } catch (error) {
          req.payload.logger.error(`Failed to revalidate ${collectionSlug}: ${doc.slug}`)
        }
      }
      return doc
    },
  ],
})
