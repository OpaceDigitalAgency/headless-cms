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
      status: 'published',
    },
    {
      title: 'Can I customize fields?',
      slug: 'can-i-customize-fields',
      excerpt: 'Extend content types with custom fields.',
      content: 'Yes. Add fields in Content Types to match your content model.',
      status: 'published',
    },
    {
      title: 'How do I manage visibility?',
      slug: 'how-do-i-manage-visibility',
      excerpt: 'Control what appears in navigation.',
      content: 'Use Navigation Settings to show or hide collections.',
      status: 'published',
    },
  ],
}

export default faqTemplate
