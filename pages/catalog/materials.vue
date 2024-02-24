<script lang="ts" setup>
import { ModalMaterial, ModalMaterialTransaction, ModalMaterialTransactionRevert } from '#components'
import type { MaterialTransactionEntity } from '~/types/entities'
import type { DropdownItem } from '#ui/types'
const { t } = useI18n({
  useScope: 'local',
})
const modalStore = useModalStore()
const materialRepository = useMaterialRepository()
const materialTransactionRepository = useMaterialTransactionRepository()

const { data: materials, refresh: refreshMaterials } = useAsyncData(() => materialRepository.get())
const { data: materialTransactions, refresh: refreshMaterialTransactions } = useAsyncData(() => materialTransactionRepository.get())


const columns = [
  { key: 'id', label: t('columns.id') },
  { key: 'quantity', label: t('columns.quantity')  },
  { key: 'description', label: t('columns.description')  },
  { key: 'type', label: t('columns.type')  },
  { key: 'createdAt', label: t('columns.createdAt')  },
  { key: 'initiator', label: t('columns.initiator')  },
  { key: 'actions' },
]

function menu(item: MaterialTransactionEntity): DropdownItem[][] {
  return [
    [{
      label: t('default.forms.actions.cancel'),
      icon: 'i-ic-round-event-repeat',
      disabled: !!(item.previous || item.next),
      click: () => {
        modalStore.open(ModalMaterialTransactionRevert, {
          onSubmit() {
            refreshMaterialTransactions()
            refreshMaterials()
          },
          preset: item,
        })
      },
    }],
  ]
}
</script>

<template>
  <div>
    <div class="flex justify-end gap-2 p-2">
      <UButton
        icon="i-ic-baseline-create"
        size="sm"
        color="primary"
        square
        variant="solid"
        :label="t('addNew')"
        @click="modalStore.open(ModalMaterial, { onSubmit: refreshMaterials })"
      />
      <UButton
          icon="i-ic-baseline-plus"
        size="sm"
        color="primary"
        square
        variant="solid"
        :label="t('updateQuantity')"
        @click="modalStore.open(ModalMaterialTransaction, {
          onSubmit() {
            refreshMaterialTransactions()
            refreshMaterials()
          },
        })"
      />
    </div>
    <div  v-if="materials?.length">
      <h2>{{t('materials')}}</h2>
      <UTable v-if="materials" :rows="materials" />
    </div>
    <div v-if="materialTransactions?.length" class="mt-8">
      <h2 >{{t('transactions')}}</h2>
      <UTable
           :rows="materialTransactions" :columns="columns">
        <template #initiator-data="{ row }">
        <span class="inline-flex items-center gap-2">
          <base-image :src="row.initiator.image" width="32" height="32" />
          <span>
            {{ row.initiator.firstName }} {{ row.initiator.lastName }}
          </span>
        </span>
        </template>
        <template #description-data="{ row }">
          <template v-if="row.booking">
            Booking #{{ row.booking.id }},
            <base-datetime :date="row.booking.date" date-style="medium" time-style="medium" />
          </template>
          <template v-else>
            {{ row.description || '—' }}
          </template>
        </template>
        <template #createdAt-data="{ row }">
          <base-datetime :date="row.createdAt" date-style="medium" time-style="medium" />
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="menu(row)">
            <UButton color="gray" variant="ghost" icon="i-ic-outline-more-horiz" />
          </UDropdown>
        </template>
      </UTable>
    </div>
  </div>
</template>


<i18n lang="json">
{
  "en-US": {
    "addNew": "Create new material",
    "updateQuantity": "Increase quantity",
    "materials":  "Materials",
    "transactions":  "Transactions",
    "columns": {
      "id": "ID",
      "quantity": "Quantity",
      "description": "Description",
      "type": "Type",
      "createdAt": "Time",
      "initiator": "Initiator"
    }
  },
  "uk-UK": {
    "addNew": "Додати новий",
    "updateQuantity": "Збільшити кількість",
    "materials": "Матеріали",
    "transactions": "Транзакції",
    "columns":  {
      "id":  "ID",
      "quantity":  "Кількість",
      "description":  "Опис",
      "type": "Тип",
      "createdAt": "Час",
      "initiator": "Ініціатор"
    }
  }
}
</i18n>

