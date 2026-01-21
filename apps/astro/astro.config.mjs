import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const enableSitemap = process.env.ENABLE_SITEMAP === 'true';

export default defineConfig({
  // Site URL for sitemap generation
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  
  // Output mode: 'static' for full SSG, 'hybrid' for SSG with some SSR routes
  output: 'static',
  
  // Integrations
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    ...(enableSitemap
      ? [
          sitemap({
            filter: (page) => !page.includes('/preview/'),
          }),
        ]
      : []),
  ],
  
  // Build configuration
  build: {
    // Generate clean URLs without .html extension
    format: 'directory',
    // Assets directory
    assets: '_assets',
  },
  
  // Vite configuration for Payload Local API
  vite: {
    // Resolve aliases for monorepo packages
    resolve: {
      alias: {
        '@': '/src',
        '@repo/shared': '../../packages/shared/src',
      },
    },
  },
  
  // Server configuration for development
  server: {
    port: 4321,
    host: true,
  },
  
  // Prefetch configuration
  prefetch: {
    prefetchAll: true,
  },
});
