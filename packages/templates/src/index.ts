/**
 * @repo/templates - Rendering templates for the Jamstack platform
 *
 * All content renders through one of these finite templates.
 * Templates receive mapped fields from collections via the field mapping system.
 */

export { DetailTemplate } from './DetailTemplate';
export type { DetailTemplateProps } from './DetailTemplate';

export { ListTemplate } from './ListTemplate';
export type { ListTemplateProps, ListItem } from './ListTemplate';

export { LandingTemplate } from './LandingTemplate';
export type { LandingTemplateProps, HeroProps, ContentBlock } from './LandingTemplate';

export { TimelineTemplate } from './TimelineTemplate';
export type { TimelineTemplateProps, TimelineEvent } from './TimelineTemplate';

export { ArticleTemplate } from './ArticleTemplate';
export type { ArticleTemplateProps } from './ArticleTemplate';

export { HomeTemplate } from './HomeTemplate';
export type { HomeTemplateProps, HomeHeroProps, HomeSection, FeaturedItem } from './HomeTemplate';

export { ArchiveTemplate } from './ArchiveTemplate';
export type { ArchiveTemplateProps, ArchiveItem } from './ArchiveTemplate';

/**
 * Template type to component mapping
 */
export const templateComponents = {
  detail: DetailTemplate,
  list: ListTemplate,
  landing: LandingTemplate,
  timeline: TimelineTemplate,
  article: ArticleTemplate,
  home: HomeTemplate,
  archive: ArchiveTemplate,
} as const;

export type TemplateName = keyof typeof templateComponents;
