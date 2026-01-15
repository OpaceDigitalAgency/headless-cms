# Suggestions & Improvements

- ✅ Payload-to-Astro block mapper implemented. Date: 2026-01-15. Notes: Added mapping layer in `apps/astro/src/components/blocks/BlockRenderer.astro`.
- ✅ `custom-items` read access respects `status` and revalidation triggers. Date: 2026-01-15. Notes: Access rule + revalidation hook added in `apps/cms/src/collections/CustomItems.ts`.
- ✅ Scoped `custom-items.slug` uniqueness by `contentType` and supported `archiveSlug`/`hasArchive`. Date: 2026-01-15. Notes: Compound index + validation; archive routing and links now use `archiveSlug`.
- ✅ `content-types` wired into SEO/search/revalidation. Date: 2026-01-15. Notes: Added to SEO/search plugins and revalidation hook for `/items` paths.
- ✅ `ContentTypes.customFields` enforced in admin UI + validation + frontend rendering. Date: 2026-01-15. Notes: `CustomDataField` UI, validation in `CustomItems`, rendered in Next/Astro detail views.
- ✅ Drizzle migrations generated for new schema. Date: 2026-01-15. Notes: Migrations created under `apps/db/migrations`.
- ✅ Stable keys for Astro block rendering. Date: 2026-01-15. Notes: Uses `block.id ?? index` for keys.
