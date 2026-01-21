# Testing Guide: Phases 1 & 2 Implementation

## 🚀 Quick Start

### 1. Restart the CMS Server
```bash
cd headless-cms/apps/cms
pnpm run dev
```

**Important:** You MUST restart the server after configuration changes for the SEO plugin fields to appear.

---

## 📍 Where to Test Phase 1: Theme System

### Admin Panel - Theme Settings
1. Navigate to: `http://localhost:3000/admin`
2. Click **"Settings"** in the left sidebar (under "Site" group)
3. Click the **"Appearance"** tab
4. You should see:
   - **Default Skin** dropdown (8 options: Minimal, Editorial, SaaS, Soft, Bold, Monochrome, Glass, High Contrast)
   - **Default Mode** dropdown (Light, Dark, System Preference)

### Frontend - Theme Application
**Note:** The theme switcher component exists but is NOT currently visible on the frontend because we haven't added it to the Header/Footer components yet.

To test the theme system:
1. Check the HTML source of any frontend page
2. Look for `<script>` tag with theme initialization code
3. The `<body>` tag should have inline styles using CSS variables

---

## 📍 Where to Test Phase 2: SEO

### Admin Panel - SEO Fields

#### For Posts:
1. Navigate to: `http://localhost:3000/admin/collections/posts`
2. Edit any post (e.g., "Family Day at the Archive")
3. Click the **"SEO"** tab
4. You should see fields added by `@payloadcms/plugin-seo`:
   - **Meta Title** (overrides post title)
   - **Meta Description**
   - **Meta Image** (for OpenGraph/Twitter cards)
   - **Canonical URL** (optional override)
   - **No Index** checkbox

#### For Pages:
1. Navigate to: `http://localhost:3000/admin/collections/pages`
2. Edit any page
3. Click the **"SEO"** tab
4. Same fields as above

#### Global SEO Settings:
1. Navigate to: `http://localhost:3000/admin/globals/settings`
2. Click the **"SEO"** tab
3. You should see:
   - **Default Meta Title**
   - **Default Meta Description**
   - **Default OG Image**
   - **Google Analytics ID**
   - **Google Tag Manager ID**
   - **robots.txt** (custom override)

### Frontend - SEO Output

#### Test Sitemap:
```bash
curl http://localhost:3001/sitemap.xml
```
Or visit in browser: `http://localhost:3001/sitemap.xml`

**Expected:** XML sitemap with all published pages, posts, people, places, events, archive-items

#### Test Robots.txt:
```bash
curl http://localhost:3001/robots.txt
```
Or visit in browser: `http://localhost:3001/robots.txt`

**Expected:** Robots directives (blocks /admin, /api, /preview in production)

#### Test Metadata in HTML:
1. Visit any page: `http://localhost:3001/blog/family-day-archive`
2. Right-click → "View Page Source"
3. Look for in `<head>`:
   ```html
   <title>Family Day at the Archive | Your Site Name</title>
   <meta name="description" content="...">
   <link rel="canonical" href="http://localhost:3001/blog/family-day-archive">
   
   <!-- OpenGraph -->
   <meta property="og:title" content="...">
   <meta property="og:description" content="...">
   <meta property="og:image" content="...">
   <meta property="og:url" content="...">
   <meta property="og:type" content="article">
   
   <!-- Twitter Cards -->
   <meta name="twitter:card" content="summary_large_image">
   <meta name="twitter:title" content="...">
   <meta name="twitter:description" content="...">
   <meta name="twitter:image" content="...">
   ```

---

## ❌ Known Issues

### 1. SEO Tab is Empty
**Problem:** The SEO tab shows but has no fields

**Solution:** 
- Restart the CMS server: `pnpm run dev` in `headless-cms/apps/cms`
- The `@payloadcms/plugin-seo` plugin injects fields at runtime
- If still empty, check the browser console for errors

### 2. Appearance Tab Not Showing
**Problem:** No "Appearance" tab in Settings

**Solution:**
- Restart the CMS server
- Clear browser cache
- Check that `Settings.ts` has the Appearance tab defined

### 3. Theme Switcher Not Visible
**Problem:** Can't see theme switcher on frontend

**Status:** **This is expected!** We created the component but haven't added it to the Header/Footer yet.

**To fix:** Add `<ThemeSwitcher />` to your Header component

### 4. No Metadata in HTML Source
**Problem:** Viewing page source shows no meta tags

**Possible causes:**
- Frontend server not running (should be on port 3001)
- Need to rebuild: `pnpm run build` then `pnpm run start`
- Check browser console for errors

---

## 🔧 Troubleshooting

### Clear Payload Cache
```bash
cd headless-cms/apps/cms
rm -rf .next
pnpm run dev
```

### Check if SEO Plugin is Active
Look in `headless-cms/apps/cms/src/payload.config.ts` for:
```typescript
seoPlugin({
  collections: ['pages', 'posts', ...],
  tabbedUI: true,
  ...
})
```

### Verify Frontend is Running
```bash
# Check if port 3001 is in use
lsof -i :3001

# Or try to access
curl -I http://localhost:3001
```

---

## ✅ Success Criteria

### Phase 1 Complete When:
- [ ] Appearance tab visible in Settings
- [ ] Can select different skins and modes
- [ ] Theme preferences save and persist
- [ ] CSS variables applied to frontend

### Phase 2 Complete When:
- [ ] SEO tab visible in Posts/Pages with fields
- [ ] Can edit meta title, description, image
- [ ] Sitemap.xml generates correctly
- [ ] Robots.txt generates correctly
- [ ] HTML source shows all meta tags
- [ ] Canonical URLs present
- [ ] OpenGraph tags present
- [ ] Twitter card tags present

---

## ✅ Completed Improvements

### JSON-LD Schemas - COMPLETE
All page templates now include structured data:

1. **PageRenderer.tsx** - Injects:
   - WebSite schema (home page only)
   - Organization schema
   - Breadcrumb schema

2. **PostRenderer.tsx** - Injects:
   - Article schema with author, dates, images
   - Organization schema
   - Breadcrumb schema

3. **People pages** - Injects:
   - Person schema with bio, role, contact info
   - Organization schema
   - Breadcrumb schema

4. **Events pages** - Injects:
   - Event schema with dates, location
   - Organization schema
   - Breadcrumb schema

5. **Archive Items pages** - Enhanced metadata with images

### Enhanced Metadata - COMPLETE
All collection routes now use `generateEnhancedMetadata()`:
- ✅ Pages
- ✅ Posts (with article-specific metadata)
- ✅ People
- ✅ Events
- ✅ Archive Items
- ✅ Home page

Each includes:
- Canonical URLs
- OpenGraph tags
- Twitter cards
- Proper image fallbacks
- Robots directives

### Test JSON-LD Output
View page source and look for:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": {...},
  "publisher": {...}
}
</script>
```

## 📝 Optional Next Steps

### Recommended: Replace Theme System
Consider replacing our custom theme system with `next-themes`:
```bash
pnpm add next-themes
```

This is the industry standard and handles everything automatically.

### Add ThemeSwitcher to Header
The ThemeSwitcher component exists but isn't visible. Add it to your Header component to make it accessible to users.

