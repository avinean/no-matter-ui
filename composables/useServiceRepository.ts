import type { PaginationRequest, PaginationResponse } from '~/types/api'
import type { ServiceEntity } from '~/types/entities'

export const useServiceRepository = createGlobalState(() => {
  const toast = useToast()

  function get(query?: PaginationRequest) {
    return $api<PaginationResponse<ServiceEntity>>(
      `/service/service`,
      {
        query,
      },
    )
  }

  function add(body: Partial<ServiceEntity>) {
    try {
      return $api(`/service/service`, {
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
      return $api(`/service/service/${id}`, {
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
