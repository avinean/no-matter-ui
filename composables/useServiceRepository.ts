import type { ServiceEntity } from '~/types/entities'

export const useServiceRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()
  const toast = useToast()

  const data = ref<ServiceEntity[]>([])

  async function get() {
    data.value = await $api<ServiceEntity[]>(`/service/service/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`)
  }

  function add(body: Partial<ServiceEntity>) {
    try {
      return $api(`/service/service/${globalStore.object?.id}`, {
        method: 'POST',
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

  function edit(id: number, body: Partial<ServiceEntity>) {
    try {
      return $api(`/service/service/${globalStore.object?.id}/${id}`, {
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
