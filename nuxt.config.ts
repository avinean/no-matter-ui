import path from 'node:path'
import { getIconCollections } from '@egoist/tailwindcss-icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL || '/',
    },
  },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/google-fonts', '@nuxtjs/color-mode'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  ui: {
    icons: {
      collections: {
        ...getIconCollections(['ic']),
      },
    },
  },
  googleFonts: {
    families: {
      Raleway: true,
    },
  },

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
  css: [
    '@/assets/global.css',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  alias: {
    '#root': __dirname,
    '#types': path.resolve(__dirname, 'types'),
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5050',
          changeOrigin: true,
        },
      },
    },
  },
})
