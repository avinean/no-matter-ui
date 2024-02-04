export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useGlobalStore()
  if (!to.meta.public) {
    if (!auth.user) {
      try {
        await auth.getUser()
      } catch (_e) {
        return navigateTo('/auth/sign-in')
      }
    }
    if (!auth.user) return navigateTo('/auth/sign-in')
  }
})
