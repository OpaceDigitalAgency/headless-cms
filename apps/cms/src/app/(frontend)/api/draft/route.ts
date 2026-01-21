import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

/**
 * Draft Mode API Route
 *
 * Enables Next.js draft mode for previewing unpublished content from Payload CMS.
 * This allows the CMS live preview feature to work within the same Next.js app.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const collection = searchParams.get('collection')
  const slug = searchParams.get('slug')

  // Check the secret
  const expectedSecret = process.env.REVALIDATION_SECRET || 'revalidation-secret-key'
  if (secret !== expectedSecret) {
    return new Response('Invalid token', { status: 401 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Determine redirect URL based on collection
  let redirectUrl = '/'

  switch (collection) {
    case 'pages':
      redirectUrl = slug === 'home' ? '/' : `/${slug}`
      break
    case 'posts':
      redirectUrl = `/blog/${slug}`
      break
    case 'archive-items':
      redirectUrl = `/archive-items/${slug}`
      break
    case 'events':
      redirectUrl = `/events/${slug}`
      break
    case 'people':
      redirectUrl = `/people/${slug}`
      break
    case 'places':
      redirectUrl = `/places/${slug}`
      break
    case 'categories':
      redirectUrl = `/categories/${slug}`
      break
    case 'tags':
      redirectUrl = `/tags/${slug}`
      break
    case 'custom-items':
      // For custom items, slug might be in format "type/slug" or just "slug"
      // Check if it's a valid type/slug format (type should be a string slug, not a number ID)
      if (slug && slug.includes('/')) {
        const [typeSlug, itemSlug] = slug.split('/')
        // If the type part is a number (content type ID), we need to fetch the actual slug
        if (/^\d+$/.test(typeSlug)) {
          // Type is an ID, need to fetch the content type and item
          try {
            const payload = await getPayloadHMR({ config: configPromise })
            console.log(`[Draft API] Looking for custom item with slug: "${itemSlug}" and contentType ID: "${typeSlug}"`)

            const { docs } = await payload.find({
              collection: 'custom-items',
              where: {
                slug: { equals: itemSlug },
                contentType: { equals: typeSlug },
              },
              limit: 1,
              depth: 2,
              draft: true,
            })

            const item = docs[0]
            if (item && item.contentType) {
              let actualTypeSlug: string
              if (typeof item.contentType === 'object' && item.contentType !== null) {
                actualTypeSlug = item.contentType.archiveSlug
                  ? item.contentType.archiveSlug.replace(/^\/?items\//, '')
                  : item.contentType.slug
                console.log(`[Draft API] ContentType populated: ${actualTypeSlug}`)
              } else {
                const ct = await payload.findByID({
                  collection: 'content-types',
                  id: typeSlug,
                })
                actualTypeSlug = ct.archiveSlug
                  ? ct.archiveSlug.replace(/^\/?items\//, '')
                  : ct.slug
                console.log(`[Draft API] ContentType fetched: ${actualTypeSlug}`)
              }
              redirectUrl = `/items/${actualTypeSlug}/${itemSlug}`
              console.log(`[Draft API] Redirecting to: ${redirectUrl}`)
            } else {
              redirectUrl = `/items/${slug}` // Fallback - will show 404
            }
          } catch (error) {
            console.error('[Draft API] Error fetching custom item for preview:', error)
            redirectUrl = `/items/${slug}` // Fallback
          }
        } else {
          // Type is already a slug, use it directly
          redirectUrl = `/items/${slug}`
        }
      } else if (slug) {
        // No slash in slug: try to fetch the item to get the content type
        try {
          const payload = await getPayloadHMR({ config: configPromise })

          console.log(`[Draft API] Looking for custom item with slug: "${slug}"`)

          // Try to find the item by slug, including drafts
          // Use _status instead of draft parameter for better draft handling
          const { docs, totalDocs } = await payload.find({
            collection: 'custom-items',
            where: {
              slug: { equals: slug },
            },
            limit: 1,
            depth: 2,
            draft: true, // Include draft items
          })

          console.log(`[Draft API] Found ${totalDocs} items with slug "${slug}"`)

          const item = docs[0]
          if (item && item.contentType) {
            let typeSlug: string

            // Check if contentType is populated (object) or just an ID (string)
            if (typeof item.contentType === 'object' && item.contentType !== null) {
              // ContentType is populated
              typeSlug = item.contentType.archiveSlug
                ? item.contentType.archiveSlug.replace(/^\/?items\//, '')
                : item.contentType.slug
              console.log(`[Draft API] ContentType populated: ${typeSlug}`)
            } else {
              // ContentType is just an ID, fetch it
              const contentTypeId = typeof item.contentType === 'string' ? item.contentType : item.contentType.id
              console.log(`[Draft API] Fetching contentType with ID: ${contentTypeId}`)
              const ct = await payload.findByID({
                collection: 'content-types',
                id: contentTypeId,
              })
              typeSlug = ct.archiveSlug
                ? ct.archiveSlug.replace(/^\/?items\//, '')
                : ct.slug
              console.log(`[Draft API] ContentType fetched: ${typeSlug}`)
            }

            redirectUrl = `/items/${typeSlug}/${slug}`
            console.log(`[Draft API] Redirecting to: ${redirectUrl}`)
          } else {
            // Item not found - this might be a new unsaved draft
            // Redirect to a generic error page or show a message
            console.warn(`[Draft API] Custom item with slug "${slug}" not found or has no contentType`)
            redirectUrl = `/items/${slug}` // Fallback - will show 404
          }
        } catch (error) {
          console.error('[Draft API] Error fetching custom item for preview:', error)
          redirectUrl = `/items/${slug}` // Fallback
        }
      } else {
        // No slug provided
        console.warn('[Draft API] No slug provided for custom-items preview')
        redirectUrl = '/admin/collections/custom-items'
      }
      break
    default:
      redirectUrl = `/${slug || ''}`
  }

  // Redirect to the preview page
  redirect(redirectUrl)
}
