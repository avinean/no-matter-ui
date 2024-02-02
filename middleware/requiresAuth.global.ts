export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useGlobalStore()
  if (!to.meta.public) {
    if (!auth.user) {
      try {
        console.log('before auth')
        await auth.getUser()
        console.log('after auth')
      }
      catch (_e) {
        console.log('before auth catched')
        return navigateTo('/auth/sign-in')
      }
    }
    if (!auth.user)
      return navigateTo('/auth/sign-in')
  }
})
