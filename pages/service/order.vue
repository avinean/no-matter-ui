<script lang="ts" setup>
import { useOrderRepository } from '~/composables/useOrderRepository'

const { t } = useI18n({ useScope: 'local' })
const { get } = useOrderRepository()
</script>

<template>
  <UsePaginatable
    :title="t(`$order.title`)"
    :getter="get"
  >
    <template #default="{ items }">
      <UTable :rows="items" />
    </template>
  </UsePaginatable>
</template>
