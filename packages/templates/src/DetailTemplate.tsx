/**
 * DetailTemplate - For displaying single items with full details
 * Used for: Artifacts, People, Places, individual pages
 */

import React from 'react';
import type { TemplateSlot } from '@repo/shared';

export interface DetailTemplateProps {
  heading: string;
  subheading?: string;
  body?: React.ReactNode;
  excerpt?: string;
  featuredImage?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  gallery?: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
  relatedItems?: Array<{
    id: string;
    title: string;
    slug: string;
    url: string;
    image?: string;
  }>;
  metadata?: Record<string, any>;
  sidebar?: React.ReactNode;
  date?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  categories?: Array<{
    title: string;
    slug: string;
  }>;
  className?: string;
}

export function DetailTemplate({
  heading,
  subheading,
  body,
  excerpt,
  featuredImage,
  gallery,
  relatedItems,
  metadata,
  sidebar,
  date,
  author,
  categories,
  className = '',
}: DetailTemplateProps) {
  return (
    <article className={`detail-template ${className}`}>
      {/* Header Section */}
      <header className="detail-header">
        {categories && categories.length > 0 && (
          <div className="detail-categories">
            {categories.map((cat) => (
              <a key={cat.slug} href={`/categories/${cat.slug}`} className="category-tag">
                {cat.title}
              </a>
            ))}
          </div>
        )}
        
        <h1 className="detail-heading">{heading}</h1>
        
        {subheading && <p className="detail-subheading">{subheading}</p>}
        
        {(date || author) && (
          <div className="detail-meta">
            {author && (
              <div className="detail-author">
                {author.avatar && (
                  <img src={author.avatar} alt={author.name} className="author-avatar" />
                )}
                <span className="author-name">{author.name}</span>
              </div>
            )}
            {date && <time className="detail-date">{date}</time>}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <figure className="detail-featured-image">
          <img
            src={featuredImage.url}
            alt={featuredImage.alt || heading}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        </figure>
      )}

      {/* Main Content */}
      <div className="detail-content-wrapper">
        <div className="detail-main">
          {excerpt && <p className="detail-excerpt">{excerpt}</p>}
          
          {body && <div className="detail-body">{body}</div>}

          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <div className="detail-gallery">
              <h2>Gallery</h2>
              <div className="gallery-grid">
                {gallery.map((item, index) => (
                  <figure key={index} className="gallery-item">
                    <img src={item.url} alt={item.alt || `Gallery image ${index + 1}`} />
                    {item.caption && <figcaption>{item.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {sidebar && <aside className="detail-sidebar">{sidebar}</aside>}
      </div>

      {/* Related Items */}
      {relatedItems && relatedItems.length > 0 && (
        <section className="detail-related">
          <h2>Related</h2>
          <div className="related-grid">
            {relatedItems.map((item) => (
              <a key={item.id} href={item.url} className="related-item">
                {item.image && <img src={item.image} alt={item.title} />}
                <h3>{item.title}</h3>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Metadata */}
      {metadata && Object.keys(metadata).length > 0 && (
        <footer className="detail-metadata">
          <dl>
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="metadata-item">
                <dt>{key}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
        </footer>
      )}
    </article>
  );
}

export default DetailTemplate;
