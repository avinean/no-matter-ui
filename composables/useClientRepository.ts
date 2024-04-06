import type { ClientEntity } from '~/types/entities'

export const useClientRepository = createGlobalState(() => {
  const toast = useToast()

  function get() {
    return $api<ClientEntity[]>(`/client`)
  }

  function add(body: Partial<ClientEntity>) {
    try {
      return $api(`/client`, {
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
      return $api(`/client/${id}`, {
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
