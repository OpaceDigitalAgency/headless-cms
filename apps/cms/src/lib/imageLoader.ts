type ImageLoaderProps = {
    src: string
    width: number
    quality?: number
}

export default function payloadImageLoader({ src, width, quality }: ImageLoaderProps): string {
    // If the image is already from Payload's media proxy, return as-is
    if (src.startsWith('/api/media/file/')) {
        return src
    }

    // If it's a storage.railway.app URL, convert to Payload proxy
    if (src.includes('storage.railway.app')) {
        const filename = src.split('/').pop()
        return `/api/media/file/${filename}`
    }

    // For other URLs, return as-is
    return src
}
