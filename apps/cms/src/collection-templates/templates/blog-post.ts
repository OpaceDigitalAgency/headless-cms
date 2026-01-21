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
  seedItems: [
    {
      title: 'Standard Article with Hero',
      slug: 'standard-article-with-hero',
      excerpt: 'Classic single-column layout with hero image, rich text content, and call-to-action.',
      status: 'published',
    },
    {
      title: 'Feature Story with Grid Layout',
      slug: 'feature-story-with-grid-layout',
      excerpt: 'Multi-column layout showcasing grid blocks, image galleries, and featured content sections.',
      status: 'published',
    },
    {
      title: 'In-Depth Guide with FAQ Section',
      slug: 'in-depth-guide-with-faq-section',
      excerpt: 'Comprehensive article with table of contents, multiple sections, and FAQ block for common questions.',
      status: 'published',
    },
    {
      title: 'Case Study with Timeline',
      slug: 'case-study-with-timeline',
      excerpt: 'Narrative-driven post with timeline block showing project progression and key milestones.',
      status: 'published',
    },
    {
      title: 'News Brief with Media Gallery',
      slug: 'news-brief-with-media-gallery',
      excerpt: 'Concise update with embedded media gallery, multiple images, and quick-reference callouts.',
      status: 'published',
    },
  ],

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            titleField('Post Title'),
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
      ],
    },
    slugField('title', '/blog'),
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
