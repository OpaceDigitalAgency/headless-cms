// @ts-nocheck
import type { Endpoint, Payload } from 'payload'
import { seoCollectionSlugs } from '../lib/seo/seoCollections'

const adminRoles = new Set(['admin'])
const MAX_META_TITLE_LENGTH = 300
const MAX_META_DESCRIPTION_LENGTH = 1000

const ensureAdmin = (req: any) => {
  if (!req.user || !adminRoles.has(req.user.role)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

const fetchAllDocs = async <T = any>(payload: Payload, collection: string) => {
  const docs: T[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const result = await payload.find({
      collection,
      depth: 0,
      limit: 200,
      page,
      overrideAccess: true,
    })

    docs.push(...(result.docs as T[]))
    totalPages = result.totalPages || 1
    page += 1
  }

  return docs
}

const resolveTitleField = (collection: any) => {
  if (collection?.admin?.useAsTitle) {
    return collection.admin.useAsTitle
  }
  if (collection?.slug === 'people' || collection?.slug === 'places') {
    return 'name'
  }
  return 'title'
}

const resolveDocTitle = (doc: Record<string, any>, titleField: string) => {
  return doc?.[titleField] || doc?.title || doc?.name || doc?.slug || doc?.id || 'Untitled'
}

const buildSlugPath = (collectionSlug: string, slugValue: string | undefined, typeSlug?: string) => {
  const slug = slugValue ? String(slugValue) : ''
  if (collectionSlug === 'pages') {
    return slug === 'home' ? '/' : `/${slug}`
  }
  if (collectionSlug === 'custom-items') {
    if (typeSlug) {
      return `/items/${typeSlug}/${slug}`
    }
    return `/items/${slug}`
  }
  if (collectionSlug === 'content-types') {
    return `/items/${slug}`
  }
  return `/${collectionSlug}/${slug}`
}

const parseSeoId = (id: string) => {
  const [collection, rawId] = id.split(':')
  if (!collection || !rawId) {
    return null
  }
  const numericId = Number(rawId)
  const parsedId = Number.isNaN(numericId) ? rawId : numericId
  return { collection, id: parsedId }
}

const normalizeMetaValue = (value: any) => {
  if (value === undefined) return undefined
  if (value === null) return null
  const trimmed = String(value).trim()
  return trimmed.length === 0 ? null : trimmed
}

const validateSeoFields = (metaTitle: string | null | undefined, metaDescription: string | null | undefined) => {
  if (metaTitle && metaTitle.length > MAX_META_TITLE_LENGTH) {
    return `Meta title exceeds ${MAX_META_TITLE_LENGTH} characters.`
  }
  if (metaDescription && metaDescription.length > MAX_META_DESCRIPTION_LENGTH) {
    return `Meta description exceeds ${MAX_META_DESCRIPTION_LENGTH} characters.`
  }
  return null
}

const getContentTypeMaps = async (payload: Payload) => {
  const docs = await payload
    .find({
      collection: 'content-types',
      limit: 200,
      depth: 0,
      overrideAccess: true,
    })
    .then((result) => result.docs || [])
    .catch(() => [])

  const slugById = new Map<string | number, string>()
  const idBySlug = new Map<string, string | number>()

  docs.forEach((doc: any) => {
    if (!doc?.id || !doc?.slug) return
    slugById.set(doc.id, doc.slug)
    idBySlug.set(String(doc.slug), doc.id)
  })

  return { slugById, idBySlug }
}

const resolveTypeLabel = (collectionSlug: string, doc: any, contentTypeMap: Map<string | number, string>) => {
  if (collectionSlug !== 'custom-items') {
    return collectionSlug
  }
  const contentType = doc?.contentType
  if (contentType && typeof contentType === 'object' && contentType.slug) {
    return contentType.slug
  }
  if (contentType && contentTypeMap.has(contentType)) {
    return contentTypeMap.get(contentType) || collectionSlug
  }
  return collectionSlug
}

const resolveCollectionSlugs = (payload: Payload) => {
  const available = new Set(payload.config.collections.map((collection) => collection.slug))
  return seoCollectionSlugs.filter((slug) => available.has(slug))
}

const createSeoItem = (
  collectionSlug: string,
  doc: Record<string, any>,
  titleField: string,
  contentTypeMap: Map<string | number, string>
) => {
  const typeLabel = resolveTypeLabel(collectionSlug, doc, contentTypeMap)
  const slugValue = doc?.slug || doc?.id
  const slugPath = buildSlugPath(collectionSlug, slugValue, typeLabel !== collectionSlug ? typeLabel : undefined)
  const metaTitle = doc?.meta?.title ?? null
  const metaDescription = doc?.meta?.description ?? null
  const updatedAt = doc?.updatedAt || doc?.createdAt || null
  const lockVersion = updatedAt ? new Date(updatedAt).getTime() : 0

  return {
    id: `${collectionSlug}:${doc?.id}`,
    type: typeLabel,
    h1: resolveDocTitle(doc, titleField),
    slug: slugPath,
    metaTitle,
    metaDescription,
    updatedAt,
    lockVersion,
  }
}

const applyFilters = (items: any[], filters: {
  query?: string
  type?: string
  missingTitle?: boolean
  missingDesc?: boolean
}) => {
  let result = items

  if (filters.type) {
    result = result.filter((item) => item.type === filters.type)
  }

  if (filters.missingTitle) {
    result = result.filter((item) => !item.metaTitle || String(item.metaTitle).trim().length === 0)
  }

  if (filters.missingDesc) {
    result = result.filter((item) => !item.metaDescription || String(item.metaDescription).trim().length === 0)
  }

  if (filters.query) {
    const query = filters.query.toLowerCase()
    result = result.filter((item) => {
      return [
        item.h1,
        item.slug,
        item.metaTitle,
        item.metaDescription,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    })
  }

  return result
}

const applySort = (items: any[], sortBy: string, sortDir: 'asc' | 'desc') => {
  const direction = sortDir === 'desc' ? -1 : 1
  const getValue = (item: any) => {
    switch (sortBy) {
      case 'h1':
        return item.h1 || ''
      case 'slug':
        return item.slug || ''
      case 'metaTitle':
        return item.metaTitle || ''
      case 'metaDescription':
        return item.metaDescription || ''
      case 'updatedAt':
        return item.updatedAt || ''
      default:
        return item.updatedAt || ''
    }
  }

  return [...items].sort((a, b) => {
    const aValue = getValue(a)
    const bValue = getValue(b)
    return aValue.localeCompare(bValue, undefined, { numeric: true }) * direction
  })
}

export const seoEndpoints: Endpoint[] = [
  {
    path: '/admin/seo/content',
    method: 'get',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const url = new URL(req.url)
      const query = url.searchParams.get('q')?.trim() || ''
      const type = url.searchParams.get('type') || undefined
      const missingTitle = url.searchParams.get('missingTitle') === 'true'
      const missingDesc = url.searchParams.get('missingDesc') === 'true'
      const sortByParam = url.searchParams.get('sortBy') || 'updatedAt'
      const allowedSorts = new Set(['h1', 'slug', 'metaTitle', 'metaDescription', 'updatedAt'])
      const sortBy = allowedSorts.has(sortByParam) ? sortByParam : 'updatedAt'
      const sortDir = url.searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc'
      const page = Math.max(1, Number(url.searchParams.get('page') || 1))
      const pageSize = Math.max(1, Number(url.searchParams.get('pageSize') || 25))

      const { payload } = req
      const { slugById } = await getContentTypeMaps(payload)
      const collectionSlugs = resolveCollectionSlugs(payload)
      const items: any[] = []

      for (const slug of collectionSlugs) {
        const collection = payload.config.collections.find((item) => item.slug === slug)
        if (!collection) continue
        const titleField = resolveTitleField(collection)
        const docs = await fetchAllDocs(payload, slug)
        docs.forEach((doc) => {
          items.push(createSeoItem(slug, doc as Record<string, any>, titleField, slugById))
        })
      }

      const types = Array.from(new Set(items.map((item) => item.type))).sort()
      const filtered = applyFilters(items, { query, type, missingTitle, missingDesc })
      const sorted = applySort(filtered, sortBy, sortDir)
      const start = (page - 1) * pageSize
      const paged = sorted.slice(start, start + pageSize)

      return Response.json({
        items: paged,
        total: filtered.length,
        types,
      })
    },
  },
  {
    path: '/admin/seo/content/:id',
    method: 'patch',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const body = (await req.json?.()) || {}
      const { id } = req.params || {}
      const parsed = parseSeoId(id)
      if (!parsed) {
        return Response.json({ error: 'Invalid ID' }, { status: 400 })
      }

      const { collection, id: docId } = parsed
      const metaTitle = normalizeMetaValue(body.metaTitle)
      const metaDescription = normalizeMetaValue(body.metaDescription)
      const lockVersion = Number(body.lockVersion)
      const type = body.type ? String(body.type) : undefined

      if (Number.isNaN(lockVersion)) {
        return Response.json({ error: 'validation', message: 'lockVersion is required.' }, { status: 400 })
      }

      const validationError = validateSeoFields(metaTitle ?? undefined, metaDescription ?? undefined)
      if (validationError) {
        return Response.json({ error: 'validation', message: validationError }, { status: 400 })
      }

      const doc = await payload.findByID({
        collection,
        id: docId,
        depth: 0,
        overrideAccess: true,
      })

      const currentLock = doc?.updatedAt ? new Date(doc.updatedAt).getTime() : 0
      if (!Number.isNaN(lockVersion) && lockVersion !== currentLock) {
        return Response.json({ error: 'conflict', message: 'Content updated elsewhere.' }, { status: 409 })
      }

      const data: Record<string, any> = {}
      if (metaTitle !== undefined || metaDescription !== undefined) {
        data.meta = {
          ...(doc?.meta || {}),
          ...(metaTitle !== undefined ? { title: metaTitle } : {}),
          ...(metaDescription !== undefined ? { description: metaDescription } : {}),
        }
      }

      if (type && collection === 'custom-items') {
        const { idBySlug } = await getContentTypeMaps(payload)
        const nextContentType = idBySlug.get(type)
        if (!nextContentType) {
          return Response.json({ error: 'validation', message: 'Invalid content type.' }, { status: 400 })
        }
        data.contentType = nextContentType
      } else if (type && type !== collection) {
        return Response.json({ error: 'validation', message: 'Type changes are only supported for custom items.' }, { status: 400 })
      }

      const updated = await payload.update({
        collection,
        id: docId,
        data,
        depth: 0,
        overrideAccess: true,
      })

      payload.logger.info(`SEO update: ${collection}:${docId} by ${req.user?.email || req.user?.id}`)

      return Response.json({
        ok: true,
        item: {
          id: `${collection}:${updated.id}`,
          lockVersion: updated?.updatedAt ? new Date(updated.updatedAt).getTime() : 0,
          updatedAt: updated?.updatedAt || null,
          metaTitle: updated?.meta?.title ?? null,
          metaDescription: updated?.meta?.description ?? null,
          type: collection === 'custom-items'
            ? resolveTypeLabel(collection, updated, (await getContentTypeMaps(payload)).slugById)
            : collection,
        },
      })
    },
  },
  {
    path: '/admin/seo/content/bulk',
    method: 'patch',
    handler: async (req) => {
      const unauthorized = ensureAdmin(req)
      if (unauthorized) return unauthorized

      const { payload } = req
      const body = (await req.json?.()) || {}
      const updates = Array.isArray(body.updates) ? body.updates : []
      const results: Array<{ id: string; ok: boolean; error?: string; message?: string }> = []

      if (updates.length === 0) {
        return Response.json({ results })
      }

      const { idBySlug, slugById } = await getContentTypeMaps(payload)

      for (const update of updates) {
        const parsed = update?.id ? parseSeoId(String(update.id)) : null
        if (!parsed) {
          results.push({ id: String(update?.id || ''), ok: false, error: 'validation', message: 'Invalid ID.' })
          continue
        }

        const { collection, id: docId } = parsed
        const metaTitle = normalizeMetaValue(update.metaTitle)
        const metaDescription = normalizeMetaValue(update.metaDescription)
        const lockVersion = Number(update.lockVersion)
        const type = update.type ? String(update.type) : undefined

        if (Number.isNaN(lockVersion)) {
          results.push({ id: update.id, ok: false, error: 'validation', message: 'lockVersion is required.' })
          continue
        }

        const validationError = validateSeoFields(metaTitle ?? undefined, metaDescription ?? undefined)
        if (validationError) {
          results.push({ id: update.id, ok: false, error: 'validation', message: validationError })
          continue
        }

        try {
          const doc = await payload.findByID({
            collection,
            id: docId,
            depth: 0,
            overrideAccess: true,
          })

          const currentLock = doc?.updatedAt ? new Date(doc.updatedAt).getTime() : 0
          if (!Number.isNaN(lockVersion) && lockVersion !== currentLock) {
            results.push({ id: update.id, ok: false, error: 'conflict', message: 'Content updated elsewhere.' })
            continue
          }

          const data: Record<string, any> = {}
          if (metaTitle !== undefined || metaDescription !== undefined) {
            data.meta = {
              ...(doc?.meta || {}),
              ...(metaTitle !== undefined ? { title: metaTitle } : {}),
              ...(metaDescription !== undefined ? { description: metaDescription } : {}),
            }
          }

          if (type && collection === 'custom-items') {
            const nextContentType = idBySlug.get(type)
            if (!nextContentType) {
              results.push({ id: update.id, ok: false, error: 'validation', message: 'Invalid content type.' })
              continue
            }
            data.contentType = nextContentType
          } else if (type && type !== collection) {
            results.push({ id: update.id, ok: false, error: 'validation', message: 'Type changes are only supported for custom items.' })
            continue
          }

          const updated = await payload.update({
            collection,
            id: docId,
            data,
            depth: 0,
            overrideAccess: true,
          })

          results.push({
            id: update.id,
            ok: true,
            lockVersion: updated?.updatedAt ? new Date(updated.updatedAt).getTime() : 0,
            updatedAt: updated?.updatedAt || null,
            metaTitle: updated?.meta?.title ?? null,
            metaDescription: updated?.meta?.description ?? null,
            type: collection === 'custom-items'
              ? resolveTypeLabel(collection, updated, slugById)
              : collection,
          })
        } catch (error) {
          results.push({ id: update.id, ok: false, error: 'unknown', message: 'Update failed.' })
        }
      }

      const okResults = results.filter((result) => result.ok)
      const failed = results.filter((result) => !result.ok)
      const okIds = okResults.map((result) => result.id)

      payload.logger.info(
        `SEO bulk update by ${req.user?.email || req.user?.id}: ${okResults.length} ok (${okIds.join(', ')}), ${failed.length} failed`
      )
      if (failed.length > 0) {
        payload.logger.warn(`SEO bulk update failures: ${failed.map((item) => item.id).join(', ')}`)
      }

      return Response.json({ results })
    },
  },
]

export { applyFilters, applySort, buildSlugPath, normalizeMetaValue, parseSeoId, validateSeoFields }
