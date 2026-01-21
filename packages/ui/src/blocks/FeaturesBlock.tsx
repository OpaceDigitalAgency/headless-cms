import Image from 'next/image'

interface FeaturesBlockProps {
  block: {
    heading?: string
    subheading?: string
    layout?: 'grid' | 'list'
    items?: Array<{
      title?: string
      description?: string
      icon?: string
      media?: { url?: string; alt?: string }
    }>
  }
}

export function FeaturesBlock({ block }: FeaturesBlockProps) {
  const layout = block.layout || 'grid'
  const items = block.items || []

  return (
    <section className="bg-white py-16">
      <div className="container">
        {(block.heading || block.subheading) && (
          <div className="mb-10 max-w-2xl">
            {block.heading && (
              <h2 className="text-3xl font-semibold text-gray-900">{block.heading}</h2>
            )}
            {block.subheading && (
              <p className="mt-3 text-lg text-gray-500">{block.subheading}</p>
            )}
          </div>
        )}

        <div className={layout === 'grid' ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'}>
          {items.map((item, index) => (
            <div key={index} className="rounded-xl border border-gray-100 bg-gray-50 p-6">
              <div className="mb-3 flex items-center gap-3">
                {item.media?.url && (
                  <Image
                    src={item.media.url}
                    alt={item.media.alt || ''}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                )}
                {!item.media?.url && item.icon && (
                  <span className="text-xl text-gray-500">{item.icon}</span>
                )}
                {item.title && (
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                )}
              </div>
              {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
