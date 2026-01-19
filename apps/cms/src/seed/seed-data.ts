import type { Payload } from 'payload'
import { createRichText, createRichTextParagraphs } from './base'

/**
 * Lightweight seed function for use by the admin reset button
 * Creates basic sample data without downloading external images
 */
export async function seedBasicData(payload: Payload): Promise<void> {
  payload.logger.info('Starting basic data seed...')

  const tinyPngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+4x8UAAAAASUVORK5CYII='
  const tinyPngBuffer = Buffer.from(tinyPngBase64, 'base64')

  const createSeedMedia = async (name: string, alt: string) => {
    return payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: tinyPngBuffer,
        mimetype: 'image/png',
        name: `${name}.png`,
        size: tinyPngBuffer.length,
      },
    })
  }

  const heroImage = await createSeedMedia('showcase-hero', 'Showcase hero image')
  const mediaImage = await createSeedMedia('showcase-media', 'Showcase media image')
  const galleryImage = await createSeedMedia('showcase-gallery', 'Showcase gallery image')
  const logoImage = await createSeedMedia('showcase-logo', 'Showcase logo image')
  const avatarImage = await createSeedMedia('showcase-avatar', 'Showcase avatar image')

  // Create categories
  const techCategory = await payload.create({
    collection: 'categories',
    data: {
      name: 'Technology',
      slug: 'technology',
      description: 'Technology and digital innovation',
    },
  })

  const artCategory = await payload.create({
    collection: 'categories',
    data: {
      name: 'Art & Culture',
      slug: 'art-culture',
      description: 'Art, culture, and creative expression',
    },
  })

  const showcaseForm = await payload.create({
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

  // Create sample pages
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      template: 'home',
      _status: 'published',
      content: [
        {
          blockType: 'hero',
          heading: 'Welcome to the Museum',
          subheading: 'Discover our collection of archive items, people, and places',
          style: 'fullWidth',
        },
        {
          blockType: 'content',
          backgroundColor: 'none',
          paddingTop: 'medium',
          paddingBottom: 'medium',
          columns: [
            {
              size: 'full',
              richText: createRichText(
                'Explore our extensive collection of archive items and learn about the people and places that shaped history.',
              ),
            },
          ],
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'About Us',
      slug: 'about',
      template: 'detail',
      _status: 'published',
      content: [
        {
          blockType: 'content',
          backgroundColor: 'none',
          paddingTop: 'medium',
          paddingBottom: 'medium',
          columns: [
            {
              size: 'full',
              richText: createRichText(
                'We are dedicated to preserving and sharing cultural heritage through our museum collection.',
              ),
            },
          ],
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Blocks Showcase',
      slug: 'blocks-showcase',
      template: 'showcase',
      _status: 'published',
      content: [
        {
          blockType: 'hero',
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
    },
  })

  // Create a sample dynamic content type
  const customType = await payload.create({
    collection: 'content-types',
    data: {
      name: 'Classic Cars',
      slug: 'classic-cars',
      singularLabel: 'Classic Car',
      pluralLabel: 'Classic Cars',
      icon: 'car',
      template: 'archive-item',
      hasArchive: true,
      archiveSlug: 'items/classic-cars',
      customFields: [
        { name: 'year', label: 'Year', type: 'number', required: true },
        { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
        { name: 'engine', label: 'Engine', type: 'text', required: false },
      ],
      seedData: {
        hasSeedData: true,
        sampleCount: 2,
      },
    },
  })

  await payload.create({
    collection: 'custom-items',
    data: {
      title: '1967 Ford Mustang',
      slug: '1967-ford-mustang',
      excerpt: 'An American muscle car icon with classic styling.',
      contentType: customType.id,
      status: 'published',
      customData: {
        year: 1967,
        manufacturer: 'Ford',
        engine: 'V8',
      },
    },
  })

  // Create sample blog post
  await payload.create({
    collection: 'posts',
    data: {
      title: 'Welcome to Our Blog',
      slug: 'welcome-to-our-blog',
      excerpt: 'An introduction to our museum blog where we share stories and insights.',
      _status: 'published',
      categories: [techCategory.id],
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'Welcome to our blog! Here we will share stories about our collection, upcoming exhibitions, and insights into the world of art and history.' }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  })



  // Create sample person
  await payload.create({
    collection: 'people',
    data: {
      name: 'Leonardo da Vinci',
      slug: 'leonardo-da-vinci',
      shortBio: 'Italian Renaissance polymath known for his art, science, and inventions.',
      _status: 'published',
      birthDate: '1452-04-15',
      deathDate: '1519-05-02',
      nationality: 'Italian',
      roles: [{ role: 'Artist' }, { role: 'Inventor' }, { role: 'Scientist' }],
    },
  })

  // Create sample place
  await payload.create({
    collection: 'places',
    data: {
      name: 'Florence, Italy',
      slug: 'florence-italy',
      shortDescription: 'The birthplace of the Renaissance, home to countless masterpieces.',
      _status: 'published',
      locationType: 'city',
      coordinates: {
        latitude: 43.7696,
        longitude: 11.2558,
      },
      country: 'Italy',
      region: 'Tuscany',
    },
  })

  // Create sample museum collection
  await payload.create({
    collection: 'museum-collections',
    data: {
      name: 'Renaissance Masters',
      slug: 'renaissance-masters',
      description: 'A collection featuring works from the greatest artists of the Renaissance period.',
      _status: 'published',
    },
  })

  // Update header global
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logo: {
        text: 'Museum Collection',
      },
      navItems: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'Blocks Showcase', url: '/blocks-showcase' } },
        { link: { type: 'custom', label: 'Archive Items', url: '/items' } },
        { link: { type: 'custom', label: 'People', url: '/people' } },
        { link: { type: 'custom', label: 'Places', url: '/places' } },
        { link: { type: 'custom', label: 'Collections', url: '/collections' } },
        { link: { type: 'custom', label: 'Blog', url: '/blog' } },
      ],
    },
  })

  // Update footer global
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: `© ${new Date().getFullYear()} Museum Collection. All rights reserved.`,
      columns: [
        {
          label: 'Explore',
          navItems: [
            { link: { type: 'custom', label: 'Archive Items', url: '/items' } },
            { link: { type: 'custom', label: 'People', url: '/people' } },
            { link: { type: 'custom', label: 'Places', url: '/places' } },
          ],
        },
        {
          label: 'About',
          navItems: [
            { link: { type: 'custom', label: 'About Us', url: '/about' } },
            { link: { type: 'custom', label: 'Contact', url: '/contact' } },
          ],
        },
      ],
    },
  })

  // Update settings global
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      siteName: 'Museum Collection',
      siteDescription: 'Explore our collection of archive items, people, and places.',
    },
  })

  payload.logger.info('Basic data seed completed!')
}
