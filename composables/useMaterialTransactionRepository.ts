import type { MaterialTransactionEntity } from '~/types/entities'

export const useMaterialTransactionRepository = createGlobalState(() => {
  const toast = useToast()

  function get() {
    return $api<MaterialTransactionEntity[]>(`/material-transaction`)
  }

  function add(body: Partial<MaterialTransactionEntity>) {
    try {
      return $api(`/material-transaction`, {
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
      return $api(`/material-transaction/${id}`, {
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
