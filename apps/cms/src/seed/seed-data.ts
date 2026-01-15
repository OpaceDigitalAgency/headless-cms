import type { Payload } from 'payload'

/**
 * Lightweight seed function for use by the admin reset button
 * Creates basic sample data without downloading external images
 */
export async function seedBasicData(payload: Payload): Promise<void> {
  payload.logger.info('Starting basic data seed...')

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
          subheading: 'Discover our collection of artifacts, people, and places',
          style: 'fullWidth',
        },
        {
          blockType: 'content',
          columns: 'oneColumn',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Explore our extensive collection of historical artifacts and learn about the people and places that shaped history.' }],
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
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
          columns: 'oneColumn',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: 'We are dedicated to preserving and sharing cultural heritage through our museum collection.' }],
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
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

  // Create sample artifact
  await payload.create({
    collection: 'artifacts',
    data: {
      name: 'Ancient Pottery Vessel',
      slug: 'ancient-pottery-vessel',
      shortDescription: 'A beautifully preserved pottery vessel from the ancient world.',
      _status: 'published',
      dateCreated: '500 BCE',
      period: 'Classical Period',
      materials: [{ material: 'Clay' }, { material: 'Natural pigments' }],
      dimensions: {
        height: 30,
        width: 20,
        depth: 20,
        unit: 'cm',
      },
      provenance: 'Discovered during archaeological excavations in the Mediterranean region.',
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
        { link: { type: 'custom', label: 'Artifacts', url: '/artifacts' } },
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
            { link: { type: 'custom', label: 'Artifacts', url: '/artifacts' } },
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
      siteDescription: 'Explore our collection of historical artifacts, people, and places.',
    },
  })

  payload.logger.info('Basic data seed completed!')
}
