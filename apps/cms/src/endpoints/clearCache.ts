import type { Endpoint } from 'payload'

// Inline revalidation helper — calls the Next.js revalidation route to clear the cache.
// headless-cms's revalidate.ts doesn't export revalidateAllPages, so we call the HTTP endpoint directly.
async function revalidateAllPages(): Promise<{ success: boolean; error?: string }> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const secret = process.env.REVALIDATION_SECRET || ''
    const response = await fetch(`${siteUrl}/api/revalidate?path=/&secret=${secret}`, { method: 'GET' })
    if (!response.ok) {
      return { success: false, error: `Revalidation request failed: ${response.status}` }
    }
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

/**
 * Admin endpoint to clear all Next.js cache
 * Accessible from the admin UI via a button
 */
export const clearCacheEndpoint: Endpoint = {
    path: '/clear-cache',
    method: 'post',
    handler: async (req) => {
        const { payload } = req

        try {
            // Check if user is authenticated and is an admin
            if (!req.user) {
                return Response.json(
                    { error: 'Unauthorized - Please log in' },
                    { status: 401 }
                )
            }

            if (req.user.role !== 'admin') {
                return Response.json(
                    { error: 'Forbidden - Admin access required' },
                    { status: 403 }
                )
            }

            payload.logger.info(`Cache clear requested by ${req.user.email}`)

            // Revalidate all pages
            const result = await revalidateAllPages()

            if (result.success) {
                payload.logger.info('✅ Cache cleared successfully')
                return Response.json({
                    success: true,
                    message: 'All pages have been revalidated. Cache cleared successfully.',
                    timestamp: new Date().toISOString(),
                })
            } else {
                payload.logger.error(`❌ Cache clear failed: ${result.error}`)
                return Response.json(
                    { error: 'Failed to clear cache', details: result.error },
                    { status: 500 }
                )
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error)
            payload.logger.error(`Cache clear error: ${errorMessage}`)
            return Response.json(
                { error: 'Internal server error', details: errorMessage },
                { status: 500 }
            )
        }
    },
}

export default clearCacheEndpoint
