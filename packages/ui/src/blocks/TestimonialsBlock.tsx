import Image from 'next/image'

interface TestimonialsBlockProps {
  block: {
    heading?: string
    style?: string
    items?: Array<{
      quote?: string
      name?: string
      role?: string
      company?: string
      avatar?: { url?: string; alt?: string }
      rating?: number
    }>
  }
}

export function TestimonialsBlock({ block }: TestimonialsBlockProps) {
  const items = block.items || []
  const isAgency = block.style === 'agency'

  return (
    <section className="bg-card py-16 relative overflow-hidden">
      {/* Background Effects (Agency) */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${isAgency ? 'opacity-100' : 'hidden'}`}>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-blob-slowest rounded-full bg-[rgb(var(--color-blob-1))]/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        {block.heading && (
          <h2 className={`mb-10 text-3xl font-semibold text-foreground ${isAgency ? 'gradient-subheading text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl mb-20 text-center' : ''}`}>
            {block.heading}
          </h2>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="card p-6 group relative overflow-hidden"
            >
              <div className="relative z-10">
                {/* Quote Mark for Agency */}
                <div className="mb-6 text-6xl font-black text-[rgb(var(--color-accent))] opacity-20 transition-all group-hover:scale-110 group-hover:opacity-30">"</div>

                {item.quote && (
                  <blockquote className="text-base text-foreground mb-6 relative">
                    "{item.quote}"
                  </blockquote>
                )}

                <div className="mt-6 flex items-center gap-3 border-t border-[rgb(var(--color-border))] pt-6">
                  {item.avatar?.url ? (
                    <Image
                      src={item.avatar.url}
                      alt={item.avatar.alt || item.name || ''}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                      {item.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    {item.name && (
                      <p className="text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                    )}
                    {(item.role || item.company) && (
                      <p className="text-xs text-muted">
                        {item.role}
                        {item.role && item.company ? ' · ' : ''}
                        {item.company}
                      </p>
                    )}
                  </div>
                </div>

                {item.rating && (
                  <div className="mt-4 text-xs text-muted">
                    {'★'.repeat(item.rating)}{'☆'.repeat(Math.max(0, 5 - item.rating))}
                  </div>
                )}
              </div>

              {/* Card Hover Gradient (Agency) */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-blob-1))]/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none ${isAgency ? 'block' : 'hidden'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

