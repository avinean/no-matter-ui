<script lang="ts" setup>
import type { OrderEntity } from '~/types/entities'
import { OrderStatus } from '~/types/enums'

const props = defineProps<{
  preset?: OrderEntity | null
}>()

defineExpose({
  title: computed(() => `Рахунок/Замовлення #${props.preset?.id}`),
})

const columns = [
  {
    key: 'name',
    label: 'Назва',
  },
  {
    key: 'description',
    label: 'Опис',
  },
  {
    key: 'quantity',
    label: 'Кількість',
  },
]
</script>

<template>
  <div class="grid cols-2 gap-y-2">
    <div>
      <div>
        Рахунок #{{ preset?.id }} від <base-datetime :date="preset?.createdAt" />
      </div>
      <div>
        За попереднім замовленням #{{ preset?.booking?.id }} від <base-datetime :date="preset?.booking?.createdAt" />
      </div>
    </div>
    <div>
      <div>Статуси</div>
      <div v-for="status in preset?.statuses" :key="status.id" class="flex gap-1">
        <UBadge v-if="status.status === OrderStatus.new" color="gray" variant="solid" size="xs">
          новий
        </UBadge>
        <UBadge v-else-if="status.status === OrderStatus.partiallyPaid" color="gray" variant="solid" size="xs">
          оновлений
        </UBadge>
        <UBadge v-else-if="status.status === OrderStatus.paid" color="green" variant="solid" size="xs">
          підтверджений
        </UBadge>
        <UBadge v-else color="red" variant="solid" size="xs">
          відмінений
        </UBadge>

        <base-image :src="status.createdBy.image" width="16" height="16" />
        {{ status.createdBy.firstName }} {{ status.createdBy.lastName }}
        <base-datetime :date="status.createdAt" />
      </div>
    </div>
    <UTable v-if="preset?.services?.length" :rows="preset.services" :columns="columns" class="col-span-2">
      <template #name-data="{ row }">
        {{ row.service.name }}
      </template>
      <template #description-data="{ row }">
        {{ row.service.description }}
      </template>
      <template #duration-data="{ row }">
        {{ row.service.duration }}
      </template>
      <template #quantity-data="{ row }">
        <UInput v-model="row.quantity" type="number" />
      </template>
    </UTable>
  </div>
</template>
