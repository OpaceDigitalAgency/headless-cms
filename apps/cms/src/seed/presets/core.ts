/**
 * Core Preset Seeder
 *
 * Seeds sample data for the museum-next preset.
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
    return 'museum-next'
  }

  getCollections(): string[] {
    return ['pages', 'posts', 'categories', 'people', 'places', 'museum-collections', 'events', 'archive-items', 'content-types', 'custom-items']
  }

  async seed(): Promise<void> {
    this.log('Starting core preset seed...')

    // Seed in dependency order
    const categories = await this.seedCategories()
    const places = await this.seedPlaces()
    const people = await this.seedPeople(places)
    const collections = await this.seedMuseumCollections()
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
    await this.clearCollection('museum-collections')
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
      case 'museum-collections':
        await this.seedMuseumCollections()
        return
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

    this.log('Seeding collections...')

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

  private async seedPages(): Promise<void> {
    if (!this.shouldSeedCollection('pages')) {
      return
    }

    this.log('Seeding pages...')

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
            label: 'View All Artifacts',
            url: '/artifacts',
          },
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
          backgroundColor: 'none',
          paddingTop: 'medium',
          paddingBottom: 'medium',
          columns: [
            {
              size: 'full',
              richText: createRichTextParagraphs([
                'Our museum is dedicated to preserving and sharing the world\'s cultural heritage.',
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
            { date: '1850', title: 'Foundation', description: createRichText('The museum was founded by a group of passionate collectors.') },
            { date: '1920', title: 'Major Expansion', description: createRichText('A new wing was added to house the growing collection.') },
            { date: '2000', title: 'Digital Initiative', description: createRichText('The museum launched its first digital archive.') },
          ],
        },
      ],
    })

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
        author: adminId,
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
        slug: 'museum-night-after-hours-tour',
        excerpt: 'Experience the museum in a new light with our exclusive after-hours tour.',
        eventType: 'tour',
        startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
        endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        capacity: 30,
      },
      {
        title: 'Classical Music Performance',
        slug: 'classical-music-performance',
        excerpt: 'An evening of classical music in the museum\'s grand hall.',
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
        itemType: 'artifact',
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
