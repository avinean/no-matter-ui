export default defineNuxtRouteMiddleware(async () => {
  const auth = useGlobalStore()

  if (!auth.user) {
    try {
      await auth.getUser()
    } catch (_e) {
      return navigateTo('/auth/sign-in')
    }
  }
  if (!auth.user) return navigateTo('/auth/sign-in')
})
