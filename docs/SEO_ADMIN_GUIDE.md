# SEO Admin Guide: Where to See & Manage Everything

## 1️⃣ WHERE TO SEE/SELECT SCHEMA FOR EACH PAGE

### In the Admin Panel:
1. Go to **http://localhost:3000/admin**
2. Navigate to any collection (Posts, Pages, People, Events, etc.)
3. Edit a document
4. Click the **"SEO"** tab
5. You'll see fields added by `@payloadcms/plugin-seo`:
   - **Meta Title** (overrides page title)
   - **Meta Description**
   - **Meta Image** (for OG/Twitter cards)
   - **Canonical URL** (optional override)
   - **No Index** checkbox

### In the Frontend Code:
The schema is **NOT visible in the admin** - it's generated automatically in the code:
- **File:** `apps/cms/src/lib/seo/schema.ts`
- **Schemas generated:** WebSite, Organization, Article, Breadcrumb, FAQ, Person, Event
- **Injected in:** PageRenderer.tsx and PostRenderer.tsx
- **Rendered as:** `<script type="application/ld+json">` tags in page HTML

---

## 2️⃣ WHERE TO MANAGE SCHEMA JSON & SITEMAP SETTINGS

### Global Settings (Site-Wide):
**Path:** Admin → Settings → SEO tab

**Available fields:**
- **Default Meta Title** - Fallback for all pages
- **Default Meta Description** - Fallback for all pages
- **Default OG Image** - Fallback image for social sharing
- **Google Analytics ID** - e.g., G-XXXXXXXXXX
- **Google Tag Manager ID** - e.g., GTM-XXXXXXX
- **robots.txt** - Custom robots.txt content (code editor)

### Per-Document SEO:
**Path:** Any collection (Posts, Pages, People, etc.) → SEO tab

**Available fields:**
- **Meta Title** - Custom title for this page
- **Meta Description** - Custom description
- **Meta Image** - Custom OG/Twitter image
- **Canonical URL** - Override canonical (rarely needed)
- **No Index** - Prevent indexing (for draft/private pages)

### Sitemap & Robots:
**NOT configurable in admin** - auto-generated from published documents:
- **Sitemap:** `apps/cms/src/app/(frontend)/sitemap.ts`
- **Robots:** `apps/cms/src/app/(frontend)/robots.ts`
- **Collections included:** pages, posts, people, places, events, archive-items, products, custom-items

---

## 3️⃣ ARE SEO CHANGES IN ADMIN APPLIED TO FRONTEND? ✅ YES, IMMEDIATELY!

### How It Works (Instant Revalidation):

**Step 1: Admin saves document**
```
User edits post → Clicks "Save" → Payload stores in database
```

**Step 2: Payload hook triggers revalidation**
```
afterChange hook → Calls revalidatePost() → Next.js cache cleared
```

**Step 3: Frontend fetches fresh data**
```
Next request → getPostBySlug() → Returns updated post with new `meta` field
```

**Step 4: generateMetadata() uses SEO data**
```typescript
// From blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(slug)
  return generateArticleMetadata(
    {
      title: post.title,
      excerpt: post.excerpt,
      meta: post.meta,  // ← SEO plugin data (fresh from DB)
    },
    settings,
    `/blog/${slug}`
  )
}
```

**Step 5: Metadata rendered in HTML**
```html
<title>Custom Title from Admin | Site Name</title>
<meta name="description" content="Custom description from admin">
<meta property="og:image" content="Custom image from admin">
```

### ✅ Verification (No Build Required!):
1. Edit a post in admin → Change "Meta Title" → Click "Save"
2. **Immediately** refresh the frontend page
3. View page source → See your custom title in `<title>` tag
4. **No rebuild needed** - changes are live instantly!

### 🔧 How Revalidation Works:
- **Bundled Architecture**: CMS and frontend run on same Next.js server (port 3000)
- **Direct Function Calls**: Payload hooks call `revalidatePath()` directly (no HTTP requests)
- **Zero Latency**: Cache cleared instantly when admin saves
- **Listing Pages**: Blog index, people index, etc. also revalidate automatically
- **All Collections**: Posts, Pages, People, Places, Events, Archive Items all supported

---

## 4️⃣ NEXT STEPS FOR PHASE 3

### Phase 3: Bolt Integration (Custom Designs)

**Goal:** Bolt generates components that drop into shared UI

**What to do:**
1. Define component contract (props-only, no data fetching)
2. Create Bolt prompt template
3. Test workflow: generate → copy to `packages/ui` → wire to RenderBlocks
4. Document component patterns

**Timeline:** After Phase 2 is stable

---

## FIX: Listing Pages SEO Enhancement

**Current:** Blog index, people index use static metadata  
**Fix:** Use `generateEnhancedMetadata()` for canonical URLs, OG tags, etc.

**Status:** Ready to implement - see next section

