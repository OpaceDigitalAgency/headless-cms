import type { CollectionTemplate } from '../types'

export const serviceTemplate: CollectionTemplate = {
  id: 'service',
  name: 'Services',
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
      blocks: [
        {
          blockType: 'features',
          heading: 'Workshop Outcomes',
          layout: 'grid',
          items: [
            { title: 'Goal Alignment', description: 'Clear objectives agreed by stakeholders.' },
            { title: 'Scope Definition', description: 'Well-scoped deliverables and timeline.' },
            { title: 'Opportunity Map', description: 'Prioritized areas for impact.' },
          ],
        },
        {
          blockType: 'pricing',
          heading: 'Engagement Options',
          plans: [
            {
              name: 'Half-Day',
              price: '£1,200',
              period: 'one-off',
              description: 'Focused alignment session for small teams.',
              features: [{ feature: 'Pre-workshop survey' }, { feature: 'Actionable summary' }],
            },
            {
              name: 'Full-Day',
              price: '£2,200',
              period: 'one-off',
              description: 'Deep dive with facilitation and roadmap.',
              features: [{ feature: 'Stakeholder interviews' }, { feature: 'Roadmap output' }],
              featured: true,
            },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Design Sprint',
      slug: 'design-sprint',
      excerpt: 'Rapid ideation and validation for your next initiative.',
      content: 'A focused sprint to prototype, test, and refine a direction in days, not weeks.',
      blocks: [
        {
          blockType: 'grid',
          heading: 'Sprint Phases',
          style: 'cards',
          columns: '3',
          items: [
            { title: 'Understand', description: 'Problem framing and research review.' },
            { title: 'Prototype', description: 'Rapid prototyping of key flows.' },
            { title: 'Validate', description: 'User testing and synthesis.' },
          ],
        },
        {
          blockType: 'stats',
          heading: 'Typical Sprint',
          stats: [
            { value: '5', label: 'Days' },
            { value: '3', label: 'Concepts' },
            { value: '1', label: 'Prototype' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Implementation Support',
      slug: 'implementation-support',
      excerpt: 'Hands-on delivery with clear milestones and outcomes.',
      content: 'Ongoing support to deliver, launch, and optimize with confidence.',
      blocks: [
        {
          blockType: 'features',
          heading: 'What\'s Included',
          layout: 'list',
          items: [
            { title: 'Delivery Plan', description: 'Milestones and dependency tracking.' },
            { title: 'Weekly Updates', description: 'Transparent progress reporting.' },
            { title: 'Launch Support', description: 'Go-live assistance and QA.' },
          ],
        },
        {
          blockType: 'cta',
          heading: 'Ready to Ship?',
          description: 'Let\'s build the delivery plan together.',
          links: [
            { label: 'Book a Call', url: '/contact', variant: 'primary' },
          ],
          backgroundColor: 'light',
        },
      ],
      status: 'published',
    },
  ],
}

export default serviceTemplate
