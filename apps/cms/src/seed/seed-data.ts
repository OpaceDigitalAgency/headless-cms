// @ts-nocheck
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
                'We are dedicated to preserving and sharing cultural heritage through our archive collection.',
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
          backgroundColor: 'muted',
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
          variant: 'banner',
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
          backgroundColor: 'accent',
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
            { heading: 'Fast Setup', description: 'Spin up a new site in minutes.', icon: '⚡' },
            { heading: 'Flexible', description: 'Add or remove blocks as needed.', icon: '🧩' },
            { heading: 'Scalable', description: 'Designed for growth and performance.', icon: '📈' },
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
            { heading: 'Card One', description: 'Short description for card one.' },
            { heading: 'Card Two', description: 'Short description for card two.' },
            { heading: 'Card Three', description: 'Short description for card three.' },
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
              heading: 'Project Kickoff',
              description: createRichText('Initial planning and discovery.'),
            },
            {
              date: '2022',
              heading: 'First Release',
              description: createRichText('Core features shipped to production.'),
            },
            {
              date: '2023',
              heading: 'Scale Up',
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
          backgroundColor: 'muted',
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
      excerpt: 'An introduction to our archive blog where we share stories and insights.',
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

  // ===========================================================
  // Events
  // ===========================================================
  await payload.create({
    collection: 'events',
    data: {
      title: 'Annual Collection Showcase',
      slug: 'annual-collection-showcase',
      excerpt: 'An evening celebrating our finest archive acquisitions of the year, with guided tours and expert talks.',
      _status: 'published',
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Main Gallery, Ground Floor',
      eventType: 'exhibition',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'events',
    data: {
      title: 'Renaissance Masters Workshop',
      slug: 'renaissance-masters-workshop',
      excerpt: 'A hands-on workshop exploring techniques used by the great Renaissance painters and sculptors.',
      _status: 'published',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Education Studio, Level 2',
      eventType: 'workshop',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'events',
    data: {
      title: 'Photography & Archives — Public Talk',
      slug: 'photography-archives-public-talk',
      excerpt: 'Join our chief archivist for a fascinating talk on the role of photography in preserving cultural heritage.',
      _status: 'published',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Lecture Theatre',
      eventType: 'talk',
    },
  }).catch(() => null)

  // ===========================================================
  // Locations
  // ===========================================================
  await payload.create({
    collection: 'locations',
    data: {
      name: 'Main Museum',
      slug: 'main-museum',
      address: '1 Museum Square, London, EC1A 1AA',
      description: 'Our flagship location housing the permanent collection and rotating exhibitions.',
      _status: 'published',
      coordinates: { latitude: 51.5189, longitude: -0.0985 },
      phone: '+44 20 1234 5678',
      email: 'info@museumcollection.org',
      openingHours: 'Mon–Sat 10:00–17:00, Sun 12:00–16:00',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'locations',
    data: {
      name: 'North Wing Gallery',
      slug: 'north-wing-gallery',
      address: '3 Gallery Road, Manchester, M1 2AB',
      description: 'Specialist gallery dedicated to Northern England\'s industrial and cultural heritage.',
      _status: 'published',
      coordinates: { latitude: 53.4808, longitude: -2.2426 },
      phone: '+44 161 234 5678',
      email: 'manchester@museumcollection.org',
      openingHours: 'Tue–Sun 10:00–17:00',
    },
  }).catch(() => null)

  // ===========================================================
  // FAQs
  // ===========================================================
  await payload.create({
    collection: 'faqs',
    data: {
      question: 'Is admission to the museum free?',
      answer: createRichText('Yes — general admission is entirely free. We do charge for special exhibitions and ticketed events. Donations are always welcome and help us keep our collections accessible to everyone.'),
      category: 'Visiting',
      _status: 'published',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'faqs',
    data: {
      question: 'How do I book a group or school visit?',
      answer: createRichText('Group and school bookings can be made by contacting our education team at least two weeks in advance. We offer tailored programmes for all ages and curriculum stages. Email education@museumcollection.org with your requirements.'),
      category: 'Visiting',
      _status: 'published',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'faqs',
    data: {
      question: 'Can I donate objects or photographs to the archive?',
      answer: createRichText('We welcome donations of objects and photographs relevant to our collection areas. Please contact our curatorial team first to discuss suitability. We assess all donations individually and can arrange an appraisal appointment.'),
      category: 'Collections',
      _status: 'published',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'faqs',
    data: {
      question: 'Are your facilities accessible for visitors with disabilities?',
      answer: createRichText('Yes — all public areas are fully accessible. We have step-free entrances, lifts to all floors, induction loops for visitors with hearing impairments, and large-print guides available on request. Please contact us in advance to arrange any specific assistance.'),
      category: 'Accessibility',
      _status: 'published',
    },
  }).catch(() => null)

  // ===========================================================
  // Testimonials
  // ===========================================================
  await payload.create({
    collection: 'testimonials',
    data: {
      quote: 'The collection is breathtaking. I spent four hours here and felt like I had only scratched the surface. A truly world-class institution.',
      author: 'Margaret Fitzwilliam',
      role: 'Retired Art Historian',
      company: 'University of Edinburgh',
      rating: 5,
      _status: 'published',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'testimonials',
    data: {
      quote: 'Our school group had an absolutely wonderful visit. The education team went above and beyond to engage the students. We\'ll definitely be back.',
      author: 'James Okafor',
      role: 'Head of History',
      company: 'Riverside Academy',
      rating: 5,
      _status: 'published',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'testimonials',
    data: {
      quote: 'As someone researching local heritage, the archive access was invaluable. The staff were incredibly knowledgeable and went out of their way to help.',
      author: 'Dr. Sophie Chen',
      role: 'Cultural Heritage Researcher',
      company: 'Freelance',
      rating: 5,
      _status: 'published',
    },
  }).catch(() => null)

  // ===========================================================
  // Logo Clouds
  // ===========================================================
  await payload.create({
    collection: 'logo-clouds',
    data: {
      name: 'Partner Institutions',
      description: 'Our network of partner museums, galleries, and cultural organisations.',
      _status: 'published',
      logos: [
        { label: 'The National Gallery', url: 'https://www.nationalgallery.org.uk' },
        { label: 'The British Museum', url: 'https://www.britishmuseum.org' },
        { label: 'Tate Modern', url: 'https://www.tate.org.uk' },
        { label: 'The V&A', url: 'https://www.vam.ac.uk' },
        { label: 'Science Museum', url: 'https://www.sciencemuseum.org.uk' },
      ],
    },
  }).catch(() => null)

  await payload.create({
    collection: 'logo-clouds',
    data: {
      name: 'Funding & Support',
      description: 'Organisations that generously support our work.',
      _status: 'published',
      logos: [
        { label: 'Arts Council England', url: 'https://www.artscouncil.org.uk' },
        { label: 'Heritage Lottery Fund', url: 'https://www.heritagefund.org.uk' },
        { label: 'The Wolfson Foundation', url: 'https://www.wolfson.org.uk' },
      ],
    },
  }).catch(() => null)

  // ===========================================================
  // Global Blocks
  // ===========================================================
  await payload.create({
    collection: 'global-blocks',
    data: {
      name: 'Site-Wide Newsletter CTA',
      slug: 'newsletter-cta',
      description: 'Reusable newsletter sign-up block used across all content pages.',
      _status: 'published',
      content: [
        {
          blockType: 'cta',
          variant: 'banner',
          heading: 'Stay Connected to Culture',
          description: 'Join our mailing list for exhibition previews, event invitations, and archive stories — delivered straight to your inbox.',
          backgroundColor: 'accent',
          links: [
            { label: 'Sign Up Free', url: '/newsletter', variant: 'primary' },
          ],
        },
      ],
    },
  }).catch(() => null)

  await payload.create({
    collection: 'global-blocks',
    data: {
      name: 'Visit Information Banner',
      slug: 'visit-info-banner',
      description: 'Standard visitor information bar — opening hours, location, free admission message.',
      _status: 'published',
      content: [
        {
          blockType: 'content',
          backgroundColor: 'muted',
          paddingTop: 'small',
          paddingBottom: 'small',
          columns: [
            {
              size: 'full',
              richText: createRichText('📍 Open Mon–Sat 10:00–17:00 · Free Admission · 1 Museum Square, London · Tel: +44 20 1234 5678'),
            },
          ],
        },
      ],
    },
  }).catch(() => null)

  // ===========================================================
  // Block Library — TRC-inspired reusable blocks
  // ===========================================================

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'Hero — Full Width with Overlay',
      blockType: 'hero',
      description: 'Full-width hero banner with dark overlay, headline, subheading, and dual CTA buttons. Based on the TRC high-impact landing pattern. Use for homepages and major landing pages.',
      blockData: {
        type: 'standard',
        heading: 'Discover Our World-Class Archive Collection',
        subheading: 'Explore thousands of items spanning art, science, and history — free and open to all.',
        style: 'fullWidth',
        overlay: 'dark',
        textAlign: 'center',
        links: [
          { label: 'Explore the Collection', url: '/archive-items', variant: 'primary' },
          { label: 'Plan Your Visit', url: '/visit', variant: 'secondary' },
        ],
        checkItems: [
          { text: 'Free Admission' },
          { text: 'Open 6 Days a Week' },
          { text: 'Guided Tours Available' },
          { text: 'Expert Curated Content' },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'Trust Bar — Key Credentials',
      blockType: 'features',
      description: 'Horizontal trust strip with 4 key trust signals — icons and short bold text. Based on TRC Trust Bar pattern. Place immediately below the hero section for maximum impact.',
      blockData: {
        variant: 'default',
        layout: 'horizontal',
        heading: '',
        items: [
          { heading: 'Established 1887', description: 'Over 135 years of cultural preservation', icon: '🏛️' },
          { heading: '500,000+ Items', description: 'One of the UK\'s largest archives', icon: '📚' },
          { heading: 'Free Entry', description: 'Always free, always open to all', icon: '✅' },
          { heading: 'Award-Winning', description: 'Museum of the Year finalist', icon: '🏆' },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: '10 Reasons to Visit',
      blockType: 'features',
      description: 'Dark numbered grid with 10 reasons/benefits. Directly inspired by TRC\'s "10 Reasons" block (variant: trc-v1-10-reasons). Works well as a mid-page trust-builder.',
      blockData: {
        variant: 'trc-v1-10-reasons',
        layout: 'grid',
        heading: '10 Reasons to Explore Our Collection',
        subheading: 'From world-first discoveries to hands-on learning — there\'s something extraordinary for everyone.',
        items: [
          { heading: 'World-class permanent collection', description: 'Pieces spanning 5,000 years of human creativity.', icon: '🌍' },
          { heading: 'Free admission — always', description: 'No entry fee, ever. We believe culture belongs to everyone.', icon: '🎟️' },
          { heading: 'Rotating special exhibitions', description: 'Fresh perspectives every season from leading artists and institutions.', icon: '🔄' },
          { heading: 'Expert guided tours', description: 'Join a curator-led tour and hear the stories behind the objects.', icon: '🎓' },
          { heading: 'Family-friendly programming', description: 'Workshops and trails designed for curious minds of all ages.', icon: '👨‍👩‍👧' },
          { heading: 'Research archive access', description: 'Academic and public access to our full research archive.', icon: '🔬' },
          { heading: 'Award-winning café', description: 'Locally sourced menus in our stunning atrium café.', icon: '☕' },
          { heading: 'Fully accessible', description: 'Step-free access, hearing loops, and large-print guides throughout.', icon: '♿' },
          { heading: 'Central London location', description: 'Five minutes from the nearest tube, with on-site parking.', icon: '📍' },
          { heading: 'Events year-round', description: 'Talks, workshops, and evening events throughout the year.', icon: '📅' },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'Testimonials — Verified Reviews Carousel',
      blockType: 'testimonials',
      description: 'Testimonials carousel with star ratings and verified badges. Based on TRC testimonials-cards pattern (3-column layout with high-trust visual style). Use on homepage and landing pages.',
      blockData: {
        variant: 'trc-v1-cards',
        heading: 'What Our Visitors Say',
        subheading: 'Thousands of people visit us every year. Here\'s what they think.',
        items: [
          {
            quote: 'The collection is breathtaking. I spent four hours here and felt like I had only scratched the surface.',
            name: 'Margaret Fitzwilliam',
            role: 'Art Historian',
            company: 'University of Edinburgh',
            rating: 5,
          },
          {
            quote: 'Our school group had an absolutely wonderful visit. The education team went above and beyond.',
            name: 'James Okafor',
            role: 'Head of History',
            company: 'Riverside Academy',
            rating: 5,
          },
          {
            quote: 'As a researcher, the archive access was invaluable. Staff went out of their way to help.',
            name: 'Dr. Sophie Chen',
            role: 'Cultural Heritage Researcher',
            company: 'Freelance',
            rating: 5,
          },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'CTA — Primary Banner',
      blockType: 'cta',
      description: 'Full-width CTA banner with accent background, heading, short description, and primary action button. Based on TRC conversion-focused CTA pattern. Use between content sections.',
      blockData: {
        variant: 'banner',
        heading: 'Ready to Explore?',
        description: 'Plan your visit today. Free admission, expert guidance, and extraordinary collections await.',
        backgroundColor: 'accent',
        links: [
          { label: 'Plan Your Visit', url: '/visit', variant: 'primary' },
          { label: 'Browse Online', url: '/archive-items', variant: 'secondary' },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'Process Steps — How It Works',
      blockType: 'features',
      description: 'Numbered process steps block showing a simple 4-step workflow. Based on TRC Simple Process pattern (variant: trc-v1-process). Ideal for onboarding flows or visit guides.',
      blockData: {
        variant: 'trc-v1-process',
        layout: 'horizontal',
        heading: 'How to Make the Most of Your Visit',
        items: [
          { heading: 'Plan Ahead', description: 'Check our current exhibitions and book any ticketed events in advance.', icon: '📋' },
          { heading: 'Arrive & Explore', description: 'Pick up your free map at reception or join a guided tour.', icon: '🗺️' },
          { heading: 'Dig Deeper', description: 'Use our interactive kiosks and digital guides to learn more about any object.', icon: '🔍' },
          { heading: 'Take It Home', description: 'Visit our shop, download our app, or access the archive online.', icon: '📱' },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'Stats Row — Key Numbers',
      blockType: 'stats',
      description: 'Four headline statistics with labels and descriptions. Based on TRC stats pattern. Use to establish authority and scale at a glance. Works well directly below the hero or trust bar.',
      blockData: {
        heading: 'Our Collection in Numbers',
        stats: [
          { value: '500k+', label: 'Archive Items', description: 'Objects, photographs, and documents' },
          { value: '135+', label: 'Years of History', description: 'Collecting and preserving since 1887' },
          { value: '250k', label: 'Annual Visitors', description: 'From across the UK and beyond' },
          { value: '4.9★', label: 'Visitor Rating', description: 'Based on 12,000+ reviews' },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'Gallery — Photo Grid',
      blockType: 'gallery',
      description: 'Responsive 3-column image gallery with lightbox and optional captions. Based on TRC "Before/After" gallery pattern. Ideal for showcasing artworks, spaces, or events.',
      blockData: {
        heading: 'From Our Collection',
        description: 'A selection of highlights from our permanent and rotating exhibitions.',
        layout: 'grid',
        columns: '3',
        gap: 'medium',
        aspectRatio: 'landscape',
        images: [
          { caption: 'Exhibition Gallery, Level 1' },
          { caption: 'The Reading Room Archive' },
          { caption: 'Sculpture Court' },
          { caption: 'Interactive Discovery Zone' },
          { caption: 'The Conservation Studio' },
          { caption: 'Special Collections Vault' },
        ],
        showCaptions: true,
        enableLightbox: true,
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'FAQ Section — Visitor Questions',
      blockType: 'faq',
      description: 'Accordion FAQ block with common visitor questions. Use on About, Visit, and Contact pages. Edit questions and answers directly via the block data.',
      blockData: {
        heading: 'Frequently Asked Questions',
        subheading: 'Everything you need to know before your visit.',
        items: [
          {
            question: 'Is admission to the museum free?',
            answer: createRichText('Yes — general admission is entirely free. We do charge for special exhibitions and ticketed events. Donations are always welcome.'),
          },
          {
            question: 'What are your opening hours?',
            answer: createRichText('We are open Monday to Saturday, 10:00am to 5:00pm, and Sundays from 12:00pm to 4:00pm. We are closed on Christmas Day and Boxing Day.'),
          },
          {
            question: 'Is the museum accessible for visitors with disabilities?',
            answer: createRichText('All public areas are fully accessible, with step-free entrances, lifts to all floors, induction loops, and large-print guides on request.'),
          },
          {
            question: 'Can I photography the exhibits?',
            answer: createRichText('Personal, non-commercial photography is permitted in most areas. Flash photography and tripods are not allowed. Some temporary exhibitions may have photography restrictions.'),
          },
        ],
      },
    },
  }).catch(() => null)

  await payload.create({
    collection: 'block-library',
    data: {
      name: 'Team Section — Meet the Curators',
      blockType: 'team',
      description: 'Team member cards with name, role, bio, and optional social links. Based on TRC Team pattern. Use on About Us pages and staff listings.',
      blockData: {
        heading: 'Meet Our Team',
        subheading: 'The people behind the collection — passionate curators, researchers, and educators.',
        members: [
          {
            name: 'Dr Eleanor Shaw',
            role: 'Chief Curator',
            bio: 'Eleanor has led our curatorial programme for over 12 years, specialising in early modern European art and material culture.',
            socials: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
          },
          {
            name: 'Marcus Reid',
            role: 'Head of Digital Archive',
            bio: 'Marcus oversees our digitisation programme, making over 200,000 items freely accessible online.',
            socials: [{ label: 'Twitter', url: 'https://twitter.com' }],
          },
          {
            name: 'Priya Kapoor',
            role: 'Learning & Engagement Manager',
            bio: 'Priya designs our award-winning education programmes, reaching 25,000 school pupils annually.',
            socials: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
          },
        ],
      },
    },
  }).catch(() => null)

  // ===========================================================
  // Archive Items — additional samples
  // ===========================================================
  await payload.create({
    collection: 'archive-items',
    data: {
      title: 'The Codex Florentinus — Facsimile Edition',
      slug: 'codex-florentinus-facsimile',
      excerpt: 'A high-resolution facsimile of the 15th-century illuminated manuscript, documenting Florentine civic life.',
      _status: 'published',
      itemType: 'document',
      date: '1487',
      origin: 'Florence, Italy',
      condition: 'Excellent',
    },
  }).catch(() => null)

  await payload.create({
    collection: 'archive-items',
    data: {
      title: 'Victorian Era Daguerreotype Portrait',
      slug: 'victorian-daguerreotype-portrait',
      excerpt: 'An unusually well-preserved daguerreotype portrait from circa 1855, depicting an unidentified family.',
      _status: 'published',
      itemType: 'photograph',
      date: 'c.1855',
      origin: 'London, England',
      condition: 'Good',
    },
  }).catch(() => null)

  // Update header global
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logo: {
        text: 'Archive Collection',
      },
      navItems: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'Blocks Showcase', url: '/blocks-showcase' } },
        { link: { type: 'custom', label: 'Archive Items', url: '/archive-items' } },
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
