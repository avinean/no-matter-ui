import type { ProfileEntity } from '~/types/entities'

export const useProfileRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()
  const toast = useToast()

  const data = ref<ProfileEntity[]>([])

  async function get() {
    data.value = await $api<ProfileEntity[]>(`/profile/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`)
  }

  async function add(body: Partial<ProfileEntity>) {
    try {
      const data = await $api<{ user: { email: string, password: string } }>(`/profile/${globalStore.object?.id}`, {
        method: 'POST',
        body,
      })

      return data.user
    }
    catch (e) {
      toast.add({
        title: 'Error',
        description: `Перевірте дані та спробуйте ще раз. Можливо користувач з таким email або телефоном вже існує`,
      })
    }
  }

  async function edit(id: number, body: Partial<ProfileEntity>) {
    try {
      await $api(`/profile/${globalStore.object?.id}/${id}`, {
        method: 'PUT',
        body,
      })
    }
    catch (e) {
      toast.add({
        title: 'Error',
        description: `Перевірте дані та спробуйте ще раз. Можливо користувач з таким email або телефоном вже існує`,
      })
    }
  }

  return {
    data,
    get,
    add,
    edit,
  }
})
