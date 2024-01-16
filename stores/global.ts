import type { User } from '#types/entities'

export const useGlobalStore = defineStore('global', () => {
  const user = ref<User | null>(null)
  const cookie = useCookie('sraka')

  async function login(body: { email: string, password: string }) {
    const { data, error } = await useFetch<{ access_token: string }>('/api/auth/login', {
      method: 'POST',
      body,
    })

    if (error.value) {
      const toast = useToast()
      toast.add({
        title: 'Авторизація невдала',
      })
    }
    else {
      cookie.value = data.value?.access_token
      getUser()
      useRouter().push('/')
    }
  }

  async function getUser() {
    if (user.value) return

    user.value = await $fetch<User>('/api/users/me', {
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
    })
  }

  return {
    user,
    login,
    getUser
  }
})