interface HtmlBlockProps {
  block: {
    html: string
  }
}

export function HtmlBlock({ block }: HtmlBlockProps) {
  if (!block.html) return null

  return (
    <section className="bg-white py-10">
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: block.html }} />
      </div>
    </section>
  )
}
