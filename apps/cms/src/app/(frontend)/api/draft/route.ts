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
    case 'artifacts':
      redirectUrl = `/artifacts/${slug}`
      break
    case 'people':
      redirectUrl = `/people/${slug}`
      break
    case 'places':
      redirectUrl = `/places/${slug}`
      break
    case 'museum-collections':
      redirectUrl = `/collections/${slug}`
      break
    case 'custom-items':
      // For custom items, slug is already in format "type/slug" from the preview URL
      // Just prepend /items/
      if (slug && slug.includes('/')) {
        redirectUrl = `/items/${slug}`
      } else {
        // Fallback: try to fetch the item to get the content type
        try {
          const payload = await getPayloadHMR({ config: configPromise })
          const { docs } = await payload.find({
            collection: 'custom-items',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            draft: true, // Include draft items
          })

          const item = docs[0]
          if (item && item.contentType) {
            let typeSlug: string

            // Check if contentType is populated (object) or just an ID (string)
            if (typeof item.contentType === 'object' && item.contentType !== null) {
              // ContentType is populated
              typeSlug = item.contentType.archiveSlug
                ? item.contentType.archiveSlug.replace(/^\/?items\//, '')
                : item.contentType.slug
            } else {
              // ContentType is just an ID, fetch it
              const ct = await payload.findByID({
                collection: 'content-types',
                id: typeof item.contentType === 'string' ? item.contentType : item.contentType.id,
              })
              typeSlug = ct.archiveSlug
                ? ct.archiveSlug.replace(/^\/?items\//, '')
                : ct.slug
            }

            redirectUrl = `/items/${typeSlug}/${slug}`
          } else {
            redirectUrl = `/items/${slug}` // Fallback
          }
        } catch (error) {
          console.error('Error fetching custom item for preview:', error)
          redirectUrl = `/items/${slug}` // Fallback
        }
      }
      break
    default:
      redirectUrl = `/${slug || ''}`
  }

  // Redirect to the preview page
  redirect(redirectUrl)
}

