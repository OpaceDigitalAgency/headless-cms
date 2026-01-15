# Phase 1 & 2 Gap Analysis (Current State)

- **Static-first + revalidation (Phase 1):** New dynamic collections (`custom-items`, `content-types`) have no revalidation hooks/tagging or frontend routes, so publishing won’t update Next/Astro and static delivery is undefined for these types.
- **Template mapping contract (Phase 2):** No validation/enforcement of `ContentTypes.customFields` or mapping into templates; dynamic fields are free-form JSON and aren’t rendered on frontends, leaving the contract incomplete.
- **Preview/publish separation (Phase 1):** `custom-items` are publicly readable regardless of `status`, exposing drafts/archived items via REST/GraphQL and breaking draft-only previews.
- **Starter/preset coherence (Phase 2):** Presets/starters don’t incorporate the new dynamic content system (no seed data, routes, or archives for custom types), so starters aren’t productized around the new feature.
- **SEO/search coverage (Phase 1/2):** New collections aren’t registered with SEO or search plugins, so they don’t get metadata or appear in search indexes, and cache invalidation rules aren’t extended to them.
- **Migrations discipline (Phase 1):** No Drizzle migrations were added for new schema (ContentTypes, CustomItems, Settings), relying on adapter push instead of production-safe migration flow.
