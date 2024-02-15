import type { BusinessEntity, BusinessObjectEntity, ProfileEntity } from '~/types/entities'
import type { Permission } from '~/types/permissions'

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()

  const user = ref<ProfileEntity | null>(null)
  const business = ref<BusinessEntity>()
  const object = ref<BusinessObjectEntity>()
  const cookie = useCookie('sraka')

  const isAdmnin = computed(() => user.value?.roles.some(role => role.name === 'admin'))
  const permissions = computed(() => user.value?.roles.flatMap(
    role => role.assignedPermissions.map(
      permission => `${permission.resourceType}:${permission.actionType}` as unknown as Permission,
    ),
  ))

  function hasPermission(permission: Permission | Permission[], mode: 'every' | 'some' = 'every') {
    return [permission].flat()[mode](p => permissions.value?.includes(p))
  }

  async function login(body: { phone: string, password: string }) {
    const data = await $api<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body,
    })

    cookie.value = data?.access_token
    await getUser()
    router.push('/')
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
    object.value = profile?.ownedBusinesses?.[0]?.businessObjects?.[0]
  }

  return {
    user,
    isAdmnin,
    business,
    object,
    login,
    signup,
    logout,
    getUser,
    getBusinesses,
    hasPermission,
  }
})
