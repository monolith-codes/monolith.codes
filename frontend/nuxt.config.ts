// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {},
  build: {
    transpile: ['vuetify']
  },
  modules: ['vuetify-nuxt-module', '@tresjs/nuxt'],
  tres: {
    glsl: true
  },
  devtools: { enabled: true }
})
