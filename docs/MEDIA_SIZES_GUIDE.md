# Media & Image Sizes Guide

## Overview

The CMS automatically generates multiple optimised image sizes when you upload an image. This ensures optimal performance across different devices and screen sizes.

## How Image Sizes Work

### Automatic Generation

When you upload an image to the Media collection:

1. **Multiple sizes are automatically created** - The system generates 14+ different sizes of your image
2. **Optimised formats** - Images are converted to WebP and AVIF formats for better compression
3. **No manual selection needed** - The front-end automatically selects the optimal size based on:
   - User's viewport size
   - Device pixel density
   - Browser capabilities
   - Layout requirements

### Generated Sizes

The following sizes are automatically created:

| Size Name | Width | Format | Use Case |
|-----------|-------|--------|----------|
| `blur` | 20px | WebP | Lazy loading placeholder |
| `thumbnail` | 300px | WebP | Admin previews, small thumbnails |
| `small` | 480px | WebP | Mobile devices |
| `card` | 640px | WebP | Grid layouts, card components |
| `medium` | 768px | WebP | Tablet devices, content images |
| `tablet` | 1024px | WebP | Tablet landscape |
| `large` | 1440px | WebP | Desktop, hero images |
| `desktop` | 1920px | WebP | Full HD displays |
| `xlarge` | 2560px | WebP | 2K/4K displays |
| `og` | 1200x630px | WebP | Social media sharing |
| `avif_small` | 480px | AVIF | Mobile (modern browsers) |
| `avif_medium` | 768px | AVIF | Tablet (modern browsers) |
| `avif_large` | 1440px | AVIF | Desktop (modern browsers) |
| `avif_desktop` | 1920px | AVIF | Full HD (modern browsers) |

### Quality Settings

- **Blur placeholder**: 20% quality (tiny file size for instant loading)
- **Small/Card sizes**: 75-80% quality
- **Medium/Tablet**: 82% quality
- **Large/Desktop**: 85% quality
- **Original**: 90% quality (max 2560px)
- **AVIF versions**: 65-75% quality (AVIF compresses better than WebP)

## Using Images in the CMS

### Alt Text

- **Defaults from filename**: When you upload an image, the alt text is automatically generated from the filename
- **Fully editable**: You can change the alt text at any time
- **Best practice**: Always review and update alt text for accessibility and SEO

### Viewing Generated Sizes

1. Upload an image to the Media collection
2. Click "Edit Image" on the uploaded file
3. Click "Sizes for [filename]" to see all generated sizes
4. Each size shows dimensions and file format

### Media List Columns

The media list view (`/admin/collections/media`) displays:

- **Filename**: Original filename
- **Alt Text**: Accessibility description
- **File Size**: Original file size (formatted)
- **Generated Sizes**: List of all sizes created (e.g., "blur, thumbnail, small, card...")
- **MIME Type**: File type
- **Created At**: Upload date

## Front-End Usage

### Responsive Images

The front-end should use the `sizes` object to implement responsive images:

```jsx
<picture>
  <source 
    srcset={`${media.sizes.avif_small.url} 480w, ${media.sizes.avif_medium.url} 768w`}
    type="image/avif"
  />
  <source 
    srcset={`${media.sizes.small.url} 480w, ${media.sizes.medium.url} 768w`}
    type="image/webp"
  />
  <img 
    src={media.sizes.medium.url}
    alt={media.alt}
    loading="lazy"
  />
</picture>
```

### Blur Placeholder

Use the `blurDataURL` field for progressive image loading:

```jsx
<Image
  src={media.url}
  alt={media.alt}
  placeholder="blur"
  blurDataURL={media.blurDataURL}
/>
```

### Dominant Colour

Use the `dominantColor` field for background placeholders:

```jsx
<div style={{ backgroundColor: media.dominantColor }}>
  <img src={media.url} alt={media.alt} />
</div>
```

## Best Practices

1. **Upload high-quality originals** - The system will optimise them
2. **Maximum recommended size**: 2560px width (system enforces this)
3. **File size limit**: 10MB per file
4. **Always add descriptive alt text** - Even though it defaults from filename
5. **Use tags** - Organise media with tags for easier searching
6. **Add captions and credits** - When applicable for attribution

## Performance Benefits

- **Faster page loads** - Smaller images for smaller screens
- **Better SEO** - Optimised images improve Core Web Vitals
- **Modern formats** - WebP and AVIF provide 30-50% better compression
- **Lazy loading** - Blur placeholders improve perceived performance
- **Bandwidth savings** - Users only download what they need

## Troubleshooting

### No sizes generated?

- Check that the file is an image (not video/PDF)
- Verify the upload completed successfully
- Check server logs for Sharp processing errors

### Missing specific sizes?

- Some sizes may not be generated if the original is smaller
- The system won't upscale images (withoutEnlargement: true)

### File size too large?

- Original files are resized to max 2560px
- Consider compressing before upload for very large files
- Use appropriate quality settings in the Media collection config

