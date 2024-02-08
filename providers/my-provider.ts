import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

export const getImage: ProviderGetImage = src => ({
  url: src && joinURL(useRuntimeConfig().publicbaseUrl, src),
})
