import type { CollectionTemplate } from '../types'

export const serviceTemplate: CollectionTemplate = {
  id: 'service',
  name: 'Service',
  description: 'Repeatable service offerings with rich content and metadata.',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'services',
  defaultSingular: 'Service',
  defaultPlural: 'Services',
  adminGroup: 'Collections',
  status: 'available',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,
  contentTypeTemplate: {
    template: 'archive-item',
    icon: 'archive',
    hasArchive: true,
    archiveSlug: 'services',
  },
  seedItems: [
    {
      title: 'Discovery Workshop',
      slug: 'discovery-workshop',
      excerpt: 'A structured session to align on goals, scope, and opportunities.',
      content: 'A collaborative workshop to clarify objectives, define scope, and prioritize outcomes.',
      status: 'published',
    },
    {
      title: 'Design Sprint',
      slug: 'design-sprint',
      excerpt: 'Rapid ideation and validation for your next initiative.',
      content: 'A focused sprint to prototype, test, and refine a direction in days, not weeks.',
      status: 'published',
    },
    {
      title: 'Implementation Support',
      slug: 'implementation-support',
      excerpt: 'Hands-on delivery with clear milestones and outcomes.',
      content: 'Ongoing support to deliver, launch, and optimize with confidence.',
      status: 'published',
    },
  ],
}

export default serviceTemplate
