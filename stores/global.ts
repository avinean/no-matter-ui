import type { Business, BusinessObject, User } from '#types/entities'
import type { Permission } from '#types/permissions'

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()

  const user = ref<User | null>(null)
  const business = ref<Business>()
  const object = ref<BusinessObject>()
  const cookie = useCookie('sraka')

  const isAdmnin = computed(() => user.value?.roles.some(role => role.name === 'admin'))
  const permissions = computed(() => user.value?.roles.flatMap(
    role => role.permissions.map(
      permission => `${permission.resource}:${permission.action}` as unknown as Permission,
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
    user.value!.businesses = await $api<Business[]>(`/business/${user.value?.id}`)
  }

  async function getUser() {
    if (user.value)
      return

    const profile = await $api<User>('/profile/me')
    user.value = profile
    business.value = profile?.businesses?.[0]
    object.value = profile?.businesses?.[0]?.objects?.[0]
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
