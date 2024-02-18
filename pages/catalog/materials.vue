<script lang="ts" setup>
import { ModalMaterial, ModalMaterialTransaction, ModalMaterialTransactionRevert } from '#components'
import type { MaterialTransactionEntity } from '~/types/entities'
import type { DropdownItem } from '#ui/types'

const modalStore = useModalStore()
const materialRepository = useMaterialRepository()
const materialTransactionRepository = useMaterialTransactionRepository()

const { data: materials, refresh: refreshMaterials } = useAsyncData(() => materialRepository.get())
const { data: materialTransactions, refresh: refreshMaterialTransactions } = useAsyncData(() => materialTransactionRepository.get())

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'quantity', label: 'Кількість' },
  { key: 'description', label: 'Опис' },
  { key: 'type', label: 'Тип' },
  { key: 'createdAt', label: 'Час' },
  { key: 'initiator', label: 'Ініціатор' },
  { key: 'actions' },
]

function menu(item: MaterialTransactionEntity): DropdownItem[][] {
  return [
    [{
      label: 'Відмінити',
      icon: 'i-ic-round-event-repeat',
      disabled: !!(item.reverted || item.reverting),
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
        icon="i-heroicons-circle-stack"
        size="sm"
        color="primary"
        square
        variant="solid"
        label="Create Material"
        @click="modalStore.open(ModalMaterial, { onSubmit: refreshMaterials })"
      />
      <UButton
        icon="i-heroicons-document-plus"
        size="sm"
        color="primary"
        square
        variant="solid"
        label="Add Material"
        @click="modalStore.open(ModalMaterialTransaction, {
          onSubmit() {
            refreshMaterialTransactions()
            refreshMaterials()
          },
        })"
      />
    </div>

    <h2>Materials</h2>
    <UTable v-if="materials" :rows="materials" />
    <h2>Transactions</h2>
    <UTable v-if="materialTransactions" :rows="materialTransactions" :columns="columns">
      <template #initiator-data="{ row }">
        <span class="inline-flex items-center gap-2">
          <base-image :src="row.initiator.image" width="32" height="32" />
          <span>
            {{ row.initiator.firstName }} {{ row.initiator.lastName }}
          </span>
        </span>
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
</template>
