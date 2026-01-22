import Link from 'next/link'
import Image from 'next/image'

interface CTABlockProps {
  block: {
    style?: string
    heading: string
    description?: string
    image?: { url: string; alt?: string }
    links?: Array<{
      label: string
      url?: string
      page?: { slug: string }
      variant?: string
      newTab?: boolean
    }>
    backgroundColor?: string
  }
}

export function CTABlock({ block }: CTABlockProps) {
  const {
    style = 'standard',
    heading,
    description,
    image,
    links,
    backgroundColor = 'primary',
  } = block

  const getUrl = (link: any) => {
    if (link.url) return link.url
    if (link.page?.slug) return `/${link.page.slug}`
    return '#'
  }

  const bgClasses = {
    none: 'bg-base',
    light: 'bg-card',
    dark: 'bg-[rgb(var(--color-foreground))] text-[rgb(var(--color-background))]',
    primary: 'bg-accent text-[rgb(var(--color-background))]',
    secondary: 'bg-card text-foreground',
  }

  if (style === 'banner') {
    return (
      <section className="relative overflow-hidden py-16">
        {image?.url && (
          <div className="absolute inset-0">
            <Image
              src={image.url}
              alt={image.alt || ''}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}
        <div className="w-full relative z-10 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              {description}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={getUrl(link)}
                  target={link.newTab ? '_blank' : undefined}
                  className={`btn ${
                    link.variant === 'primary'
                      ? 'bg-base text-foreground hover:bg-card'
                      : 'border border-white bg-transparent text-white hover:bg-base/10'
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

  if (style === 'card') {
    return (
      <section className="container py-16">
        <div className="card relative overflow-hidden">
          {image?.url && (
            <div className="absolute inset-0">
              <Image
                src={image.url}
                alt={image.alt || ''}
                fill
                className="object-cover opacity-20"
              />
            </div>
          )}
          <div className="relative z-10 p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {heading}
            </h2>
            {description && (
              <p className="mx-auto mt-4 max-w-xl text-muted">
                {description}
              </p>
            )}
            {links && links.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={getUrl(link)}
                    target={link.newTab ? '_blank' : undefined}
                    className={`btn ${
                      link.variant === 'primary'
                        ? 'btn-primary'
                        : link.variant === 'outline'
                        ? 'btn-outline'
                        : 'btn-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (style === 'agency') {
    return (
      <section className="relative overflow-hidden bg-accent py-20 text-[rgb(var(--color-background))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35),transparent_60%)]" />
        <div className="container relative text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{heading}</h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
              {description}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={getUrl(link)}
                  target={link.newTab ? '_blank' : undefined}
                  className="btn bg-[rgb(var(--color-background))] text-foreground hover:bg-base/80"
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

  // Standard CTA
  return (
    <section className={`${bgClasses[backgroundColor as keyof typeof bgClasses]} py-16`}>
      <div className="w-full text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            {description}
          </p>
        )}
        {links && links.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {links.map((link, index) => (
              <Link
                key={index}
                href={getUrl(link)}
                target={link.newTab ? '_blank' : undefined}
                className={`btn ${
                  backgroundColor === 'primary' || backgroundColor === 'dark'
                    ? link.variant === 'primary'
                      ? 'bg-base text-foreground hover:bg-card'
                      : 'border border-white bg-transparent hover:bg-base/10'
                    : link.variant === 'primary'
                    ? 'btn-primary'
                    : 'btn-outline'
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
