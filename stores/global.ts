import type { BusinessEntity, ProfileEntity } from '~/types/entities'
import type { Permission } from '~/types/permissions'

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()
  const loading = ref(false)
  const toast = useToast()
  const user = ref<ProfileEntity | null>(null)
  const cookie = useCookie('sraka')
  const { $i18n } = useNuxtApp()
  const isAdmin = computed(() => user.value?.roles.some(role => role.name === 'admin'))
  const permissions = computed(() => user.value?.roles.flatMap(
    role => role.assignedPermissions.map(
      permission => `${permission.resourceType}:${permission.actionType}` as unknown as Permission,
    ),
  ))
  function setLoading(value: boolean) {
    loading.value = value
  }
  function hasPermission(permission: Permission | Permission[], mode: 'every' | 'some' = 'every') {
    return [permission].flat()[mode](p => permissions.value?.includes(p))
  }

  async function resetPassword(body: { email: string }) {
    try {
      await $api<{ message: string }>('/auth/reset-password', {
        method: 'POST',
        body,
      })
    }
    catch (error: any) {
      console.log(error)
    }
  }
  async function login(body: { phone: string, password: string }) {
    loading.value = true
    try {
      const data = await $api<{ access_token: string }>('/auth/login', {
        method: 'POST',
        body,
      })
      cookie.value = data?.access_token
      await nextTick()
      await getUser()
      router.push('/')
    }
    catch (error: any) {
      if (error.data?.statusCode === 401) {
        toast.add({
          title: $i18n.t('requestErrors.signIn.invalid.title'),
          description: $i18n.t('requestErrors.signIn.invalid.description'),
          color: 'red',
        })
      }
      else {
        toast.add({
          title: $i18n.t('requestErrors.unknownError.title'),
          description: $i18n.t('requestErrors.unknownError.description'),
          color: 'red',
        })
      }
    }
    finally {
      loading.value = false
    }
  }

  async function refreshToken() {
    loading.value = true;
    try {
      const data = await $api<{ access_token: string }>('/auth/refresh-token', { method: 'POST' });
      cookie.value = data?.access_token;
      await nextTick();
      await getUser();
    } finally {
      loading.value = false;
    }
  }

  async function signup(body: { firstName: string, lastName: string, phone: string }, cb?: () => void) {
    loading.value = true
    try {
      await $api<{ access_token: string }>('/auth/signup', {
        method: 'POST',
        body,
      })

      cb?.()
      router.push('/auth/sign-in')
    }
    catch (error: any) {
      if (error.status === 409) {
        toast.add({
          title: $i18n.t('requestErrors.signUp.duplicate.title'),
          description: $i18n.t('requestErrors.signUp.duplicate.description'),
          color: 'red',
        })
      }
      else {
        toast.add({
          title: $i18n.t('requestErrors.unknownError.title'),
          description: $i18n.t('requestErrors.unknownError.description'),
          color: 'red',
        })
      }
    }
    finally {
      loading.value = false
    }
  }

  function logout() {
    cookie.value = ''
    user.value = null
    router.push('/auth/sign-in')
  }

  async function getBusinesses() {
    user.value!.businesses = await $api<BusinessEntity[]>(`/business/${user.value?.id}`)
  }

  async function getUser() {
    const profile = await $api<ProfileEntity>('/profile/me')
    user.value = profile
  }

  return {
    user,
    isAdmin,
    loading,
    login,
    refreshToken,
    signup,
    resetPassword,
    logout,
    getUser,
    getBusinesses,
    hasPermission,
    setLoading,
  }
})
