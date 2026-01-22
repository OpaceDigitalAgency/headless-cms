import { RenderBlocks } from '@repo/ui'

const blocks = [
  {
    blockType: 'hero',
    type: 'fullscreen',
    variant: 'agency',
    eyebrow: 'DIGITAL EXCELLENCE',
    overlay: 'none',
    textAlign: 'left',
    heading: 'We build premium digital experiences',
    subheading: 'Brand, web, and content systems for ambitious teams.',
    links: [
      { label: 'Book a call →', url: '/contact', variant: 'primary' },
      { label: 'View work →', url: '/work', variant: 'outline' },
    ],
  },
  {
    blockType: 'grid',
    heading: 'Built for scale',
    description: 'Capabilities',
    columns: '3',
    style: 'agency-cards',
    items: [
      {
        stat: '01',
        title: 'Brand Strategy',
        description: 'Positioning, messaging, and visual identity systems that cut through the noise.',
      },
      {
        stat: '02',
        title: 'Web Design & Build',
        description: 'Custom sites built for performance, conversion, and lasting impact.',
      },
      {
        stat: '03',
        title: 'Content Systems',
        description: 'Scalable frameworks that empower your team to publish with confidence.',
      },
    ],
  },
  {
    blockType: 'grid',
    heading: 'Case Studies',
    description: 'Portfolio',
    columns: '1',
    style: 'agency-list',
    items: [
      {
        stat: '01',
        title: 'Apex Health',
        description: 'Replatformed healthcare site with improved accessibility and 40% faster load times.',
      },
      {
        stat: '02',
        title: 'Nova Labs',
        description: 'Product launch campaign that generated 10K signups in the first week.',
      },
      {
        stat: '03',
        title: 'Harbor Co',
        description: 'Ecommerce redesign that increased conversion rate by 35%.',
      },
    ],
  },
  {
    blockType: 'testimonials',
    heading: 'Proven Results',
    style: 'agency',
    items: [
      {
        quote: 'We doubled qualified leads in 60 days.',
        name: 'Maya Singh',
        role: 'CMO',
        company: 'Apex Health',
        rating: 5,
      },
      {
        quote: 'Stunning work, flawless delivery.',
        name: 'Alex Rowe',
        role: 'Founder',
        company: 'Nova Labs',
        rating: 5,
      },
      {
        quote: 'The best partner we have ever worked with.',
        name: 'Jordan Lee',
        role: 'VP of Marketing',
        company: 'Harbor Co',
        rating: 5,
      },
    ],
  },
  {
    blockType: 'cta',
    heading: 'Ready to grow with a partner you can trust?',
    description: 'Let’s build something remarkable together.',
    style: 'agency',
    links: [
      { label: 'Let’s talk →', url: '/contact', variant: 'primary' },
    ],
  },
]

export default function AgencyPage() {
  return (
    <RenderBlocks blocks={blocks} />
  )
}
