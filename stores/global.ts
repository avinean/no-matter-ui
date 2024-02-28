import type { BusinessEntity, BusinessObjectEntity, ProfileEntity } from '~/types/entities'
import type { Permission } from '~/types/permissions'

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()
  const toast = useToast()
  const user = ref<ProfileEntity | null>(null)
  const business = ref<BusinessEntity>()
  const object = ref<BusinessObjectEntity>()
  const cookie = useCookie('sraka')
  const { $i18n } = useNuxtApp()
  const isAdmin = computed(() => user.value?.roles.some(role => role.name === 'admin'))
  const permissions = computed(() => user.value?.roles.flatMap(
    role => role.assignedPermissions.map(
      permission => `${permission.resourceType}:${permission.actionType}` as unknown as Permission,
    ),
  ))

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

    }
  }
  async function login(body: { phone: string, password: string }) {
    try {
      const data = await $api<{ access_token: string }>('/auth/login', {
        method: 'POST',
        body,
      })
      cookie.value = data?.access_token
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
          title: $i18n.t('signIn.requestErrors.unknownError.title'),
          description: $i18n.t('signIn.requestErrors.unknownError.description'),
          color: 'red',
        })
      }
    }
  }

  async function signup(body: { firstName: string, lastName: string, phone: string }) {
    await $api<{ access_token: string }>('/auth/signup', {
      method: 'POST',
      body,
    })

    router.push('/auth/sign-in')
  }

  function logout() {
    cookie.value = ''
    user.value = null
    router.push('/auth/sign-in')
  }

  async function getBusinesses() {
    user.value!.ownedBusinesses = await $api<BusinessEntity[]>(`/business/${user.value?.id}`)
  }

  async function getUser() {
    const profile = await $api<ProfileEntity>('/profile/me')
    user.value = profile
    business.value = profile?.ownedBusinesses?.[0]
    object.value = profile?.ownedBusinesses?.[0]?.businessObjects?.[0] || profile?.employers?.[0]
  }

  return {
    user,
    isAdmin,
    business,
    object,
    login,
    signup,
    resetPassword,
    logout,
    getUser,
    getBusinesses,
    hasPermission,
  }
})
