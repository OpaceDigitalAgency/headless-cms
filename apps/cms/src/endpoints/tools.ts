import type { Endpoint, Payload } from 'payload'
import type { Field } from 'payload'

const adminRoles = new Set(['admin', 'editor'])

const ensureAdmin = (req: any) => {
  if (!req.user || !adminRoles.has(req.user.role)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

const fetchAllDocs = async <T = any>(payload: Payload, collection: string, where: any = undefined) => {
  const docs: T[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const result = await payload.find({
      collection,
      where,
      depth: 0,
      limit: 100,
      page,
    })

    docs.push(...(result.docs as T[]))
    totalPages = result.totalPages || 1
    page += 1
  }

  return docs
}

const getCollectionLabel = (payload: Payload, slug: string) => {
  const collection = payload.config.collections.find((item) => item.slug === slug)
  return collection?.labels?.plural || collection?.labels?.singular || slug
}

const getTitleValue = (doc: Record<string, any>) => {
  return doc.title || doc.name || doc.slug || doc.email || doc.id || 'Untitled'
}

const extractMediaIDs = (value: any, ids: Set<number>) => {
  if (!value && value !== 0) return
  if (Array.isArray(value)) {
    value.forEach((item) => extractMediaIDs(item, ids))
    return
  }
  if (typeof value === 'number') {
    ids.add(value)
    return
  }
  if (typeof value === 'object') {
    if (typeof value.id === 'number') {
      ids.add(value.id)
      return
    }
    if ('value' in value && typeof value.value === 'number') {
      ids.add(value.value)
      return
    }
  }
}

const collectMediaIDsFromFields = (fields: Field[], data: Record<string, any>, ids: Set<number>) => {
  fields.forEach((field) => {
    if (!field || typeof field !== 'object') return

    switch (field.type) {
      case 'upload':
      case 'relationship': {
        const relationTo = (field as any).relationTo
        const targets = Array.isArray(relationTo) ? relationTo : [relationTo]
        if (targets.includes('media')) {
          const value = data[field.name as string]
          extractMediaIDs(value, ids)
        }
        return
      }
      case 'array': {
        const rows = data[field.name as string]
        if (Array.isArray(rows) && Array.isArray((field as any).fields)) {
          rows.forEach((row) => collectMediaIDsFromFields((field as any).fields, row || {}, ids))
        }
        return
      }
      case 'group':
      case 'collapsible': {
        const groupValue = data[field.name as string] || {}
        if (Array.isArray((field as any).fields)) {
          collectMediaIDsFromFields((field as any).fields, groupValue, ids)
        }
        return
      }
      case 'row': {
        if (Array.isArray((field as any).fields)) {
          collectMediaIDsFromFields((field as any).fields, data, ids)
        }
        return
      }
      case 'tabs': {
        const tabs = (field as any).tabs || []
        tabs.forEach((tab: any) => {
          const tabValue = tab.name ? data[tab.name] || {} : data
          if (Array.isArray(tab.fields)) {
            collectMediaIDsFromFields(tab.fields, tabValue, ids)
          }
        })
        return
      }
      case 'blocks': {
        const blocks = data[field.name as string]
        if (!Array.isArray(blocks)) return
        const blockConfigs = (field as any).blocks || []
        blocks.forEach((block) => {
          const blockConfig = blockConfigs.find((config: any) => config.slug === block.blockType)
          if (blockConfig && Array.isArray(blockConfig.fields)) {
            collectMediaIDsFromFields(blockConfig.fields, block, ids)
          }
        })
        return
      }
      default:
        return
    }
  })
}

const collectionsWithDrafts = (payload: Payload) =>
  payload.config.collections
    .filter((collection) => collection?.versions?.drafts)
    .map((collection) => collection.slug)

const collectionsWithPublishedAt = ['pages', 'posts', 'custom-items']

const collectionsWithSeoMeta = ['pages', 'posts', 'people', 'places', 'custom-items', 'product-collections']

const searchCollections = ['pages', 'posts', 'archive-items', 'people', 'places', 'events', 'products', 'custom-items', 'content-types']

const filterExistingCollections = (payload: Payload, slugs: string[]) => {
  const available = new Set(payload.config.collections.map((collection) => collection.slug))
  return slugs.filter((slug) => available.has(slug))
}

export const toolsEndpoints: Endpoint[] = [
  {
    path: '/admin/tools/drafts',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req

      const collectionSlugs = collectionsWithDrafts(payload)
      const results: any[] = []

      for (const slug of collectionSlugs) {
        const docs = await fetchAllDocs(payload, slug, {
          _status: { equals: 'draft' },
        })

        docs.forEach((doc: any) => {
          results.push({
            id: doc.id,
            title: getTitleValue(doc),
            collection: slug,
            collectionLabel: getCollectionLabel(payload, slug),
            updatedAt: doc.updatedAt,
            href: `/admin/collections/${slug}/${doc.id}`,
          })
        })
      }

      results.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

      return Response.json({
        total: results.length,
        items: results,
      })
    },
  },
  {
    path: '/admin/tools/publishing-calendar',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const url = new URL(req.url, 'http://localhost')
      const start = url.searchParams.get('start')
      const end = url.searchParams.get('end')

      const startDate = start ? new Date(start) : new Date()
      const endDate = end ? new Date(end) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

      const items: any[] = []

      const collectionSlugs = filterExistingCollections(payload, collectionsWithPublishedAt)

      for (const slug of collectionSlugs) {
        const docs = await fetchAllDocs(payload, slug, {
          publishedAt: {
            greater_than_equal: startDate.toISOString(),
            less_than_equal: endDate.toISOString(),
          },
        })

        docs.forEach((doc: any) => {
          if (!doc.publishedAt) return
          items.push({
            id: doc.id,
            title: getTitleValue(doc),
            collection: slug,
            collectionLabel: getCollectionLabel(payload, slug),
            publishedAt: doc.publishedAt,
            status: doc._status || 'draft',
            href: `/admin/collections/${slug}/${doc.id}`,
          })
        })
      }

      items.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())

      return Response.json({
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        total: items.length,
        items,
      })
    },
  },
  {
    path: '/admin/tools/seo-audit',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const items: any[] = []

      const collectionSlugs = filterExistingCollections(payload, collectionsWithSeoMeta)

      for (const slug of collectionSlugs) {
        const docs = await fetchAllDocs(payload, slug)

        docs.forEach((doc: any) => {
          const meta = doc.meta || {}
          const missingTitle = !meta.title
          const missingDescription = !meta.description

          if (!missingTitle && !missingDescription) return

          items.push({
            id: doc.id,
            title: getTitleValue(doc),
            collection: slug,
            collectionLabel: getCollectionLabel(payload, slug),
            missingTitle,
            missingDescription,
            href: `/admin/collections/${slug}/${doc.id}`,
          })
        })
      }

      return Response.json({
        total: items.length,
        items,
      })
    },
  },
  {
    path: '/admin/tools/media-usage',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const mediaDocs = await fetchAllDocs<any>(payload, 'media')
      const mediaIDs = new Set(mediaDocs.map((doc) => doc.id).filter((id) => typeof id === 'number'))
      const usedIDs = new Set<number>()

      for (const collection of payload.config.collections) {
        if (collection.slug === 'media') continue
        const docs = await fetchAllDocs(payload, collection.slug)
        docs.forEach((doc: any) => {
          collectMediaIDsFromFields(collection.fields || [], doc, usedIDs)
        })
      }

      for (const global of payload.config.globals) {
        const globalDoc = await payload.findGlobal({ slug: global.slug, depth: 0 }).catch(() => null)
        if (globalDoc) {
          collectMediaIDsFromFields(global.fields || [], globalDoc as any, usedIDs)
        }
      }

      const unused = mediaDocs.filter((doc) => !usedIDs.has(doc.id))

      return Response.json({
        total: unused.length,
        items: unused.map((doc) => ({
          id: doc.id,
          filename: doc.filename,
          alt: doc.alt || null,
          filesize: doc.filesize || null,
          mimeType: doc.mimeType || null,
          updatedAt: doc.updatedAt,
          href: `/admin/collections/media/${doc.id}`,
        })),
      })
    },
  },
  {
    path: '/admin/tools/large-files',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const url = new URL(req.url, 'http://localhost')
      const minSize = Number(url.searchParams.get('minSize') || 5 * 1024 * 1024)

      const docs = await fetchAllDocs<any>(payload, 'media', {
        filesize: { greater_than_equal: minSize },
      })

      docs.sort((a, b) => (b.filesize || 0) - (a.filesize || 0))

      return Response.json({
        minSize,
        total: docs.length,
        items: docs.map((doc) => ({
          id: doc.id,
          filename: doc.filename,
          filesize: doc.filesize || 0,
          mimeType: doc.mimeType || null,
          updatedAt: doc.updatedAt,
          href: `/admin/collections/media/${doc.id}`,
        })),
      })
    },
  },
  {
    path: '/admin/tools/forms-summary',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const forms = await fetchAllDocs<any>(payload, 'forms')
      const results = []

      for (const form of forms) {
        const submissions = await payload.find({
          collection: 'form-submissions',
          where: { form: { equals: form.id } },
          limit: 1,
        })

        results.push({
          id: form.id,
          title: form.title || `Form ${form.id}`,
          updatedAt: form.updatedAt,
          submissionCount: submissions.totalDocs || 0,
          href: `/admin/collections/forms/${form.id}`,
        })
      }

      results.sort((a, b) => a.title.localeCompare(b.title))

      return Response.json({
        total: results.length,
        items: results,
      })
    },
  },
  {
    path: '/admin/tools/form-submissions-export',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const url = new URL(req.url, 'http://localhost')
      const formId = url.searchParams.get('form')

      const where = formId ? { form: { equals: formId } } : undefined
      const submissions = await fetchAllDocs<any>(payload, 'form-submissions', where)

      const header = ['id', 'form', 'createdAt', 'field', 'value']
      const lines = [header.join(',')]

      submissions.forEach((submission) => {
        const base = [submission.id, submission.form, submission.createdAt]
        const rows = Array.isArray(submission.submissionData) ? submission.submissionData : []
        if (!rows.length) {
          lines.push([...base, '', ''].map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
        } else {
          rows.forEach((row: any) => {
            lines.push(
              [...base, row.field || '', row.value || '']
                .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
                .join(',')
            )
          })
        }
      })

      return new Response(lines.join('\n'), {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="form-submissions.csv"',
        },
      })
    },
  },
  {
    path: '/admin/tools/search-index-summary',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const summary = await payload.find({
        collection: 'search',
        limit: 1,
        sort: '-updatedAt',
      })

      const latest = summary.docs[0]

      return Response.json({
        total: summary.totalDocs || 0,
        latestUpdatedAt: latest?.updatedAt || null,
        searchCollections: filterExistingCollections(payload, searchCollections),
        reindexEndpoint: '/api/search/reindex',
      })
    },
  },
]

export default toolsEndpoints
