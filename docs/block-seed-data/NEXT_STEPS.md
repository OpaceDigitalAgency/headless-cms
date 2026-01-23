# NEXT STEPS: Block & Seed Data Completion
**Date:** 2026-01-23
**Status:** CANONICAL SOURCE OF TRUTH
**Supersedes:** All previous audit and planning documents

---

## 🎯 MISSION

Complete the block library and seed data system to showcase the **best possible** implementation of:
- 20 blocks (all working, consistent, skin-compatible)
- 5 presets (blog, brochure, archive, ecommerce, + demo/showcase)
- Multiple layout variations per content type
- Full skin system compatibility

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
- ⚠️ **Form block** - Defined but never seeded
- ⚠️ **Inconsistent field naming** - Some blocks use `heading`, others `title`
- ⚠️ **Limited variations** - Only 1 layout per content type (need 3)

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

#### 1.2 Variant Field Implementation
**Ensure every block has:**
```typescript
{
  name: 'variant',
  type: 'select',
  admin: {
    description: 'Visual style variant (works with active skin)',
  },
  options: [
    { label: 'Default', value: 'default' },
    { label: 'Minimal', value: 'minimal' },
    { label: 'Agency', value: 'agency' },
    { label: 'Retro', value: 'retro' },
  ],
}
```

#### 1.3 Semantic Styling Options
**Add to blocks where appropriate:**
- `backgroundColor`: 'default' | 'light' | 'dark' | 'accent'
- `textAlign`: 'left' | 'center' | 'right'
- `spacing`: 'compact' | 'default' | 'spacious'

**These are semantic hints for the skin system, NOT hardcoded styles.**

#### 1.4 Missing Block Implementation
- ✅ Form block exists but never seeded
- **Action:** Create seed example in at least 2 presets (brochure, blog contact pages)

---

## 📋 PHASE 2: SEED DATA EXPANSION

### Objective
Create 3 layout variations per content type using corrected blocks.




### 2.1 Pages (15 total = 5 types × 3 variations)

**Home Page:**
- Variation A: Hero-Led Brand Statement (Hero + Logo Cloud + Features + Testimonials + CTA + FAQ)
- Variation B: Content-First Editorial (Hero + Content + Archive + Quote + CTA)
- Variation C: Product/Service Hub (Hero + Features + Stats + Testimonials + Pricing + CTA)

**About Page:**
- Variation A: Story & Mission (Hero + Content + Timeline + Team + CTA)
- Variation B: People & Culture (Hero + Content + Team + Testimonials + Gallery + CTA)
- Variation C: Authority Builder (Hero + Stats + Logo Cloud + Quote + Content + CTA)

**Contact Page:**
- Variation A: Direct Conversion (Hero + Content + Form + FAQ + CTA)
- Variation B: Multi-Location/Trust-Led (Hero + Places Archive + Stats + Testimonials + Form)
- Variation C: Consultation-Focused (Hero + Pricing + Content + Form + CTA)

**Service Page:**
- Variation A: Classic Service Explainer (Hero + Content + Features + Testimonials + FAQ + CTA)
- Variation B: Outcome-Driven (Hero + Stats + Case Studies Archive + Timeline + CTA)
- Variation C: Comparison/Decision Support (Hero + Pricing + Features + Testimonials + CTA)

**Landing Page:**
- Variation A: SEO Conversion (Hero + Content + FAQ + Testimonials + CTA)
- Variation B: Short-Form Paid Traffic (Hero + Features + Stats + CTA)
- Variation C: Offer-Focused (Hero + Pricing + Features + CTA)

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

### 2.3 Archive Collections (30 total = 10 types × 3 variations)

**Priority collections to implement:**
1. **Case Studies** - Already partially seeded in Brochure preset, expand to 3 variations
2. **Services** - NEW collection needed (Brochure has "Services" page but not individual service items)
3. **People** - Already seeded in Archive preset, expand variations
4. **Places** - Already seeded in Archive preset, expand variations
5. **Events** - Already seeded in Archive preset, expand variations
6. **Courses** - NEW collection needed (educational content with lessons/modules)
7. **FAQs** - NEW collection needed (frequently asked questions)
8. **Galleries** - Template exists but not installed, needs implementation
9. **Reviews** - Already seeded in Blog preset as custom content type, expand to 3 variations
10. **Testimonials** - NEW collection needed (client testimonials)

**Each collection needs 3 layout variations** as defined in `payload-seed-layouts-by-content-type.md`.

### 2.4 Missing Core Pages

**Pages that need to be added:**
- **Service page** - Add to Blog preset (currently missing)
- **Service page** - Add to Ecommerce preset (currently missing)

**Note:** Brochure preset has "Services" (plural) page but should also have individual Service collection items.


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
- [ ] Form block has seed examples in 2+ presets
- [ ] Block standardization guide documented

### Phase 2 Complete When:
- [ ] 15 pages seeded (5 types × 3 variations)
- [ ] Service page added to Blog preset
- [ ] Service page added to Ecommerce preset
- [ ] 15 posts seeded (5 types × 3 variations)
- [ ] 30 archive items seeded (10 types × 3 variations)
- [ ] All new collections created (Courses, FAQs, Galleries, Services, Testimonials)
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

**Week 2: Expansion**
4. Create 3 variations for Pages (15 total)
5. Create 3 variations for Posts (15 total)
6. Add missing collections (Courses, FAQs, Galleries, Reviews, Testimonials)

**Week 3: Enhancement**
7. Create 3 variations for archive collections (30 total)
8. Template selection system
9. TemplateGallery component

**Week 4: Showcase**
10. Agency showcase page
11. Minimal showcase page
12. Verify Retro page recovery
13. Final testing and documentation

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

1. **DO NOT break the Retro page** - It's the reference implementation
2. **DO NOT use hardcoded colors** - Breaks skin system
3. **DO NOT use Tailwind v3 gradient utilities** - They don't work in v4
4. **DO NOT create huge JSON blobs** - Keep seed data modular
5. **DO NOT forget British English** - "Specialise" not "Specialize"

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
- [ ] Verify all skins still work (Minimal, Retro, Agency)
- [ ] Check Light/Dark mode switching
- [ ] Update this document with progress
- [ ] Document any new patterns discovered

---

**Last Updated:** 2026-01-23
**Next Agent:** Start with Phase 1 - Block Audit & Standardization
**Created By:** Preset Architecture Refactor Agent (Task: Fixed blog preset seeding issue)
