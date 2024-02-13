import type { NuxtConfig } from 'nuxt/schema'

export default {
  pageTransition: { name: 'page', mode: 'out-in' },
} satisfies NuxtConfig['app']
