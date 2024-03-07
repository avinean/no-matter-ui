<script lang="ts" setup generic="T extends Record<string, any>">
import type { PaginationRequest, PaginationResponse } from '~/types/api'

const props = defineProps<{
  title: string
  getter: (params: PaginationRequest) => Promise<PaginationResponse<T>>
}>()

defineSlots<{
  default: (props: { items: T[], refresh: typeof refresh }) => void
  actions: (props: { refresh: typeof refresh }) => void
}>()
const page = ref(1)
const take = ref(10)

const { data, refresh, pending } = useAsyncData(
  () => props.getter({ page: page.value, take: take.value }),
  { watch: [page, take] },
)

const items = computed(() => data.value?.items || [])
const pages = computed(() => data.value?.pages || 0)
</script>

<template>
  <div>
    <BaseLoader v-model="pending" />
    <div class="flex justify-between gap-2 p-2">
      <h2>{{ title }}</h2>
      <slot name="actions" :refresh="refresh" />
    </div>
    <slot :items="items" :refresh="refresh" />
    <div class="flex gap-2 justify-end">
      <USelect v-model="take" :options="[10, 20, 50]" />
      <UPagination v-model="page" size="sm" :total="pages" :prev-button="{ icon: 'i-ic-baseline-chevron-left' }" :next-button="{ icon: 'i-ic-baseline-chevron-right' }" />
    </div>
  </div>
</template>
