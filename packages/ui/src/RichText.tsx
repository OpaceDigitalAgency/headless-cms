// @ts-nocheck
import Link from 'next/link'
import Image from 'next/image'

interface RichTextProps {
  content: any
  className?: string
}

/**
 * Renders Payload CMS rich text content
 * Supports Lexical editor format
 */
export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null

  // Handle Lexical format (Payload 3.0)
  if (content.root) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        {renderLexicalContent(content.root)}
      </div>
    )
  }

  // Handle legacy Slate format
  if (Array.isArray(content)) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        {content.map((node, index) => renderSlateNode(node, index))}
      </div>
    )
  }

  // Handle plain HTML string
  if (typeof content === 'string') {
    return (
      <div
        className={`prose prose-lg max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return null
}

function renderLexicalContent(root: any): React.ReactNode {
  if (!root?.children) return null

  return root.children.map((node: any, index: number) => {
    return renderLexicalNode(node, index)
  })
}

function renderLexicalNode(node: any, index: number): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'paragraph':
      return (
        <p key={index}>
          {node.children?.map((child: any, i: number) => renderLexicalNode(child, i))}
        </p>
      )

    case 'heading':
      // node.tag contains the full tag name (e.g., 'h1', 'h2') from Lexical editor
      const HeadingTag = (node.tag || 'h2') as keyof JSX.IntrinsicElements
      return (
        <HeadingTag key={index}>
          {node.children?.map((child: any, i: number) => renderLexicalNode(child, i))}
        </HeadingTag>
      )

    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index}>
          {node.children?.map((child: any, i: number) => renderLexicalNode(child, i))}
        </ListTag>
      )

    case 'listitem':
      return (
        <li key={index}>
          {node.children?.map((child: any, i: number) => renderLexicalNode(child, i))}
        </li>
      )

    case 'quote':
      return (
        <blockquote key={index}>
          {node.children?.map((child: any, i: number) => renderLexicalNode(child, i))}
        </blockquote>
      )

    case 'link':
      const href = node.fields?.url || node.url || '#'
      const isExternal = href.startsWith('http')
      return (
        <Link
          key={index}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {node.children?.map((child: any, i: number) => renderLexicalNode(child, i))}
        </Link>
      )

    case 'upload':
      if (node.value?.url) {
        return (
          <figure key={index}>
            <Image
              src={node.value.url}
              alt={node.value.alt || ''}
              width={node.value.width || 800}
              height={node.value.height || 600}
              className="rounded-lg"
            />
            {node.value.caption && (
              <figcaption>{node.value.caption}</figcaption>
            )}
          </figure>
        )
      }
      return null

    case 'text':
      let text: React.ReactNode = node.text

      if (node.format) {
        if (node.format & 1) text = <strong key={`bold-${index}`}>{text}</strong>
        if (node.format & 2) text = <em key={`italic-${index}`}>{text}</em>
        if (node.format & 4) text = <s key={`strike-${index}`}>{text}</s>
        if (node.format & 8) text = <u key={`underline-${index}`}>{text}</u>
        if (node.format & 16) text = <code key={`code-${index}`}>{text}</code>
        if (node.format & 32) text = <sub key={`sub-${index}`}>{text}</sub>
        if (node.format & 64) text = <sup key={`sup-${index}`}>{text}</sup>
      }

      return <span key={index}>{text}</span>

    case 'linebreak':
      return <br key={index} />

    case 'horizontalrule':
      return <hr key={index} />

    default:
      // Handle unknown node types gracefully
      if (node.children) {
        return (
          <div key={index}>
            {node.children.map((child: any, i: number) => renderLexicalNode(child, i))}
          </div>
        )
      }
      return null
  }
}

function renderSlateNode(node: any, index: number): React.ReactNode {
  if (!node) return null

  // Text node
  if (node.text !== undefined) {
    let text: React.ReactNode = node.text

    if (node.bold) text = <strong>{text}</strong>
    if (node.italic) text = <em>{text}</em>
    if (node.underline) text = <u>{text}</u>
    if (node.strikethrough) text = <s>{text}</s>
    if (node.code) text = <code>{text}</code>

    return <span key={index}>{text}</span>
  }

  // Element node
  const children = node.children?.map((child: any, i: number) => renderSlateNode(child, i))

  switch (node.type) {
    case 'h1':
      return <h1 key={index}>{children}</h1>
    case 'h2':
      return <h2 key={index}>{children}</h2>
    case 'h3':
      return <h3 key={index}>{children}</h3>
    case 'h4':
      return <h4 key={index}>{children}</h4>
    case 'h5':
      return <h5 key={index}>{children}</h5>
    case 'h6':
      return <h6 key={index}>{children}</h6>
    case 'blockquote':
      return <blockquote key={index}>{children}</blockquote>
    case 'ul':
      return <ul key={index}>{children}</ul>
    case 'ol':
      return <ol key={index}>{children}</ol>
    case 'li':
      return <li key={index}>{children}</li>
    case 'link':
      return (
        <Link key={index} href={node.url || '#'}>
          {children}
        </Link>
      )
    case 'upload':
      if (node.value?.url) {
        return (
          <figure key={index}>
            <Image
              src={node.value.url}
              alt={node.value.alt || ''}
              width={node.value.width || 800}
              height={node.value.height || 600}
            />
          </figure>
        )
      }
      return null
    default:
      return <p key={index}>{children}</p>
  }
}
