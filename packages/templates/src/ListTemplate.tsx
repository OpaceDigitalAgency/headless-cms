/**
 * ListTemplate - For displaying collections of items
 * Used for: Archive pages, Collection listings, Search results
 */

import React from 'react';

export interface ListItem {
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
  categories?: Array<{
    title: string;
    slug: string;
  }>;
}

export interface ListTemplateProps {
  heading: string;
  subheading?: string;
  items?: ListItem[];
  content?: React.ReactNode; // Alternative to items for custom content
  pagination?: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPageUrl?: string;
    prevPageUrl?: string;
  };
  filters?: React.ReactNode;
  emptyMessage?: string;
  layout?: 'grid' | 'list' | 'cards';
  className?: string;
}

export function ListTemplate({
  heading,
  subheading,
  items = [],
  content,
  pagination,
  filters,
  emptyMessage = 'No items found.',
  layout = 'grid',
  className = '',
}: ListTemplateProps) {
  return (
    <div className={`list-template list-template--${layout} ${className}`}>
      {/* Header */}
      <header className="list-header">
        <h1 className="list-heading">{heading}</h1>
        {subheading && <p className="list-subheading">{subheading}</p>}
      </header>

      {/* Filters */}
      {filters && <div className="list-filters">{filters}</div>}

      {/* Custom Content or Items */}
      {content ? (
        <div className="list-content">{content}</div>
      ) : items.length > 0 ? (
        <div className={`list-items list-items--${layout}`}>
          {items.map((item) => (
            <article key={item.id} className="list-item">
              <a href={item.url} className="list-item-link">
                {item.image && (
                  <figure className="list-item-image">
                    <img src={item.image.url} alt={item.image.alt || item.title} />
                  </figure>
                )}
                <div className="list-item-content">
                  {item.categories && item.categories.length > 0 && (
                    <div className="list-item-categories">
                      {item.categories.map((cat) => (
                        <span key={cat.slug} className="category-tag">
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="list-item-title">{item.title}</h2>
                  {item.excerpt && <p className="list-item-excerpt">{item.excerpt}</p>}
                  {item.date && <time className="list-item-date">{item.date}</time>}
                </div>
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="list-empty">
          <p>{emptyMessage}</p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <nav className="list-pagination" aria-label="Pagination">
          {pagination.hasPrevPage && pagination.prevPageUrl && (
            <a href={pagination.prevPageUrl} className="pagination-prev">
              Previous
            </a>
          )}
          
          <span className="pagination-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          {pagination.hasNextPage && pagination.nextPageUrl && (
            <a href={pagination.nextPageUrl} className="pagination-next">
              Next
            </a>
          )}
        </nav>
      )}
    </div>
  );
}

export default ListTemplate;
