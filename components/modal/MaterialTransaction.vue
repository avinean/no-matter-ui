<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { MaterialTransactionEntity } from '~/types/entities'

const emit = defineEmits<{
  submit: []
}>()

const { get } = useMaterialRepository()
const { add } = useMaterialTransactionRepository()

const { data: items } = useAsyncData(() => get())

const state = reactive<Partial<MaterialTransactionEntity>>({
  material: undefined,
  quantity: undefined,
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

async function onCreateOrUpdate(event: FormSubmitEvent<Partial<MaterialTransactionEntity>>) {
  await add(event.data)
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
      Збільшити кількість матеріалу
    </h1>

    <UFormGroup
      label="Material"
      name="materialId"
    >
      <USelectMenu
        v-if="items"
        v-model="state.material"
        option-attribute="name"
        :options="items"
      />
    </UFormGroup>

    <UFormGroup
      label="Quantity"
      name="quantity"
    >
      <UInput v-model="state.quantity" />
    </UFormGroup>

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
