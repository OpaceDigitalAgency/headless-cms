/**
 * Shared Types for Payload CMS + Jamstack Platform
 * These types are used across CMS and Frontend applications
 */

// ===========================================
// Template System Types
// ===========================================

/**
 * Available template types for rendering content
 */
export type TemplateType =
  | 'detail'
  | 'list'
  | 'landing'
  | 'timeline'
  | 'article'
  | 'home'
  | 'archive';

/**
 * Template slot names for field mapping
 */
export type TemplateSlot =
  | 'heading'
  | 'subheading'
  | 'body'
  | 'excerpt'
  | 'gallery'
  | 'featuredImage'
  | 'relatedItems'
  | 'metadata'
  | 'sidebar'
  | 'cta'
  | 'timeline'
  | 'categories'
  | 'tags'
  | 'author'
  | 'date'
  | 'hero';

/**
 * Field mapping configuration for a collection
 */
export interface FieldMapping {
  [fieldName: string]: TemplateSlot;
}

/**
 * Collection template configuration
 */
export interface CollectionTemplateConfig {
  defaultTemplate: TemplateType;
  availableTemplates: TemplateType[];
  fieldMapping: FieldMapping;
}

// ===========================================
// Content Types
// ===========================================

/**
 * Base document interface
 */
export interface BaseDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Media document
 */
export interface Media extends BaseDocument {
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  url: string;
  alt?: string;
  caption?: string;
  sizes?: {
    thumbnail?: MediaSize;
    card?: MediaSize;
    tablet?: MediaSize;
  };
}

export interface MediaSize {
  url: string;
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
}

/**
 * Page document
 */
export interface Page extends BaseDocument {
  title: string;
  slug: string;
  template: TemplateType;
  hero?: HeroBlock;
  content?: ContentBlock[];
  meta?: SEOMeta;
  _status?: 'draft' | 'published';
  publishedAt?: string;
}

/**
 * Post document
 */
export interface Post extends BaseDocument {
  title: string;
  slug: string;
  excerpt?: string;
  content?: any; // Rich text content
  featuredImage?: Media | string;
  categories?: Category[] | string[];
  author?: User | string;
  publishedAt?: string;
  meta?: SEOMeta;
  _status?: 'draft' | 'published';
}

/**
 * Category document
 */
export interface Category extends BaseDocument {
  title: string;
  slug: string;
  description?: string;
  parent?: Category | string;
}

/**
 * User document
 */
export interface User extends BaseDocument {
  email: string;
  name?: string;
  role: 'admin' | 'editor' | 'user';
  avatar?: Media | string;
}

// ===========================================
// Museum Example Types (PoC)
// ===========================================

/**
 * Artifact document (museum example)
 */
export interface Artifact extends BaseDocument {
  title: string;
  slug: string;
  description?: any; // Rich text
  media?: Media[] | string[];
  people?: Person[] | string[];
  places?: Place[] | string[];
  collections?: Collection[] | string[];
  template: TemplateType;
  meta?: SEOMeta;
  _status?: 'draft' | 'published';
}

/**
 * Person document (museum example)
 */
export interface Person extends BaseDocument {
  name: string;
  slug: string;
  biography?: any; // Rich text
  birthDate?: string;
  deathDate?: string;
  portrait?: Media | string;
  relatedArtifacts?: Artifact[] | string[];
}

/**
 * Place document (museum example)
 */
export interface Place extends BaseDocument {
  name: string;
  slug: string;
  description?: any; // Rich text
  location?: {
    latitude: number;
    longitude: number;
  };
  featuredImage?: Media | string;
  relatedArtifacts?: Artifact[] | string[];
}

/**
 * Collection document (museum example - hierarchical)
 */
export interface Collection extends BaseDocument {
  title: string;
  slug: string;
  description?: any; // Rich text
  featuredImage?: Media | string;
  parent?: Collection | string;
  children?: Collection[] | string[];
  artifacts?: Artifact[] | string[];
}

// ===========================================
// Block Types
// ===========================================

export interface HeroBlock {
  type: 'hero';
  heading: string;
  subheading?: string;
  image?: Media | string;
  links?: LinkBlock[];
}

export interface ContentBlock {
  blockType: string;
  [key: string]: any;
}

export interface LinkBlock {
  label: string;
  url?: string;
  page?: Page | string;
  newTab?: boolean;
}

export interface CallToActionBlock {
  type: 'cta';
  heading: string;
  description?: string;
  links?: LinkBlock[];
}

export interface MediaBlock {
  type: 'media';
  media: Media | string;
  caption?: string;
}

export interface ContentColumnsBlock {
  type: 'content';
  columns: {
    size: 'oneThird' | 'half' | 'twoThirds' | 'full';
    richText?: any;
  }[];
}

// ===========================================
// SEO Types
// ===========================================

export interface SEOMeta {
  title?: string;
  description?: string;
  image?: Media | string;
  noIndex?: boolean;
}

// ===========================================
// API Types
// ===========================================

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface RevalidateRequest {
  secret: string;
  collection: string;
  slug?: string;
  id?: string;
}

// ===========================================
// Navigation Types
// ===========================================

export interface NavItem {
  label: string;
  url?: string;
  page?: Page | string;
  children?: NavItem[];
}

export interface HeaderGlobal {
  logo?: Media | string;
  navItems?: NavItem[];
}

export interface FooterGlobal {
  logo?: Media | string;
  navItems?: NavItem[];
  copyright?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface SettingsGlobal {
  siteName: string;
  siteDescription?: string;
  defaultMeta?: SEOMeta;
}
