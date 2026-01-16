import type { Payload } from 'payload'
import { createRichText, createRichTextParagraphs } from './base'

const TINY_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+4x8UAAAAASUVORK5CYII='

async function getOrCreateMedia(payload: Payload, filename: string, alt: string) {
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    where: { filename: { equals: filename } },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  const buffer = Buffer.from(TINY_PNG_BASE64, 'base64')
  return payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: 'image/png',
      name: filename,
      size: buffer.length,
    },
  })
}

async function getOrCreateShowcaseForm(payload: Payload) {
  const existing = await payload.find({
    collection: 'forms',
    limit: 1,
    where: { title: { equals: 'Showcase Form' } },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  return payload.create({
    collection: 'forms',
    data: {
      title: 'Showcase Form',
      fields: [
        {
          blockType: 'text',
          name: 'fullName',
          label: 'Full Name',
          required: true,
        },
        {
          blockType: 'email',
          name: 'email',
          label: 'Email Address',
          required: true,
        },
        {
          blockType: 'textarea',
          name: 'message',
          label: 'Message',
        },
      ],
      submitButtonLabel: 'Send Message',
      confirmationType: 'message',
      confirmationMessage: createRichText('Thanks! This is a demo form submission response.'),
    },
  })
}

async function ensureHeaderLink(payload: Payload) {
  const header = await payload.findGlobal({ slug: 'header' })
  const navItems = Array.isArray(header?.navItems) ? header.navItems : []
  const hasShowcase = navItems.some((item: any) => item?.link?.url === '/blocks-showcase')

  if (hasShowcase) return

  await payload.updateGlobal({
    slug: 'header',
    data: {
      ...header,
      navItems: [
        { link: { type: 'custom', label: 'Blocks Showcase', url: '/blocks-showcase' } },
        ...navItems,
      ],
    },
  })
}

export async function ensureShowcasePage(payload: Payload, options?: { updateHeader?: boolean }) {
  const heroImage = await getOrCreateMedia(payload, 'showcase-hero.png', 'Showcase hero image')
  const mediaImage = await getOrCreateMedia(payload, 'showcase-media.png', 'Showcase media image')
  const galleryImage = await getOrCreateMedia(payload, 'showcase-gallery.png', 'Showcase gallery image')
  const logoImage = await getOrCreateMedia(payload, 'showcase-logo.png', 'Showcase logo image')
  const avatarImage = await getOrCreateMedia(payload, 'showcase-avatar.png', 'Showcase avatar image')
  const showcaseForm = await getOrCreateShowcaseForm(payload)

  const pageData = {
    title: 'Blocks Showcase',
    slug: 'blocks-showcase',
    template: 'showcase',
    _status: 'published',
    hero: {
      type: 'standard',
      heading: 'Blocks Showcase',
      subheading: 'Every block type in one mega demo page',
      image: heroImage.id,
      overlay: 'dark',
      textAlign: 'center',
      links: [
        {
          label: 'Primary Action',
          url: '/contact',
          variant: 'primary',
        },
      ],
    },
    content: [
      {
        blockType: 'content',
        backgroundColor: 'light',
        paddingTop: 'medium',
        paddingBottom: 'medium',
        columns: [
          {
            size: 'full',
            richText: createRichTextParagraphs([
              'This page showcases every block type available in the CMS.',
              'Content is intentionally generic to show layout and styling.',
            ]),
          },
        ],
      },
      {
        blockType: 'media',
        media: mediaImage.id,
        caption: 'Media block with caption',
        size: 'default',
        position: 'center',
      },
      {
        blockType: 'cta',
        style: 'banner',
        heading: 'Call to Action Banner',
        description: 'A short description to prompt action.',
        image: mediaImage.id,
        links: [
          {
            label: 'Get Started',
            url: '/get-started',
            variant: 'primary',
          },
        ],
        backgroundColor: 'primary',
      },
      {
        blockType: 'quote',
        quote: 'Design is how it works.',
        author: 'Steve Jobs',
        role: 'Co-founder, Apple',
        align: 'center',
      },
      {
        blockType: 'features',
        heading: 'Feature Highlights',
        subheading: 'Quick summaries of the most important benefits.',
        layout: 'grid',
        items: [
          { title: 'Fast Setup', description: 'Spin up a new site in minutes.', icon: '⚡' },
          { title: 'Flexible', description: 'Add or remove blocks as needed.', icon: '🧩' },
          { title: 'Scalable', description: 'Designed for growth and performance.', icon: '📈' },
        ],
      },
      {
        blockType: 'stats',
        heading: 'Key Stats',
        subheading: 'Proof points for your business.',
        stats: [
          { value: '120%', label: 'Growth', description: 'Year over year increase' },
          { value: '25k', label: 'Users', description: 'Monthly active users' },
          { value: '4.9/5', label: 'Rating', description: 'Average satisfaction score' },
          { value: '72h', label: 'Onboarding', description: 'Average setup time' },
        ],
      },
      {
        blockType: 'logoCloud',
        heading: 'Trusted By',
        logos: [
          { logo: logoImage.id, label: 'Brand One', url: 'https://example.com' },
          { logo: logoImage.id, label: 'Brand Two', url: 'https://example.com' },
          { logo: logoImage.id, label: 'Brand Three', url: 'https://example.com' },
        ],
      },
      {
        blockType: 'testimonials',
        heading: 'What People Say',
        items: [
          {
            quote: 'This CMS saved us weeks of development time.',
            name: 'Alex Rivera',
            role: 'Product Lead',
            company: 'Northwind',
            avatar: avatarImage.id,
            rating: 5,
          },
          {
            quote: 'Flexible blocks made it easy to build custom pages.',
            name: 'Jamie Lee',
            role: 'Marketing Manager',
            company: 'Fabrikam',
            avatar: avatarImage.id,
            rating: 4,
          },
        ],
      },
      {
        blockType: 'faq',
        heading: 'Frequently Asked Questions',
        items: [
          {
            question: 'Can I customize these blocks?',
            answer: createRichText('Yes, every block can be extended or styled as needed.'),
          },
          {
            question: 'Do I need to know code to edit content?',
            answer: createRichText('No, the admin UI is built for editors.'),
          },
        ],
      },
      {
        blockType: 'pricing',
        heading: 'Pricing Plans',
        subheading: 'Pick the plan that fits your needs.',
        plans: [
          {
            name: 'Starter',
            price: '$19',
            period: 'month',
            description: 'For small teams testing ideas.',
            features: [{ feature: 'Basic blocks' }, { feature: 'Email support' }],
            ctaLabel: 'Choose Starter',
            ctaUrl: '/signup',
          },
          {
            name: 'Pro',
            price: '$59',
            period: 'month',
            description: 'For growing teams.',
            features: [{ feature: 'All blocks' }, { feature: 'Priority support' }],
            ctaLabel: 'Choose Pro',
            ctaUrl: '/signup',
            featured: true,
          },
        ],
      },
      {
        blockType: 'team',
        heading: 'Meet the Team',
        members: [
          {
            name: 'Morgan Chen',
            role: 'Creative Director',
            bio: 'Leads the design and brand experience.',
            photo: avatarImage.id,
            socials: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
          },
          {
            name: 'Priya Singh',
            role: 'Engineering Lead',
            bio: 'Owns architecture and performance.',
            photo: avatarImage.id,
            socials: [{ label: 'GitHub', url: 'https://github.com' }],
          },
        ],
      },
      {
        blockType: 'embed',
        heading: 'Embedded Media',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Embedded video example',
        aspectRatio: '16:9',
      },
      {
        blockType: 'grid',
        heading: 'Grid Showcase',
        description: 'Cards and feature layouts in a flexible grid.',
        style: 'cards',
        columns: '3',
        gap: 'medium',
        alignment: 'left',
        items: [
          { title: 'Card One', description: 'Short description for card one.' },
          { title: 'Card Two', description: 'Short description for card two.' },
          { title: 'Card Three', description: 'Short description for card three.' },
        ],
        showBorder: true,
        showShadow: true,
        hoverEffect: 'lift',
      },
      {
        blockType: 'timeline',
        heading: 'Timeline Example',
        description: 'A simple timeline of milestones.',
        layout: 'vertical',
        lineStyle: 'solid',
        markerStyle: 'circle',
        events: [
          {
            date: '2021',
            title: 'Project Kickoff',
            description: createRichText('Initial planning and discovery.'),
          },
          {
            date: '2022',
            title: 'First Release',
            description: createRichText('Core features shipped to production.'),
          },
          {
            date: '2023',
            title: 'Scale Up',
            description: createRichText('Expanded team and feature set.'),
          },
        ],
        showConnectors: true,
        showDates: true,
        animateOnScroll: false,
        sortOrder: 'chronological',
      },
      {
        blockType: 'gallery',
        heading: 'Gallery',
        description: 'A grid of sample images.',
        layout: 'grid',
        columns: '3',
        gap: 'medium',
        aspectRatio: 'landscape',
        images: [
          { image: galleryImage.id, caption: 'Sample Image 1' },
          { image: galleryImage.id, caption: 'Sample Image 2' },
          { image: galleryImage.id, caption: 'Sample Image 3' },
        ],
        showCaptions: true,
        enableLightbox: false,
      },
      {
        blockType: 'archive',
        heading: 'Latest Posts',
        description: 'Auto-populated archive block.',
        populateBy: 'collection',
        relationTo: 'posts',
        limit: 3,
        layout: 'grid',
        columns: '3',
        showImage: true,
        showExcerpt: true,
        showDate: true,
        showAuthor: false,
        link: { show: true, label: 'View All Posts', url: '/blog' },
      },
      {
        blockType: 'form',
        form: showcaseForm.id,
        enableIntro: true,
        introContent: createRichText('Fill out the demo form below to see layout styling.'),
        style: 'card',
        backgroundColor: 'light',
      },
      {
        blockType: 'spacer',
        style: 'divider',
        size: 'lg',
        lineStyle: 'dashed',
      },
      {
        blockType: 'html',
        html: '<div style="padding:16px;border:1px dashed #cbd5f5;border-radius:12px;">Custom HTML block output for advanced layouts.</div>',
      },
    ],
  }

  const existingPage = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: 'blocks-showcase' } },
  })

  if (existingPage.docs[0]) {
    const updated = await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      data: pageData,
    })
    if (options?.updateHeader) {
      await ensureHeaderLink(payload)
    }
    return updated
  }

  const created = await payload.create({
    collection: 'pages',
    data: pageData,
  })

  if (options?.updateHeader) {
    await ensureHeaderLink(payload)
  }

  return created
}
