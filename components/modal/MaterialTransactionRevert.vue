<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import type { Material, MaterialTransaction } from '~/types/entities'

const { preset } = defineProps<{
  preset: MaterialTransaction
}>()

const emit = defineEmits<{
  submit: []
}>()

const { revert } = useMaterialTransactionRepository()

const state = reactive<Partial<MaterialTransaction>>({
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

async function onCreateOrUpdate() {
  if (!state.description)
    return
  await revert(preset.id, state.description)
  emit('submit')
}
</script>

<template>
  <UForm
    :validate
    :state
    class="space-y-4 w-full"
    @submit="onCreateOrUpdate"
  >
    <h1 class="text-3xl font-bold">
      Відмінити транзакцію
    </h1>

    <UTable :rows="[preset]" />

    <UAlert
      icon="i-ic-round-warning"
      title="Обережно!"
    >
      <template #description>
        Ця дія змінить кількість матеріалу на складі.
        <br>
        Будь-ласка вкажіть причину відміни транзакції.
      </template>
    </UAlert>

    <UFormGroup
      label="Description"
      name="description"
    >
      <UInput v-model="state.description" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
