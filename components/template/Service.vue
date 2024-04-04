<script lang="ts" setup>
import { ModalServiceProduct, UTable } from '#components'
import type { ServiceEntity } from '~/types/entities'
import type { Props } from '~/types/utils'

const { type } = withDefaults(defineProps<{
  type?: 'product' | 'service'
}>(), {
  type: 'service',
})

const { t } = useI18n({ useScope: 'local' })

const { hasPermission } = useGlobalStore()
const modalStore = useModalStore()

const { get, add } = type === 'product'
  ? useProductRepository()
  : useServiceRepository()

const columns = computed<Props<typeof UTable>['columns']>(() => [
  { key: 'name', label: t('columns.name') },
  { key: 'description', label: t('columns.description') },
  { key: 'price', label: t('columns.price') },
  ...(type === 'service' ? [{ key: 'duration', label: t('columns.duration') }] : []),
  { key: 'discount', label: t('columns.discount') },
  { key: 'status', label: t('columns.status') },
  { key: 'createdAt', label: t('columns.createdAt') },
  { key: 'updatedAt', label: t('columns.updatedAt') },
  { key: 'actions' },
].filter(Boolean))

function callModal(cb: any, preset?: ServiceEntity) {
  modalStore.open(ModalServiceProduct, {
    preset,
    type,
    onSubmit: cb,
  })
}

async function onDuplicate(cb: any, item: ServiceEntity) {
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
  cb()
}
</script>

<template>
  <UsePaginatable
    :title="t(`${type}.title`)"
    :columns="columns"
    :getter="get"
  >
    <template #actions="{ refresh }">
      <UButton
        v-if="hasPermission('service:add')"
        :icon="type === 'service' ? 'i-ic-baseline-design-services' : 'i-ic-twotone-production-quantity-limits'"
        size="sm"
        color="primary"
        square
        variant="solid"
        :label="t(`${type}.addNew`)"
        @click="callModal(refresh)"
      />
    </template>
    <template #default="{ items, refresh }">
      <UTable
        :rows="items"
        :columns="columns"
      >
        <template #name-data="{ row }">
          <div class="w-36 text-ellipsis overflow-hidden">
            <UPopover
              mode="hover"
              :popper="{ placement: 'right' }"
            >
              {{ row.name }}
              <template #panel>
                <div class="p-2">
                  {{ row.name }}
                </div>
              </template>
            </UPopover>
          </div>
        </template>
        <template #description-data="{ row }">
          <div class="w-36 text-ellipsis overflow-hidden">
            {{ row.description }}
          </div>
        </template>
        <template #createdAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #updatedAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #status-data="{ row }">
          <UBadge
            v-if="row.status"
            color="green"
            variant="subtle"
          >
            {{ t('active') }}
          </UBadge>
          <UBadge
            v-else
            color="gray"
            variant="subtle"
          >
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
          <UDropdown
            :items="[
              [{
                label: t('actions.edit'),
                icon: 'i-ic-baseline-edit',
                click: () => callModal(refresh, row),
              }, {
                label: t('actions.duplicate'),
                icon: 'i-ic-baseline-content-copy',
                click: () => onDuplicate(refresh, row),
              }],
              [{
                label: row.status ? t('actions.archive') : t('actions.unarchive'),
                icon: row.status ? 'i-ic-baseline-archive' : 'i-ic-baseline-unarchive',
              // click: () => onChangeStatus(item),
              }],
            ]"
          >
            <UButton
              color="gray"
              variant="ghost"
              icon="i-ic-outline-more-horiz"
            />
          </UDropdown>
        </template>
      </UTable>
    </template>
  </UsePaginatable>
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
