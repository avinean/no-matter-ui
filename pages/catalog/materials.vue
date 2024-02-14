<script lang="ts" setup>
import { ModalMaterial, ModalMaterialTransaction, ModalMaterialTransactionRevert } from '#components'
import type { MaterialTransaction } from '~/types/entities'

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
  { key: 'actions' },
]

function menu(item: MaterialTransaction) {
  return [
    [{
      label: 'Відмінити',
      icon: 'i-ic-round-event-repeat',
      disabled: item.revertedTransaction || item.revertingTransaction,
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
      <template #actions-data="{ row }">
        <UDropdown :items="menu(row)">
          <UButton color="gray" variant="ghost" icon="i-ic-outline-more-horiz" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
