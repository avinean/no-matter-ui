import path from 'node:path'
import type { NuxtConfig } from 'nuxt/schema'

export default {
  '#root': __dirname,
  '#types': path.resolve(__dirname, 'types'),
} satisfies NuxtConfig['alias']
