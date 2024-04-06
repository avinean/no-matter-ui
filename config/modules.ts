import type { NuxtConfig } from 'nuxt/schema'

export default [
  '@nuxt/ui',
  '@pinia/nuxt',
  '@vueuse/nuxt',
  '@nuxtjs/color-mode',
  '@nuxtjs/i18n',
  '@nuxt/image',
  ['@nuxtjs/eslint-module', { cache: false, lintOnStart: false }],
] satisfies NuxtConfig['modules']
