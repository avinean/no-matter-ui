import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = src => ({
  url: joinURL(`${process.env.IMAGE_BASE_URL || ''}/uploads`, src),
})
