# Issues & Bugs Log

| Issue | Status | Date Raised | Date Fixed | Notes |
| ----- | ------ | ----------- | ---------- | ----- |
| Next.js routes calling undefined helpers (`getPage`, `getPost`, `getArtifact`) caused runtime errors in blog and artifact pages | Fixed | 2026-01-15 | 2026-01-15 | Added matching helper exports in `apps/web/src/lib/api.ts` to align with route imports |
| Astro page renderer ignores Payload `content` blocks (uses `layout`), so published page blocks never render | Fixed | 2026-01-15 | 2026-01-15 | `apps/astro/src/pages/[slug].astro` now injects hero as a block and renders `content` blocks |
| Astro block components expect different props than Payload supplies (e.g., `backgroundImage` vs `image`, `buttons` vs `links`), so hero/CTA/gallery data won’t display correctly | Fixed | 2026-01-15 | 2026-01-15 | Added mapper in `apps/astro/src/components/blocks/BlockRenderer.astro` to translate Payload block shapes to component props |
| `custom-items` collection is fully public (`access.read: () => true`) and ignores `status`, exposing drafts/archived items via REST/GraphQL | Fixed | 2026-01-15 | 2026-01-15 | Read access now limits guests to `status=published`; publish sets `publishedAt`; revalidation hook added |
| New collections (`custom-items`, `content-types`) are not wired into SEO/search/revalidation/tagging | Fixed (custom-items) | 2026-01-15 | 2026-01-15 | `custom-items` added to SEO/search plugins and revalidation; content-types intentionally not indexed |
| No database migrations for new collections/globals (ContentTypes, CustomItems, Settings) | Open | 2026-01-15 | - | Schema changes rely on adapter push; production needs Drizzle migrations |
