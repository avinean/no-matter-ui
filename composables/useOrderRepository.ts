import type { PaginationRequest, PaginationResponse } from '~/types/api'
import type { OrderEntity } from '~/types/entities'

export const useOrderRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()

  function get(query?: PaginationRequest) {
    return $api<PaginationResponse<OrderEntity>>(
      `/order/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`,
      {
        query,
      },
    )
  }

  return {
    get,
  }
})
