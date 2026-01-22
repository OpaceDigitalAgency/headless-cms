import Image from 'next/image'
import Link from 'next/link'
import { RichText } from './RichText'
import { RenderBlocks } from './RenderBlocks'
import { generateArticleSchema, generateOrganizationSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/seo/schema'
import { Section, Container } from '@repo/ui/primitives'
// import { getSettings } from '@/lib/payload-api' // Removed to make component client-safe

interface PostRendererProps {
  post: any
  settings?: any // Optional settings for schema generation
}

export function PostRenderer({ post, settings }: PostRendererProps) {
  const {
    title,
    excerpt,
    content,
    contentBlocks,
    featuredImage,
    categories,
    author,
    publishedAt,
    updatedAt,
    slug,
  } = post

  // Settings can be passed as prop for schema generation (optional)

  // Generate JSON-LD schemas
  const schemas = []

  if (settings) {
    // Add Article schema
    schemas.push(generateArticleSchema(
      {
        title,
        excerpt,
        publishedAt,
        updatedAt,
        author: author ? { name: author.name || author.email } : undefined,
        featuredImage: featuredImage?.url ? {
          url: featuredImage.url,
          width: featuredImage.width,
          height: featuredImage.height,
        } : undefined,
        categories: categories?.map((cat: any) => ({ title: cat.title })),
      },
      settings,
      slug
    ))

    // Add Organization schema
    schemas.push(generateOrganizationSchema(settings))

    // Add Breadcrumb schema
    const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const breadcrumbs = [
      { name: 'Home', url: siteUrl },
      { name: 'Blog', url: `${siteUrl}/blog` },
      { name: title, url: `${siteUrl}/blog/${slug}` },
    ]
    schemas.push(generateBreadcrumbSchema(breadcrumbs))
  }

  return (
    <>
      {schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: renderJsonLd(schemas) }}
        />
      )}

      {/* Article header and content in a container */}
      <Section spacing="lg" background="default">
        <Container>
          <article className="article-template">
            {/* Header */}
            <header className="article-header">
              {categories && categories.length > 0 && (
                <div className="article-categories">
                  {categories.map((category: any) => (
                    <Link
                      key={category.id}
                      href={`/blog/category/${category.slug}`}
                      className="category-link"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="article-heading">{title}</h1>

              <div className="article-meta">
                {author && (
                  <div className="flex items-center gap-2">
                    {author.avatar?.url && (
                      <Image
                        src={author.avatar.url}
                        alt={author.name || ''}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span>{author.name || author.email}</span>
                  </div>
                )}
                {publishedAt && (
                  <time dateTime={publishedAt}>
                    {new Date(publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {featuredImage?.url && (
              <div className="article-featured-image">
                <Image
                  src={featuredImage.url}
                  alt={featuredImage.alt || title}
                  width={featuredImage.width || 1200}
                  height={featuredImage.height || 630}
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="article-layout">
              <div className="article-content">
                {excerpt && (
                  <p className="lead text-xl text-muted">{excerpt}</p>
                )}
                {content && <RichText content={content} />}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="article-tags">
                <span className="tags-label">Tags:</span>
                {post.tags.map((tag: any, index: number) => (
                  <Link
                    key={index}
                    href={`/blog/tag/${encodeURIComponent(tag?.slug || tag?.tag || tag)}`}
                    className="tag-link"
                  >
                    {tag?.title || tag?.tag || tag?.slug || tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        </Container>
      </Section>

      {/* Additional Content Blocks - full width outside container */}
      {contentBlocks && contentBlocks.length > 0 && (
        <RenderBlocks blocks={contentBlocks} />
      )}
    </>
  )
}
