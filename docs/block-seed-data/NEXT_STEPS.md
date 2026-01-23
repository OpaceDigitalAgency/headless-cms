# NEXT STEPS: Complete Seed Data & Block Library Overhaul
**Date:** 2026-01-23
**Status:** CANONICAL SOURCE OF TRUTH
**Supersedes:** All previous audit and planning documents

---

## 🎯 MISSION: FIX INADEQUATE SEED DATA

**The Problem:** The current seed data is incomplete, inconsistent, and doesn't properly demonstrate what each preset should contain.

**Examples of Current Issues:**
- **Ecommerce preset** has only 3 generic pages (Home, About, Contact) - missing essential ecommerce pages like Shop, Cart, Checkout, Shipping, Returns
- **Brochure preset** has a "Services" page but no individual Service items collection
- **Blog preset** missing Privacy page (Brochure has it, others don't)
- **Archive preset** missing Contact page
- **All presets** have only 1 layout variation per content type (need 3 to showcase flexibility)
- **Custom collections** are minimal (4 total) - need comprehensive demo library

**The Goal:** Create a **rich, complete demo library** that showcases:
- ✅ **Preset-appropriate pages** - Ecommerce gets shop pages, Blog gets editorial pages, etc.
- ✅ **Complete page sets** - Every preset has Home, About, Contact, Privacy + preset-specific pages
- ✅ **3 layout variations** per content type to demonstrate block flexibility
- ✅ **Comprehensive collections** - Services, Courses, FAQs, Galleries, Testimonials, etc.
- ✅ **Consistent, working blocks** - All 20 blocks standardized and skin-compatible
- ✅ **Real-world examples** - Seed data that users would actually want to see in a demo

**Reference:** See [Payload's official ecommerce template](https://github.com/payloadcms/payload/tree/main/templates/ecommerce) for what a complete ecommerce implementation should include.

---

## ✅ COMPLETED WORK

### Architecture Refactor (January 2026)
- ✅ **Preset architecture fixed** - Removed frontend suffixes (blog-astro → blog, etc.)
- ✅ **Settings global added** - `activePreset` field tracks site type
- ✅ **Seed endpoints updated** - Dynamic preset detection, no hardcoded defaults
- ✅ **All references updated** - Makefile, scripts, docs, manifest files
- ✅ **Verified working** - Blog preset now seeds correct posts (not archive items)

### Skin System (January 2026)
- ✅ **Skin architecture implemented** - CSS variable-based theming
- ✅ **3 skins working** - Minimal, Retro, Agency
- ✅ **Block variants added** - Retro Hero, Agency Grid, etc.
- ✅ **Tailwind v4 compatibility** - Custom CSS for gradients (no v3 utilities)
- ✅ **Light/Dark mode** - Variable-based switching works correctly

### Current Block Status
- ✅ **20 blocks registered** - All blocks exist and render
- ✅ **18 blocks used in seeds** - Most blocks have examples
- ⚠️ **Form block** - Defined and used in Contact pages (Blog, Brochure, Ecommerce)
- ⚠️ **Inconsistent field naming** - Some blocks use `heading`, others `title`
- ⚠️ **Limited variations** - Only 1 layout per content type (need 3)

### Current Page Seed Status (100% Accurate)

**Blog Preset** - 3 pages:
- Home, About, Contact

**Brochure Preset** - 5 pages:
- Home, About, Services (plural), Contact, Privacy

**Ecommerce Preset** - 3 pages:
- Home, About, Contact

**Archive Preset** - 2 pages:
- Home, About

### Current Custom Collections Seeded

**Blog:** Reviews (product reviews with rating)
**Brochure:** Case Studies (client success stories)
**Ecommerce:** Brands (brand information)
**Archive:** Exhibitions (museum exhibitions)

---

## 🚨 CRITICAL CONSTRAINTS

### 1. Skin System Compatibility (MANDATORY)
**Every change MUST preserve skin system architecture:**

❌ **NEVER DO:**
- Hardcoded colors (`bg-white`, `text-slate-900`, `border-gray-200`)
- Tailwind v3 utilities (`bg-gradient-to-r`, `from-blue-500`, `bg-clip-text`)
- Direct style overrides that break Light/Dark mode switching

✅ **ALWAYS DO:**
- Use semantic tokens (`bg-card`, `text-muted`, `border-default`, `text-accent`)
- Use CSS variables for gradients (`var(--bg-card-gradient)`)
- Create structural variants for skin-specific layouts (`if (variant === 'agency')`)
- Ensure all blocks expose `variant` field in Payload config

### 2. Post Types (5, not 3)
Current post types in seed data:
1. Blog Post - Standard articles
2. News Post - Announcements
3. Long-Form Post - In-depth guides
4. Tutorial Post - Step-by-step instructions
5. Case Study Post - Client success stories

**Target:** 5 post types × 3 variations = **15 posts total**

### 3. Content Type Counts
Based on `payload-seed-layouts-by-content-type.md`:
- **5 page types** × 3 variations = 15 pages
- **5 post types** × 3 variations = 15 posts
- **10 archive collections** × 3 variations = 30 items

---

## 📋 PHASE 1: BLOCK AUDIT & STANDARDIZATION (DO THIS FIRST)

### Objective
Fix block foundation BEFORE expanding seed data.

### Tasks

#### 1.1 Field Naming Consistency
**Audit all 20 blocks for:**
- Inconsistent field names (`heading` vs `title` vs `headline`)
- Required vs optional fields
- TypeScript type definitions
- Admin UI descriptions

**Action:** Create standardization guide:
- Primary text: `heading` (required)
- Secondary text: `description` (optional)
- Tertiary text: `eyebrow` (optional, for labels above heading)
- Body content: `content` or `richText`

#### 1.2 Variant Field Implementation ⚠️ CRITICAL ARCHITECTURE FIX

**PROBLEM:** Current variants are hardcoded as skin names (`default`, `minimal`, `agency`, `retro`)
- This breaks when new skins are added (Glass, SaaS, etc.)
- **Variants MUST be layout/structure intent, NOT skin names**

**CORRECT ARCHITECTURE:**
```
variant = LAYOUT INTENT (skin-agnostic, portable)
skin = VISUAL TREATMENT (CSS tokens + components)
```

**How It Works:**
- Each skin **interprets** layout variants differently using CSS tokens + components
- Glass skin + `cards` variant = Frosted glass panels with backdrop blur
- SaaS skin + `cards` variant = Crisp bordered tiles with subtle shadows
- Bold skin + `cards` variant = Thick borders with strong shadows
- Agency skin + `cards` variant = Bold gradient cards
- Neon Grid skin + `cards` variant = Glowing grid-based cards
- Editorial skin + `cards` variant = Typography-focused cards
- And so on for ALL installed skins...

**Currently Installed Skins (10 total):**
1. minimal
2. editorial
3. saas
4. soft
5. bold
6. monochrome
7. glass
8. high-contrast
9. neon-grid
10. agency

**Future skins** (e.g., creative, retail, etc.) will also work because variants are layout intents, not skin names.

**Standard Variant Options (use these across all blocks):**
```typescript
{
  name: 'variant',
  type: 'select',
  admin: {
    description: 'Layout structure (works with any skin)',
  },
  options: [
    { label: 'Standard', value: 'standard' },
    { label: 'Hero-Led', value: 'hero-led' },
    { label: 'Editorial', value: 'editorial' },
    { label: 'Split', value: 'split' },
    { label: 'Grid', value: 'grid' },
    { label: 'Cards', value: 'cards' },
    { label: 'List', value: 'list' },
    { label: 'Fullscreen', value: 'fullscreen' },
    { label: 'Minimal', value: 'minimal' },
    { label: 'Stacked', value: 'stacked' },
    // Add 'timeline' for blocks that support it
  ],
}
```

**Optional Skin Override (rarely used):**
```typescript
{
  name: 'skinOverride',
  type: 'select',
  admin: {
    description: 'Force a specific skin (leave empty to use site default skin)',
    condition: (data, siblingData) => false, // Hide by default
  },
  options: [
    { label: 'Minimal', value: 'minimal' },
    { label: 'Editorial', value: 'editorial' },
    { label: 'SaaS', value: 'saas' },
    { label: 'Soft', value: 'soft' },
    { label: 'Bold', value: 'bold' },
    { label: 'Monochrome', value: 'monochrome' },
    { label: 'Glass', value: 'glass' },
    { label: 'High Contrast', value: 'high-contrast' },
    { label: 'Neon Grid', value: 'neon-grid' },
    { label: 'Agency', value: 'agency' },
  ],
}
```

**Note:** This list should match the skins defined in `Settings.ts` and `ThemeProvider.tsx`.

**Action Required:**
- [ ] **REPLACE all skin-name variants with layout-intent variants**
- [ ] Update all block configs to use new variant options
- [ ] Ensure each skin's components handle all layout variants
- [ ] Test all variants work with ALL 10 installed skins (minimal, editorial, saas, soft, bold, monochrome, glass, high-contrast, neon-grid, agency)
- [ ] Ensure system works with future skins (creative, retail, etc.)
- [ ] Update seed data to use new variant values

#### 1.3 Semantic Styling Options
**Add to blocks where appropriate:**
- `backgroundColor`: 'default' | 'light' | 'dark' | 'accent'
- `textAlign`: 'left' | 'center' | 'right'
- `spacing`: 'compact' | 'default' | 'spacious'

**These are semantic hints for the skin system, NOT hardcoded styles.**

#### 1.4 Form Block Verification
- ✅ Form block is already seeded in Contact pages (Blog, Brochure, Ecommerce)
- **Action:** Verify form block works correctly and uses semantic tokens

---

## 📋 PHASE 2: SEED DATA EXPANSION

### Objective
Create 3 layout variations per content type using corrected blocks.




### 2.1 Core Pages (Expand to 3 variations each)

**IMPORTANT:** Pages are universal across all presets. Each preset should have:
- Home, About, Contact, Privacy (minimum)
- Additional pages relevant to preset type

**Current Status:**
- Blog: Home, About, Contact (missing Privacy)
- Brochure: Home, About, Services, Contact, Privacy ✅ Complete
- Ecommerce: Home, About, Contact (missing Privacy)
- Archive: Home, About (missing Contact, Privacy)

**Target: 3 variations per page type**

**Home Page (3 variations):**
- Variation A: Hero-Led Brand Statement (Hero + Logo Cloud + Features + Testimonials + CTA + FAQ)
- Variation B: Content-First Editorial (Hero + Content + Archive + Quote + CTA)
- Variation C: Product/Service Hub (Hero + Features + Stats + Testimonials + Pricing + CTA)

**About Page (3 variations):**
- Variation A: Story & Mission (Hero + Content + Timeline + Team + CTA)
- Variation B: People & Culture (Hero + Content + Team + Testimonials + Gallery + CTA)
- Variation C: Authority Builder (Hero + Stats + Logo Cloud + Quote + Content + CTA)

**Contact Page (3 variations):**
- Variation A: Direct Conversion (Hero + Content + Form + FAQ + CTA)
- Variation B: Multi-Location/Trust-Led (Hero + Places Archive + Stats + Testimonials + Form)
- Variation C: Consultation-Focused (Hero + Pricing + Content + Form + CTA)

**Privacy Page (3 variations):**
- Variation A: Legal Document (Hero + Content + FAQ)
- Variation B: Trust-Focused (Hero + Content + Stats + Testimonials)
- Variation C: Interactive (Hero + Content + FAQ + CTA)

**Preset-Specific Pages:**

**Blog Preset:**
- Currently has: Home, About, Contact
- Missing: Privacy
- No additional blog-specific pages needed (posts are the main content)

**Brochure Preset:**
- Currently has: Home, About, Services, Contact, Privacy ✅
- Services page exists but needs 3 variations
- Consider adding: Individual Service detail pages (via Services collection)

**Ecommerce Preset:** (Reference: [Payload Ecommerce Template](https://github.com/payloadcms/payload/tree/main/templates/ecommerce))
- Currently has: Home, About, Contact
- Missing: Privacy, Shop, Cart, Checkout, Shipping, Returns, Order Tracking
- **Critical gap:** No ecommerce-specific pages at all!
- **What Payload's template includes:**
  - Shop/Products listing page
  - Cart page
  - Checkout page
  - Order confirmation page
  - Account/Orders page
  - Shipping & Returns policy pages
  - Product search page
- **Action needed:** Add ALL ecommerce pages with 3 variations each

**Archive Preset:**
- Currently has: Home, About
- Missing: Contact, Privacy
- Consider adding: Collections/Exhibitions listing page, Search page

### 2.2 Posts (15 total = 5 types × 3 variations)

**Blog Post:**
- Variation A: Editorial Article (Hero + Content + Quote + Content + CTA)
- Variation B: Authority Deep-Dive (Hero + Content + Stats + Quote + FAQ)
- Variation C: Thought Leadership (Hero + Content + Embed + Content + CTA)

**News Post:**
- Variation A: Press Update (Hero + Content + CTA)
- Variation B: Feature Launch (Hero + Features + Media + CTA)
- Variation C: Timeline Update (Hero + Timeline + Content + CTA)

**Long-Form Guide:**
- Variation A: Pillar Content (Hero + Content + FAQ + CTA)
- Variation B: Visual Guide (Hero + Media + Content + Gallery + CTA)
- Variation C: Research-Led (Hero + Stats + Content + Quote + CTA)

**Tutorial Post:**
- Variation A: Step-by-Step (Hero + Timeline + Content + HTML + CTA)
- Variation B: Video Tutorial (Hero + Embed + Content + FAQ + CTA)
- Variation C: Code-Heavy (Hero + Content + HTML + Content + CTA)

**Case Study Post:**
- Variation A: Problem→Solution→Result (Hero + Content + Features + Stats + Testimonials + CTA)
- Variation B: Visual Showcase (Hero + Gallery + Content + CTA)
- Variation C: Process-Led (Hero + Timeline + Content + CTA)

### 2.3 Custom Collections (Expand to 3 variations each)

**Currently Seeded (4 collections):**
1. **Reviews** (Blog) - Product reviews with rating field
2. **Case Studies** (Brochure) - Client success stories with industry/result fields
3. **Brands** (Ecommerce) - Brand information with country/founded fields
4. **Exhibitions** (Archive) - Museum exhibitions with start/end date fields

**NEW Collections Needed for Complete Demo Library:**

**Blog Preset:**
- Reviews ✅ (already seeded)
- **Authors** - Author profiles with bio, photo, social links
- **Testimonials** - Client/reader testimonials

**Brochure Preset:**
- Case Studies ✅ (already seeded)
- **Services** - Individual service offerings (page exists but not collection items)
- **Team Members** - Staff profiles with roles, expertise
- **FAQs** - Frequently asked questions (template exists but NOT seeded)

**Ecommerce Preset:** (Reference: [Payload Ecommerce Template](https://github.com/payloadcms/payload/tree/main/templates/ecommerce))
- Brands ✅ (already seeded)
- Products ✅ (already seeded - 12 items)
- Product Categories ✅ (already seeded - 5 items)
- Product Collections ✅ (already seeded - 3 items)
- **Reviews/Ratings** - Product reviews (different from Blog reviews)
- **Shipping Zones** - Delivery areas and costs
- **Payment Methods** - Accepted payment types

**Archive Preset:**
- Exhibitions ✅ (already seeded)
- People ✅ (already seeded - 5 items)
- Places ✅ (already seeded - 5 items)
- Events ✅ (already seeded - 5 items)
- Archive Items ✅ (already seeded - 10 items)
- **Galleries** - Image/media galleries (template exists but NOT seeded)

**Universal Collections (all presets):**
- **Testimonials** - Client testimonials with rating, company, role
- **FAQs** - Frequently asked questions (template exists but NOT seeded)

**Each collection needs 3 item variations** with different block layouts to demonstrate flexibility.

### 2.4 Ecommerce-Specific Implementation (Based on Payload Template)

**Reference:** [Payload Ecommerce Template](https://github.com/payloadcms/payload/tree/main/templates/ecommerce)

**Current State:**
- Ecommerce preset has only 3 generic pages (Home, About, Contact)
- Missing ALL ecommerce-specific functionality pages
- Footer links to non-existent pages (Shipping, Returns, FAQ)

**What Payload's Official Template Includes:**

**Pages:**
1. **Shop/Products** - Main product listing with filters, search, categories
2. **Cart** - Shopping cart with quantity adjustment, remove items
3. **Checkout** - Multi-step checkout (shipping, payment, review)
4. **Order Confirmation** - Post-purchase confirmation with order details
5. **Account/Orders** - User order history and tracking
6. **Shipping & Returns** - Policy pages with FAQs
7. **Product Search** - Dedicated search page with filters

**Collections:**
- Products (with variants, inventory tracking) ✅ Already have
- Product Categories ✅ Already have
- Product Collections ✅ Already have
- Orders (customer orders with line items)
- Carts (active shopping carts)
- Customers (user accounts with addresses)

**Blocks Used in Ecommerce:**
- Hero (product showcases)
- Archive (product listings)
- Features (product features)
- Stats (product specs, shipping info)
- CTA (add to cart, checkout)
- Form (contact, returns)
- FAQ (product questions, shipping)
- Testimonials (product reviews)

**Action Required:**
1. Add missing ecommerce pages (Shop, Cart, Checkout, etc.)
2. Create 3 variations for each page type
3. Ensure blocks demonstrate ecommerce use cases
4. Add ecommerce-specific custom collections (Reviews, Shipping Zones)

### 2.5 Core Collections (Already Installed - Expand Variations)

**Archive Preset Collections:**
- **People** - Already seeded (5 items), expand to 3 variations per person type
- **Places** - Already seeded (5 items), expand to 3 variations per place type
- **Events** - Already seeded (5 items), expand to 3 variations per event type
- **Archive Items** - Already seeded (10 items), expand to 3 variations

**Ecommerce Preset Collections:**
- **Products** - Already seeded (12 items), expand to 3 variations per product type
- **Product Categories** - Already seeded (5 items)
- **Product Collections** - Already seeded (3 items)


---

## 📋 PHASE 3: TEMPLATE SELECTION SYSTEM

### Objective
Allow editors to choose preset layouts when creating content.

### Implementation Approach

**Location:** Collection-level field in Pages.ts and Posts.ts

```typescript
// In collections/Pages.ts
{
  name: 'layoutTemplate',
  type: 'select',
  admin: {
    position: 'sidebar',
    description: 'Choose a starting layout. Blocks will auto-populate.',
  },
  options: [
    { label: 'Minimal (Hero + Content)', value: 'minimal' },
    { label: 'Standard (Hero + Content + CTA)', value: 'standard' },
    { label: 'Feature-Rich (Hero + Features + Stats + CTA)', value: 'feature-rich' },
  ],
  hooks: {
    afterChange: [
      async ({ value, data }) => {
        if (value && !data.blocks?.length) {
          data.blocks = getTemplateBlocks(value)
        }
      }
    ]
  }
}
```

### Template Gallery Component

**Create:** `apps/cms/src/components/TemplateGallery.tsx`

**Features:**
- Visual preview of each template using React components
- Color-coded block previews (Hero = gray, Features = amber, CTA = blue, etc.)
- "Use Template" button to populate blocks
- Organized by content type (Pages, Posts, etc.)

**Preview Component:**
```tsx
const BlockPreview = ({ type }: { type: string }) => {
  const colors = {
    hero: 'bg-slate-200 border-slate-400',
    content: 'bg-gray-100 border-gray-400',
    features: 'bg-amber-100 border-amber-500',
    stats: 'bg-purple-100 border-purple-500',
    cta: 'bg-blue-100 border-blue-500',
  }

  return (
    <div className={`p-2 border-2 rounded ${colors[type]}`}>
      <span className="text-xs font-medium uppercase">{type}</span>
    </div>
  )
}
```

---

## 📋 PHASE 4: SKIN-SPECIFIC SHOWCASE PAGES

### Objective
Demonstrate each skin's capabilities with dedicated showcase pages.

### Required Pages

#### 4.1 Agency Showcase (`/agency`)
**Status:** Needs creation
**Blocks:**
- Hero: `variant: 'agency'`, `type: 'fullscreen'`, `eyebrow: 'DIGITAL EXCELLENCE'`
- Grid 1: `style: 'agency-cards'`, `columns: 3` (Built for Scale)
- Grid 2: `style: 'agency-list'`, `columns: 1` (Case Studies)
- Testimonials: `style: 'agency'`

**File:** Create `apps/cms/src/seed/agency-page.ts`

#### 4.2 Retro Showcase (`/retro`)
**Status:** ✅ Already working - DO NOT BREAK
**Blocks:**
- Hero: `variant: 'retro'`
- Timeline: `heading: 'The Creative Process'` (4 steps)

**File:** `apps/cms/src/seed/retro-page.ts` (verify it's registered in seed system)

#### 4.3 Minimal Showcase (`/minimal`)
**Status:** Needs creation
**Purpose:** Demonstrate clean, minimal aesthetic

---

## 🔧 TECHNICAL REQUIREMENTS

### Skin System Rules (CRITICAL)

**From BLOCK_AND_SEED_AUDIT_HANDOVER.md:**

1. **Pure Tokens Only**
   - ✅ `bg-card` (not `bg-white`)
   - ✅ `text-muted` (not `text-gray-500`)
   - ✅ `border-default` (not `border-gray-200`)
   - ✅ `text-accent` (for brand colors)

2. **Structural Variants**
   ```tsx
   // Correct approach for skin-specific layouts
   if (variant === 'agency') return <AgencyHero {...props} />
   if (variant === 'retro') return <RetroHero {...props} />
   return <DefaultHero {...props} />
   ```

3. **Tailwind v4 Constraints**
   - ❌ NO `@apply` in CSS (often fails to resolve)
   - ❌ NO `bg-gradient-to-r` utilities (don't generate in v4)
   - ✅ USE CSS variables: `background: var(--bg-card-gradient)`

### Recovery Protocol (DB Wipe)

**Problem:** If user runs `make db-fresh`, showcase pages (Retro, Agency) disappear.

**Solution:**
1. Register showcase pages in main seed logic
2. Ensure `pnpm seed` automatically creates `/retro` and `/agency`
3. Import showcase seeders into `seed/index.ts` or relevant preset

**Files to check:**
- `apps/cms/src/seed/retro-page.ts` - Verify exists and is imported
- `apps/cms/src/seed/agency-page.ts` - Create if missing
- `apps/cms/src/seed/index.ts` - Ensure showcase pages are seeded


---

## 📊 SUCCESS CRITERIA

### Phase 1 Complete When:
- [ ] All 20 blocks use consistent field naming
- [ ] All blocks have `variant` field in Payload config
- [ ] All blocks use semantic tokens (no hardcoded colors)
- [ ] Form block verified working with semantic tokens
- [ ] Block standardization guide documented

### Phase 2 Complete When:
- [ ] Core pages completed: Home, About, Contact, Privacy (3 variations each = 12 pages)
- [ ] Privacy page added to Blog, Ecommerce, Archive presets
- [ ] Contact page added to Archive preset
- [ ] Preset-specific pages: Services (Brochure), Shop/Products (Ecommerce), Collections (Archive)
- [ ] 15 posts seeded (5 types × 3 variations)
- [ ] Custom collections expanded: Reviews, Case Studies, Brands, Exhibitions (3 variations each)
- [ ] NEW collections created: Services, Courses, FAQs, Galleries, Testimonials (3 items each)
- [ ] Core collections expanded: People, Places, Events, Archive Items, Products (3 variations per type)
- [ ] All seed data uses corrected blocks from Phase 1

### Phase 3 Complete When:
- [ ] Template selection field added to Pages and Posts
- [ ] TemplateGallery component created with visual previews
- [ ] Auto-population hooks working
- [ ] Editor documentation created

### Phase 4 Complete When:
- [ ] `/agency` page created and seeded
- [ ] `/retro` page verified working after db-fresh
- [ ] `/minimal` page created and seeded
- [ ] All showcase pages demonstrate skin-specific variants
- [ ] Recovery protocol tested (db-fresh → all pages return)

---

## 🎯 PRIORITY ORDER

**Week 1: Foundation**
1. Block audit (field naming, variants, tokens)
2. Block standardization guide
3. Form block seed examples

**Week 2: Core Pages & Posts**
4. Add missing core pages (Privacy to Blog/Ecommerce/Archive, Contact to Archive)
5. Create 3 variations for core pages (Home, About, Contact, Privacy = 12 pages)
6. Create 3 variations for Posts (5 types × 3 = 15 posts)
7. Add preset-specific pages (Services, Shop, Collections)

**Week 3: Collections**
8. Expand existing custom collections (Reviews, Case Studies, Brands, Exhibitions - 3 variations each)
9. Create NEW collections (Services, Courses, FAQs, Galleries, Testimonials - 3 items each)
10. Expand core collections (People, Places, Events, Archive Items, Products - 3 variations per type)

**Week 4: Template System & Showcase**
11. Template selection system
12. TemplateGallery component
13. Agency showcase page
14. Minimal showcase page
15. Verify Retro page recovery
16. Final testing and documentation

---

## 🗺️ COLLECTION USAGE MAP (Source of Truth)

**"If I install this collection, where will it actually appear?"**

This section removes ALL ambiguity for future agents.

### Installed Collections → Page Usage

**People** → About pages, Archive preset, Team sections
**Places** → Contact pages, Events, Archive preset
**Events** → Archive preset, Home page highlights
**Services** → Brochure Services index + Service detail pages
**FAQs** → Contact, Privacy, Product, Service pages
**Testimonials** → Home, Case Studies, Products
**Galleries** → Archive Exhibitions, Case Studies
**Reviews (Blog)** → Blog posts
**Reviews (Ecommerce)** → Product pages
**Case Studies** → Brochure Home, Services pages, About pages
**Brands** → Ecommerce Product pages, About pages
**Exhibitions** → Archive Home, Collections pages
**Courses** → Blog/Brochure educational content pages
**Team Members** → About pages, Contact pages, Brochure preset

### Preset-Specific Collection Requirements

**Blog Preset:**
- Reviews (Blog) - Used in: Blog posts
- Authors - Used in: Blog posts, About page
- Testimonials - Used in: Home page, About page

**Brochure Preset:**
- Case Studies - Used in: Home page, Services pages, About page
- Services - Used in: Services index page, individual Service detail pages
- Team Members - Used in: About page, Contact page
- FAQs - Used in: Contact page, Service pages
- Testimonials - Used in: Home page, Case Studies

**Ecommerce Preset:**
- Products - Used in: Shop page, Home page, Category pages
- Product Categories - Used in: Shop page navigation, Category pages
- Product Collections - Used in: Home page, Shop page
- Brands - Used in: Product pages, About page
- Reviews (Ecommerce) - Used in: Product pages
- Shipping Zones - Used in: Checkout page, Shipping page
- Payment Methods - Used in: Checkout page

**Archive Preset:**
- Archive Items - Used in: Archive index, Search pages
- People - Used in: About page, Archive pages, Team sections
- Places - Used in: Contact page, Events, Archive pages
- Events - Used in: Home page, Archive pages, Calendar
- Exhibitions - Used in: Home page, Collections pages
- Galleries - Used in: Exhibitions, Case Studies

### Universal Collections (All Presets)

**Testimonials** - Used in: Home page, About page, Service pages, Product pages
**FAQs** - Used in: Contact page, Privacy page, Product pages, Service pages

---

## 📚 REFERENCE DOCUMENTS

**Read in this order:**
1. `BLOCK_AND_SEED_AUDIT_HANDOVER.md` - Skin system constraints (CRITICAL)
2. `SEEDING_SYSTEM_GUIDE.md` - Current architecture
3. `payload-seed-layouts-by-content-type.md` - Target patterns
4. `PAYLOAD_CMS_AUDIT_COMPLETE.md` - Historical audit (reference only)
5. `SEED_PAGES_AUDIT.md` - Current page status (reference only)

**Skin System Docs (if available):**
- `docs/front-end/SKIN_SYSTEM_GUIDE.md`
- `docs/front-end/SKIN_IMPLEMENTATION_PROMPT.md`

---

## ⚠️ CRITICAL WARNINGS

1. **DO NOT use skin names as variant values** - Use layout intents (`cards`, `grid`, `split`) NOT skin names (`agency`, `glass`, etc.)
2. **DO NOT assume only 4 skins exist** - System has 10 installed skins (minimal, editorial, saas, soft, bold, monochrome, glass, high-contrast, neon-grid, agency) and must work with future skins (creative, retail, etc.)
3. **DO NOT break the Retro page** - It's the reference implementation
4. **DO NOT use hardcoded colors** - Breaks skin system
5. **DO NOT use Tailwind v3 gradient utilities** - They don't work in v4
6. **DO NOT create huge JSON blobs** - Keep seed data modular
7. **DO NOT forget British English** - "Specialise" not "Specialize"
8. **DO NOT remove museum references from Archive preset** - Archive IS the museum/gallery preset (intentional)
9. **DO NOT add museum content to Blog/Brochure/Ecommerce presets** - Museum content belongs ONLY in Archive

---

## 🤝 HANDOVER CHECKLIST

Before starting work:
- [ ] Read BLOCK_AND_SEED_AUDIT_HANDOVER.md completely
- [ ] Understand skin system token architecture
- [ ] Review current block implementations
- [ ] Check Retro page is working
- [ ] Verify db-fresh recovery works

After completing each phase:
- [ ] Test with `make db-fresh`
- [ ] Verify ALL 10 skins work (minimal, editorial, saas, soft, bold, monochrome, glass, high-contrast, neon-grid, agency)
- [ ] Test all block variants work with ALL skins
- [ ] Check Light/Dark mode switching for each skin
- [ ] Update this document with progress
- [ ] Document any new patterns discovered

---

**Last Updated:** 2026-01-23
**Next Agent:** Start with Phase 1 - Block Audit & Standardization
**Created By:** Preset Architecture Refactor Agent (Task: Fixed blog preset seeding issue)
