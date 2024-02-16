<script lang="ts" setup>
import { ModalServiceProduct } from '#components'
import type { ServiceEntity } from '~/types/entities'

const props = withDefaults(defineProps<{
  type?: 'product' | 'service'
}>(), {
  type: 'service',
})

const { hasPermission } = useGlobalStore()
const modalStore = useModalStore()

const { data, get, add } = props.type === 'product'
  ? useProductRepository()
  : useServiceRepository()

get()

const columns: any = [
  { key: 'name', label: 'Назва' },
  { key: 'description', label: 'Опис' },
  { key: 'price', label: 'Ціна' },
  props.type === 'service' ? { key: 'duration', label: 'Тривалість послуги' } : undefined,
  { key: 'discount', label: 'Знижка' },
  { key: 'status', label: 'Статус' },
  { key: 'createdAt', label: 'Створено' },
  { key: 'updatedAt', label: 'Змінено' },
  { key: 'actions' },
].filter(Boolean)

function menu(item: ServiceEntity) {
  return [
    [{
      label: 'Edit',
      icon: 'i-ic-baseline-edit',
      click: () => callModal(item),
    }, {
      label: 'Duplicate',
      icon: 'i-ic-baseline-content-copy',
      click: () => onDuplicate(item),
    }],
    [{
      label: item.status ? 'Archive' : 'Unarchive',
      icon: item.status ? 'i-ic-baseline-archive' : 'i-ic-baseline-unarchive',
      // click: () => onChangeStatus(item),
    }],
  ]
}

function callModal(preset?: ServiceEntity) {
  modalStore.open(ModalServiceProduct, {
    preset,
    type: props.type,
    onSubmit() {
      get()
    },
  })
}

async function onDuplicate(item: ServiceEntity) {
  await add({
    name: `${item.name} (копія ${new Date().toLocaleString()})`,
    description: item.description,
    type: item.type,
    price: item.price,
    duration: item.duration,
    discount: item.discount,
    status: item.status,
  })
  get()
}
</script>

<template>
  <div>
    <div v-if="hasPermission('service:add')" class="flex justify-end gap-2 p-2">
      <UButton
        :icon="type === 'service' ? 'i-ic-baseline-design-services' : 'i-ic-twotone-production-quantity-limits'"
        size="sm"
        color="primary"
        square
        variant="solid"
        :label="`Додати ${type === 'service' ? 'послугу' : 'товар'}`"
        @click="callModal()"
      />
    </div>

    <UCard v-if="data">
      <h2>{{ props.type === 'product' ? 'Товари' : 'Послуги' }}</h2>
      <UTable :rows="data" :columns="columns">
        <template #createdAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #updatedAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #status-data="{ row }">
          <UBadge v-if="row.status" color="green" variant="solid">
            активний
          </UBadge>
          <UBadge v-else color="gray" variant="solid">
            неактивний
          </UBadge>
        </template>
        <template #discount-data="{ row }">
          {{ row.discount }}%
        </template>
        <template #price-data="{ row }">
          {{ row.price }} грн
        </template>
        <template #duration-data="{ row }">
          {{ row.duration }} год
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="menu(row)">
            <UButton color="gray" variant="ghost" icon="i-ic-outline-more-horiz" />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
