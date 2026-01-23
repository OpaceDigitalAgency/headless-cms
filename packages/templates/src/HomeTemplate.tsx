/**
 * HomeTemplate - For the main homepage
 * Used for: Site homepage with hero, featured content, and sections
 */

import React from 'react';

export interface HomeHeroProps {
  heading: string;
  subheading?: string;
  image?: {
    url: string;
    alt?: string;
  };
  links?: Array<{
    label: string;
    url: string;
    variant?: 'primary' | 'secondary';
  }>;
}

export interface FeaturedItem {
  id: string;
  title: string;
  excerpt?: string;
  url: string;
  image?: {
    url: string;
    alt?: string;
  };
  category?: string;
  date?: string;
}

export interface HomeSection {
  id: string;
  type: 'featured' | 'grid' | 'cta' | 'content' | 'archive';
  heading?: string;
  subheading?: string;
  items?: FeaturedItem[];
  content?: React.ReactNode;
  cta?: {
    label: string;
    url: string;
  };
}

export interface HomeTemplateProps {
  hero?: HomeHeroProps;
  sections?: HomeSection[];
  className?: string;
}

export function HomeTemplate({ hero, sections, className = '' }: HomeTemplateProps) {
  return (
    <div className={`home-template ${className}`}>
      {/* Hero Section */}
      {hero && (
        <section className="home-hero">
          {hero.image && (
            <div className="hero-background">
              <img src={hero.image.url} alt={hero.image.alt || ''} />
              <div className="hero-overlay" />
            </div>
          )}
          <div className="hero-content">
            <h1 className="hero-heading">{hero.heading}</h1>
            {hero.subheading && <p className="hero-subheading">{hero.subheading}</p>}
            {hero.links && hero.links.length > 0 && (
              <div className="hero-links">
                {hero.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={`hero-link hero-link--${link.variant || 'primary'}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      {sections && sections.length > 0 && (
        <div className="home-sections">
          {sections.map((section) => (
            <HomeSectionRenderer key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Render individual home page sections
 */
function HomeSectionRenderer({ section }: { section: HomeSection }) {
  switch (section.type) {
    case 'featured':
      return (
        <section className="home-section home-section--featured">
          {section.heading && (
            <header className="section-header">
              <h2>{section.heading}</h2>
              {section.subheading && <p>{section.subheading}</p>}
            </header>
          )}
          {section.items && section.items.length > 0 && (
            <div className="featured-grid">
              {section.items.map((item, index) => (
                <a
                  key={item.id}
                  href={item.url}
                  className={`featured-item ${index === 0 ? 'featured-item--large' : ''}`}
                >
                  {item.image && (
                    <figure className="featured-image">
                      <img src={item.image.url} alt={item.image.alt || item.title} />
                    </figure>
                  )}
                  <div className="featured-content">
                    {item.category && <span className="featured-category">{item.category}</span>}
                    <h3>{item.title}</h3>
                    {item.excerpt && <p>{item.excerpt}</p>}
                  </div>
                </a>
              ))}
            </div>
          )}
          {section.cta && (
            <div className="section-cta">
              <a href={section.cta.url} className="section-cta-link">
                {section.cta.label}
              </a>
            </div>
          )}
        </section>
      );

    case 'grid':
      return (
        <section className="home-section home-section--grid">
          {section.heading && (
            <header className="section-header">
              <h2>{section.heading}</h2>
              {section.subheading && <p>{section.subheading}</p>}
            </header>
          )}
          {section.items && section.items.length > 0 && (
            <div className="grid-items">
              {section.items.map((item) => (
                <a key={item.id} href={item.url} className="grid-item">
                  {item.image && (
                    <figure className="grid-image">
                      <img src={item.image.url} alt={item.image.alt || item.title} />
                    </figure>
                  )}
                  <div className="grid-content">
                    <h3>{item.title}</h3>
                    {item.excerpt && <p>{item.excerpt}</p>}
                    {item.date && <time>{item.date}</time>}
                  </div>
                </a>
              ))}
            </div>
          )}
          {section.cta && (
            <div className="section-cta">
              <a href={section.cta.url} className="section-cta-link">
                {section.cta.label}
              </a>
            </div>
          )}
        </section>
      );

    case 'cta':
      return (
        <section className="home-section home-section--cta">
          <div className="cta-container">
            {section.heading && <h2>{section.heading}</h2>}
            {section.subheading && <p>{section.subheading}</p>}
            {section.cta && (
              <a href={section.cta.url} className="cta-button">
                {section.cta.label}
              </a>
            )}
          </div>
        </section>
      );

    case 'content':
      return (
        <section className="home-section home-section--content">
          {section.heading && (
            <header className="section-header">
              <h2>{section.heading}</h2>
            </header>
          )}
          {section.content && <div className="section-content">{section.content}</div>}
        </section>
      );

    case 'archive':
      return (
        <section className="home-section home-section--archive">
          {section.heading && (
            <header className="section-header">
              <h2>{section.heading}</h2>
              {section.subheading && <p>{section.subheading}</p>}
            </header>
          )}
          {section.items && section.items.length > 0 && (
            <div className="archive-list">
              {section.items.map((item) => (
                <a key={item.id} href={item.url} className="archive-item">
                  <span className="archive-title">{item.title}</span>
                  {item.date && <time className="archive-date">{item.date}</time>}
                </a>
              ))}
            </div>
          )}
          {section.cta && (
            <div className="section-cta">
              <a href={section.cta.url} className="section-cta-link">
                {section.cta.label}
              </a>
            </div>
          )}
        </section>
      );

    default:
      return null;
  }
}

export default HomeTemplate;
