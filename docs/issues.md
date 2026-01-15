# Issues & Bugs Log

| Issue | Status | Date Raised | Date Fixed | Notes |
| ----- | ------ | ----------- | ---------- | ----- |
| Next.js routes calling undefined helpers (`getPage`, `getPost`, `getArtifact`) caused runtime errors in blog and artifact pages | Fixed | 2026-01-15 | 2026-01-15 | Added matching helper exports in `apps/web/src/lib/api.ts` to align with route imports |
| Astro page renderer ignores Payload `content` blocks (uses `layout`), so published page blocks never render | Open | 2026-01-15 | - | `apps/astro/src/pages/[slug].astro` maps `pageData.layout` instead of `content`; blocks are skipped |
| Astro block components expect different props than Payload supplies (e.g., `backgroundImage` vs `image`, `buttons` vs `links`), so hero/CTA/gallery data won’t display correctly | Open | 2026-01-15 | - | No mapper between Payload block shape and Astro components in `apps/astro/src/components/blocks` |
| `custom-items` collection is fully public (`access.read: () => true`) and ignores `status`, exposing drafts/archived items via REST/GraphQL | Open | 2026-01-15 | - | Violates draft separation; needs read access scoped to published unless authenticated |
| New collections (`custom-items`, `content-types`) are not wired into SEO/search/revalidation/tagging | Open | 2026-01-15 | - | Not registered with SEO/search plugins or revalidation hooks, so publishing won’t invalidate frontends or appear in search/metadata |
| No database migrations for new collections/globals (ContentTypes, CustomItems, Settings) | Open | 2026-01-15 | - | Schema changes rely on adapter push; production needs Drizzle migrations |
