import type { MaterialEntity } from '~/types/entities'

export const useMaterialRepository = createGlobalState(() => {
  const toast = useToast()

  function get() {
    return $api<MaterialEntity[]>(`/material`)
  }

  function add(body: Partial<MaterialEntity>) {
    try {
      return $api(`/material`, {
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

  function edit(id: number, body: Partial<MaterialEntity>) {
    try {
      return $api(`/material/${id}`, {
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
