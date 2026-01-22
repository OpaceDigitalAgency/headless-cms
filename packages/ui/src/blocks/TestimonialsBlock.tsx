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
    <section className={isAgency ? 'relative bg-black px-6 py-32 sm:px-8 lg:px-12' : 'bg-card py-16'}>
      {/* Agency Background Effects - Matches Bolt Design */}
      {isAgency && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-blob-slowest rounded-full bg-emerald-500/5 blur-3xl" />
        </div>
      )}
      
      <div className={isAgency ? 'container relative mx-auto max-w-7xl' : 'container'}>
        {/* Agency Heading - Matches Bolt Design */}
        {block.heading && isAgency && (
          <div className="mb-20 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm animate-float">
              <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Testimonials</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              {block.heading}
            </h2>
          </div>
        )}
        {block.heading && !isAgency && (
          <h2 className="mb-10 text-3xl font-semibold text-foreground">
            {block.heading}
          </h2>
        )}
        
        <div className={isAgency ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
          {items.map((item, index) => (
            <div
              key={index}
              className={
                isAgency
                  ? 'group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:rotate-1'
                  : 'rounded-2xl border border-default bg-base p-6 shadow-sm'
              }
            >
              {/* Agency Background Effects */}
              {isAgency && (
                <>
                  <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl transition-all group-hover:scale-150 group-hover:bg-emerald-500/20" />
                  <div className="absolute right-4 top-4 h-24 w-24 rounded-full border border-emerald-500/10 opacity-0 transition-all duration-700 group-hover:opacity-100 animate-rotate-slow" />
                </>
              )}
              
              <div className="relative">
                {/* Quote Mark for Agency */}
                {isAgency && (
                  <div className="mb-6 text-6xl font-black text-emerald-500/20 transition-all group-hover:text-emerald-500/30 group-hover:scale-110">"</div>
                )}
                
                {item.quote && (
                  <blockquote className={isAgency ? 'text-xl leading-relaxed text-gray-300 font-medium mb-8 transition-all group-hover:text-white' : 'text-base text-foreground'}>
                    {isAgency ? item.quote : `"${item.quote}"`}
                  </blockquote>
                )}
                
                <div className={isAgency ? 'flex items-center gap-4 border-t border-gray-800 pt-6 group-hover:border-emerald-500/30 transition-colors' : 'mt-6 flex items-center gap-3'}>
                  {item.avatar?.url ? (
                    <Image
                      src={item.avatar.url}
                      alt={item.avatar.alt || item.name || ''}
                      width={48}
                      height={48}
                      className={isAgency ? 'h-12 w-12 rounded-full object-cover transition-all group-hover:scale-110 group-hover:rotate-12' : 'h-12 w-12 rounded-full object-cover'}
                    />
                  ) : (
                    <div className={isAgency ? 'flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-black text-black transition-all group-hover:scale-110 group-hover:rotate-12' : 'flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent'}>
                      {item.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    {item.name && (
                      <p className={isAgency ? 'font-bold text-white transition-colors group-hover:text-emerald-100' : 'text-sm font-semibold text-foreground'}>
                        {item.name}
                      </p>
                    )}
                    {(item.role || item.company) && (
                      <p className={isAgency ? 'text-sm text-gray-500 transition-colors group-hover:text-gray-400' : 'text-xs text-muted'}>
                        {item.role}
                        {item.role && item.company ? ' · ' : ''}
                        {item.company}
                      </p>
                    )}
                  </div>
                </div>
                
                {item.rating && !isAgency && (
                  <div className="mt-4 text-xs text-muted">
                    {'★'.repeat(item.rating)}{'☆'.repeat(Math.max(0, 5 - item.rating))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

