import Image from 'next/image'
import Link from 'next/link'

interface MediaBlockProps {
  block: {
    media?: {
      url: string
      alt?: string
      width?: number
      height?: number
      mimeType?: string
    }
    caption?: string
    size?: string
    position?: string
    enableLink?: boolean
    link?: {
      url?: string
      page?: { slug: string }
      newTab?: boolean
    }
  }
}

export function MediaBlock({ block }: MediaBlockProps) {
  const {
    media,
    caption,
    size = 'default',
    position = 'center',
    enableLink,
    link,
  } = block

  if (!media?.url) {
    return null
  }

  const sizeClasses = {
    small: 'max-w-md',
    default: 'max-w-2xl',
    large: 'max-w-4xl',
    fullWidth: 'max-w-none',
  }

  const positionClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  }

  const getUrl = () => {
    if (link?.url) return link.url
    if (link?.page?.slug) return `/${link.page.slug}`
    return '#'
  }

  const isVideo = media.mimeType?.startsWith('video/')

  const MediaContent = () => (
    <figure
      className={`${sizeClasses[size as keyof typeof sizeClasses]} ${positionClasses[position as keyof typeof positionClasses]}`}
    >
      {isVideo ? (
        <video
          src={media.url}
          controls
          className="h-auto w-full rounded-lg"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={media.url}
          alt={media.alt || ''}
          width={media.width || 1200}
          height={media.height || 800}
          className="h-auto w-full rounded-lg"
        />
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )

  return (
    <section className="container py-8">
      {enableLink && link ? (
        <Link
          href={getUrl()}
          target={link.newTab ? '_blank' : undefined}
          className="block"
        >
          <MediaContent />
        </Link>
      ) : (
        <MediaContent />
      )}
    </section>
  )
}
