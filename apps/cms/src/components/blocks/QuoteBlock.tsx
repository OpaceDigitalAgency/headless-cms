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
    <section className="bg-base py-12">
      <div className="w-full">
        <div className={`flex flex-col gap-4 ${alignClasses[align]}`}>
          <blockquote className="max-w-3xl text-2xl font-medium text-foreground">
            “{block.quote}”
          </blockquote>
          {(block.author || block.role) && (
            <div className="text-sm text-muted">
              {block.author && <span className="font-semibold text-foreground">{block.author}</span>}
              {block.role && <span className="ml-2">· {block.role}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
