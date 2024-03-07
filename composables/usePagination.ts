
import { ModalServiceProduct, UTable } from '#components'
import type { PaginationRequest, PaginationResponse } from '~/types/api'

export default <T>(getter: (params: PaginationRequest) => Promise<PaginationResponse<T>>) => {
    const page = ref(1)
    const take = ref(10)

    const { data, refresh } = useAsyncData(
        () => getter({ page: page.value, take: take.value }),
        { watch: [page, take] }
    )

    return {
        items: computed(() => data.value?.items || []),
        refresh,
        page,
        take,
        pages: computed(() => data.value?.pages || 0)
    }
}