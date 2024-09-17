// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {},
  modules: [
    'vuetify-nuxt-module',
    '@tresjs/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/styles/main.scss'],
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.json' },
      { code: 'de', name: 'Deutsch', iso: 'de-DE', file: 'de-DE.json' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/', // Location of the JSON files
    strategy: 'no_prefix', // URL strategy, no prefix for default locale
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en'
    }
  },
  tres: {
    glsl: true
  },
  devtools: { enabled: true }
})
