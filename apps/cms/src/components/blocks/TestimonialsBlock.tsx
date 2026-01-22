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
    <section className={isAgency ? 'relative bg-base py-20' : 'bg-card py-16'}>
      {isAgency && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),transparent_60%)] opacity-60" />
      )}
      <div className={isAgency ? 'container relative' : 'container'}>
        {block.heading && (
          <h2 className={isAgency ? 'mb-12 text-4xl font-bold text-foreground sm:text-5xl' : 'mb-10 text-3xl font-semibold text-foreground'}>
            {block.heading}
          </h2>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={
                isAgency
                  ? 'group relative overflow-hidden rounded-3xl border border-default bg-card p-8 shadow-xl shadow-black/30'
                  : 'rounded-2xl border border-default bg-base p-6 shadow-sm'
              }
            >
              {isAgency && <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-soft blur-3xl" />}
              {item.quote && (
                <p className={isAgency ? 'text-lg font-medium text-foreground' : 'text-base text-foreground'}>
                  “{item.quote}”
                </p>
              )}
              <div className="mt-6 flex items-center gap-3">
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
                  {item.name && <div className="text-sm font-semibold text-foreground">{item.name}</div>}
                  {(item.role || item.company) && (
                    <div className="text-xs text-muted">
                      {item.role}
                      {item.role && item.company ? ' · ' : ''}
                      {item.company}
                    </div>
                  )}
                </div>
              </div>
              {item.rating && (
                <div className={isAgency ? 'mt-4 text-xs text-muted' : 'mt-4 text-xs text-muted'}>
                  {'★'.repeat(item.rating)}{'☆'.repeat(Math.max(0, 5 - item.rating))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
