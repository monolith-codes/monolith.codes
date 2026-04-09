// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true },
  
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    },
    css: {
      preprocessorOptions: {
        ['scss' as any]: {
          api: 'modern-compiler',
        },
      },
    }
  },

  // GLOBALS: Nuxt will bundle these into optimized, cached files in production
  css: [
    '~/assets/styles/fonts.scss',
    '~/assets/styles/main.scss',
  ],
  
  modules: [
    '@nuxt/image'
  ],

  features: {
    inlineStyles: true
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  routeRules: {
    // Cache media for 1 year
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/videos/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    
    // Nuxt/Nitro handles /_nuxt/ assets automatically with hashed filenames, 
    // but keeping this enforces strict caching policies for Lighthouse audits.
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  }
})