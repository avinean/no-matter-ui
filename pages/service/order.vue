<script lang="ts" setup>
import { ModalOrder } from '#components'
import { useOrderRepository } from '~/composables/useOrderRepository'

const { t } = useI18n({ useScope: 'local' })
const { get } = useOrderRepository()
const { open } = useModalStore()

const columns = computed(() => [
  {
    key: 'id',
    label: "ID",
  },
  {
    key: 'createdAt',
    label: t(`columns.createdAt`),
  },
  {
    key: 'createdBy',
    label: t(`columns.createdBy`),
    data: 'createdBy-data',
  },
  {
    key: 'booking',
    label: t(`columns.booking`),
    data: 'booking-data',
  },
])

</script>

<template>
  <UsePaginatable
    :title="t(`title`)"
    :getter="get"
  >
    <template #default="{ items }">
      <UTable
        :rows="items"
        :columns="columns"
        @select="open(ModalOrder, { preset: $event })"
      >
        <template #createdBy-data="{ row }">
          <span class="inline-flex items-center gap-2">
            <base-image
              :src="row.createdBy.image"
              width="32"
              height="32"
            />
            <span>
              {{ row.createdBy.firstName }} {{ row.createdBy.lastName }}
            </span>
          </span>
        </template>
        <template #createdAt-data="{ row }">
          <base-datetime
            :date="row.createdAt"
            date-style="medium"
            time-style="medium"
          />
        </template>
        <template #booking-data="{ row }">
          booking #{{ row.booking.id }}
        </template>
      </UTable>
    </template>
  </UsePaginatable>
</template>


<i18n lang="json">
{
  "en-US": {
    "title": "Created orders",
    "columns": {
      "createdAt": "Date of creation",
      "createdBy": "Created by",
      "booking": "Booking"
    }
  },
  "uk-UK": {
    "title": "Створені замовлення",
    "columns": {
      "createdAt": "Створено",
      "createdBy": "Ким створено",
      "booking": "Бронювання"
    }
  }
}
</i18n>
