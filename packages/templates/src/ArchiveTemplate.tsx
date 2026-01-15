/**
 * ArchiveTemplate - For category/tag archive pages
 * Used for: Category archives, Tag archives, Collection archives
 */

import React from 'react';

export interface ArchiveItem {
  id: string;
  title: string;
  slug: string;
  url: string;
  excerpt?: string;
  image?: {
    url: string;
    alt?: string;
  };
  date?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface ArchiveTemplateProps {
  heading: string;
  subheading?: string;
  description?: React.ReactNode;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  items: ArchiveItem[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    baseUrl: string;
  };
  sidebar?: React.ReactNode;
  relatedArchives?: Array<{
    title: string;
    url: string;
    count?: number;
  }>;
  className?: string;
}

export function ArchiveTemplate({
  heading,
  subheading,
  description,
  featuredImage,
  items,
  pagination,
  sidebar,
  relatedArchives,
  className = '',
}: ArchiveTemplateProps) {
  return (
    <div className={`archive-template ${className}`}>
      {/* Archive Header */}
      <header className="archive-header">
        {featuredImage && (
          <div className="archive-hero-image">
            <img src={featuredImage.url} alt={featuredImage.alt || heading} />
            <div className="archive-hero-overlay" />
          </div>
        )}
        <div className="archive-header-content">
          <h1 className="archive-heading">{heading}</h1>
          {subheading && <p className="archive-subheading">{subheading}</p>}
          {description && <div className="archive-description">{description}</div>}
        </div>
      </header>

      {/* Main Content */}
      <div className="archive-layout">
        {/* Items List */}
        <main className="archive-main">
          {items.length > 0 ? (
            <div className="archive-items">
              {items.map((item) => (
                <article key={item.id} className="archive-item">
                  <a href={item.url} className="archive-item-link">
                    {item.image && (
                      <figure className="archive-item-image">
                        <img src={item.image.url} alt={item.image.alt || item.title} />
                      </figure>
                    )}
                    <div className="archive-item-content">
                      <h2 className="archive-item-title">{item.title}</h2>
                      {item.excerpt && <p className="archive-item-excerpt">{item.excerpt}</p>}
                      <div className="archive-item-meta">
                        {item.author && (
                          <span className="archive-item-author">
                            {item.author.avatar && (
                              <img
                                src={item.author.avatar}
                                alt={item.author.name}
                                className="author-avatar-small"
                              />
                            )}
                            {item.author.name}
                          </span>
                        )}
                        {item.date && <time className="archive-item-date">{item.date}</time>}
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="archive-empty">
              <p>No items found in this archive.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <nav className="archive-pagination" aria-label="Archive pagination">
              <div className="pagination-controls">
                {pagination.hasPrevPage && (
                  <a
                    href={
                      pagination.currentPage === 2
                        ? pagination.baseUrl
                        : `${pagination.baseUrl}/page/${pagination.currentPage - 1}`
                    }
                    className="pagination-prev"
                  >
                    ← Previous
                  </a>
                )}

                <div className="pagination-numbers">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <a
                      key={page}
                      href={page === 1 ? pagination.baseUrl : `${pagination.baseUrl}/page/${page}`}
                      className={`pagination-number ${
                        page === pagination.currentPage ? 'pagination-number--active' : ''
                      }`}
                      aria-current={page === pagination.currentPage ? 'page' : undefined}
                    >
                      {page}
                    </a>
                  ))}
                </div>

                {pagination.hasNextPage && (
                  <a
                    href={`${pagination.baseUrl}/page/${pagination.currentPage + 1}`}
                    className="pagination-next"
                  >
                    Next →
                  </a>
                )}
              </div>
            </nav>
          )}
        </main>

        {/* Sidebar */}
        {(sidebar || relatedArchives) && (
          <aside className="archive-sidebar">
            {sidebar}

            {relatedArchives && relatedArchives.length > 0 && (
              <div className="related-archives">
                <h3>Related</h3>
                <ul>
                  {relatedArchives.map((archive) => (
                    <li key={archive.url}>
                      <a href={archive.url}>
                        {archive.title}
                        {archive.count !== undefined && (
                          <span className="archive-count">({archive.count})</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

export default ArchiveTemplate;
