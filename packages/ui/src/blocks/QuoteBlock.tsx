interface QuoteBlockProps {
  block: {
    quote: string
    author?: string
    role?: string
    align?: 'left' | 'center' | 'right'
  }
}

export function QuoteBlock({ block }: QuoteBlockProps) {
  const align = block.align || 'left'
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <section className="bg-white py-12">
      <div className="container">
        <div className={`flex flex-col gap-4 ${alignClasses[align]}`}>
          <blockquote className="max-w-3xl text-2xl font-medium text-gray-900">
            “{block.quote}”
          </blockquote>
          {(block.author || block.role) && (
            <div className="text-sm text-gray-500">
              {block.author && <span className="font-semibold text-gray-700">{block.author}</span>}
              {block.role && <span className="ml-2">· {block.role}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
