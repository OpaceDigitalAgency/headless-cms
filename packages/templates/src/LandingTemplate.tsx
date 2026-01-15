/**
 * LandingTemplate - For marketing/landing pages with hero and blocks
 * Used for: Home page, Landing pages, Campaign pages
 */

import React from 'react';

export interface HeroProps {
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

export interface ContentBlock {
  blockType: string;
  id?: string;
  [key: string]: any;
}

export interface LandingTemplateProps {
  hero?: HeroProps;
  heading?: string;
  body?: React.ReactNode;
  blocks?: ContentBlock[];
  cta?: {
    heading: string;
    description?: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
  };
  className?: string;
  renderBlock?: (block: ContentBlock) => React.ReactNode;
}

export function LandingTemplate({
  hero,
  heading,
  body,
  blocks,
  cta,
  className = '',
  renderBlock,
}: LandingTemplateProps) {
  return (
    <div className={`landing-template ${className}`}>
      {/* Hero Section */}
      {hero && (
        <section className="landing-hero">
          {hero.image && (
            <div className="hero-background">
              <img src={hero.image.url} alt={hero.image.alt || ''} />
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

      {/* Main Content */}
      {(heading || body) && (
        <section className="landing-main">
          {heading && <h1 className="landing-heading">{heading}</h1>}
          {body && <div className="landing-body">{body}</div>}
        </section>
      )}

      {/* Content Blocks */}
      {blocks && blocks.length > 0 && (
        <div className="landing-blocks">
          {blocks.map((block, index) => (
            <section key={block.id || index} className={`landing-block landing-block--${block.blockType}`}>
              {renderBlock ? renderBlock(block) : <DefaultBlockRenderer block={block} />}
            </section>
          ))}
        </div>
      )}

      {/* Call to Action */}
      {cta && (
        <section className="landing-cta">
          <div className="cta-content">
            <h2 className="cta-heading">{cta.heading}</h2>
            {cta.description && <p className="cta-description">{cta.description}</p>}
            {cta.links && cta.links.length > 0 && (
              <div className="cta-links">
                {cta.links.map((link, index) => (
                  <a key={index} href={link.url} className="cta-link">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * Default block renderer for common block types
 */
function DefaultBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.blockType) {
    case 'content':
      return (
        <div className="block-content">
          {block.columns?.map((col: any, i: number) => (
            <div key={i} className={`content-column content-column--${col.size || 'full'}`}>
              {col.richText && <div dangerouslySetInnerHTML={{ __html: col.richText }} />}
            </div>
          ))}
        </div>
      );

    case 'media':
      return (
        <figure className="block-media">
          {block.media?.url && <img src={block.media.url} alt={block.media.alt || ''} />}
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case 'cta':
      return (
        <div className="block-cta">
          {block.heading && <h3>{block.heading}</h3>}
          {block.description && <p>{block.description}</p>}
          {block.links?.map((link: any, i: number) => (
            <a key={i} href={link.url} className="block-cta-link">
              {link.label}
            </a>
          ))}
        </div>
      );

    case 'archive':
      return (
        <div className="block-archive">
          {block.heading && <h3>{block.heading}</h3>}
          {block.items?.map((item: any, i: number) => (
            <a key={i} href={item.url} className="archive-item">
              {item.title}
            </a>
          ))}
        </div>
      );

    default:
      return (
        <div className="block-unknown">
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </div>
      );
  }
}

export default LandingTemplate;
