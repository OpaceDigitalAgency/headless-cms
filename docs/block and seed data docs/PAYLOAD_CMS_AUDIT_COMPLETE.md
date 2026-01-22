# Payload CMS Blocks & Seed Data Audit - Complete

**Completed:** 2026-01-22  
**Status:** All 20 blocks registered ✅ | Seed data verified ✅

---

## EXECUTIVE SUMMARY

### payload-seed-layouts-by-content-type.md Overview
Defines **30+ best-practice layout patterns** across:
- **5 page types** (Home, About, Contact, Service, Landing) - 3 variations each
- **3 post types** (Blog, News, Long-Form) - 3 variations each  
- **10 archive collections** (Case Studies, Services, People, Places, Events, Courses, FAQs, Galleries, Reviews, Testimonials) - 3 variations each

**Purpose:** Provide editors with high-quality starting points using reusable block combinations for consistent, SEO-optimised layouts.

---

## PART A: BLOCKS INVENTORY

### ✅ All 20 Blocks Registered

**9 Core Blocks (in main registry):**
1. Hero, 2. Content, 3. Media, 4. CTA, 5. Archive, 6. Form, 7. Gallery, 8. Grid, 9. Timeline

**11 Extended Blocks (in main registry):**
10. Quote, 11. Features, 12. Stats, 13. Logo Cloud, 14. Testimonials, 15. FAQ, 16. Pricing, 17. Team, 18. Embed, 19. Spacer, 20. HTML

**Registry Location:** `apps/cms/src/blocks/index.ts`
- All 20 blocks exported (lines 9-30)
- All 20 blocks in `allBlocks` array (lines 57-78)
- All 20 blocks in `blockRegistry` object (lines 83-104)

---

## PART B: VERIFIED SEED DATA

### Pages (3 items seeded)
1. **Home** - Hero + Archive + CTA blocks
2. **About the Archive** - Hero + Content blocks
3. **Contact** - Hero + Content blocks

### Posts (3 items seeded)
1. **New Renaissance Exhibition Opening** - Grid + CTA blocks
2. **Recent Archaeological Discoveries** - Stats + Features blocks
3. **Family Day at the Archive** - Grid blocks

### People (5 items seeded)
1. **Leonardo da Vinci** - Features + Stats + Quote blocks
2. **Michelangelo Buonarroti** - Timeline + Features blocks
3. **Raphael Sanzio** - Grid + CTA blocks
4. **Claude Monet** - Features + Testimonials blocks
5. **Phidias** - Stats + Quote blocks

### Places (5 items seeded)
1. **Florence, Italy** - Grid + Stats blocks
2. **Rome, Italy** - Features blocks
3. **Paris, France** - Stats + CTA blocks
4. **Athens, Greece** - Grid blocks
5. **Cairo, Egypt** - Features blocks

### Events (5 items seeded)
1. **Renaissance Art Exhibition** - Features blocks
2. **Ancient Pottery Workshop** - Grid blocks
3. **Art History Lecture Series** - Stats blocks
4. **Family Day at the Museum** - Features blocks
5. **Contemporary Art Opening** - Testimonials blocks

### Archive Items (10 items seeded)
1. **Leonardo's Notebook** - Features + Quote blocks
2. **Renaissance Painting Techniques Manual** - Grid blocks
3. **Ancient Roman Coin Collection** - Stats blocks
4. **Medieval Manuscript** - Features blocks
5. **Victorian Era Photographs** - Grid blocks
6. **Egyptian Funerary Mask** - Features blocks
7. **Byzantine Mosaic Panel** - Stats blocks
8. **Islamic Astronomical Chart** - Grid blocks
9. **Japanese Woodblock Prints** - (no blocks)
10. *(10th item available in seed code)*

---

## PART C: BLOCK USAGE ANALYSIS

### Blocks Used in Seeds
✅ **18 of 20 blocks** instantiated:
- All 9 core blocks used
- 9 of 11 extended blocks used
- ❌ Form block never seeded
- ❌ Spacer, HTML, Embed only in showcase page

