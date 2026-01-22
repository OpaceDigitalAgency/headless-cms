import { RichText } from '../RichText'

interface FaqBlockProps {
  block: {
    heading?: string
    items?: Array<{
      question?: string
      answer?: any
    }>
  }
}

export function FaqBlock({ block }: FaqBlockProps) {
  const items = block.items || []

  return (
    <section className="bg-base py-16">
      <div className="container">
        {block.heading && (
          <h2 className="mb-8 text-3xl font-semibold text-foreground">{block.heading}</h2>
        )}
        <div className="space-y-4">
          {items.map((item, index) => (
            <details key={index} className="rounded-xl border border-default bg-card p-5">
              <summary className="cursor-pointer text-base font-semibold text-foreground">
                {item.question}
              </summary>
              {item.answer && (
                <div className="mt-4 prose prose-sm max-w-none text-muted">
                  <RichText content={item.answer} />
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
