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
    <section className="bg-white py-16">
      <div className="container">
        {block.heading && (
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">{block.heading}</h2>
        )}
        <div className="space-y-4">
          {items.map((item, index) => (
            <details key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <summary className="cursor-pointer text-base font-semibold text-gray-800">
                {item.question}
              </summary>
              {item.answer && (
                <div className="mt-4 prose prose-sm max-w-none text-gray-600">
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
