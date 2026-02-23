import React from 'react'
import { Check } from 'lucide-react'

interface VideoFeatureBlockProps {
    heading: string
    videoUrl: string
    caption?: string
    checkItems?: string
}

export const VideoFeatureBlock: React.FC<{ block: VideoFeatureBlockProps }> = ({ block }) => {
    const { heading, videoUrl, caption, checkItems } = block

    // Convert YouTube URL to embed URL
    const getEmbedUrl = (url: string): string => {
        // YouTube watch URL to embed URL
        if (url.includes('youtube.com/watch')) {
            const videoId = url.split('v=')[1]?.split('&')[0]
            if (videoId) return `https://www.youtube.com/embed/${videoId}`
        }

        // YouTube short URL to embed URL
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0]
            if (videoId) return `https://www.youtube.com/embed/${videoId}`
        }

        return url
    }

    const embedUrl = getEmbedUrl(videoUrl)
    const paddingTop = '56.25%' // 16:9 aspect ratio

    return (
        <section className="bg-[#7cb342] py-24 border-b border-gray-100">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Video */}
                    <div className="relative w-full overflow-hidden rounded-2xl border-4 border-[#263238] bg-black shadow-2xl" style={{ paddingTop }}>
                        <iframe
                            src={embedUrl}
                            title={caption || 'Video content'}
                            className="absolute inset-0 h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">
                            {heading}
                        </h2>

                        {caption && (
                            <p className="text-gray-200 font-bold leading-relaxed mb-8">
                                {caption}
                            </p>
                        )}

                        {checkItems && checkItems.trim() && (
                            <div className="space-y-3">
                                {checkItems
                                    .split('\n')
                                    .filter((line) => line.trim())
                                    .map((text, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm font-bold text-white">
                                            <div className="flex-shrink-0 w-5 h-5 bg-[#7cb342] rounded-full flex items-center justify-center text-white">
                                                <Check className="w-3 h-3 stroke-[4px]" />
                                            </div>
                                            <span className="uppercase tracking-tight">{text.trim()}</span>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoFeatureBlock
