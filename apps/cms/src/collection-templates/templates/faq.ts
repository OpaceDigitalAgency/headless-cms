import type { CollectionTemplate } from '../types'

export const faqTemplate: CollectionTemplate = {
  id: 'faq',
  name: 'FAQs',
  description: 'Frequently asked questions for reuse across pages.',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'faqs',
  defaultSingular: 'FAQ',
  defaultPlural: 'FAQs',
  adminGroup: 'Collections',
  status: 'available',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,
  contentTypeTemplate: {
    template: 'archive-item',
    icon: 'archive',
    hasArchive: true,
    archiveSlug: 'faqs',
  },
  seedItems: [
    {
      title: 'How do I get started?',
      slug: 'how-do-i-get-started',
      excerpt: 'Simple steps to begin using the platform.',
      content: 'Create your first content type, seed example data, and publish your first page.',
      blocks: [
        {
          blockType: 'grid',
          heading: 'Quick Start Checklist',
          style: 'cards',
          columns: '3',
          items: [
            { title: 'Create', description: 'Add a collection from templates.' },
            { title: 'Seed', description: 'Generate sample content.' },
            { title: 'Publish', description: 'Make your first page live.' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Can I customize fields?',
      slug: 'can-i-customize-fields',
      excerpt: 'Extend content types with custom fields.',
      content: 'Yes. Add fields in Content Types to match your content model.',
      blocks: [
        {
          blockType: 'features',
          heading: 'Custom Field Ideas',
          variant: 'grid',
          items: [
            { heading: 'Metadata', description: 'Add ratings, dates, and tags.' },
            { heading: 'Relationships', description: 'Connect items and collections.' },
            { heading: 'Layout Blocks', description: 'Build rich page sections.' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'How do I manage visibility?',
      slug: 'how-do-i-manage-visibility',
      excerpt: 'Control what appears in navigation.',
      content: 'Use Navigation Settings to show or hide collections.',
      blocks: [
        {
          blockType: 'stats',
          heading: 'Navigation Controls',
          stats: [
            { value: '3', label: 'Menus' },
            { value: '1', label: 'Toggle' },
            { value: 'Global', label: 'Scope' },
          ],
        },
      ],
      status: 'published',
    },
  ],
}

export default faqTemplate
