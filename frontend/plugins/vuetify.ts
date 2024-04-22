import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#1976d2',
            secondary: '#424242',
            accent: '#82b1ff',
            error: '#ff5252',
            info: '#2196f3',
            success: '#4caf50',
            warning: '#ffc107'
          }
        },
        dark: {
          colors: {
            primary: '#0069d9',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#ff4444',
            info: '#1976d2',
            success: '#4caf50',
            warning: '#ffdd00'
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
