<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import type { Material, MaterialTransaction } from '#types/entities';

const store = useMaterialsStore()
store.get()
store.getTransactions()

const createMaterial = ref(false)
const addTransaction = ref(false)

const material = reactive({
  name: undefined,
  description: undefined,
  unit: undefined,
  criticalQuantity: undefined,
})

const transaction = reactive({
  materialId: undefined,
  quantity: undefined,
  type: undefined,
  description: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  for (const key in state) {
    if (state[key] === undefined || state[key] === '')
      errors.push({ path: key, message: 'Required' })
  }
  return errors
}

async function onAddMaterial(event: FormSubmitEvent<Partial<Material>>) {
  await store.create(event.data)
  createMaterial.value = false
}

async function onCreateTransaction(event: FormSubmitEvent<Partial<MaterialTransaction>>) {
  await store.createTransaction(event.data)
  addTransaction.value = false
} 
</script>

<template>
  <div class="flex justify-end gap-2 p-2">
    <UButton
      icon="i-heroicons-circle-stack"
      size="sm"
      color="primary"
      square
      variant="solid"
      label="Create Material"
      @click="createMaterial = true"
    />
    <UButton
      icon="i-heroicons-document-plus"
      size="sm"
      color="primary"
      square
      variant="solid"
      label="Add Material"
      @click="addTransaction = true"
    />
  </div> 

  <UModal v-model="createMaterial">
    <div class="p-4">
      <h2 class="mb-4">
        Create Material
      </h2>
      <UForm :validate="validate" :state="material" class="space-y-4 w-full" @submit="onAddMaterial">
        <UFormGroup label="Name" name="name">
          <UInput v-model="material.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UInput v-model="material.description" />
        </UFormGroup>

        <UFormGroup label="Unit" name="unit">
          <UInput v-model="material.unit" />
        </UFormGroup>

        <UFormGroup label="Critical quantity" name="criticalQuantity">
          <UInput v-model="material.criticalQuantity" />
        </UFormGroup>

        <UButton type="submit" :loading="store.updating">
          Submit
        </UButton>
      </UForm>
    </div>
  </UModal>

  <UModal v-model="addTransaction">
    <div class="p-4">
      <h2 class="mb-4">
        Update Material data
      </h2>
      <UForm :validate="validate" :state="transaction" class="space-y-4 w-full" @submit="onCreateTransaction">
        <UFormGroup label="Material" name="materialId">
          <USelect v-model="transaction.materialId" :options="store.items.map(item => ({ label: item.name, value: item.id }))" />
        </UFormGroup>

        <UFormGroup label="Quantity" name="quantity">
          <UInput v-model="transaction.quantity" />
        </UFormGroup>

        <UFormGroup label="Type" name="type">
          <USelect v-model.number="transaction.type" :options="[{ label: 'Income', value: 0 }, { label: 'Outcome', value: 1 }]" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UInput v-model="transaction.description" />
        </UFormGroup>

        <UButton type="submit" :loading="store.updating">
          Submit
        </UButton>
      </UForm>
    </div>
  </UModal>

  <UCard>
    <h2>Materials</h2>
    <UTable :rows="store.items" />
  </UCard>
  <UCard class="mt-4">
    <h2>Transactions</h2>
    <UTable :rows="store.transactions" />
  </UCard>
</template>
