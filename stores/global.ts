import type { Bussiness, BussinessObject, User } from '#types/entities'

export const useGlobalStore = defineStore('global', () => {
  const user = ref<User | null>(null)
  const bussiness = ref<Bussiness>()
  const object = ref<BussinessObject>()
  const config = ref<{
    /**
     * this is temporal config or testing purposes
     * it's not a final solution
     * it will be changed in the future
     */
    allowSeeProducts?: boolean
    allowSeeServices?: boolean
    allowSeeBussiness?: boolean
    allowSeeUsers?: boolean
    allowSeeProfile?: boolean
    allowSeeMaterails?: boolean
    allowSeeCatalog?: boolean
  }>({})
  const cookie = useCookie('sraka')

  async function login(body: { phone: string, password: string }) {
    const data = await $api<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body,
    })

    cookie.value = data?.access_token
    getUser()
    useRouter().push('/')
  }

  async function signup(body: { firstName: string, lastName: string, phone: string }) {
    await $api<{ access_token: string }>('/auth/signup', {
      method: 'POST',
      body,
    })

    useRouter().push('/auth/sign-in')
  }

  function logout() {
    cookie.value = ''
    user.value = null
    useRouter().push('/auth/sign-in')
  }

  async function getBussinesses() {
    user.value!.bussinesses = await $api<Bussiness[]>(`/bussiness/${user.value?.id}`)
  }

  async function getUser() {
    if (user.value)
      return

    const response = await $api<{ profile: User, config: any }>('/users/me')
    user.value = response?.profile
    bussiness.value = response?.profile?.bussinesses?.[0]
    object.value = response?.profile?.bussinesses?.[0]?.objects?.[0]
    config.value = response?.config
  }

  return {
    user,
    bussiness,
    object,
    config,
    login,
    signup,
    logout,
    getUser,
    getBussinesses,
  }
})
