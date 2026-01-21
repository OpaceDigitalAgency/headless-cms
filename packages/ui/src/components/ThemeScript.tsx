/**
 * ThemeScript - Inline script to prevent FOUC (Flash of Unstyled Content)
 * 
 * This component must be placed in the <head> of your document before any
 * content is rendered. It reads theme preferences and applies them immediately.
 */

interface ThemeScriptProps {
  defaultSkin?: string
  defaultMode?: string
}

export function ThemeScript({ 
  defaultSkin = 'minimal', 
  defaultMode = 'light' 
}: ThemeScriptProps) {
  // This script runs before React hydration to prevent FOUC
  const themeScript = `
    (function() {
      try {
        // Get saved preferences or use defaults
        const savedSkin = localStorage.getItem('theme-skin') || '${defaultSkin}';
        const savedMode = localStorage.getItem('theme-mode') || '${defaultMode}';
        
        // Apply skin immediately
        document.documentElement.setAttribute('data-skin', savedSkin);
        
        // Apply mode
        if (savedMode === 'system') {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (systemPrefersDark) {
            document.documentElement.classList.add('dark');
          }
        } else if (savedMode === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {
        // Fail silently - defaults will be applied by React
        console.error('Theme script error:', e);
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}