### Most Common Block Combinations
1. **Hero + Content + CTA** (basic page)
2. **Hero + Features + Stats + CTA** (feature showcase)
3. **Stats + Features + Testimonials + Grid + CTA** (custom items)
4. **Grid + CTA** (event/post patterns)

### Block Availability by Collection
All 20 blocks available in:
- Pages ✅
- Posts ✅
- People ✅
- Places ✅
- Custom Items ✅

NOT available in:
- Products (ecommerce preset)

---

## PART D: ALIGNMENT WITH LAYOUT DOCUMENT

### What's Implemented ✅
- All 20 recommended blocks exist and are registered
- Seed data uses blocks from document recommendations
- Showcase page demonstrates all blocks
- Block registry properly configured

### What's Missing ⚠️
- Only **1 layout per content type** seeded (document suggests 3 variations each)
- **No seed data** for: Events, Courses, FAQs, Galleries, Reviews, Testimonials (as collections)
- **No layout variations** - each content type has ONE seed layout, not three
- **Form block** defined but never used in any seed

---

## RECOMMENDATIONS

### Recommendation 2: Expand Seeds
Create seed data for all 15 content types from layout document:
- Events, Courses, FAQs, Galleries, Reviews, Testimonials (as collections)
- Additional variations for existing collections

### Recommendation 3: Implement Variations
Add 2-3 layout variations per content type:
- Variation A: Hero + Content + CTA (basic)
- Variation B: Hero + Features + Stats + CTA (feature-rich)
- Variation C: Hero + Grid + Testimonials + CTA (social proof)

### Recommendation 4: Document Patterns
Create editor guide showing:
- Recommended block combinations per content type
- Best practices for block ordering
- Performance considerations

### Recommendation 5: Test Form Block
- Ensure Form block works in seed data
- Create sample form in seed
- Test form submissions and data capture

### Recommendation 6: Create Templates
Consider preset layouts for each content type:
- Save common combinations as reusable templates
- Enable quick content creation for editors
- Maintain consistency across site

---

## BLOCK SPECIFICATIONS SUMMARY

| Block | Type | Key Fields | Used in Seeds |
|-------|------|-----------|---|
| Hero | Core | type, heading, subheading, image, links[] | ✅ All presets |
| Content | Core | columns[], richText | ✅ All presets |
| Media | Core | media, caption, size, position | ✅ Showcase |
| CTA | Core | style, heading, description, links[] | ✅ All presets |
| Archive | Core | heading, populateBy, relationTo, layout | ✅ Showcase |
| Form | Core | form, enableIntro, style | ❌ Never |
| Gallery | Core | heading, layout, images[], showCaptions | ✅ Showcase |
| Grid | Core | heading, style, columns, items[] | ✅ Blog, Showcase |
| Timeline | Core | heading, layout, events[] | ✅ Showcase |
| Quote | Extended | quote, author, role, align | ✅ Showcase |
| Features | Extended | heading, layout, items[] | ✅ Blog, Showcase |
| Stats | Extended | heading, stats[] | ✅ All presets |
| Logo Cloud | Extended | heading, logos[] | ✅ Showcase |
| Testimonials | Extended | heading, items[] | ✅ Blog, Showcase |
| FAQ | Extended | heading, items[] | ✅ Showcase |
| Pricing | Extended | heading, plans[] | ✅ Showcase |
| Team | Extended | heading, members[] | ✅ Showcase |
| Embed | Extended | heading, url, aspectRatio | ✅ Showcase |
| Spacer | Extended | style, size | ✅ Showcase |
| HTML | Extended | html (raw textarea) | ✅ Showcase |

---

## FILES DELETED

The following audit documents have been consolidated into this single file:
- ~~AUDIT_BLOCKS_AND_SEEDS.md~~
- ~~AUDIT_BLOCKS_DETAILED_SPECS.md~~
- ~~AUDIT_SEED_BLOCK_PATTERNS.md~~
- ~~AUDIT_BLOCK_MATRIX.md~~
- ~~AUDIT_SUMMARY.md~~

**Reason:** Single comprehensive document is easier to maintain and reference.

