# Testing Phase Requirements: Option 3 (Hybrid + Improved UX)

**Objective:** Validate the Custom Items + Content Types workflow with excellent seed data and improved UX before investing in Option 2 (Dynamic Collections).

**Timeline:** 1-2 weeks  
**Success Metric:** Admin can create and manage custom collections intuitively without server restart

---

## Phase 1: Seed Data Implementation

### 1.1 Create "Dinosaur" Content Type

**Location:** `apps/cms/src/endpoints/seed.ts` (add new seed preset)

**Content Type Definition:**
```
Name: Dinosaur
Slug: dinosaur
Singular: Dinosaur
Plural: Dinosaurs
Icon: dinosaur (or fossil)
Template: archive-item
Has Archive: true
Archive Slug: /dinosaurs

Custom Fields:
- extinctionDate (date) - Required
- discoveryLocation (text) - Required
- fossilType (select: Skeleton, Skull, Teeth, Footprint, Skin, Other)
- discoveryYear (number)
- scientificName (text)
- diet (select: Herbivore, Carnivore, Omnivore)
- length (text) - e.g., "25 meters"
- weight (text) - e.g., "9 tons"
```

### 1.2 Seed 8-10 Dinosaur Items

Each item should include:
- Title, slug, excerpt
- Rich content blocks (paragraph, heading, image, quote)
- Featured image
- Gallery (3-5 images)
- All custom fields populated
- Categories (e.g., "Jurassic", "Cretaceous", "Triassic")
- Tags (e.g., "Predator", "Herbivore", "Flying")

**Example Items:**
1. Tyrannosaurus Rex
2. Triceratops
3. Stegosaurus
4. Velociraptor
5. Brachiosaurus
6. Ankylosaurus
7. Parasaurolophus
8. Spinosaurus

### 1.3 Create "Classic Car" Content Type

**Content Type Definition:**
```
Name: Classic Car
Slug: classic-car
Singular: Classic Car
Plural: Classic Cars
Icon: car
Template: product
Has Archive: true
Archive Slug: /classic-cars

Custom Fields:
- manufacturer (text) - Required
- yearProduced (number) - Required
- engineType (text) - e.g., "V8"
- horsepower (number)
- topSpeed (text) - e.g., "120 mph"
- productionYears (text) - e.g., "1961-1973"
- rarity (select: Common, Rare, Very Rare, Unique)
- estimatedValue (text) - e.g., "$500,000"
- condition (select: Pristine, Excellent, Good, Fair, Restoration)
```

### 1.4 Seed 5-6 Classic Car Items

**Example Items:**
1. 1963 Corvette Stingray
2. 1961 Jaguar E-Type
3. 1957 Chevrolet Bel Air
4. 1967 Ford Mustang Fastback
5. 1961 Aston Martin DB4

---

## Phase 2: UI/UX Improvements

### 2.1 Rename & Rebrand Content Types

**Current:** "Content Types" (confusing)  
**New:** "Custom Collections" (clear)

**Changes:**
- Rename in navigation: Settings → Custom Collections
- Update labels in ContentTypeManager.tsx
- Update descriptions to use WordPress terminology

### 2.2 Add "Clone Collection" Feature

**Location:** `apps/cms/src/components/ContentTypeManager.tsx`

**Functionality:**
- Add "Clone" button next to each content type
- Modal shows:
  - Original type name
  - New name input
  - New slug input (auto-generated)
  - Confirm button
- Creates new content type with same custom fields
- Redirects to new type's edit page

### 2.3 Improve Content Type Creation Flow

**Current:** Dropdown to select template  
**Improved:**
- Show template cards with descriptions
- Show example custom fields for each template
- Show seed data availability
- "Clone from existing" option

### 2.4 Enhance Custom Items Admin UI

**Improvements:**
- Show content type icon in list view
- Add breadcrumb: Custom Collections > [Type] > Items
- Show custom fields in list columns (configurable)
- Add "Create New" button for each type in dashboard

---

## Phase 3: Blocks Support for Custom Items

### 3.1 Verify Blocks Work with Custom Items

