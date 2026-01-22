interface GalleryBlockProps {
  block: {
    heading?: string
    images?: Array<{
      image?: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
      caption?: string
    }>
    layout?: 'grid' | 'masonry' | 'carousel' | 'lightbox' | 'slider'
    columns?: string
    showCaptions?: boolean
  }
}

export function GalleryBlock({ block }: GalleryBlockProps) {
  const {
    heading,
    images = [],
    layout = 'grid',
    columns = '3',
    showCaptions = true,
  } = block
  if (images.length === 0) return null

  const colCount = Number(columns) || 3
  const gridCols =
    colCount === 2 ? 'md:grid-cols-2' : colCount === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'

  return (
    <section className="container py-12">
      {heading && <h2 className="mb-6 text-2xl font-semibold">{heading}</h2>}
      <div className={`grid gap-4 ${gridCols}`}>
        {images.map((item, index) => {
          const image = item.image
          if (!image?.url) return null
          return (
            <figure key={index} className="overflow-hidden rounded-lg">
              <img src={image.url} alt={image.alt || ''} className="h-60 w-full object-cover" />
              {showCaptions && item.caption && (
                <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>
              )}
            </figure>
          )
        })}
      </div>
    </section>
  )
}

export default GalleryBlock
