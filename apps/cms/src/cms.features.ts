/**
 * CMS Feature Flags
 * ==================
 * Enable or disable feature modules for this project.
 * Set a flag to `false` to completely exclude a module from the CMS
 * (collections, admin views, endpoints and nav items are all conditional).
 *
 * After changing flags, restart the dev server and run migrations:
 *   make db-migrate
 */
export const features = {

  // ── Core ──────────────────────────────────────────────────────────────────
  // Always enabled: Users, Media, Pages, Posts, Categories, Tags
  // (These cannot be disabled)

  // ── Content Collections ───────────────────────────────────────────────────
  /** Standalone FAQ entries — reusable in FAQ blocks */
  faqs: true,

  /** Client testimonials — reusable in Testimonials blocks */
  testimonials: true,

  /** Business locations / service areas */
  locations: true,

  /** Partner/client logos */
  logoCloud: true,

  // ── Block Library System ──────────────────────────────────────────────────
  /**
   * Shared/reusable block architecture.
   * Enables: GlobalBlocks, BlockLibrary, BlockTemplateBuilder collections,
   * PageTemplates global, ReusableBlock block type, Save to Library endpoint,
   * Clear Cache endpoint, and the Save to Library admin UI button.
   */
  blockLibrary: true,

  // ── Dynamic / Custom Content Types ───────────────────────────────────────
  /**
   * WordPress-like custom content type system.
   * Enables: ContentTypes, CustomItems, ArchiveItems collections,
   * plus the Collection Manager and Collection Templates admin endpoints/views.
   * Useful for projects needing flexible, admin-defined content models.
   */
  dynamicCollections: true,

  // ── People & Places ───────────────────────────────────────────────────────
  /**
   * Team members, authors, staff profiles.
   * NOTE: Required when dynamicCollections is true — ArchiveItems and Events
   * templates contain relationships to 'people' and 'places'.
   */
  people: true,

  /** Venues, offices, branches, geographic points */
  places: true,

  /** Events, conferences, appointments */
  events: true,

  // ── eCommerce ─────────────────────────────────────────────────────────────
  /**
   * Full eCommerce suite.
   * Enables: Products, ProductCategories, ProductCollections,
   * Orders, Carts, ProductReviews collections.
   */
  ecommerce: false,

} as const

export type Features = typeof features
