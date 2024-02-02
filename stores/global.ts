import type { User } from '#types/entities'

export const useGlobalStore = defineStore('global', () => {
  const user = ref<User | null>(null)
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

  async function getUser() {
    if (user.value)
      return

    user.value = await $api<User>('/users/me')
  }

  return {
    user,
    login,
    signup,
    logout,
    getUser,
  }
})
