/**
 * Museum Preset Seeder
 * 
 * Seeds sample data for the museum-next preset.
 * Creates artifacts, people, places, and collections suitable for a museum/archive site.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'

export class MuseumSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'museum-next'
  }

  getCollections(): string[] {
    return ['pages', 'posts', 'categories', 'artifacts', 'people', 'places', 'museum-collections', 'content-types', 'custom-items']
  }

  async seed(): Promise<void> {
    this.log('Starting museum seed...')

    // Seed in dependency order
    const categories = await this.seedCategories()
    const places = await this.seedPlaces()
    const people = await this.seedPeople(places)
    const collections = await this.seedMuseumCollections()
    await this.seedArtifacts(people, places, collections)
    await this.seedPages()
    await this.seedPosts(categories)

    await this.seedCustomContentType({
      name: 'Exhibitions',
      slug: 'exhibitions',
      singularLabel: 'Exhibition',
      pluralLabel: 'Exhibitions',
      icon: 'event',
      template: 'archive-item',
      customFields: [
        { name: 'startDate', label: 'Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'End Date', type: 'date', required: false },
        { name: 'location', label: 'Location', type: 'text', required: true },
      ],
      items: [
        {
          title: 'Renaissance Wonders',
          slug: 'renaissance-wonders',
          excerpt: 'A curated exhibition of Renaissance masterpieces.',
          customData: { startDate: '2024-06-01', endDate: '2024-09-30', location: 'Main Gallery' },
        },
      ],
    })

    await this.seedGlobals()

    this.log('Museum seed completed!')
  }

  async clear(): Promise<void> {
    this.log('Clearing museum data...')
    
    // Clear in reverse dependency order
    await this.clearCollection('posts')
    await this.clearCollection('pages')
    await this.clearCollection('artifacts')
    await this.clearCollection('museum-collections')
    await this.clearCollection('people')
    await this.clearCollection('places')
    await this.clearCollection('custom-items')
    await this.clearCollection('content-types')
    await this.clearCollection('categories')
    
    this.log('Museum data cleared!')
  }

  private async seedCategories(): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('categories')) {
      return {}
    }

    this.log('Seeding categories...')
    
    const categoryData = [
      { name: 'Exhibitions', slug: 'exhibitions', description: 'Current and upcoming exhibitions' },
      { name: 'Research', slug: 'research', description: 'Academic research and discoveries' },
      { name: 'Events', slug: 'events', description: 'Museum events and programs' },
    ]

    const categories: Record<string, string> = {}
    
    for (const data of categoryData) {
      const category = await this.create('categories', {
        title: data.name,
        slug: data.slug,
        description: data.description,
      })
      categories[data.slug] = category.id
    }

    return categories
  }

  private async seedPlaces(): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('places')) {
      return {}
    }

    this.log('Seeding places...')

    const placesData = [
      {
        name: 'Florence, Italy',
        slug: 'florence-italy',
        description: 'The birthplace of the Renaissance, home to countless masterpieces.',
        country: 'Italy',
        placeType: 'city',
        location: [11.2558, 43.7696],
      },
      {
        name: 'Rome, Italy',
        slug: 'rome-italy',
        description: 'The Eternal City, center of the Roman Empire and the Catholic Church.',
        country: 'Italy',
        placeType: 'city',
        location: [12.4964, 41.9028],
      },
      {
        name: 'Paris, France',
        slug: 'paris-france',
        description: 'The City of Light, a global center for art, fashion, and culture.',
        country: 'France',
        placeType: 'city',
        location: [2.3522, 48.8566],
      },
      {
        name: 'Athens, Greece',
        slug: 'athens-greece',
        description: 'The cradle of Western civilization and birthplace of democracy.',
        country: 'Greece',
        placeType: 'city',
        location: [23.7275, 37.9838],
      },
      {
        name: 'Cairo, Egypt',
        slug: 'cairo-egypt',
        description: 'Gateway to the ancient wonders of Egypt and the pyramids.',
        country: 'Egypt',
        placeType: 'city',
        location: [31.2357, 30.0444],
      },
    ]

    const places: Record<string, string> = {}
    
    for (const data of placesData.slice(0, this.getItemCount('places', 5))) {
      const place = await this.create('places', {
        name: data.name,
        slug: data.slug,
        description: createRichText(data.description),
        country: data.country,
        placeType: data.placeType,
        location: data.location,
        _status: 'published',
      })
      places[data.slug] = place.id
    }

    return places
  }

  private async seedPeople(places: Record<string, string>): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('people')) {
      return {}
    }

    this.log('Seeding people...')

    const peopleData = [
      {
        name: 'Leonardo da Vinci',
        slug: 'leonardo-da-vinci',
        shortBio: 'Italian Renaissance polymath known for his art, science, and inventions.',
        birthDate: '1452',
        deathDate: '1519',
        nationality: 'Italian',
        birthPlace: 'florence-italy',
        role: ['artist', 'sculptor', 'architect', 'scholar'],
      },
      {
        name: 'Michelangelo Buonarroti',
        slug: 'michelangelo-buonarroti',
        shortBio: 'Italian sculptor, painter, architect, and poet of the High Renaissance.',
        birthDate: '1475',
        deathDate: '1564',
        nationality: 'Italian',
        birthPlace: 'florence-italy',
        role: ['artist', 'sculptor', 'architect'],
      },
      {
        name: 'Raphael Sanzio',
        slug: 'raphael-sanzio',
        shortBio: 'Italian painter and architect of the High Renaissance.',
        birthDate: '1483',
        deathDate: '1520',
        nationality: 'Italian',
        birthPlace: 'rome-italy',
        role: ['artist', 'architect'],
      },
      {
        name: 'Claude Monet',
        slug: 'claude-monet',
        shortBio: 'French painter and founder of Impressionism.',
        birthDate: '1840',
        deathDate: '1926',
        nationality: 'French',
        birthPlace: 'paris-france',
        role: ['artist'],
      },
      {
        name: 'Phidias',
        slug: 'phidias',
        shortBio: 'Ancient Greek sculptor, painter, and architect.',
        birthDate: '480 BCE',
        deathDate: '430 BCE',
        nationality: 'Greek',
        birthPlace: 'athens-greece',
        role: ['sculptor', 'architect'],
      },
    ]

    const people: Record<string, string> = {}
    
    for (const data of peopleData.slice(0, this.getItemCount('people', 5))) {
      const person = await this.create('people', {
        name: data.name,
        slug: data.slug,
        shortBio: data.shortBio,
        birthDate: data.birthDate,
        deathDate: data.deathDate,
        nationality: data.nationality,
        birthPlace: places[data.birthPlace] || null,
        role: data.role,
        _status: 'published',
      })
      people[data.slug] = person.id
    }

    return people
  }

  private async seedMuseumCollections(): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('museum-collections')) {
      return {}
    }

    this.log('Seeding museum collections...')

    const collectionsData = [
      {
        title: 'Renaissance Masters',
        slug: 'renaissance-masters',
        description: 'A collection featuring works from the greatest artists of the Renaissance period.',
        shortDescription: 'Masterpieces from the Renaissance era.',
      },
      {
        title: 'Ancient Civilizations',
        slug: 'ancient-civilizations',
        description: 'Artifacts from ancient Greece, Rome, Egypt, and Mesopotamia.',
        shortDescription: 'Treasures from the ancient world.',
      },
      {
        title: 'Impressionist Gallery',
        slug: 'impressionist-gallery',
        description: 'Works from the Impressionist movement that revolutionized art.',
        shortDescription: 'Light, color, and movement captured on canvas.',
      },
    ]

    const collections: Record<string, string> = {}
    
    for (const data of collectionsData) {
      const collection = await this.create('museum-collections', {
        title: data.title,
        slug: data.slug,
        description: createRichText(data.description),
        shortDescription: data.shortDescription,
        _status: 'published',
      })
      collections[data.slug] = collection.id
    }

    return collections
  }

  private async seedArtifacts(
    people: Record<string, string>,
    places: Record<string, string>,
    collections: Record<string, string>
  ): Promise<void> {
    if (!this.shouldSeedCollection('artifacts')) {
      return
    }

    this.log('Seeding artifacts...')

    const artifactsData = [
      {
        title: 'Mona Lisa',
        slug: 'mona-lisa',
        description: 'The most famous portrait in the world, painted by Leonardo da Vinci.',
        dateCreated: '1503-1519',
        people: ['leonardo-da-vinci'],
        places: ['florence-italy'],
        collections: ['renaissance-masters'],
        materials: ['Oil paint', 'Poplar wood panel'],
        dimensions: { height: 77, width: 53, depth: 0 },
      },
      {
        title: 'David',
        slug: 'david-sculpture',
        description: 'A masterpiece of Renaissance sculpture created by Michelangelo.',
        dateCreated: '1501-1504',
        people: ['michelangelo-buonarroti'],
        places: ['florence-italy'],
        collections: ['renaissance-masters'],
        materials: ['Marble'],
        dimensions: { height: 517, width: 199, depth: 0 },
      },
      {
        title: 'The School of Athens',
        slug: 'school-of-athens',
        description: 'A fresco by Raphael depicting the greatest philosophers of antiquity.',
        dateCreated: '1509-1511',
        people: ['raphael-sanzio'],
        places: ['rome-italy'],
        collections: ['renaissance-masters'],
        materials: ['Fresco'],
        dimensions: { height: 500, width: 770, depth: 0 },
      },
      {
        title: 'Water Lilies',
        slug: 'water-lilies',
        description: 'A series of approximately 250 oil paintings by Claude Monet.',
        dateCreated: '1896-1926',
        people: ['claude-monet'],
        places: ['paris-france'],
        collections: ['impressionist-gallery'],
        materials: ['Oil paint', 'Canvas'],
        dimensions: { height: 200, width: 425, depth: 0 },
      },
      {
        title: 'Athena Parthenos',
        slug: 'athena-parthenos',
        description: 'A massive chryselephantine sculpture of the goddess Athena.',
        dateCreated: '447-438 BCE',
        people: ['phidias'],
        places: ['athens-greece'],
        collections: ['ancient-civilizations'],
        materials: ['Gold', 'Ivory', 'Wood'],
        dimensions: { height: 1200, width: 0, depth: 0 },
      },
    ]

    for (const data of artifactsData.slice(0, this.getItemCount('artifacts', 10))) {
      await this.create('artifacts', {
        title: data.title,
        slug: data.slug,
        description: createRichText(data.description),
        dateCreated: data.dateCreated,
        people: data.people.map(slug => people[slug]).filter(Boolean),
        places: data.places.map(slug => places[slug]).filter(Boolean),
        collections: data.collections.map(slug => collections[slug]).filter(Boolean),
        materials: data.materials.map(material => ({ material })),
        dimensions: data.dimensions,
        _status: 'published',
        featured: true,
      })
    }
  }

  private async seedPages(): Promise<void> {
    if (!this.shouldSeedCollection('pages')) {
      return
    }

    this.log('Seeding pages...')

    const tinyPngBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+4x8UAAAAASUVORK5CYII='
    const tinyPngBuffer = Buffer.from(tinyPngBase64, 'base64')

    const createSeedMedia = async (name: string, alt: string) => {
      const doc = await this.payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: tinyPngBuffer,
          mimetype: 'image/png',
          name: `${name}.png`,
          size: tinyPngBuffer.length,
        },
      })
      this.trackId('media', doc.id)
      return doc
    }

    const heroImage = await createSeedMedia('showcase-hero', 'Showcase hero image')
    const mediaImage = await createSeedMedia('showcase-media', 'Showcase media image')
    const galleryImage = await createSeedMedia('showcase-gallery', 'Showcase gallery image')
    const logoImage = await createSeedMedia('showcase-logo', 'Showcase logo image')
    const avatarImage = await createSeedMedia('showcase-avatar', 'Showcase avatar image')

    const showcaseForm = await this.payload.create({
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
    this.trackId('forms', showcaseForm.id)

    // Home page
    await this.create('pages', {
      title: 'Home',
      slug: 'home',
      template: 'home',
      _status: 'published',
      hero: {
        type: 'fullscreen',
        heading: 'Discover Our Collection',
        subheading: 'Explore thousands of artifacts, artworks, and historical treasures from around the world.',
      },
      content: [
        {
          blockType: 'grid',
          heading: 'Featured Collections',
          style: 'cards',
          columns: '3',
          items: [
            { title: 'Renaissance Masters', description: 'Masterpieces from the Renaissance era' },
            { title: 'Ancient Civilizations', description: 'Treasures from the ancient world' },
            { title: 'Impressionist Gallery', description: 'Light and color captured on canvas' },
          ],
        },
        {
          blockType: 'archive',
          heading: 'Featured Artifacts',
          collection: 'artifacts',
          limit: 6,
          showFeaturedImage: true,
        },
      ],
    })

    // About page
    await this.create('pages', {
      title: 'About the Museum',
      slug: 'about',
      template: 'detail',
      _status: 'published',
      hero: {
        type: 'standard',
        heading: 'About Us',
        subheading: 'Preserving and sharing cultural heritage for future generations.',
      },
      content: [
        {
          blockType: 'content',
          columns: 'oneColumn',
          content: createRichTextParagraphs([
            'Our museum is dedicated to preserving and sharing the world\'s cultural heritage.',
            'With collections spanning thousands of years and multiple continents, we offer visitors a unique journey through human history and creativity.',
            'Our mission is to inspire curiosity, foster learning, and connect people with the stories of our shared past.',
          ]),
        },
        {
          blockType: 'timeline',
          heading: 'Our History',
          layout: 'vertical',
          events: [
            { date: '1850', title: 'Foundation', description: createRichText('The museum was founded by a group of passionate collectors.') },
            { date: '1920', title: 'Major Expansion', description: createRichText('A new wing was added to house the growing collection.') },
            { date: '2000', title: 'Digital Initiative', description: createRichText('The museum launched its first digital archive.') },
          ],
        },
      ],
    })

    await this.create('pages', {
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
    })
  }

  private async seedPosts(categories: Record<string, string>): Promise<void> {
    if (!this.shouldSeedCollection('posts')) {
      return
    }

    this.log('Seeding posts...')

    const posts = [
      {
        title: 'New Renaissance Exhibition Opening',
        slug: 'new-renaissance-exhibition',
        excerpt: 'Join us for the grand opening of our new Renaissance Masters exhibition.',
        category: 'exhibitions',
        content: createRichTextParagraphs([
          'We are thrilled to announce the opening of our new Renaissance Masters exhibition.',
          'This exhibition features over 50 works from the greatest artists of the Renaissance period.',
          'Join us for the opening reception on the first Saturday of next month.',
        ]),
      },
      {
        title: 'Recent Archaeological Discoveries',
        slug: 'recent-archaeological-discoveries',
        excerpt: 'Our research team has made exciting new discoveries at the excavation site.',
        category: 'research',
        content: createRichTextParagraphs([
          'Our archaeological team has uncovered remarkable artifacts at the Mediterranean excavation site.',
          'These findings provide new insights into ancient trade routes and cultural exchanges.',
          'A detailed research paper will be published in the upcoming journal edition.',
        ]),
      },
      {
        title: 'Family Day at the Museum',
        slug: 'family-day-museum',
        excerpt: 'Bring the whole family for a day of fun, learning, and exploration.',
        category: 'events',
        content: createRichTextParagraphs([
          'Mark your calendars for our annual Family Day event!',
          'Activities include guided tours, hands-on workshops, and special performances.',
          'Admission is free for children under 12 when accompanied by an adult.',
        ]),
      },
    ]

    for (const post of posts) {
      await this.create('posts', {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        categories: categories[post.category] ? [categories[post.category]] : [],
        _status: 'published',
        publishedAt: new Date().toISOString(),
      })
    }
  }

  private async seedGlobals(): Promise<void> {
    this.log('Seeding globals...')

    // Header
    await this.updateGlobal('header', {
      logo: {
        text: 'Museum Collection',
      },
      navItems: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'Blocks Showcase', url: '/blocks-showcase' } },
        { link: { type: 'custom', label: 'Artifacts', url: '/artifacts' } },
        { link: { type: 'custom', label: 'People', url: '/people' } },
        { link: { type: 'custom', label: 'Places', url: '/places' } },
        { link: { type: 'custom', label: 'Collections', url: '/collections' } },
        { link: { type: 'custom', label: 'Blog', url: '/blog' } },
      ],
    })

    // Footer
    await this.updateGlobal('footer', {
      copyright: `© ${new Date().getFullYear()} Museum Collection. All rights reserved.`,
      columns: [
        {
          label: 'Explore',
          navItems: [
            { link: { type: 'custom', label: 'Artifacts', url: '/artifacts' } },
            { link: { type: 'custom', label: 'People', url: '/people' } },
            { link: { type: 'custom', label: 'Places', url: '/places' } },
          ],
        },
        {
          label: 'Visit',
          navItems: [
            { link: { type: 'custom', label: 'About Us', url: '/about' } },
            { link: { type: 'custom', label: 'Contact', url: '/contact' } },
            { link: { type: 'custom', label: 'Hours & Admission', url: '/visit' } },
          ],
        },
      ],
    })

    // Settings
    await this.updateGlobal('settings', {
      siteName: 'Museum Collection',
      siteDescription: 'Explore our collection of historical artifacts, people, and places.',
    })
  }
}

export default MuseumSeeder
