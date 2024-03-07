import type {ClientEntity} from '~/types/entities'

export const useClientRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()

  const toast = useToast()

  function get() {
    return $api<ClientEntity[]>(`/client/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`)
  }

  function add(body: Partial<ClientEntity>) {
    try {
      return $api(`/client/${globalStore.object?.id}`, {
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

  function edit(id: number, body: Partial<ClientEntity>) {
    try {
      return $api(`/client/${globalStore.object?.id}/${id}`, {
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
    get,
    add,
    edit,
  }
})
