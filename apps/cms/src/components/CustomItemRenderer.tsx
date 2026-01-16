
import { RichText } from './RichText'
import { RenderBlocks } from './RenderBlocks'

interface ContentType {
  id: string
  name: string
  slug: string
  customFields?: Array<{
    name: string
    label: string
    type: string
    required?: boolean
    options?: string
  }>
}

interface CustomItemRendererProps {
  item: any
  contentType: ContentType
}

export function CustomItemRenderer({ item, contentType }: CustomItemRendererProps) {
  const customFields = contentType.customFields || []
  const customData = item.customData || {}

  return (
    <article className="detail-template">
      <header className="detail-header">
        <h1 className="detail-heading">{item.title}</h1>
        {item.excerpt && <p className="detail-subheading">{item.excerpt}</p>}
      </header>

      {item.featuredImage?.url && (
        <figure className="detail-featured-image">
          <img
            src={item.featuredImage.url}
            alt={item.featuredImage.alt || item.title}
            width={item.featuredImage.width}
            height={item.featuredImage.height}
          />
        </figure>
      )}

      <div className="detail-content-wrapper">
        <div className="detail-main">
          {item.content && <RichText content={item.content} />}
          {item.blocks && item.blocks.length > 0 && (
            <div className="mt-8">
              <RenderBlocks blocks={item.blocks} />
            </div>
          )}
        </div>

        {customFields.length > 0 && (
          <aside className="detail-sidebar">
            <h2 className="text-lg font-semibold">Details</h2>
            <dl className="mt-4 space-y-3">
              {customFields.map((field) => (
                <div key={field.name}>
                  <dt className="text-sm text-gray-500">{field.label}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {String(customData[field.name] ?? '—')}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>
    </article>
  )
}

export default CustomItemRenderer
