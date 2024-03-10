import type { NuxtConfig } from 'nuxt/schema'

export default {
  public: {
    apiBaseUrl: process.env.API_BASE_URL || '/',
    imageBaseUrl: process.env.IMAGE_BASE_URL || '/',
  },
} satisfies NuxtConfig['runtimeConfig']
