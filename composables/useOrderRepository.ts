import type { PaginationRequest, PaginationResponse } from '~/types/api'
import type { OrderEntity } from '~/types/entities'

export const useOrderRepository = createGlobalState(() => {
  function get(query?: PaginationRequest) {
    return $api<PaginationResponse<OrderEntity>>(
      `/order`,
      {
        query,
      },
    )
  }

  return {
    get,
  }
})
