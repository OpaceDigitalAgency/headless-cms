/**
 * Payload REST Loader for Astro (SSG)
 *
 * Fetches data from the CMS REST API to avoid local DB access during builds.
 */

const CMS_URL =
  process.env.PUBLIC_CMS_URL ||
  process.env.CMS_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  'http://localhost:3000';

type FindOptions = {
  limit?: number;
  depth?: number;
  draft?: boolean;
  sort?: string;
  where?: Record<string, unknown>;
};

function appendParams(
  params: URLSearchParams,
  prefix: string,
  value: unknown
) {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      appendParams(params, `${prefix}[${index}]`, entry);
    });
    return;
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, entry]) => {
      appendParams(params, `${prefix}[${key}]`, entry);
    });
    return;
  }

  params.append(prefix, String(value));
}

function buildQuery(options?: FindOptions) {
  const params = new URLSearchParams();

  if (!options) {
    return params;
  }

  if (typeof options.limit === 'number') {
    params.set('limit', String(options.limit));
  }

  if (typeof options.depth === 'number') {
    params.set('depth', String(options.depth));
  }

  if (typeof options.draft === 'boolean') {
    params.set('draft', String(options.draft));
  }

  if (options.sort) {
    params.set('sort', options.sort);
  }

  if (options.where) {
    appendParams(params, 'where', options.where);
  }

  return params;
}

