/**
 * Core Preset Seeder
 *
 * Seeds sample data for the core preset (archive-next preset ID).
 * Used as the "kitchen sink" preset to cover the broadest set of collections.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'
import { ensureShowcasePage } from '../showcase'

export class CoreSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'archive-next'
  }

  getCollections(): string[] {
    return ['pages', 'posts', 'categories', 'people', 'places', 'events', 'archive-items', 'content-types', 'custom-items']
  }

  async seed(): Promise<void> {
    this.log('Starting core preset seed...')

    // Seed in dependency order
    const categories = await this.seedCategories()
    const places = await this.seedPlaces()
    const people = await this.seedPeople(places)
    await this.seedEvents(places)
    await this.seedArchiveItems(people, places)
    await this.seedPages()
    await this.seedPosts(categories)

    await this.seedShowcaseContentType()

    await this.seedGlobals()

    this.log('Core preset seed completed!')
  }

  async clear(): Promise<void> {
    this.log('Clearing core preset data...')

    // Clear in reverse dependency order
    await this.clearCollection('posts')
    await this.clearCollection('pages')
    await this.clearCollection('archive-items')
    await this.clearCollection('events')
    await this.clearCollection('people')
    await this.clearCollection('places')
    await this.clearCollection('custom-items')
    await this.clearCollection('content-types')
    await this.clearCollection('categories')

    this.log('Core preset data cleared!')
  }

  public async seedCollection(collection: string): Promise<void> {
    switch (collection) {
      case 'categories':
        await this.seedCategories()
        return
      case 'places':
        await this.seedPlaces()
        return
      case 'people': {
        const places = await this.seedPlaces()
        await this.seedPeople(places)
        return
      }
      case 'posts': {
        const categories = await this.seedCategories()
        await this.seedPosts(categories)
        return
      }
      case 'pages':
        await this.seedPages()
        return
      case 'content-types':
      case 'custom-items':
        await this.seedShowcaseContentType()
        return
      default:
        this.log(`No seed handler for collection: ${collection}`)
    }
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
        shortDescription: 'Birthplace of the Renaissance and a hub of artistic innovation.',
        description: 'The birthplace of the Renaissance, home to countless masterpieces.',
        historicalSignificance: 'Florence fostered groundbreaking art, architecture, and humanist thought.',
        country: 'Italy',
        placeType: 'city',
        location: [11.2558, 43.7696],
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Highlights',
            description: 'Landmarks and cultural touchpoints that shaped the era.',
            style: 'cards',
            columns: '3',
            items: [
              { title: 'Duomo', description: 'Iconic cathedral with Brunelleschi\'s dome.' },
              { title: 'Uffizi', description: 'Repository of Renaissance art collections.' },
              { title: 'Medici Legacy', description: 'Patronage that powered artistic revolutions.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'Cultural Snapshot',
            stats: [
              { value: '1400s', label: 'Golden Century' },
              { value: '3', label: 'Major Dynasties' },
              { value: '100+', label: 'Notable Works' },
            ],
          },
        ],
      },
      {
        name: 'Rome, Italy',
        slug: 'rome-italy',
        shortDescription: 'The Eternal City and heart of the Roman Empire.',
        description: 'The Eternal City, center of the Roman Empire and the Catholic Church.',
        historicalSignificance: 'Rome shaped politics, religion, and engineering for centuries.',
        country: 'Italy',
        placeType: 'city',
        location: [12.4964, 41.9028],
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Enduring Influence',
            layout: 'grid',
            items: [
              { title: 'Architecture', description: 'Engineering feats that defined urban planning.' },
              { title: 'Religion', description: 'A global center for the Catholic Church.' },
              { title: 'Politics', description: 'Legacy of empire and governance.' },
            ],
          },
        ],
      },
      {
        name: 'Paris, France',
        slug: 'paris-france',
        shortDescription: 'City of Light and a global center for art and culture.',
        description: 'The City of Light, a global center for art, fashion, and culture.',
        historicalSignificance: 'Paris is synonymous with modern art movements and design leadership.',
        country: 'France',
        placeType: 'city',
        location: [2.3522, 48.8566],
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Creative Pulse',
            stats: [
              { value: '1800s', label: 'Impressionist Rise' },
              { value: '2', label: 'World Expos' },
              { value: '12', label: 'Major Museums' },
            ],
          },
          {
            blockType: 'cta',
            heading: 'Plan a Visit',
            description: 'Explore the collections inspired by Parisian culture.',
            links: [
              { label: 'Explore Collections', url: '/collections', variant: 'primary' },
            ],
            backgroundColor: 'light',
          },
        ],
      },
      {
        name: 'Athens, Greece',
        slug: 'athens-greece',
        shortDescription: 'Cradle of Western civilization and birthplace of democracy.',
        description: 'The cradle of Western civilization and birthplace of democracy.',
        historicalSignificance: 'Athens shaped philosophy, governance, and classical art.',
        country: 'Greece',
        placeType: 'city',
        location: [23.7275, 37.9838],
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Classical Foundations',
            style: 'features',
            columns: '2',
            items: [
              { title: 'Philosophy', description: 'Home to foundational thinkers and schools.' },
              { title: 'Democracy', description: 'Early experiments in citizen governance.' },
              { title: 'Theatre', description: 'Origins of dramatic performance traditions.' },
              { title: 'Architecture', description: 'Temples and civic spaces still studied today.' },
            ],
          },
        ],
      },
      {
        name: 'Cairo, Egypt',
        slug: 'cairo-egypt',
        shortDescription: 'Gateway to ancient wonders and the Nile.',
        description: 'Gateway to the ancient wonders of Egypt and the pyramids.',
        historicalSignificance: 'Cairo connects modern life with millennia of heritage.',
        country: 'Egypt',
        placeType: 'city',
        location: [31.2357, 30.0444],
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Cultural Threads',
            layout: 'list',
            items: [
              { title: 'Nile Heritage', description: 'Lifeblood of trade and settlement.' },
              { title: 'Dynastic Legacy', description: 'Connections to ancient royal sites.' },
              { title: 'Craft Traditions', description: 'Artisan techniques passed through generations.' },
            ],
          },
        ],
      },
    ]

    const places: Record<string, string> = {}
    
    for (const data of placesData.slice(0, this.getItemCount('places', 5))) {
      const place = await this.create('places', {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        description: createRichText(data.description),
        historicalSignificance: createRichText(data.historicalSignificance),
        country: data.country,
        placeType: data.placeType,
        location: data.location,
        contentBlocks: data.contentBlocks,
        _status: 'published',
      })
      places[data.slug] = place.id
    }

    return places
  }

  private async seedShowcaseContentType(): Promise<void> {
    if (!this.shouldSeedCollection('content-types') && !this.shouldSeedCollection('custom-items')) {
      return
    }

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
        biography: createRichTextParagraphs([
          'Leonardo blended art and science in a way few have ever matched.',
          'His notebooks reveal experiments, observations, and designs that were centuries ahead of their time.',
          'This profile highlights his interdisciplinary practice and lasting influence.',
        ]),
        birthDate: '1452',
        deathDate: '1519',
        nationality: 'Italian',
        birthPlace: 'florence-italy',
        role: ['artist', 'sculptor', 'architect', 'scholar'],
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Signature Contributions',
            layout: 'grid',
            items: [
              { title: 'Anatomical Studies', description: 'Precision drawings that advanced medical understanding.' },
              { title: 'Flight Concepts', description: 'Early studies of lift, gliding, and aerial devices.' },
              { title: 'Workshop Mastery', description: 'Large-scale works with complex production techniques.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'At a Glance',
            stats: [
              { value: '7', label: 'Major Works' },
              { value: '13k', label: 'Notebook Pages' },
              { value: '4', label: 'Disciplines' },
            ],
          },
          {
            blockType: 'quote',
            quote: 'Simplicity is the ultimate sophistication.',
            author: 'Leonardo da Vinci',
            align: 'left',
          },
        ],
      },
      {
        name: 'Michelangelo Buonarroti',
        slug: 'michelangelo-buonarroti',
        shortBio: 'Italian sculptor, painter, architect, and poet of the High Renaissance.',
        biography: createRichTextParagraphs([
          'Michelangelo\'s work redefined sculpture and monumental painting.',
          'From marble to fresco, his craftsmanship elevated every medium he touched.',
          'This profile explores his techniques, patrons, and legacy.',
        ]),
        birthDate: '1475',
        deathDate: '1564',
        nationality: 'Italian',
        birthPlace: 'florence-italy',
        role: ['artist', 'sculptor', 'architect'],
        contentBlocks: [
          {
            blockType: 'timeline',
            heading: 'Creative Milestones',
            layout: 'alternating',
            events: [
              { date: '1501', title: 'David Commission', description: createRichText('Begins the marble statue that became a symbol of Florence.') },
              { date: '1508', title: 'Sistine Chapel', description: createRichText('Completes the iconic ceiling frescoes.') },
              { date: '1546', title: 'St. Peter\'s', description: createRichText('Appointed chief architect of St. Peter\'s Basilica.') },
            ],
          },
          {
            blockType: 'features',
            heading: 'Primary Mediums',
            layout: 'list',
            items: [
              { title: 'Sculpture', description: 'Marble forms with intense anatomical realism.' },
              { title: 'Painting', description: 'Narrative frescoes with bold composition.' },
              { title: 'Architecture', description: 'Grand civic and religious structures.' },
            ],
          },
        ],
      },
      {
        name: 'Raphael Sanzio',
        slug: 'raphael-sanzio',
        shortBio: 'Italian painter and architect of the High Renaissance.',
        biography: createRichTextParagraphs([
          'Raphael balanced grace and clarity across portraiture and large fresco cycles.',
          'His workshop system enabled complex commissions on an ambitious scale.',
          'This entry highlights his collaborative process and stylistic influence.',
        ]),
        birthDate: '1483',
        deathDate: '1520',
        nationality: 'Italian',
        birthPlace: 'rome-italy',
        role: ['artist', 'architect'],
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Studio Highlights',
            description: 'Key themes across Raphael\'s major commissions.',
            style: 'cards',
            columns: '3',
            items: [
              { title: 'Portraiture', description: 'Balanced compositions with refined color.' },
              { title: 'Fresco Cycles', description: 'Narrative suites for civic and religious patrons.' },
              { title: 'Architecture', description: 'Elegant plans influenced by classical forms.' },
            ],
          },
          {
            blockType: 'cta',
            heading: 'Explore the Raphael Collection',
            description: 'Browse related archive items and sketches.',
            links: [
              { label: 'View Archive Items', url: '/archive-items', variant: 'primary' },
            ],
            backgroundColor: 'light',
          },
        ],
      },
      {
        name: 'Claude Monet',
        slug: 'claude-monet',
        shortBio: 'French painter and founder of Impressionism.',
        biography: createRichTextParagraphs([
          'Monet captured changing light with rapid brushwork and vibrant palettes.',
          'His series paintings explored the same subject across different times and seasons.',
          'This profile focuses on his approach to atmosphere and color.',
        ]),
        birthDate: '1840',
        deathDate: '1926',
        nationality: 'French',
        birthPlace: 'paris-france',
        role: ['artist'],
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Series Themes',
            layout: 'grid',
            items: [
              { title: 'Water Lilies', description: 'A long-running exploration of reflection and light.' },
              { title: 'Cathedrals', description: 'Shifting tonal studies of stone and shadow.' },
              { title: 'Haystacks', description: 'Seasonal variations rendered in quick strokes.' },
            ],
          },
          {
            blockType: 'testimonials',
            heading: 'Curator Notes',
            items: [
              {
                quote: 'Monet\'s palette reveals the emotional temperature of a scene.',
                name: 'Elise Fournier',
                role: 'Head Curator',
              },
              {
                quote: 'A master of atmosphere, he made light the subject itself.',
                name: 'Jonah Hart',
                role: 'Collection Archivist',
              },
            ],
          },
        ],
      },
      {
        name: 'Phidias',
        slug: 'phidias',
        shortBio: 'Ancient Greek sculptor, painter, and architect.',
        biography: createRichTextParagraphs([
          'Phidias oversaw some of the most celebrated sculptural programs of antiquity.',
          'His workshops produced monumental works that shaped classical ideals.',
          'This profile focuses on his techniques and cultural legacy.',
        ]),
        birthDate: '480 BCE',
        deathDate: '430 BCE',
        nationality: 'Greek',
        birthPlace: 'athens-greece',
        role: ['sculptor', 'architect'],
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Legacy Metrics',
            stats: [
              { value: '2', label: 'Major Temples' },
              { value: '5', label: 'Attributed Works' },
              { value: '1', label: 'Classical Era' },
            ],
          },
          {
            blockType: 'quote',
            quote: 'The aim of art is to represent not the outward appearance of things, but their inward significance.',
            author: 'Attributed to Phidias',
            align: 'center',
          },
        ],
      },
    ]

    const people: Record<string, string> = {}
    
    for (const data of peopleData.slice(0, this.getItemCount('people', 5))) {
      const person = await this.create('people', {
        name: data.name,
        slug: data.slug,
        shortBio: data.shortBio,
        biography: data.biography,
        birthDate: data.birthDate,
        deathDate: data.deathDate,
        nationality: data.nationality,
        birthPlace: places[data.birthPlace] || null,
        role: data.role,
        contentBlocks: data.contentBlocks,
        _status: 'published',
      })
      people[data.slug] = person.id
    }

    return people
  }

  private async seedPages(): Promise<void> {
    if (!this.shouldSeedCollection('pages')) {
      return
    }

    this.log('Seeding pages...')

    // Home page
    if (this.shouldSeedItem('home')) {
      await this.create('pages', {
      title: 'Home',
      slug: 'home',
      template: 'home',
      _status: 'published',
      hero: {
        type: 'fullscreen',
        heading: 'Discover Our Collection',
        subheading: 'Explore thousands of archive items, artworks, and historical treasures from around the world.',
      },
      content: [
        {
          blockType: 'grid',
          heading: 'Featured Collections',
          description: 'Browse highlighted themes from our catalog.',
          style: 'cards',
          columns: '3',
          gap: 'medium',
          alignment: 'left',
          items: [
            { title: 'Renaissance Masters', description: 'Masterpieces from the Renaissance era' },
            { title: 'Ancient Civilizations', description: 'Treasures from the ancient world' },
            { title: 'Impressionist Gallery', description: 'Light and color captured on canvas' },
          ],
        },
        {
          blockType: 'archive',
          heading: 'Featured Archive Items',
          description: 'A curated selection of standout items.',
          populateBy: 'collection',
          relationTo: 'archive-items',
          limit: 6,
          layout: 'grid',
          columns: '3',
          showImage: true,
          showExcerpt: true,
          showDate: false,
          showAuthor: false,
          link: {
            show: true,
            label: 'View All Archive Items',
            url: '/archive-items',
          },
        },
      ],
    })
    }

    // About page
    if (this.shouldSeedItem('about')) {
      await this.create('pages', {
      title: 'About the Archive',
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
          backgroundColor: 'none',
          paddingTop: 'medium',
          paddingBottom: 'medium',
          columns: [
            {
              size: 'full',
              richText: createRichTextParagraphs([
                'Our archive is dedicated to preserving and sharing the world\'s cultural heritage.',
                'With collections spanning thousands of years and multiple continents, we offer visitors a unique journey through human history and creativity.',
                'Our mission is to inspire curiosity, foster learning, and connect people with the stories of our shared past.',
              ]),
            },
          ],
        },
        {
          blockType: 'timeline',
          heading: 'Our History',
          layout: 'vertical',
          events: [
            { date: '1850', title: 'Foundation', description: createRichText('The archive was founded by a group of passionate collectors.') },
            { date: '1920', title: 'Major Expansion', description: createRichText('A new wing was added to house the growing collection.') },
            { date: '2000', title: 'Digital Initiative', description: createRichText('The archive launched its first digital collection.') },
          ],
        },
      ],
    })
    }

    await ensureShowcasePage(this.payload, { updateHeader: true })
  }

  private async seedPosts(categories: Record<string, string>): Promise<void> {
    if (!this.shouldSeedCollection('posts')) {
      return
    }

    this.log('Seeding posts...')

    // Get admin user to use as author
    const adminId = await this.getOrCreateAdminUser()

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
          'Our archaeological team has uncovered remarkable archive items at the Mediterranean excavation site.',
          'These findings provide new insights into ancient trade routes and cultural exchanges.',
          'A detailed research paper will be published in the upcoming journal edition.',
        ]),
      },
      {
        title: 'Family Day at the Archive',
        slug: 'family-day-archive',
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
      if (this.shouldSeedItem(post.slug)) {
        await this.create('posts', {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          categories: categories[post.category] ? [categories[post.category]] : [],
          author: adminId,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      })
      }
    }
  }

  private async seedGlobals(): Promise<void> {
    this.log('Seeding globals...')

    // Header
    await this.updateGlobal('header', {
      logoText: 'Museum Collection',
      navItems: [
        { label: 'Home', type: 'link', url: '/' },
        { label: 'Blocks Showcase', type: 'link', url: '/blocks-showcase' },
        { label: 'Archive Items', type: 'link', url: '/archive-items' },
        { label: 'People', type: 'link', url: '/people' },
        { label: 'Places', type: 'link', url: '/places' },
        { label: 'Collections', type: 'link', url: '/collections' },
        { label: 'Blog', type: 'link', url: '/blog' },
      ],
    })

    // Footer
    await this.updateGlobal('footer', {
      copyright: `© ${new Date().getFullYear()} Museum Collection. All rights reserved.`,
      columns: [
        {
          label: 'Explore',
          navItems: [
            { link: { type: 'custom', label: 'Archive Items', url: '/archive-items' } },
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
      siteDescription: 'Explore our collection of historical archive items, people, and places.',
    })
  }

  private async seedEvents(places: Record<string, string>): Promise<void> {
    if (!this.shouldSeedCollection('events')) {
      return
    }

    this.log('Seeding events...')

    const eventsData = [
      {
        title: 'Renaissance Art Exhibition',
        slug: 'renaissance-art-exhibition',
        excerpt: 'A comprehensive exhibition showcasing masterpieces from the Renaissance period.',
        eventType: 'exhibition',
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days from now
        venue: places['florence-italy'],
      },
      {
        title: 'Curator Talk: Ancient Civilisations',
        slug: 'curator-talk-ancient-civilisations',
        excerpt: 'Join our lead curator for an in-depth discussion about ancient civilisations.',
        eventType: 'lecture',
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
      },
      {
        title: 'Family Workshop: Pottery Making',
        slug: 'family-workshop-pottery-making',
        excerpt: 'Hands-on pottery workshop for families. Learn traditional techniques.',
        eventType: 'workshop',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // 3 hours later
        capacity: 20,
      },
      {
        title: 'Museum Night: After Hours Tour',
        slug: 'after-hours-archive-tour',
        excerpt: 'Experience the archive in a new light with our exclusive after-hours tour.',
        eventType: 'tour',
        startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
        endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        capacity: 30,
      },
      {
        title: 'Classical Music Performance',
        slug: 'classical-music-performance',
        excerpt: 'An evening of classical music in the venue\'s grand hall.',
        eventType: 'performance',
        startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        capacity: 100,
      },
    ]

    for (const event of eventsData.slice(0, this.getItemCount('events', 5))) {
      await this.create('events', {
        title: event.title,
        slug: event.slug,
        excerpt: event.excerpt,
        content: createRichTextParagraphs([
          event.excerpt,
          'This event offers a unique opportunity to engage with our collection and experts.',
          'Booking is recommended as spaces are limited.',
        ]),
        eventType: event.eventType,
        startDate: event.startDate,
        endDate: event.endDate,
        venue: event.venue,
        capacity: event.capacity,
        _status: 'published',
      })
    }
  }

  private async seedArchiveItems(people: Record<string, string>, places: Record<string, string>): Promise<void> {
    if (!this.shouldSeedCollection('archive-items')) {
      return
    }

    this.log('Seeding archive items...')

    const archiveItemsData = [
      {
        title: 'Leonardo\'s Notebook',
        slug: 'leonardos-notebook',
        excerpt: 'Original notebook containing sketches and notes by Leonardo da Vinci.',
        itemType: 'document',
        creator: people['leonardo-da-vinci'],
        origin: places['florence-italy'],
        dateCreated: '1490-01-01',
      },
      {
        title: 'Renaissance Painting Techniques Manual',
        slug: 'renaissance-painting-techniques-manual',
        excerpt: 'A comprehensive guide to painting techniques used during the Renaissance.',
        itemType: 'document',
        origin: places['florence-italy'],
        dateCreated: '1520-01-01',
      },
      {
        title: 'Ancient Roman Coin Collection',
        slug: 'ancient-roman-coin-collection',
        excerpt: 'A collection of coins from the Roman Empire period.',
        itemType: 'object',
        dateCreated: '100-01-01',
      },
      {
        title: 'Medieval Manuscript',
        slug: 'medieval-manuscript',
        excerpt: 'Illuminated manuscript from the medieval period.',
        itemType: 'document',
        dateCreated: '1200-01-01',
      },
      {
        title: 'Victorian Era Photographs',
        slug: 'victorian-era-photographs',
        excerpt: 'Collection of photographs from the Victorian era.',
        itemType: 'photograph',
        dateCreated: '1880-01-01',
      },
    ]

    for (const item of archiveItemsData.slice(0, this.getItemCount('archive-items', 5))) {
      await this.create('archive-items', {
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        description: createRichTextParagraphs([
          item.excerpt,
          'This item is part of our permanent collection and represents an important piece of history.',
        ]),
        itemType: item.itemType,
        creator: item.creator,
        origin: item.origin,
        dateCreated: item.dateCreated,
        _status: 'published',
      })
    }
  }
}

export default CoreSeeder
