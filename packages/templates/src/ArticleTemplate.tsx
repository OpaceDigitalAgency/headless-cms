/**
 * ArticleTemplate - For blog posts and long-form content
 * Used for: Blog posts, News articles, Documentation
 */

import React from 'react';

export interface ArticleTemplateProps {
  heading: string;
  subheading?: string;
  excerpt?: string;
  body: React.ReactNode;
  featuredImage?: {
    url: string;
    alt?: string;
    caption?: string;
  };
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
    url?: string;
  };
  date?: string;
  updatedAt?: string;
  readingTime?: string;
  categories?: Array<{
    title: string;
    slug: string;
    url: string;
  }>;
  tags?: Array<{
    title: string;
    slug: string;
    url: string;
  }>;
  relatedPosts?: Array<{
    id: string;
    title: string;
    slug: string;
    url: string;
    excerpt?: string;
    image?: string;
    date?: string;
  }>;
  tableOfContents?: Array<{
    id: string;
    text: string;
    level: number;
  }>;
  showTableOfContents?: boolean;
  className?: string;
}

export function ArticleTemplate({
  heading,
  subheading,
  excerpt,
  body,
  featuredImage,
  author,
  date,
  updatedAt,
  readingTime,
  categories,
  tags,
  relatedPosts,
  tableOfContents,
  showTableOfContents = true,
  className = '',
}: ArticleTemplateProps) {
  return (
    <article className={`article-template ${className}`}>
      {/* Article Header */}
      <header className="article-header">
        {categories && categories.length > 0 && (
          <div className="article-categories">
            {categories.map((cat) => (
              <a key={cat.slug} href={cat.url} className="category-link">
                {cat.title}
              </a>
            ))}
          </div>
        )}

        <h1 className="article-heading">{heading}</h1>
        
        {subheading && <p className="article-subheading">{subheading}</p>}

        {/* Meta Information */}
        <div className="article-meta">
          {author && (
            <div className="article-author">
              {author.avatar && (
                <img src={author.avatar} alt={author.name} className="author-avatar" />
              )}
              <div className="author-info">
                {author.url ? (
                  <a href={author.url} className="author-name">
                    {author.name}
                  </a>
                ) : (
                  <span className="author-name">{author.name}</span>
                )}
              </div>
            </div>
          )}
          
          <div className="article-date-info">
            {date && (
              <time className="article-date" dateTime={date}>
                {formatArticleDate(date)}
              </time>
            )}
            {readingTime && <span className="article-reading-time">{readingTime}</span>}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <figure className="article-featured-image">
          <img src={featuredImage.url} alt={featuredImage.alt || heading} />
          {featuredImage.caption && <figcaption>{featuredImage.caption}</figcaption>}
        </figure>
      )}

      {/* Excerpt */}
      {excerpt && (
        <div className="article-excerpt">
          <p>{excerpt}</p>
        </div>
      )}

      {/* Content Layout */}
      <div className="article-layout">
        {/* Table of Contents */}
        {showTableOfContents && tableOfContents && tableOfContents.length > 0 && (
          <aside className="article-toc">
            <nav aria-label="Table of contents">
              <h2>Contents</h2>
              <ul>
                {tableOfContents.map((item) => (
                  <li key={item.id} className={`toc-item toc-item--level-${item.level}`}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <div className="article-content">{body}</div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <footer className="article-tags">
          <span className="tags-label">Tags:</span>
          <div className="tags-list">
            {tags.map((tag) => (
              <a key={tag.slug} href={tag.url} className="tag-link">
                {tag.title}
              </a>
            ))}
          </div>
        </footer>
      )}

      {/* Author Bio */}
      {author && author.bio && (
        <section className="article-author-bio">
          <div className="author-bio-card">
            {author.avatar && (
              <img src={author.avatar} alt={author.name} className="author-bio-avatar" />
            )}
            <div className="author-bio-content">
              <h3>About {author.name}</h3>
              <p>{author.bio}</p>
            </div>
          </div>
        </section>
      )}

      {/* Updated Notice */}
      {updatedAt && updatedAt !== date && (
        <div className="article-updated">
          <p>Last updated: {formatArticleDate(updatedAt)}</p>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="article-related">
          <h2>Related Articles</h2>
          <div className="related-posts-grid">
            {relatedPosts.map((post) => (
              <a key={post.id} href={post.url} className="related-post-card">
                {post.image && (
                  <img src={post.image} alt={post.title} className="related-post-image" />
                )}
                <div className="related-post-content">
                  <h3>{post.title}</h3>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  {post.date && <time>{formatArticleDate(post.date)}</time>}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/**
 * Format date for article display
 */
function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default ArticleTemplate;
