import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

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
      redirectUrl = `/items/${slug}`
      break
    default:
      redirectUrl = `/${slug || ''}`
  }

  // Redirect to the preview page
  redirect(redirectUrl)
}

