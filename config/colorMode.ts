import type { NuxtConfig } from 'nuxt/schema'

export default {
  preference: 'light', // default value of $colorMode.preference
  fallback: 'light', // fallback value if not system preference found
  hid: 'nuxt-color-mode-script',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  classPrefix: '',
  classSuffix: '-mode',
  storageKey: 'nuxt-color-mode',
} satisfies NuxtConfig['colorMode']
