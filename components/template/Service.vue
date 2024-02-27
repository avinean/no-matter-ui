<script lang="ts" setup>
import { ModalServiceProduct } from '#components'
import type { ServiceEntity } from '~/types/entities'

const props = withDefaults(defineProps<{
  type?: 'product' | 'service'
}>(), {
  type: 'service',
})

const { t } = useI18n({
  useScope: 'local',
})

const { hasPermission } = useGlobalStore()
const modalStore = useModalStore()

const { get, add } = props.type === 'product'
  ? useProductRepository()
  : useServiceRepository()

const { data, refresh } = useAsyncData(() => get())

const columns: any = [
  { key: 'name', label: t('columns.name') },
  { key: 'description', label: t('columns.description') },
  { key: 'price', label: t('columns.price') },
  props.type === 'service' ? { key: 'duration', label: t('columns.duration') } : undefined,
  { key: 'discount', label: t('columns.discount') },
  { key: 'status', label: t('columns.status') },
  { key: 'createdAt', label: t('columns.createdAt') },
  { key: 'updatedAt', label: t('columns.updatedAt') },
  { key: 'actions' },
].filter(Boolean)

function menu(item: ServiceEntity) {
  return [
    [{
      label: t('actions.edit'),
      icon: 'i-ic-baseline-edit',
      click: () => callModal(item),
    }, {
      label: t('actions.duplicate'),
      icon: 'i-ic-baseline-content-copy',
      click: () => onDuplicate(item),
    }],
    [{
      label: item.status ? t('actions.archive') : t('actions.unarchive'),
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
      refresh()
    },
  })
}

async function onDuplicate(item: ServiceEntity) {
  await add({
    name: `${item.name} (${t('product.copy')} ${new Date().toLocaleString()})`,
    description: item.description,
    type: item.type,
    price: item.price,
    duration: item.duration,
    discount: item.discount,
    status: item.status,
    spending: item.spending.map(({ id: _, ...spending }) => spending),
  })
  refresh()
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

        :label="t(`${type === 'service' ? 'service.addNew' : 'product.addNew'}`)"
        @click="callModal()"
      />
    </div>

    <template v-if="data">
      <h2>{{ t(`${type === 'service' ? 'service.title' : 'product.title'}`) }}</h2>
      <UTable :rows="data" :columns="columns">
        <template #createdAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #updatedAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #status-data="{ row }">
          <UBadge v-if="row.status" color="green" variant="solid">
            {{ t('active') }}
          </UBadge>
          <UBadge v-else color="gray" variant="solid">
            {{ t('disabled') }}
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
    </template>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "active": "active",
    "disabled": "inactive",
    "product": {
      "title": "Products",
      "addNew": "Create new product",
      "copy": "copy from"
    },
    "service": {
      "title": "Services",
      "addNew": "Create new services"
    },
    "columns": {
      "name": "Name",
      "description": "Description",
      "price": "Price",
      "duration": "Service duration",
      "discount": "Discount",
      "status": "Status",
      "createdAt": "Created",
      "updatedAt": "Changed"
    },
    "actions": {
      "edit": "Edit",
      "duplicate": "Duplicate",
      "archive": "Archive",
      "unarchive": "Unarchive"
    }
  },
  "uk-UK": {
    "active": "активний",
    "disabled": "неактивний",
    "product": {
      "title": "Товари",
      "addNew": "Додати новий товар",
      "copy": "Копія від"
    },
    "service": {
      "title": "Послуги",
      "addNew": "Додати нову послугу "
    },
    "columns": {
      "name": "Назва",
      "description": "Опис",
      "price": "Ціна",
      "duration": "Тривалість послуги",
      "discount": "Знижка",
      "status": "Статус",
      "createdAt": "Створено",
      "updatedAt": "Змінено"
    },
    "actions": {
      "edit": "Редагувати",
      "duplicate": "Дублювати",
      "archive": "Додати в архів",
      "unarchive": "Розархівувати"
    }
  }
}
</i18n>