**Test:**
- Create dinosaur item with blocks
- Add text, image, quote, heading blocks
- Verify blocks render on frontend
- Verify custom fields display alongside blocks

### 3.2 Create Block Examples

**Location:** Seed data for dinosaurs/cars

**Block Types to Include:**
- Paragraph with rich text
- Heading (h2, h3)
- Image with caption
- Quote/testimonial
- List (ordered/unordered)
- Callout/alert

---

## Phase 4: Frontend Rendering

### 4.1 Verify Custom Items Render Correctly

**Routes to test:**
- `/items/dinosaur/tyrannosaurus-rex`
- `/dinosaurs` (archive page)
- `/items/classic-car/1963-corvette-stingray`
- `/classic-cars` (archive page)

### 4.2 Display Custom Fields on Frontend

**Implementation:**
- Show custom fields in sidebar or below content
- Format dates, numbers, selects appropriately
- Show gallery images
- Show categories/tags

### 4.3 Create Demo Pages

**Location:** `apps/web/src/pages/demo/`

**Pages:**
- `/demo/dinosaurs` - Showcase dinosaur collection
- `/demo/classic-cars` - Showcase classic cars collection
- `/demo/custom-collections` - Explain the system

---

## Phase 5: Documentation & Demo

### 5.1 Admin Guide

**Document:** `headless-cms/docs/CUSTOM_COLLECTIONS_GUIDE.md`

**Sections:**
1. What are Custom Collections?
2. Creating a new collection (step-by-step)
3. Adding custom fields
4. Creating items
5. Publishing & archiving
6. Cloning collections
7. Troubleshooting

### 5.2 Screenshots & Walkthrough

**Capture:**
- Creating a new content type
- Adding custom fields
- Creating an item
- Viewing on frontend
- Cloning a collection

### 5.3 Video Demo (Optional)

**Content:**
- 5-minute walkthrough
- Create dinosaur collection
- Add 2-3 items
- Show on frontend

---

## Phase 6: Testing & Feedback

### 6.1 Internal Testing

**Checklist:**
- [ ] Create content type without errors
- [ ] Add custom fields (all types)
- [ ] Create items with all field types
- [ ] Blocks render correctly
- [ ] Custom fields display on frontend
- [ ] Archive pages work
- [ ] Categories/tags work
- [ ] Search includes custom items
- [ ] Drafts/publishing works
- [ ] Versioning works

### 6.2 User Testing

**Participants:** 2-3 non-technical users

**Tasks:**
1. Create a new collection type
2. Add 3 custom fields
3. Create 2 items
4. Publish items
5. View on website

**Feedback Questions:**
- Was the workflow intuitive?
- Did you understand what each step does?
- What was confusing?
- What would make it easier?
- Would you use this for your website?

### 6.3 Performance Testing

**Scenarios:**
- Create 100 custom items
- Query performance with custom fields
- Search performance
- Admin UI responsiveness

---

## Success Criteria

✅ **Must Have:**
- Admin can create content type in <2 minutes
- Admin can add custom fields without confusion
- Admin can create items with blocks + custom fields
- Items render correctly on frontend
- No server restart required
- UX feels intuitive

✅ **Should Have:**
- Clone collection feature works
- Seed data is realistic and useful
- Documentation is clear
- Performance is acceptable (100+ items)

✅ **Nice to Have:**
- Video demo
- Multiple example collections
- Advanced field types (relationships, etc.)

---

## Deliverables

1. ✅ Dinosaur content type + 8 seed items
2. ✅ Classic Car content type + 5 seed items
3. ✅ Improved ContentTypeManager UI
4. ✅ Clone collection feature
5. ✅ Frontend rendering verified
6. ✅ Admin guide documentation
7. ✅ Screenshots/walkthrough
8. ✅ Testing results & feedback summary

---

## After Testing: Decision Point

**If successful:**
- Option 3 is viable and user-friendly
- Proceed with Option 2 investigation
- Document findings for next phase

**If issues found:**
- Fix UX problems
- Re-test
- Decide: improve Option 3 or accelerate Option 2?

**Next Document:** `OPTION_2_INVESTIGATION.md` (after testing complete)

