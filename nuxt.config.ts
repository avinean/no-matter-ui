import path from 'node:path'
import { getIconCollections } from '@egoist/tailwindcss-icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL || '/',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/i18n'],
  ui: {
    icons: {
      collections: {
        ...getIconCollections(['ic']),
      },
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  alias: {
    '#root': __dirname,
    '#types': path.resolve(__dirname, 'types'),
  },
  routeRules: {
    '/api/**': {
      proxy: 'http://localhost:5050/api/**',
    },
  },
})
