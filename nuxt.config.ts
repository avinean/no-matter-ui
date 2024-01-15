// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  vite: {
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:5050',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
