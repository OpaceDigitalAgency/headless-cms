// @ts-nocheck
/**
 * Auto-fix relationship paths when blocks are reordered
 * 
 * This hook runs before saving a page and ensures that all relationship paths
 * match the current block order by directly updating the database.
 * 
 * Problem: When blocks are reordered, Payload doesn't automatically update
 * the paths in pages_rels (e.g., "content.3.selectedTestimonials").
 * 
 * Solution: Recalculate all paths based on current block order and update
 * the database before saving.
 */

import type { CollectionBeforeChangeHook } from 'payload'

export const fixBlockRelationshipPaths: CollectionBeforeChangeHook = async ({
    data,
    req,
    operation,
    originalDoc,
}) => {
    // Only run on update operations (not create)
    if (operation !== 'update' || !data.content || !Array.isArray(data.content)) {
        return data
    }

    const { payload } = req

    try {
        // Build a map of block IDs to their current index
        const blockIndexMap = new Map<string, number>()
        data.content.forEach((block: any, index: number) => {
            if (block.id) {
                blockIndexMap.set(block.id, index)
            }
        })

        // Query the database directly for relationship records
        const query = `
      SELECT id, path 
      FROM pages_rels 
      WHERE parent_id = $1 
        AND path LIKE 'content.%.%'
    `

        const result = await payload.db.pool.query(query, [data.id])

        if (!result.rows || result.rows.length === 0) {
            return data
        }

        // Update paths that don't match current block order
        const updates: Promise<any>[] = []
        let fixCount = 0

        for (const rel of result.rows) {
            const pathParts = rel.path.split('.')

            // Only process paths like "content.X.selectedTestimonials"
            if (pathParts[0] !== 'content' || pathParts.length < 3) {
                continue
            }

            const oldIndex = parseInt(pathParts[1], 10)
            const fieldName = pathParts.slice(2).join('.')

            // Find the block at the old index
            const blockAtOldIndex = originalDoc?.content?.[oldIndex]

            if (!blockAtOldIndex || !blockAtOldIndex.id) {
                continue
            }

            // Get the current index of this block
            const currentIndex = blockIndexMap.get(blockAtOldIndex.id)

            if (currentIndex === undefined || currentIndex === oldIndex) {
                continue // Block hasn't moved
            }

            // Update the path
            const newPath = `content.${currentIndex}.${fieldName}`

            updates.push(
                payload.db.pool.query(
                    'UPDATE pages_rels SET path = $1 WHERE id = $2',
                    [newPath, rel.id]
                )
            )

            fixCount++
            console.log(`[Auto-fix] Updating relationship path: ${rel.path} → ${newPath}`)
        }

        // Execute all updates
        if (updates.length > 0) {
            await Promise.all(updates)
            console.log(`[Auto-fix] Fixed ${fixCount} relationship paths for page ${data.id}`)
        }

    } catch (error) {
        console.error('[Auto-fix] Error fixing relationship paths:', error)
        // Don't throw - we don't want to block the save if this fails
    }

    return data
}
