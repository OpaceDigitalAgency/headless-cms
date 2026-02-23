// @ts-nocheck
/**
 * Transform absolute URLs to relative URLs in block data
 * This ensures blocks work in both local and production environments
 */

/**
 * Transform URLs in a string (typically HTML content)
 * Converts absolute URLs like:
 *   https://obc-main-production-production.up.railway.app/api/media/file/scotland-boiler-installation-services.webp
 * To relative URLs like:
 *   /api/media/file/scotland-boiler-installation-services.webp
 */
export function transformUrlsInString(content: string): string {
    if (!content || typeof content !== 'string') {
        return content
    }

    // Pattern 1: Match absolute URLs pointing to media files
    // Matches: http(s)://any-domain/api/media/file/filename
    // Captures: /api/media/file/filename (the full relative path)
    const absoluteUrlPattern = /https?:\/\/[^\/\s"']+(\/ api\/media\/file\/[^"'\s<>]+)/gi

    // Pattern 2: Match relative URLs missing the /api/ prefix
    // Matches: /media/file/filename (without /api/)
    // Will be replaced with: /api/media/file/filename
    const relativeUrlPattern = /(['"])\/media\/file\/([^"'\s<>]+)\1/gi

    // First, fix absolute URLs
    let result = content.replace(absoluteUrlPattern, (match, relativePath) => {
        // relativePath is "/api/media/file/filename.webp"
        return relativePath
    })

    // Then, fix relative URLs missing /api/ prefix
    result = result.replace(relativeUrlPattern, (match, quote, filename) => {
        // Return with /api/ prefix added
        return `${quote}/api/media/file/${filename}${quote}`
    })

    return result
}

/**
 * Transform URLs in block data (recursively handles objects and arrays)
 */
export function transformBlockUrls(blockData: any): any {
    if (!blockData) {
        return blockData
    }

    // Handle strings (e.g., HTML content)
    if (typeof blockData === 'string') {
        return transformUrlsInString(blockData)
    }

    // Handle arrays
    if (Array.isArray(blockData)) {
        return blockData.map(item => transformBlockUrls(item))
    }

    // Handle objects
    if (typeof blockData === 'object') {
        const transformed: any = {}
        for (const [key, value] of Object.entries(blockData)) {
            transformed[key] = transformBlockUrls(value)
        }
        return transformed
    }

    // Return primitives as-is
    return blockData
}

/**
 * Transform URLs in a complete block library item
 */
export function transformBlockLibraryItem(item: {
    blockType: string
    blockData: any
    name?: string
    description?: string
}): typeof item {
    return {
        ...item,
        blockData: transformBlockUrls(item.blockData),
    }
}
