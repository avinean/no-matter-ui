import type { MaterialTransaction } from '~/types/entities'

export const useMaterialTransactionRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()
  const toast = useToast()

  function get() {
    return $api<MaterialTransaction[]>(`/material-transaction/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`)
  }

  function add(body: Partial<MaterialTransaction>) {
    try {
      return $api(`/material-transaction/${globalStore.object?.id}`, {
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

  function revert(id: number, description: string) {
    try {
      return $api(`/material-transaction/${globalStore.object?.id}/${id}`, {
        method: 'POST',
        body: { description },
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
    revert,
  }
})
