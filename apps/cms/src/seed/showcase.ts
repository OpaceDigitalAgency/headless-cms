import type { Payload } from 'payload'
import { createRichText, createRichTextParagraphs } from './base'

// Unsplash images for showcase - free to use with proper attribution
const SHOWCASE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=80',
  media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
  gallery1: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
  gallery2: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
  gallery3: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&q=80',
  logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop&q=80',
  avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
  avatar2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
  postImage1: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop&q=80',
  postImage2: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop&q=80',
  postImage3: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop&q=80',
}

const TINY_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+4x8UAAAAASUVORK5CYII='

async function getOrCreateMedia(payload: Payload, filename: string, alt: string, unsplashUrl?: string) {
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    where: { filename: { equals: filename } },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  // If Unsplash URL provided, use external URL (Payload supports this)
  if (unsplashUrl) {
    return payload.create({
      collection: 'media',
      data: {
        alt,
        url: unsplashUrl,
      },
    })
  }

  // Fallback to tiny placeholder
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
  const hasShowcase = navItems.some((item: any) => item?.url === '/blocks-showcase')

  if (hasShowcase) return

  await payload.updateGlobal({
    slug: 'header',
    data: {
      ...header,
      navItems: [
        { label: 'Blocks Showcase', type: 'link', url: '/blocks-showcase' },
        ...navItems,
      ],
    },
  })
}

async function ensureSamplePosts(payload: Payload) {
  // Create sample posts for the Archive block to display
  const posts = [
    {
      title: 'Getting Started with Headless CMS',
      slug: 'getting-started-headless-cms',
      excerpt: 'Learn the fundamentals of headless CMS architecture and why it matters for modern web development.',
      imageKey: 'postImage1' as const,
    },
    {
      title: 'Building Scalable Content Models',
      slug: 'building-scalable-content-models',
      excerpt: 'Best practices for designing flexible and maintainable content structures that grow with your needs.',
      imageKey: 'postImage2' as const,
    },
    {
      title: 'Optimising Performance with Static Generation',
      slug: 'optimising-performance-static-generation',
      excerpt: 'Discover how static site generation can dramatically improve your site speed and user experience.',
      imageKey: 'postImage3' as const,
    },
  ]

  for (const post of posts) {
    const existing = await payload.find({
      collection: 'posts',
      limit: 1,
      where: { slug: { equals: post.slug } },
    })

    if (existing.docs[0]) continue

    const featuredImage = await getOrCreateMedia(
      payload,
      `showcase-post-${post.imageKey}.webp`,
      post.title,
      SHOWCASE_IMAGES[post.imageKey]
    )

    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: createRichTextParagraphs([
          post.excerpt,
          'This is sample content for the showcase page. In a real application, this would contain the full article content.',
        ]),
        featuredImage: featuredImage.id,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
  }
}

export async function ensureShowcasePage(payload: Payload, options?: { updateHeader?: boolean }) {
  // Create sample posts first so Archive block has content to display
  await ensureSamplePosts(payload)

  const heroImage = await getOrCreateMedia(payload, 'showcase-hero.webp', 'Stunning business team collaboration', SHOWCASE_IMAGES.hero)
  const mediaImage = await getOrCreateMedia(payload, 'showcase-media.webp', 'Modern workspace with analytics', SHOWCASE_IMAGES.media)
  const galleryImage1 = await getOrCreateMedia(payload, 'showcase-gallery-1.webp', 'Team collaboration', SHOWCASE_IMAGES.gallery1)
  const galleryImage2 = await getOrCreateMedia(payload, 'showcase-gallery-2.webp', 'Creative workspace', SHOWCASE_IMAGES.gallery2)
  const galleryImage3 = await getOrCreateMedia(payload, 'showcase-gallery-3.webp', 'Business meeting', SHOWCASE_IMAGES.gallery3)
  const logoImage = await getOrCreateMedia(payload, 'showcase-logo.webp', 'Company logo', SHOWCASE_IMAGES.logo)
  const avatar1Image = await getOrCreateMedia(payload, 'showcase-avatar-1.webp', 'Alex Rivera', SHOWCASE_IMAGES.avatar1)
  const avatar2Image = await getOrCreateMedia(payload, 'showcase-avatar-2.webp', 'Jamie Lee', SHOWCASE_IMAGES.avatar2)
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
        blockType: 'hero',
        heading: 'Hero Block Example',
        subheading: 'This is a reusable hero block that can be added anywhere in your content',
        image: mediaImage.id,
        overlay: 'dark',
        textAlign: 'center',
        type: 'standard',
        links: [
          {
            label: 'Learn More',
            url: '/about',
            variant: 'primary',
          },
        ],
      },
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
            avatar: avatar1Image.id,
            rating: 5,
          },
          {
            quote: 'Flexible blocks made it easy to build custom pages.',
            name: 'Jamie Lee',
            role: 'Marketing Manager',
            company: 'Fabrikam',
            avatar: avatar2Image.id,
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
            photo: avatar1Image.id,
            socials: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
          },
          {
            name: 'Priya Singh',
            role: 'Engineering Lead',
            bio: 'Owns architecture and performance.',
            photo: avatar2Image.id,
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
          { image: galleryImage1.id, caption: 'Team Collaboration' },
          { image: galleryImage2.id, caption: 'Creative Workspace' },
          { image: galleryImage3.id, caption: 'Business Meeting' },
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
        lineStyle: 'solid',
      },
      {
        blockType: 'html',
        html: `<div style="max-width: 800px; margin: 0 auto; padding: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; color: white; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 16px 0; font-size: 28px; font-weight: bold;">Custom HTML Block</h3>
          <p style="margin: 0; font-size: 18px; opacity: 0.95;">This demonstrates advanced custom layouts with inline styles. Perfect for unique design requirements or third-party integrations.</p>
        </div>`,
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
