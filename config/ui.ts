import { getIconCollections } from '@egoist/tailwindcss-icons'
import type { NuxtConfig } from 'nuxt/schema'

export default {
  icons: {
    collections: {
      ...getIconCollections(['ic']),
    },
  },
} satisfies NuxtConfig['ui']
