/**
 * Preview URL utilities
 *
 * Since Payload CMS and the frontend are now in the same Next.js app,
 * the preview URL uses the same server URL as the CMS.
 */

const DEFAULT_SITE_URL = 'http://localhost:3000'
const DEFAULT_PREVIEW_SECRET = 'revalidation-secret-key'

export const getPreviewUrl = ({
  collection,
  slug,
}: {
  collection: string
  slug?: string | null
}): string => {
  // Use the same URL as the CMS since frontend is now integrated
  const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  const secret = process.env.REVALIDATION_SECRET || DEFAULT_PREVIEW_SECRET
  const safeSlug = slug ? encodeURIComponent(slug) : ''

  return `${baseUrl}/api/draft?secret=${encodeURIComponent(secret)}&collection=${encodeURIComponent(
    collection
  )}&slug=${safeSlug}`
}
