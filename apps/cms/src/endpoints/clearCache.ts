import type { Endpoint } from 'payload'
import { revalidateAllPages } from '../lib/revalidate'

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
