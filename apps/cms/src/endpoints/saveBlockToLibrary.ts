// @ts-nocheck
import type { Endpoint } from 'payload'

/**
 * Save Block to Library Endpoint
 * 
 * POST /api/save-block-to-library
 * 
 * Body: {
 *   blockData: { ... },
 *   blockType: 'hero' | 'cta' | etc.,
 *   name?: string,
 *   description?: string
 * }
 */
export const saveBlockToLibrary: Endpoint = {
    path: '/save-block-to-library',
    method: 'post',
    handler: async (req) => {
        const { payload } = req

        try {
            // Parse JSON body
            const body = await req.json?.() || {}
            const { blockData, blockType, name, description } = body

            if (!blockData || !blockType) {
                return Response.json(
                    { error: 'blockData and blockType are required' },
                    { status: 400 }
                )
            }

            // Generate a name if not provided
            const timestamp = new Date().toISOString().split('T')[0]
            const blockName = name || `${blockType} - ${timestamp}`

            // Remove internal fields
            const { id, blockName: _, ...cleanBlockData } = blockData

            // Create Block Library entry
            const result = await payload.create({
                collection: 'block-library',
                data: {
                    name: blockName,
                    blockType: blockType as any,
                    blockData: cleanBlockData,
                    description: description || `Saved on ${timestamp}`,
                },
            })

            return Response.json({
                success: true,
                doc: result,
                message: `Block saved to library as "${blockName}"`,
            })

        } catch (error: any) {
            payload.logger.error('Error saving block to library:', error)
            return Response.json(
                { error: error.message || 'Failed to save block to library' },
                { status: 500 }
            )
        }
    },
}
