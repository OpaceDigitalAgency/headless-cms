import Link from 'next/link'
import Image from 'next/image'

interface HeroBlockProps {
  block: {
    type?: string
    heading: string
    subheading?: string
    image?: { url: string; alt?: string }
    videoUrl?: string
    overlay?: string
    textAlign?: string
    links?: Array<{
      label: string
      url?: string
      page?: { slug: string }
      variant?: string
      newTab?: boolean
    }>
  }
}

export function HeroBlock({ block }: HeroBlockProps) {
  const {
    type = 'standard',
    heading,
    subheading,
    image,
    videoUrl,
    overlay = 'dark',
    textAlign = 'center',
    links,
  } = block

  const getUrl = (link: any) => {
    if (link.url) return link.url
    if (link.page?.slug) return `/${link.page.slug}`
    return '#'
  }

  const overlayClasses = {
    none: '',
    light: 'bg-white/50',
    dark: 'bg-black/50',
    gradient: 'bg-gradient-to-t from-black/80 to-transparent',
  }

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  const minHeight = type === 'fullscreen' ? 'min-h-screen' : 'min-h-[60vh]'

  return (
    <section className={`relative flex ${minHeight} items-center justify-center overflow-hidden bg-gray-900`}>
      {/* Background Image */}
      {image?.url && (
        <div className="absolute inset-0">
          <Image
            src={image.url}
            alt={image.alt || ''}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Video Background */}
      {videoUrl && type === 'video' && (
        <div className="absolute inset-0">
          <iframe
            src={videoUrl.includes('youtube') 
              ? `${videoUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0`
              : videoUrl
            }
            className="h-full w-full object-cover"
            allow="autoplay; fullscreen"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      )}

      {/* Overlay */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlay as keyof typeof overlayClasses]}`} />
      )}

      {/* Content */}
      <div className={`container relative z-10 flex flex-col px-4 py-16 ${alignClasses[textAlign as keyof typeof alignClasses]}`}>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        
        {subheading && (
          <p className="mt-6 max-w-2xl text-xl text-gray-200">
            {subheading}
          </p>
        )}

        {links && links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((link, index) => (
              <Link
                key={index}
                href={getUrl(link)}
                target={link.newTab ? '_blank' : undefined}
                className={`btn ${
                  link.variant === 'primary'
                    ? 'btn-primary'
                    : link.variant === 'outline'
                    ? 'border border-white bg-transparent text-white hover:bg-white/10'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
