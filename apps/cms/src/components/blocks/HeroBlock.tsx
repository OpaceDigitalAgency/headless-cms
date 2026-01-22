import Link from 'next/link'
import Image from 'next/image'

interface HeroBlockProps {
  block: {
    variant?: string
    type?: string
    eyebrow?: string
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
    variant = 'standard',
    type = 'standard',
    eyebrow,
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
    light: 'bg-base/50',
    dark: 'bg-[rgb(var(--color-foreground))]/50',
    gradient: 'bg-gradient-to-t from-[rgb(var(--color-foreground))]/80 to-transparent',
  }

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  const minHeight = type === 'fullscreen' ? 'min-h-screen' : 'min-h-[60vh]'
  const isAgency = variant === 'agency'
  const isRetro = variant === 'retro'

  return (
    <section className={`relative flex ${minHeight} items-center justify-center overflow-hidden bg-base`}>
      {isAgency && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,41,55,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,41,55,0.6)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,0.18),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(45,212,191,0.12),transparent_40%)]" />
          <div className="absolute inset-0">
            <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] animate-blob rounded-full bg-[rgb(var(--color-accent))]/20 blur-3xl" />
            <div className="absolute -right-1/4 top-8 h-[480px] w-[480px] animate-blob-delayed-2 rounded-full bg-[rgb(var(--color-accent-light))]/15 blur-3xl" />
          </div>
        </>
      )}
      {isRetro && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 retro-grain opacity-30 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-0 gradient-bg-retro opacity-20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--color-accent))] opacity-10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgb(var(--color-accent))] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Decorative Stars/Hearts */}
          <div className="absolute top-20 left-10 w-6 h-6 text-[rgb(var(--color-accent))] opacity-30 animate-spin" style={{ animationDuration: '20s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 text-[rgb(var(--color-accent))] opacity-20 animate-spin" style={{ animationDuration: '25s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div className="absolute top-1/3 right-10 w-5 h-5 text-[rgb(var(--color-accent))] opacity-20 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
        </div>
      )}
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
        {eyebrow && isAgency && (
          <span className="mb-6 inline-flex items-center rounded-full border border-default bg-base/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur">
            {eyebrow}
          </span>
        )}
        <h1 className={`max-w-4xl font-bold tracking-tight text-foreground ${isAgency ? 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl gradient-text-hero' : isRetro ? 'text-5xl md:text-7xl lg:text-8xl gradient-text-retro animate-text-shimmer' : 'text-4xl sm:text-5xl lg:text-6xl'}`}>
          {heading}
        </h1>

        {subheading && (
          <p className={`mt-6 max-w-2xl ${isAgency ? 'text-xl sm:text-2xl gradient-subheading' : isRetro ? 'text-xl md:text-2xl text-muted hover:text-foreground transition-colors' : 'text-xl'} text-muted`}>
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
                className={`btn ${link.variant === 'primary'
                  ? `btn-primary ${isAgency ? 'gradient-btn-primary' : ''}`
                  : link.variant === 'outline'
                    ? 'border border-default bg-transparent text-foreground hover:bg-base/10'
                    : 'bg-base/10 text-foreground hover:bg-base/20'
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
