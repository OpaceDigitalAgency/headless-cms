/**
 * Core Preset Seeder
 *
 * Seeds sample data for the archive preset.
 * Used as the "kitchen sink" preset to cover the broadest set of collections.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'

export class CoreSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'archive'
  }

  getCollections(): string[] {
    return ['pages', 'posts', 'categories', 'tags', 'people', 'places', 'events', 'archive-items', 'content-types', 'custom-items']
  }

  async seed(): Promise<void> {
    this.log('Starting core preset seed...')

    // Seed in dependency order
    const categories = await this.seedCategories()
    await this.seedTags()
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
    await this.clearCollection('tags')

    this.log('Core preset data cleared!')
  }

  public async seedCollection(collection: string): Promise<void> {
    switch (collection) {
      case 'categories':
        await this.seedCategories()
        return
      case 'tags':
        await this.seedTags()
        return
      case 'places':
        await this.seedPlaces()
        return
      case 'people': {
        const places = await this.seedPlaces()
        await this.seedPeople(places)
        return
      }
      case 'events': {
        const places = await this.seedPlaces()
        await this.seedEvents(places)
        return
      }
      case 'archive-items': {
        const places = await this.seedPlaces()
        const people = await this.seedPeople(places)
        await this.seedArchiveItems(people, places)
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
      if (await this.checkIfExists('categories', data.slug)) {
        const existing = await this.payload.find({
          collection: 'categories',
          where: { slug: { equals: data.slug } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          categories[data.slug] = existing.docs[0].id as any
        }
        continue
      }
      const category = await this.create('categories', {
        title: data.name,
        slug: data.slug,
        description: data.description,
      })
      categories[data.slug] = category.id
    }

    return categories
  }

  private async seedTags(): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('tags')) {
      return {}
    }

    this.log('Seeding tags...')

    const tagData = [
      { heading: 'Restoration', slug: 'restoration', description: 'Updates on preservation work and conservation projects' },
      { heading: 'Behind the Scenes', slug: 'behind-the-scenes', description: 'Process notes from the archive team' },
      { heading: 'New Acquisition', slug: 'new-acquisition', description: 'Recently acquired items and collections' },
    ]

    const tags: Record<string, string> = {}

    for (const data of tagData.slice(0, this.getItemCount('tags', 3))) {
      if (await this.checkIfExists('tags', data.slug)) {
        const existing = await this.payload.find({
          collection: 'tags',
          where: { slug: { equals: data.slug } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          tags[data.slug] = existing.docs[0].id as any
        }
        continue
      }
      const tag = await this.create('tags', {
        title: data.title,
        slug: data.slug,
        description: data.description,
      })
      tags[data.slug] = tag.id
    }

    return tags
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
              { heading: 'Duomo', description: 'Iconic cathedral with Brunelleschi\'s dome.' },
              { heading: 'Uffizi', description: 'Repository of Renaissance art collections.' },
              { heading: 'Medici Legacy', description: 'Patronage that powered artistic revolutions.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'Cultural Snapshot',
            items: [
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
              { heading: 'Architecture', description: 'Engineering feats that defined urban planning.' },
              { heading: 'Religion', description: 'A global center for the Catholic Church.' },
              { heading: 'Politics', description: 'Legacy of empire and governance.' },
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
            items: [
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
            backgroundColor: 'muted',
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
              { heading: 'Philosophy', description: 'Home to foundational thinkers and schools.' },
              { heading: 'Democracy', description: 'Early experiments in citizen governance.' },
              { heading: 'Theatre', description: 'Origins of dramatic performance traditions.' },
              { heading: 'Architecture', description: 'Temples and civic spaces still studied today.' },
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
              { heading: 'Nile Heritage', description: 'Lifeblood of trade and settlement.' },
              { heading: 'Dynastic Legacy', description: 'Connections to ancient royal sites.' },
              { heading: 'Craft Traditions', description: 'Artisan techniques passed through generations.' },
            ],
          },
        ],
      },
    ]

    const places: Record<string, string> = {}

    for (const data of placesData.slice(0, this.getItemCount('places', 5))) {
      if (!this.shouldSeedItem(data.slug)) {
        continue
      }
      if (await this.checkIfExists('places', data.slug)) {
        this.log(`Place "${data.name}" already exists, skipping.`)
        const existing = await this.payload.find({
          collection: 'places',
          where: { slug: { equals: data.slug } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          places[data.slug] = existing.docs[0].id as any
        }
        continue
      }
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
          content: createRichTextParagraphs([
            'A flagship exhibition featuring paintings, sketches, and restored artifacts from the Renaissance.',
            'Includes curator-led tours, interactive stations, and a digital companion guide.',
          ]),
          blocks: [
            {
              blockType: 'features',
              heading: 'Exhibition Focus',
              layout: 'grid',
              items: [
                { heading: 'Masterworks', description: 'Signature pieces from leading artists.' },
                { heading: 'Techniques', description: 'Hands-on demos of period methods.' },
                { heading: 'Context', description: 'Social and cultural background panels.' },
              ],
            },
            {
              blockType: 'stats',
              heading: 'Visitor Experience',
              items: [
                { value: '45+', label: 'Works' },
                { value: '8', label: 'Weeks' },
                { value: '6', label: 'Guided Tours' },
              ],
            },
          ],
          customData: { startDate: '2024-06-01', endDate: '2024-09-30', location: 'Main Gallery' },
        },
        {
          title: 'Modern Perspectives',
          slug: 'modern-perspectives',
          excerpt: 'A contemporary lens on classical themes.',
          content: createRichTextParagraphs([
            'A rotating exhibition that pairs classical works with contemporary responses.',
            'Explores reinterpretation, technique, and cultural dialogue.',
          ]),
          blocks: [
            {
              blockType: 'grid',
              heading: 'Program Elements',
              style: 'cards',
              columns: '3',
              items: [
                { heading: 'Artist Talks', description: 'Weekly conversations with modern artists.' },
                { heading: 'Studio Visits', description: 'Behind-the-scenes views of active studios.' },
                { heading: 'Interactive Labs', description: 'Hands-on creative sessions.' },
              ],
            },
            {
              blockType: 'testimonials',
              heading: 'Audience Notes',
              items: [
                { quote: 'A bold reimagining of classical themes.', name: 'Ava Romero', role: 'Visitor' },
                { quote: 'The dialogue between eras feels immediate.', name: 'Samir Patel', role: 'Educator' },
              ],
            },
          ],
          customData: { startDate: '2024-10-15', endDate: '2025-01-10', location: 'East Wing' },
        },
        {
          title: 'Archaeology in Focus',
          slug: 'archaeology-in-focus',
          excerpt: 'Highlights from our latest excavation research.',
          content: createRichTextParagraphs([
            'Showcases new artifacts and findings from recent fieldwork.',
            'Includes conservation notes, field photography, and site maps.',
          ]),
          blocks: [
            {
              blockType: 'stats',
              heading: 'Field Report',
              items: [
                { value: '3', label: 'Sites' },
                { value: '120', label: 'Artifacts' },
                { value: '14', label: 'Researchers' },
              ],
            },
            {
              blockType: 'faq',
              heading: 'Research FAQs',
              items: [
                { question: 'How long was the excavation?', answer: createRichText('The fieldwork ran for 12 weeks.') },
                { question: 'Are artifacts on display?', answer: createRichText('Yes, select pieces are in Gallery C.') },
              ],
            },
          ],
          customData: { startDate: '2025-02-01', endDate: '2025-04-30', location: 'Research Gallery' },
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
              { heading: 'Anatomical Studies', description: 'Precision drawings that advanced medical understanding.' },
              { heading: 'Flight Concepts', description: 'Early studies of lift, gliding, and aerial devices.' },
              { heading: 'Workshop Mastery', description: 'Large-scale works with complex production techniques.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'At a Glance',
            items: [
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
              { date: '1501', heading: 'David Commission', description: createRichText('Begins the marble statue that became a symbol of Florence.') },
              { date: '1508', heading: 'Sistine Chapel', description: createRichText('Completes the iconic ceiling frescoes.') },
              { date: '1546', heading: 'St. Peter\'s', description: createRichText('Appointed chief architect of St. Peter\'s Basilica.') },
            ],
          },
          {
            blockType: 'features',
            heading: 'Primary Mediums',
            layout: 'list',
            items: [
              { heading: 'Sculpture', description: 'Marble forms with intense anatomical realism.' },
              { heading: 'Painting', description: 'Narrative frescoes with bold composition.' },
              { heading: 'Architecture', description: 'Grand civic and religious structures.' },
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
              { heading: 'Portraiture', description: 'Balanced compositions with refined color.' },
              { heading: 'Fresco Cycles', description: 'Narrative suites for civic and religious patrons.' },
              { heading: 'Architecture', description: 'Elegant plans influenced by classical forms.' },
            ],
          },
          {
            blockType: 'cta',
            heading: 'Explore the Raphael Collection',
            description: 'Browse related archive items and sketches.',
            links: [
              { label: 'View Archive Items', url: '/archive-items', variant: 'primary' },
            ],
            backgroundColor: 'muted',
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
              { heading: 'Water Lilies', description: 'A long-running exploration of reflection and light.' },
              { heading: 'Cathedrals', description: 'Shifting tonal studies of stone and shadow.' },
              { heading: 'Haystacks', description: 'Seasonal variations rendered in quick strokes.' },
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
            items: [
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
      if (!this.shouldSeedItem(data.slug)) {
        continue
      }
      if (await this.checkIfExists('people', data.slug)) {
        this.log(`Person "${data.name}" already exists, skipping.`)
        const existing = await this.payload.find({
          collection: 'people',
          where: { slug: { equals: data.slug } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          people[data.slug] = existing.docs[0].id as any
        }
        continue
      }
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
      if (await this.checkIfExists('pages', 'home')) {
        this.log('Home page already exists, skipping.')
      } else {
        await this.create('pages', {
          title: 'Home',
          slug: 'home',
          template: 'home',
          _status: 'published',
          hero: {
            variant: 'fullscreen',
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
                { heading: 'Renaissance Masters', description: 'Masterpieces from the Renaissance era' },
                { heading: 'Ancient Civilizations', description: 'Treasures from the ancient world' },
                { heading: 'Impressionist Gallery', description: 'Light and color captured on canvas' },
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
    }

    // About page
    if (this.shouldSeedItem('about')) {
      if (await this.checkIfExists('pages', 'about')) {
        this.log('About page already exists, skipping.')
      } else {
        await this.create('pages', {
          title: 'About the Archive',
          slug: 'about',
          template: 'detail',
          _status: 'published',
          hero: {
            variant: 'standard',
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
                { date: '1850', heading: 'Foundation', description: createRichText('The archive was founded by a group of passionate collectors.') },
                { date: '1920', heading: 'Major Expansion', description: createRichText('A new wing was added to house the growing collection.') },
                { date: '2000', heading: 'Digital Initiative', description: createRichText('The archive launched its first digital collection.') },
              ],
            },
          ],
        })
      }
    }

    // Collections Page (Archive)
    if (this.shouldSeedItem('collections')) {
      if (await this.checkIfExists('pages', 'collections')) {
        this.log('Collections page already exists, skipping.')
      } else {
        await this.create('pages', {
          title: 'Collections',
          slug: 'collections',
          template: 'default', // Often a custom archive listing
          _status: 'published',
          hero: {
            variant: 'standard',
            heading: 'Collections',
            subheading: 'Explore our vast archives by category and theme.',
          },
          content: [
            {
              blockType: 'archive',
              heading: 'Browse Collections',
              relationTo: 'categories', // Or similar taxonomy
              limit: 12,
              showFeaturedImage: true,
            }
          ]
        })
      }
    }

    // Search Page (Archive)
    if (this.shouldSeedItem('search')) {
      if (await this.checkIfExists('pages', 'search')) {
        this.log('Search page already exists, skipping.')
      } else {
        await this.create('pages', {
          title: 'Search',
          slug: 'search',
          template: 'default',
          _status: 'published',
          hero: {
            variant: 'minimal',
            heading: 'Search Archives',
          },
          content: [
            {
              blockType: 'content',
              content: createRichText('Search functionality coming soon.')
            }
          ]
        })
      }
    }

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
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Opening Night Highlights',
            description: 'What to expect during the launch event.',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'Curator Tour', description: 'A guided tour through the new galleries.' },
              { heading: 'Live Music', description: 'String quartet in the main hall.' },
              { heading: 'Reception', description: 'Light refreshments and networking.' },
            ],
          },
          {
            blockType: 'cta',
            heading: 'Reserve Your Spot',
            description: 'Opening night is ticketed and will sell out.',
            links: [
              { label: 'Get Tickets', url: '/events/renaissance-art-exhibition', variant: 'primary' },
            ],
            backgroundColor: 'accent',
          },
        ],
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
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Field Notes',
            stats: [
              { value: '38', label: 'Artifacts' },
              { value: '12', label: 'Team Members' },
              { value: '4', label: 'Sites' },
            ],
          },
          {
            blockType: 'features',
            heading: 'Key Insights',
            layout: 'list',
            items: [
              { heading: 'Trade Routes', description: 'Evidence of cross-region commerce.' },
              { heading: 'Material Studies', description: 'New pigment analysis techniques.' },
              { heading: 'Cultural Exchange', description: 'Shared motifs across regions.' },
            ],
          },
        ],
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
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Family Day Schedule',
            style: 'cards',
            columns: '2',
            items: [
              { heading: '10:00 AM', description: 'Interactive gallery tour.' },
              { heading: '12:00 PM', description: 'Storytelling in the courtyard.' },
              { heading: '2:00 PM', description: 'Hands-on art workshop.' },
              { heading: '4:00 PM', description: 'Live performance.' },
            ],
          },
        ],
      },
    ]

    for (const post of posts) {
      if (this.shouldSeedItem(post.slug)) {
        if (await this.checkIfExists('posts', post.slug)) {
          this.log(`Post "${post.title}" already exists, skipping.`)
          continue
        }
        await this.create('posts', {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          contentBlocks: post.contentBlocks,
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
        richContent: createRichTextParagraphs([
          'Experience a curated journey through Renaissance masterworks.',
          'Highlights include rare sketches, restored paintings, and interactive gallery talks.',
          'Timed entry is available throughout the exhibition run.',
        ]),
        eventType: 'exhibition',
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days from now
        venue: places['florence-italy'],
        capacity: 200,
        template: 'event',
        requiresRegistration: true,
        registrationUrl: 'https://example.com/renaissance-exhibition',
        price: { isFree: false, amount: 18, currency: 'GBP' },
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Exhibition Highlights',
            layout: 'grid',
            items: [
              { heading: 'Restored Panels', description: 'Recently conserved works revealed to the public.' },
              { heading: 'Expert Talks', description: 'Weekly curator-led walkthroughs.' },
              { heading: 'Interactive Stations', description: 'Hands-on exploration of technique.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'Visitor Snapshot',
            stats: [
              { value: '50+', label: 'Works Displayed' },
              { value: '12', label: 'Guest Lectures' },
              { value: '8', label: 'Weeks' },
            ],
          },
        ],
      },
      {
        title: 'Ancient Civilizations Workshop',
        slug: 'ancient-civilizations-workshop',
        excerpt: 'Hands-on workshop exploring artifacts and techniques from ancient civilizations.',
        richContent: createRichTextParagraphs([
          'Join our education team for a hands-on workshop inspired by ancient craftsmanship.',
          'Participants will explore materials, motifs, and techniques with guided instruction.',
          'All tools and materials provided.',
        ]),
        eventType: 'workshop',
        startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // 3 hours later
        venue: places['athens-greece'],
        capacity: 30,
        template: 'card',
        requiresRegistration: true,
        registrationUrl: 'https://example.com/ancient-workshop',
        price: { isFree: false, amount: 45, currency: 'GBP' },
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Workshop Modules',
            style: 'cards',
            columns: '2',
            items: [
              { heading: 'Clay & Pigments', description: 'Mix and apply natural pigments.' },
              { heading: 'Pattern Studies', description: 'Recreate common ancient motifs.' },
              { heading: 'Artifact Handling', description: 'Learn safe handling practices.' },
              { heading: 'Takeaway Guide', description: 'Templates and resources for later study.' },
            ],
          },
          {
            blockType: 'cta',
            heading: 'Reserve Your Spot',
            description: 'Limited capacity for this hands-on session.',
            links: [
              { label: 'Register Now', url: 'https://example.com/ancient-workshop', variant: 'primary' },
            ],
            backgroundColor: 'accent',
          },
        ],
      },
      {
        title: 'Museum Lecture Series: Art Through the Ages',
        slug: 'museum-lecture-series-art-ages',
        excerpt: 'Weekly lecture series exploring the evolution of art across different eras.',
        richContent: createRichTextParagraphs([
          'A six-part lecture series covering major movements in art history.',
          'Sessions include Q&A and curated reading lists.',
          'Attend in-person or stream live online.',
        ]),
        eventType: 'lecture',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        endDate: new Date(Date.now() + 49 * 24 * 60 * 60 * 1000).toISOString(), // 7 weeks later
        venue: places['rome-italy'],
        capacity: 100,
        template: 'calendar',
        requiresRegistration: true,
        registrationUrl: 'https://example.com/lecture-series',
        price: { isFree: true },
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Series Overview',
            stats: [
              { value: '6', label: 'Sessions' },
              { value: '3', label: 'Guest Speakers' },
              { value: '90m', label: 'Per Session' },
            ],
          },
          {
            blockType: 'faq',
            heading: 'Attendance Details',
            items: [
              { question: 'Is the series recorded?', answer: createRichText('Yes, recordings are provided within 48 hours.') },
              { question: 'Can I attend remotely?', answer: createRichText('Yes, livestream access is included with registration.') },
            ],
          },
        ],
      },
      {
        title: 'Family Day at the Museum',
        slug: 'family-day-museum',
        excerpt: 'Family-friendly activities, tours, and performances for all ages.',
        richContent: createRichTextParagraphs([
          'Bring the whole family for an afternoon of discovery.',
          'Enjoy interactive tours, crafts, and live performances.',
          'Activities are included with general admission.',
        ]),
        eventType: 'tour',
        startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(), // 5 hours later
        venue: places['paris-france'],
        capacity: 300,
        template: 'card',
        requiresRegistration: false,
        price: { isFree: true },
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'What\'s Included',
            layout: 'grid',
            items: [
              { heading: 'Interactive Tours', description: 'Guided walks with kid-friendly stories.' },
              { heading: 'Creative Stations', description: 'Hands-on art activities throughout the day.' },
              { heading: 'Live Performances', description: 'Short performances in the main hall.' },
            ],
          },
        ],
      },
      {
        title: 'Contemporary Art Opening',
        slug: 'contemporary-art-opening',
        excerpt: 'Opening night for our new contemporary art wing.',
        richContent: createRichTextParagraphs([
          'Celebrate the opening of our contemporary art wing.',
          'Evening includes live music, curator talks, and gallery previews.',
          'Refreshments provided while supplies last.',
        ]),
        eventType: 'opening',
        startDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // 4 hours later
        venue: places['paris-france'],
        capacity: 150,
        template: 'event',
        requiresRegistration: true,
        registrationUrl: 'https://example.com/contemporary-opening',
        price: { isFree: true },
        contentBlocks: [
          {
            blockType: 'testimonials',
            heading: 'Preview Notes',
            items: [
              { quote: 'A vibrant new chapter for contemporary practice.', name: 'Lia Perez', role: 'Curator' },
              { quote: 'An ambitious and immersive space for new voices.', name: 'Theo Morgan', role: 'Gallery Director' },
            ],
          },
        ],
      },
    ]

    for (const event of eventsData.slice(0, this.getItemCount('events', 5))) {
      if (!this.shouldSeedItem(event.slug)) {
        continue
      }
      if (await this.checkIfExists('events', event.slug)) {
        this.log(`Event "${event.title}" already exists, skipping.`)
        continue
      }
      await this.create('events', {
        title: event.title,
        slug: event.slug,
        excerpt: event.excerpt,
        richContent: event.richContent,
        contentBlocks: event.contentBlocks,
        eventType: event.eventType,
        startDate: event.startDate,
        endDate: event.endDate,
        venue: event.venue,
        capacity: event.capacity,
        requiresRegistration: event.requiresRegistration,
        registrationUrl: event.registrationUrl,
        price: event.price,
        template: event.template,
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
        richContent: createRichTextParagraphs([
          'A rare notebook showcasing Leonardo\'s detailed sketches and engineering studies.',
          'Pages feature anatomical notes, mechanical diagrams, and early experiments.',
        ]),
        dateCreated: 'circa 1490',
        dateAcquired: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Acquired from a private collection and authenticated in 1987.'),
        catalogNumber: 'ARC-1490-LEO',
        creators: [people['leonardo-da-vinci']].filter(Boolean),
        origins: [places['florence-italy']].filter(Boolean),
        specifications: {
          height: '32 cm',
          width: '22 cm',
          depth: '4 cm',
          weight: '1.4 kg',
          materials: 'Ink on paper, leather binding',
          condition: 'Excellent',
        },
        onDisplay: true,
        location: 'Gallery A - Renaissance',
        template: 'detail',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Notebook Highlights',
            layout: 'grid',
            items: [
              { heading: 'Anatomy Studies', description: 'Detailed muscle and skeletal drawings.' },
              { heading: 'Flight Concepts', description: 'Early glider and wing experiments.' },
              { heading: 'Hydraulic Designs', description: 'Schematics for pumps and canals.' },
            ],
          },
          {
            blockType: 'quote',
            quote: 'Learning never exhausts the mind.',
            author: 'Leonardo da Vinci',
            align: 'left',
          },
        ],
      },
      {
        title: 'Renaissance Painting Techniques Manual',
        slug: 'renaissance-painting-techniques-manual',
        excerpt: 'A comprehensive guide to painting techniques used during the Renaissance.',
        richContent: createRichTextParagraphs([
          'An instructional manual detailing pigment preparation and glazing methods.',
          'Includes diagrams and notes on underpainting techniques.',
        ]),
        dateCreated: 'circa 1520',
        dateAcquired: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Donated by the Florentine Academy in 1972.'),
        catalogNumber: 'ARC-1520-REN',
        origins: [places['florence-italy']].filter(Boolean),
        specifications: {
          height: '28 cm',
          width: '19 cm',
          depth: '3 cm',
          materials: 'Manuscript on parchment',
          condition: 'Good',
        },
        template: 'detail',
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Technique Index',
            description: 'Core practices referenced throughout the manual.',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'Gesso Prep', description: 'Preparing surfaces for paint layers.' },
              { heading: 'Glazing', description: 'Building depth through transparent layers.' },
              { heading: 'Pigment Mixing', description: 'Balancing mineral pigments and binders.' },
            ],
          },
        ],
      },
      {
        title: 'Ancient Roman Coin Collection',
        slug: 'ancient-roman-coin-collection',
        excerpt: 'A collection of coins from the Roman Empire period.',
        richContent: createRichTextParagraphs([
          'A curated selection of Roman coinage featuring emperors and civic iconography.',
          'Coins highlight shifts in political messaging across decades.',
        ]),
        dateCreated: '100-200 CE',
        dateAcquired: new Date(Date.now() - 1100 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Recovered during a 1924 archaeological survey.'),
        catalogNumber: 'ARC-0100-ROM',
        origins: [places['rome-italy']].filter(Boolean),
        specifications: {
          weight: '2.2 kg',
          materials: 'Silver, bronze',
          condition: 'Mixed',
        },
        template: 'gallery',
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Collection Scope',
            stats: [
              { value: '120', label: 'Coins' },
              { value: '18', label: 'Emperors' },
              { value: '5', label: 'Mints' },
            ],
          },
        ],
      },
      {
        title: 'Medieval Manuscript',
        slug: 'medieval-manuscript',
        excerpt: 'Illuminated manuscript from the medieval period.',
        richContent: createRichTextParagraphs([
          'Illuminated manuscript featuring elaborate marginalia and gold leaf.',
          'The text includes a liturgical calendar and devotional readings.',
        ]),
        dateCreated: 'circa 1200',
        dateAcquired: new Date(Date.now() - 820 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Transferred from the cathedral archive in 1964.'),
        catalogNumber: 'ARC-1200-MED',
        origins: [places['rome-italy']].filter(Boolean),
        specifications: {
          height: '35 cm',
          width: '25 cm',
          materials: 'Vellum, gold leaf, ink',
          condition: 'Very good',
        },
        template: 'detail',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Manuscript Details',
            layout: 'list',
            items: [
              { heading: 'Illumination', description: 'Gold leaf and vibrant pigments throughout.' },
              { heading: 'Script', description: 'Gothic textura with rubricated headings.' },
              { heading: 'Marginalia', description: 'Decorative and narrative motifs.' },
            ],
          },
        ],
      },
      {
        title: 'Victorian Era Photographs',
        slug: 'victorian-era-photographs',
        excerpt: 'Collection of photographs from the Victorian era.',
        richContent: createRichTextParagraphs([
          'A series of early photographs documenting industrial and social life.',
          'Includes portraits, cityscapes, and architectural studies.',
        ]),
        dateCreated: 'circa 1880',
        dateAcquired: new Date(Date.now() - 540 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Acquired from the Harrington Estate in 1999.'),
        catalogNumber: 'ARC-1880-VIC',
        origins: [places['paris-france']].filter(Boolean),
        specifications: {
          materials: 'Albumen prints on paper',
          condition: 'Good',
        },
        template: 'gallery',
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Series Themes',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'Portraits', description: 'Studio photography and formal attire.' },
              { heading: 'Industry', description: 'Factories, rail lines, and urban growth.' },
              { heading: 'Architecture', description: 'Public buildings and civic design.' },
            ],
          },
        ],
      },
      {
        title: 'Egyptian Funerary Mask',
        slug: 'egyptian-funerary-mask',
        excerpt: 'Gilded funerary mask from an Egyptian burial chamber.',
        richContent: createRichTextParagraphs([
          'A ceremonial mask crafted to honor the passage into the afterlife.',
          'Intricate inlay and pigment traces offer clues about workshop techniques.',
        ]),
        dateCreated: 'circa 1100 BCE',
        dateAcquired: new Date(Date.now() - 680 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Recovered during a documented excavation in 1952.'),
        catalogNumber: 'ARC-1100-EGY',
        origins: [places['cairo-egypt']].filter(Boolean),
        specifications: {
          height: '38 cm',
          width: '24 cm',
          materials: 'Gold leaf, wood, pigment',
          condition: 'Good',
        },
        template: 'detail',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Mask Details',
            layout: 'grid',
            items: [
              { heading: 'Craftsmanship', description: 'Layered gilding with carved detailing.' },
              { heading: 'Symbolism', description: 'Protective motifs and dynastic markings.' },
              { heading: 'Preservation', description: 'Stable despite minor pigment loss.' },
            ],
          },
        ],
      },
      {
        title: 'Byzantine Mosaic Panel',
        slug: 'byzantine-mosaic-panel',
        excerpt: 'Mosaic panel depicting a ceremonial procession.',
        richContent: createRichTextParagraphs([
          'A fragment from a larger architectural mosaic cycle.',
          'Glass tesserae and gold leaf create vibrant depth and texture.',
        ]),
        dateCreated: 'circa 950',
        dateAcquired: new Date(Date.now() - 940 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Transferred from a private monastery collection.'),
        catalogNumber: 'ARC-0950-BYZ',
        origins: [places['rome-italy']].filter(Boolean),
        specifications: {
          height: '52 cm',
          width: '40 cm',
          materials: 'Glass tesserae, stone, gold leaf',
          condition: 'Very good',
        },
        template: 'detail',
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Panel Summary',
            stats: [
              { value: '2', label: 'Restoration Passes' },
              { value: '18k', label: 'Tesserae' },
              { value: '1', label: 'Fragment' },
            ],
          },
        ],
      },
      {
        title: 'Islamic Astronomical Chart',
        slug: 'islamic-astronomical-chart',
        excerpt: 'Hand-inked star chart from a medieval observatory.',
        richContent: createRichTextParagraphs([
          'Annotated chart mapping constellations and seasonal movements.',
          'Marginal notes reflect early mathematical instruments and calculations.',
        ]),
        dateCreated: 'circa 1420',
        dateAcquired: new Date(Date.now() - 510 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Acquired through a scholarly exchange in 2004.'),
        catalogNumber: 'ARC-1420-AST',
        origins: [places['cairo-egypt']].filter(Boolean),
        specifications: {
          height: '42 cm',
          width: '32 cm',
          materials: 'Ink on parchment',
          condition: 'Excellent',
        },
        template: 'detail',
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Chart Features',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'Constellations', description: 'Named star groupings with annotations.' },
              { heading: 'Instruments', description: 'Referenced astrolabe markings.' },
              { heading: 'Margins', description: 'Notes on seasonal observations.' },
            ],
          },
        ],
      },
      {
        title: 'Japanese Woodblock Prints',
        slug: 'japanese-woodblock-prints',
        excerpt: 'Series of Edo-period woodblock prints.',
        richContent: createRichTextParagraphs([
          'A curated set of ukiyo-e prints depicting landscapes and daily life.',
          'Color layering showcases masterful printmaking techniques.',
        ]),
        dateCreated: 'circa 1780',
        dateAcquired: new Date(Date.now() - 460 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Donated by the Nakamura Collection in 1996.'),
        catalogNumber: 'ARC-1780-JPN',
        origins: [places['paris-france']].filter(Boolean),
        specifications: {
          height: '30 cm',
          width: '22 cm',
          materials: 'Ink on paper',
          condition: 'Good',
        },
        template: 'gallery',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Print Highlights',
            layout: 'list',
            items: [
              { heading: 'Landscape', description: 'Seasonal scenes with atmospheric color.' },
              { heading: 'Portraiture', description: 'Depictions of theater and city life.' },
              { heading: 'Technique', description: 'Multiple blocks for layered pigment.' },
            ],
          },
        ],
      },
      {
        title: 'Aztec Ceremonial Knife',
        slug: 'aztec-ceremonial-knife',
        excerpt: 'Obsidian-bladed ceremonial knife with carved handle.',
        richContent: createRichTextParagraphs([
          'Ritual knife featuring intricate carving and symbolic motifs.',
          'Obsidian edge remains remarkably sharp.',
        ]),
        dateCreated: 'circa 1480',
        dateAcquired: new Date(Date.now() - 370 * 24 * 60 * 60 * 1000).toISOString(),
        provenance: createRichText('Catalogued during a museum exchange in 1981.'),
        catalogNumber: 'ARC-1480-AZT',
        origins: [places['athens-greece']].filter(Boolean),
        specifications: {
          height: '24 cm',
          width: '6 cm',
          materials: 'Obsidian, carved wood',
          condition: 'Good',
        },
        template: 'detail',
        contentBlocks: [
          {
            blockType: 'quote',
            quote: 'Ceremonial tools carried both practical and symbolic meaning.',
            author: 'Archive Curator',
            align: 'left',
          },
        ],
      },
    ]

    for (const item of archiveItemsData.slice(0, this.getItemCount('archive-items', 10))) {
      if (!this.shouldSeedItem(item.slug)) {
        continue
      }
      if (await this.checkIfExists('archive-items', item.slug)) {
        this.log(`Archive item "${item.title}" already exists, skipping.`)
        continue
      }
      await this.create('archive-items', {
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        richContent: item.richContent,
        contentBlocks: item.contentBlocks,
        specifications: item.specifications,
        dateCreated: item.dateCreated,
        dateAcquired: item.dateAcquired,
        provenance: item.provenance,
        catalogNumber: item.catalogNumber,
        creators: item.creators,
        origins: item.origins,
        onDisplay: item.onDisplay,
        location: item.location,
        template: item.template,
        _status: 'published',
      })
    }
  }
}

export default CoreSeeder
