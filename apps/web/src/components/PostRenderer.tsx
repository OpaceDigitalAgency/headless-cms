import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/api'
import { RichText } from './RichText'
import { RenderBlocks } from './RenderBlocks'

interface PostRendererProps {
  post: Post
}

export function PostRenderer({ post }: PostRendererProps) {
  const {
    title,
    excerpt,
    content,
    contentBlocks,
    featuredImage,
    categories,
    author,
    publishedAt,
  } = post

  return (
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
            <p className="lead text-xl text-gray-600">{excerpt}</p>
          )}
          {content && <RichText content={content} />}
        </div>
      </div>

      {/* Additional Content Blocks */}
      {contentBlocks && contentBlocks.length > 0 && (
        <div className="mt-12">
          <RenderBlocks blocks={contentBlocks} />
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="article-tags">
          <span className="tags-label">Tags:</span>
          {post.tags.map((tag: any, index: number) => (
            <Link
              key={index}
              href={`/blog/tag/${tag.tag}`}
              className="tag-link"
            >
              {tag.tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
