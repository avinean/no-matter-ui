import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui', '@pinia/nuxt'],
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
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})
