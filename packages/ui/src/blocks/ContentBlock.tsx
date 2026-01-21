import Link from 'next/link'
import { RichText } from '../RichText'

interface ContentBlockProps {
  block: {
    columns?: Array<{
      size?: string
      richText?: any
      enableLink?: boolean
      link?: {
        label?: string
        url?: string
        page?: { slug: string }
        newTab?: boolean
      }
    }>
    backgroundColor?: string
    paddingTop?: string
    paddingBottom?: string
  }
}

export function ContentBlock({ block }: ContentBlockProps) {
  const {
    columns = [],
    backgroundColor = 'none',
    paddingTop = 'medium',
    paddingBottom = 'medium',
  } = block

  const bgClasses = {
    none: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    primary: 'bg-primary-600 text-white',
    secondary: 'bg-secondary-600 text-white',
  }

  const paddingTopClasses = {
    none: 'pt-0',
    small: 'pt-8',
    medium: 'pt-16',
    large: 'pt-24',
  }

  const paddingBottomClasses = {
    none: 'pb-0',
    small: 'pb-8',
    medium: 'pb-16',
    large: 'pb-24',
  }

  const sizeClasses = {
    oneThird: 'md:col-span-4',
    half: 'md:col-span-6',
    twoThirds: 'md:col-span-8',
    full: 'md:col-span-12',
  }

  const getUrl = (link: any) => {
    if (link?.url) return link.url
    if (link?.page?.slug) return `/${link.page.slug}`
    return '#'
  }

  return (
    <section
      className={`${bgClasses[backgroundColor as keyof typeof bgClasses]} ${paddingTopClasses[paddingTop as keyof typeof paddingTopClasses]} ${paddingBottomClasses[paddingBottom as keyof typeof paddingBottomClasses]}`}
    >
      <div className="container">
        <div className="grid grid-cols-12 gap-8">
          {columns.map((column, index) => (
            <div
              key={index}
              className={`col-span-12 ${sizeClasses[column.size as keyof typeof sizeClasses] || 'md:col-span-12'}`}
            >
              {column.richText && (
                <div className="prose prose-lg max-w-none">
                  <RichText content={column.richText} />
                </div>
              )}
              
              {column.enableLink && column.link?.label && (
                <div className="mt-6">
                  <Link
                    href={getUrl(column.link)}
                    target={column.link.newTab ? '_blank' : undefined}
                    className="link font-medium"
                  >
                    {column.link.label} →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
