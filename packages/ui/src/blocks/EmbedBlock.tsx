interface EmbedBlockProps {
  block: {
    heading?: string
    url: string
    caption?: string
    aspectRatio?: string
  }
}

const aspectRatioPadding: Record<string, string> = {
  '16:9': '56.25%',
  '4:3': '75%',
  '1:1': '100%',
  '21:9': '42.85%',
}

export function EmbedBlock({ block }: EmbedBlockProps) {
  const paddingTop = aspectRatioPadding[block.aspectRatio || '16:9'] || '56.25%'

  return (
    <section className="bg-base py-16">
      <div className="container">
        {block.heading && (
          <h2 className="mb-6 text-3xl font-semibold text-foreground">{block.heading}</h2>
        )}
        <div className="relative w-full overflow-hidden rounded-2xl border border-default bg-black" style={{ paddingTop }}>
          <iframe
            src={block.url}
            title={block.caption || 'Embedded content'}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {block.caption && <p className="mt-3 text-sm text-muted">{block.caption}</p>}
      </div>
    </section>
  )
}
