import ui from './config/ui'
import colorMode from './config/colorMode'
import modules from './config/modules'
import image from './config/image'
import app from './config/app'
import runtimeConfig from './config/runtimeConfig'
import googleFonts from './config/googleFonts'
import css from './config/css'
import pinia from './config/pinia'
import routeRules from './config/routeRules'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  ui,
  colorMode,
  modules,
  image,
  app,
  runtimeConfig,
  devtools: { enabled: false },
  googleFonts,
  css,
  pinia,
  routeRules,
})
