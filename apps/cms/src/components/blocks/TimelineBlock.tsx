import { RichText } from '../RichText'

interface TimelineBlockProps {
  block: {
    heading?: string
    description?: string
    events?: Array<{
      date?: string
      title?: string
      description?: any
      image?: { url: string; alt?: string }
    }>
  }
}

export function TimelineBlock({ block }: TimelineBlockProps) {
  const { heading, description, events = [] } = block
  if (events.length === 0) return null

  return (
    <section className="container py-12">
      {heading && <h2 className="mb-2 text-2xl font-semibold">{heading}</h2>}
      {description && <p className="mb-8 text-gray-600">{description}</p>}
      <div className="space-y-6 border-l border-gray-200 pl-6">
        {events.map((event, index) => (
          <div key={index} className="relative">
            <span className="absolute -left-[30px] top-2 h-3 w-3 rounded-full bg-gray-300" />
            {event.date && <div className="text-xs uppercase text-gray-500">{event.date}</div>}
            {event.title && <h3 className="text-lg font-semibold">{event.title}</h3>}
            {event.image?.url && (
              <img src={event.image.url} alt={event.image.alt || ''} className="mt-3 h-40 w-full rounded object-cover" />
            )}
            {event.description && (
              <div className="mt-3 text-sm text-gray-600">
                <RichText content={event.description} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TimelineBlock
