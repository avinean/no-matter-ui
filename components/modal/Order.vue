<script lang="ts" setup>
import type { OrderEntity } from '~/types/entities'

const props = defineProps<{
  preset?: OrderEntity | null
}>()

defineExpose({
  title: computed(() => `Рахунок #${props.preset?.id}`),
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
  <div class="space-y-2">
    <div>
      <div class="font-bold">
        Рахунок #{{ preset?.id }} від <base-datetime :date="preset?.createdAt" />
      </div>
      <div
        v-if="preset?.booking"
        class="font-bold"
      >
        За попереднім замовленням #{{ preset?.booking?.id }} від <base-datetime :date="preset?.booking?.createdAt" />
      </div>
    </div>
    <UTable
      v-if="preset?.services?.length"
      :rows="preset.services"
      :columns="columns"
      class="col-span-2"
    >
      <template #name-data="{ row }">
        {{ row.service?.name }}
      </template>
      <template #description-data="{ row }">
        {{ row.service?.description }}
      </template>
      <template #duration-data="{ row }">
        {{ row.service?.duration }}
      </template>
      <template #quantity-data="{ row }">
        <UInput
          v-model="row.quantity"
          type="number"
        />
      </template>
    </UTable>
    <UButton>
      Додати послугу/товар
    </UButton>
    <div class="rounded-sm bg-gray-200">
      <div class="flex justify-between">
        <div>Підсумок</div>
        <div>0 грн</div>
      </div>
      <div class="flex justify-between">
        <div>Знижка</div>
        <div>0 грн</div>
      </div>
      <div class="flex justify-between">
        <div>До сплати</div>
        <div>0 грн</div>
      </div>
    </div>
  </div>
</template>
