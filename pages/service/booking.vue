<script lang="ts" setup>
import { ModalBooking, ModalOrder } from '#components'
import type { BookingEntity } from '~/types/entities'
import { ConfirmationStatus } from '~/types/enums'

const { t } = useI18n({
  useScope: 'local',
})

const modalStore = useModalStore()
const bookingRepository = useBookingRepository()

const { data, refresh } = useAsyncData(() => bookingRepository.get())

function menu(item: BookingEntity) {
  return [
    [{
      label: t('tooltips.edit'),
      icon: 'i-ic-baseline-edit',
      click: () => {
        modalStore.open(ModalBooking, {
          onSubmit: refresh,
          preset: item,
        })
      },
    }, {
      label:  t('tooltips.invoice'),
      icon: 'i-ic-outline-receipt-long',
      click: async () => {
        const order = await bookingRepository.confirm(item)
        refresh()

        modalStore.open(ModalOrder, {
          preset: order,
        })
      },
    }, {
      label: t('tooltips.cancel'),
      icon: 'i-ic-baseline-content-copy',
      click: async () => {
        await bookingRepository.cancel(item)
        refresh()
      },
    }],
  ]
}
const columns = computed(() => [
  { key: 'date', label: t('columns.date') },
  { key: 'duration', label: t('columns.duration') },
  { key: 'status',  label: t('columns.status') },
  { key: 'comment', label: t('columns.comment') },
  { key: 'createdAt', label: t('columns.createdAt') },
  { key: 'profile',label: t('columns.profile') },
  { key: 'client', label: t('columns.client') },
  { key: 'actions' },
])

</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-2 p-2">
      <h1>{{ t('title') }}</h1>
      <UButton
        icon="i-ic-baseline-calendar-month"
        size="sm"
        color="primary"
        square
        variant="solid"
        :label="t('labels.book')"
        @click="modalStore.open(ModalBooking, {
          onSubmit: refresh,
        })"
      />
    </div>
    <UTable
      v-if="data"
      :rows="data"
      :columns="columns"
    >
      <template #date-data="{ row }">
        <base-datetime
          :date="row.date"
          date-style="long"
          time-style="short"
        />
      </template>
      <template #createdAt-data="{ row }">
        <base-datetime :date="row.createdAt" />
      </template>
      <template #updatedAt-data="{ row }">
        <base-datetime :date="row.createdAt" />
      </template>
      <template #status-data="{ row }">
        <UDropdown
          :ui="{ width: 'w-64' }"
          :items="[row.statuses]"
          mode="hover"
          :popper="{ placement: 'bottom-start' }"
        >
          <UBadge
            v-if="row.statuses.at(-1).status === ConfirmationStatus.new"
            color="gray"
            variant="subtle"
          >
            новий
          </UBadge>
          <UBadge
            v-else-if="row.statuses.at(-1).status === ConfirmationStatus.updated"
            color="gray"
            variant="subtle"
          >
            оновлений
          </UBadge>
          <UBadge
            v-else-if="row.statuses.at(-1).status === ConfirmationStatus.approved"
            color="green"
            variant="subtle"
          >
            підтверджений
          </UBadge>
          <UBadge
            v-else
            color="red"
            variant="subtle"
          >
            відмінений
          </UBadge>

          <template #item="{ item }">
            <UBadge
              v-if="item.status === ConfirmationStatus.new"
              color="gray"
              variant="subtle"
              size="xs"
            >
              новий
            </UBadge>
            <UBadge
              v-else-if="item.status === ConfirmationStatus.updated"
              color="gray"
              variant="subtle"
              size="xs"
            >
              оновлений
            </UBadge>
            <UBadge
              v-else-if="item.status === ConfirmationStatus.approved"
              color="green"
              variant="subtle"
              size="xs"
            >
              підтверджений
            </UBadge>
            <UBadge
              v-else
              color="red"
              variant="subtle"
              size="xs"
            >
              відмінений
            </UBadge>

            <base-image
              :src="item.createdBy.image"
              width="16"
              height="16"
            />
            {{ item.createdBy.firstName }} {{ item.createdBy.lastName }}
            <base-datetime :date="item.date" />
          </template>
        </UDropdown>
      </template>
      <template #services-data="{ row }">
        <template
          v-for="service in row.services"
          :key="service.id"
        >
          {{ service.name }},
        </template>
      </template>
      <template #profile-data="{ row }">
        <span
          v-if="row.profile"
          class="inline-flex items-center gap-2"
        >
          <base-image
            :src="row.profile.image"
            width="32"
            height="32"
          />
          <span>
            {{ row.profile.firstName }} {{ row.profile.lastName }}
          </span>
        </span>
      </template>
      <template #client-data="{ row }">
        <span class="inline-flex items-center gap-2">
          <base-image
            :src="row.client.image"
            width="32"
            height="32"
          />
          <span>
            {{ row.client.firstName }} {{ row.client.lastName }}
          </span>
        </span>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="menu(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-ic-outline-more-horiz"
          />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>


<i18n lang="json">
{
  "en-US": {
    "title": "Booked goods",
    "labels": {
      "book": "Book now"
    },
    "tooltips": {
      "edit": "Edit",
      "invoice": "Issue a bill",
      "cancel": "Cancel"
    },
    "columns": {
      "date": "Date",
      "duration": "Duration",
      "status": "Status",
      "comment": "Comment",
      "createdAt": "Created",
      "profile": "Performer",
      "client": "Client"
    }
  },
  "uk-UK": {
    "title": "Заброньовані товари",
    "labels": {
      "book": "Забронювати"
    },
    "tooltips": {
      "edit": "Редагувати ",
      "invoice": "Виставити рахунок ",
      "cancel": "Відмінити"
    },
    "columns": {
      "date": "Час",
      "duration": "Тривалість послуги",
      "status": "Статус",
      "comment": "Опис",
      "createdAt": "Створено",
      "profile": "Виконавець",
      "client": "Замовник"
    }
  }
}
</i18n>