async function fetchJson(path: string, params?: URLSearchParams) {
  const url = new URL(path, CMS_URL);
  if (params && params.toString()) {
    url.search = params.toString();
  }

  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Payload API error ${response.status}: ${text}`);
  }

  return response.json();
}

async function fetchCollection(collection: string, options?: FindOptions) {
  const params = buildQuery(options);
  return fetchJson(`/api/${collection}`, params);
}

async function fetchGlobal(slug: string) {
  return fetchJson(`/api/globals/${slug}`);
}

/**
 * Fetch all published pages
 */
export async function getPages(options?: { limit?: number; draft?: boolean }) {
  return fetchCollection('pages', {
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string, options?: { draft?: boolean }) {
  const result = await fetchCollection('pages', {
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published posts
 */
export async function getPosts(options?: { limit?: number; draft?: boolean }) {
  return fetchCollection('posts', {
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    depth: 2,
  });
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string, options?: { draft?: boolean }) {
  const result = await fetchCollection('posts', {
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published archive items
 */
export async function getArchiveItems(options?: { limit?: number; draft?: boolean }) {
  return fetchCollection('archive-items', {
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single archive item by slug
 */
export async function getArchiveItemBySlug(slug: string, options?: { draft?: boolean }) {
  const result = await fetchCollection('archive-items', {
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published people
 */
export async function getPeople(options?: { limit?: number; draft?: boolean }) {
  return fetchCollection('people', {
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single person by slug
 */
export async function getPersonBySlug(slug: string, options?: { draft?: boolean }) {
  const result = await fetchCollection('people', {
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all content types
 */
export async function getContentTypes() {
  return fetchCollection('content-types', {
    limit: 100,
    depth: 1,
  });
}

/**
 * Fetch content type by slug
 */
export async function getContentTypeBySlug(slug: string) {
  const result = await fetchCollection('content-types', {
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  });

  return result.docs[0] || null;
}

export async function getContentTypeBySlugOrArchiveSlug(slug: string) {
  const archiveSlug = slug.startsWith('items/') ? slug : `items/${slug}`;

  const result = await fetchCollection('content-types', {
    where: {
      or: [
        { slug: { equals: slug } },
        { archiveSlug: { equals: archiveSlug } },
      ],
    },
    depth: 1,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch custom items by content type id
 */
export async function getCustomItemsByType(contentTypeId: string, options?: { limit?: number }) {
  return fetchCollection('custom-items', {
    limit: options?.limit || 100,
    where: {
      contentType: {
        equals: contentTypeId,
      },
      status: {
        equals: 'published',
      },
    },
    sort: '-updatedAt',
    depth: 2,
  });
}

/**
 * Fetch custom item by slug and content type id
 */
export async function getCustomItemBySlug(slug: string, contentTypeId: string) {
  const result = await fetchCollection('custom-items', {
    where: {
      slug: {
        equals: slug,
      },
      contentType: {
        equals: contentTypeId,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published places
 */
export async function getPlaces(options?: { limit?: number; draft?: boolean }) {
  return fetchCollection('places', {
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single place by slug
 */
export async function getPlaceBySlug(slug: string, options?: { draft?: boolean }) {
  const result = await fetchCollection('places', {
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch global settings
 */
export async function getSettings() {
  return fetchGlobal('settings');
}

/**
 * Fetch header global
 */
export async function getHeader() {
  return fetchGlobal('header');
}

/**
 * Fetch footer global
 */
export async function getFooter() {
  return fetchGlobal('footer');
}

/**
 * Fetch categories
 */
export async function getCategories(options?: { limit?: number }) {
  return fetchCollection('categories', {
    limit: options?.limit || 100,
    depth: 1,
  });
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const result = await fetchCollection('categories', {
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch tags
 */
export async function getTags(options?: { limit?: number }) {
  return fetchCollection('tags', {
    limit: options?.limit || 100,
  });
}

/**
 * Fetch a single tag by slug
 */
export async function getTagBySlug(slug: string) {
  const result = await fetchCollection('tags', {
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all content across collections for a specific category
 */
export async function getCategoryContent(slug: string) {
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return null;
  }

  const [posts, archiveItems, events, people, customItems] = await Promise.all([
    fetchCollection('posts', {
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    fetchCollection('archive-items', {
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    fetchCollection('events', {
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    fetchCollection('people', {
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-updatedAt',
    }),
    fetchCollection('custom-items', {
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
  ]);

  const allContent = [
    ...posts.docs.map((doc: any) => ({ ...doc, collection: 'posts' })),
    ...archiveItems.docs.map((doc: any) => ({ ...doc, collection: 'archive-items' })),
    ...events.docs.map((doc: any) => ({ ...doc, collection: 'events' })),
    ...people.docs.map((doc: any) => ({ ...doc, collection: 'people' })),
    ...customItems.docs.map((doc: any) => ({ ...doc, collection: 'custom-items' })),
  ];

  allContent.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.updatedAt).getTime();
    const dateB = new Date(b.publishedAt || b.updatedAt).getTime();
    return dateB - dateA;
  });

  return {
    category,
    content: allContent,
    counts: {
      total: allContent.length,
      posts: posts.docs.length,
      archiveItems: archiveItems.docs.length,
      events: events.docs.length,
      people: people.docs.length,
      customItems: customItems.docs.length,
    },
  };
}

/**
 * Fetch all content across collections for a specific tag
 */
export async function getTagContent(slug: string) {
  const tag = await getTagBySlug(slug);
  if (!tag) {
    return null;
  }

  const [posts, archiveItems, events, people, customItems] = await Promise.all([
    fetchCollection('posts', {
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    fetchCollection('archive-items', {
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    fetchCollection('events', {
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    fetchCollection('people', {
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-updatedAt',
    }),
    fetchCollection('custom-items', {
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
  ]);

  const allContent = [
    ...posts.docs.map((doc: any) => ({ ...doc, collection: 'posts' })),
    ...archiveItems.docs.map((doc: any) => ({ ...doc, collection: 'archive-items' })),
    ...events.docs.map((doc: any) => ({ ...doc, collection: 'events' })),
    ...people.docs.map((doc: any) => ({ ...doc, collection: 'people' })),
    ...customItems.docs.map((doc: any) => ({ ...doc, collection: 'custom-items' })),
  ];

  allContent.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.updatedAt).getTime();
    const dateB = new Date(b.publishedAt || b.updatedAt).getTime();
    return dateB - dateA;
  });

  return {
    tag,
    content: allContent,
    counts: {
      total: allContent.length,
      posts: posts.docs.length,
      archiveItems: archiveItems.docs.length,
      events: events.docs.length,
      people: people.docs.length,
      customItems: customItems.docs.length,
    },
  };
}
