import Image from 'next/image'

interface TestimonialsBlockProps {
  block: {
    heading?: string
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

  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        {block.heading && (
          <h2 className="mb-10 text-3xl font-semibold text-gray-900">{block.heading}</h2>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              {item.quote && <p className="text-base text-gray-700">“{item.quote}”</p>}
              <div className="mt-6 flex items-center gap-3">
                {item.avatar?.url && (
                  <Image
                    src={item.avatar.url}
                    alt={item.avatar.alt || item.name || ''}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  {item.name && <div className="text-sm font-semibold text-gray-900">{item.name}</div>}
                  {(item.role || item.company) && (
                    <div className="text-xs text-gray-500">
                      {item.role}
                      {item.role && item.company ? ' · ' : ''}
                      {item.company}
                    </div>
                  )}
                </div>
              </div>
              {item.rating && (
                <div className="mt-4 text-xs text-gray-400">
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
