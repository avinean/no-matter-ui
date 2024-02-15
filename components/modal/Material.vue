<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { MaterialEntity } from '~/types/entities';

const emit = defineEmits<{
  submit: []
}>()

const { add } = useMaterialRepository()

const state = reactive({
  name: undefined,
  description: undefined,
  unit: undefined,
  criticalQuantity: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  for (const key in state) {
    if (state[key] === undefined || state[key] === '')
      errors.push({ path: key, message: 'Required' })
  }
  return errors
}

async function onCreateOrUpdate(event: FormSubmitEvent<Partial<MaterialEntity>>) {
  await add(event.data)
  emit('submit')
}
</script>

<template>
  <UForm
    :state
    :validate
    class="grid grid-cols-2 gap-x-4 gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <h1 class="text-3xl font-bold">
      Додати матеріал
    </h1>

    <UFormGroup
      label="Name"
      name="name"
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
      label="Description"
      name="description"
    >
      <UInput v-model="state.description" />
    </UFormGroup>

    <UFormGroup
      label="Unit"
      name="unit"
    >
      <UInput v-model="state.unit" />
    </UFormGroup>

    <UFormGroup
      label="Critical quantity"
      name="criticalQuantity"
    >
      <UInput v-model="state.criticalQuantity" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
