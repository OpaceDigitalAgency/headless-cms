# Suggestions & Improvements

- Add a Payload-to-Astro block mapper so Astro components receive the expected props (hero image/background, CTA links, gallery media, timelines, etc.) and render blocks identically to Next.js.

- Switch `custom-items` read access to respect `status` (published-only for guests), and add archive/detail routing rules (per-content-type archive slug + detail paths) with ISR revalidation tags.

- Scope `custom-items.slug` uniqueness by `contentType` and support `archiveSlug`/`hasArchive` to avoid slug collisions across types and to generate predictable URLs.

- Wire `custom-items` and `content-types` into SEO/search/revalidation pipelines (SEO plugin collections, search plugin collections, cache tags, and collection hooks).

- Enforce `ContentTypes.customFields` in the admin UI (dynamic form fields) and persist values in `customData` with validation per field definition; surface them in frontends via mapping.

- Generate Drizzle migrations for the new collections/globals and include them in the repo to keep production in sync.

- Add stable keys when mapping blocks in Astro (`block.id ?? index`) to avoid hydration warnings and ease diffing.
