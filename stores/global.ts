import type { Bussiness, BussinessObject, User } from '#types/entities'
import type { Permission } from '#types/permissions'

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()

  const user = ref<User | null>(null)
  const bussiness = ref<Bussiness>()
  const object = ref<BussinessObject>()
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
    console.log()
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

  async function getBussinesses() {
    user.value!.bussinesses = await $api<Bussiness[]>(`/bussiness/${user.value?.id}`)
  }

  async function getUser() {
    if (user.value)
      return

    const profile = await $api<User>('/profile/me')
    user.value = profile
    bussiness.value = profile?.bussinesses?.[0]
    object.value = profile?.bussinesses?.[0]?.objects?.[0]
  }

  return {
    user,
    isAdmnin,
    bussiness,
    object,
    login,
    signup,
    logout,
    getUser,
    getBussinesses,
    hasPermission,
  }
})
