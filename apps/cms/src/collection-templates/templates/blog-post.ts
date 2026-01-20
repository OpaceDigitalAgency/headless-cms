/**
 * Blog Post Collection Template
 * 
 * A standard blog post template with rich content,
 * categories, tags, and flexible content blocks.
 */

import type { CollectionTemplate } from '../types'
import {
  titleField,
  slugField,
  featuredImageField,
  excerptField,
  contentBlocksField,
  categoriesField,
  tagsField,
  authorField,
  publishedAtField,
  featuredField,
  templateField,
  seoTabFields,
  richContentField,
} from '../shared-fields'

export const blogPostTemplate: CollectionTemplate = {
  id: 'blog-post',
  name: 'Blog Post',
  description: 'Articles, news, and blog content with rich text and flexible sections',
  category: 'content',
  icon: 'edit',
  defaultSlug: 'posts',
  defaultSingular: 'Post',
  defaultPlural: 'Posts',
  adminGroup: 'Content',
  status: 'core', // Posts are a core collection
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 5,
  
  fields: [
    titleField('Post Title'),
    slugField('title', '/blog'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            featuredImageField,
            excerptField('Excerpt'),
            richContentField('Main Content'),
            contentBlocksField,
          ],
        },
        {
          label: 'Meta',
          fields: [
            categoriesField,
            tagsField,
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              label: 'Related Posts',
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: seoTabFields,
        },
      ],
    },
    authorField,
    publishedAtField,
    featuredField,
    templateField([
      { label: 'Standard Article', value: 'article' },
      { label: 'Feature Story', value: 'feature' },
      { label: 'News Brief', value: 'brief' },
    ]),
  ],
}

export default blogPostTemplate
