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

  // Custom Retro Implementation to match user's design exactly
  if (isRetro) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-base">
        <div className="absolute inset-0 retro-grain opacity-30 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 gradient-bg-retro opacity-20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--color-accent))] opacity-10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgb(var(--color-accent))] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-[rgb(var(--color-accent))] opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Decorative Stars/Hearts */}
          <div className="absolute top-20 left-10 w-6 h-6 text-[rgb(var(--color-accent))] opacity-30 animate-spin" style={{ animationDuration: '20s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </div>
          <div className="absolute top-40 right-20 w-4 h-4 text-[rgb(var(--color-accent))] opacity-40 animate-spin" style={{ animationDuration: '15s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 text-[rgb(var(--color-accent))] opacity-20 animate-spin" style={{ animationDuration: '25s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </div>
          <div className="absolute top-1/3 right-10 w-5 h-5 text-[rgb(var(--color-accent))] opacity-20 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gradient-text-retro animate-text-shimmer">
              {heading}
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 hover:text-foreground transition-colors" style={{ animationDelay: '200ms' }}>
            {subheading}
          </p>

          {links && links.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '400ms' }}>
              {links.map((link, index) => {
                const isPrimary = link.variant !== 'secondary'
                return (
                  <Link
                    key={index}
                    href={getUrl(link)}
                    target={link.newTab ? '_blank' : undefined}
                    className={isPrimary
                      ? "group relative px-8 py-4 bg-[rgb(var(--color-accent))] text-base rounded-lg font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-[rgb(var(--color-accent))]/50 hover:rotate-1"
                      : "group px-8 py-4 text-[rgb(var(--color-accent))] border-2 border-[rgb(var(--color-accent))] rounded-lg font-semibold transition-all duration-500 hover:bg-[rgb(var(--color-accent))] hover:text-base hover:scale-110 hover:-rotate-1"
                    }
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {link.label}
                      {isPrimary && (
                        <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      )}
                    </span>
                    {isPrimary && <div className="absolute inset-0 rounded-lg bg-[rgb(var(--color-accent))] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[rgb(var(--color-accent))] rounded-full flex items-start justify-center p-2 hover:scale-110 transition-transform cursor-pointer">
            <div className="w-1 h-2 bg-[rgb(var(--color-accent))] rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  // Standard / Agency Default Implementation
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
        <h1 className={`max-w-4xl font-bold tracking-tight text-foreground ${isAgency ? 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl gradient-text-hero' : 'text-4xl sm:text-5xl lg:text-6xl'}`}>
          {heading}
        </h1>

        {subheading && (
          <p className={`mt-6 max-w-2xl ${isAgency ? 'text-xl sm:text-2xl gradient-subheading' : 'text-xl'} text-muted`}>
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
