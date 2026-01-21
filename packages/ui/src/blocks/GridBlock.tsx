interface GridBlockProps {
  block: {
    heading?: string
    description?: string
    items?: Array<{
      title?: string
      subtitle?: string
      description?: string
      stat?: string
      image?: { url: string; alt?: string }
    }>
    columns?: string
  }
}

export function GridBlock({ block }: GridBlockProps) {
  const { heading, description, items = [], columns = '3' } = block
  if (items.length === 0) return null

  const colCount = Number(columns) || 3
  const gridCols =
    colCount === 1
      ? 'md:grid-cols-1'
      : colCount === 2
      ? 'md:grid-cols-2'
      : colCount === 4
      ? 'md:grid-cols-4'
      : 'md:grid-cols-3'

  return (
    <section className="container py-12">
      {heading && <h2 className="mb-2 text-2xl font-semibold">{heading}</h2>}
      {description && <p className="mb-6 text-gray-600">{description}</p>}
      <div className={`grid gap-6 ${gridCols}`}>
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border border-gray-100 p-5 shadow-sm">
            {item.image?.url && (
              <img src={item.image.url} alt={item.image.alt || ''} className="mb-4 h-40 w-full rounded object-cover" />
            )}
            {item.stat && <div className="text-2xl font-bold">{item.stat}</div>}
            {item.title && <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>}
            {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
            {item.description && <p className="mt-2 text-sm text-gray-600">{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default GridBlock
