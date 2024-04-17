<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { MaterialTransactionEntity } from '~/types/entities'

const emit = defineEmits<{
  submit: []
}>()
const { t } = useI18n({
  useScope: 'local',
})
defineExpose({
  title: t('title'),
})

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
    if (!state[key])
      errors.push({ path: key, message: t('formValidation.required') })
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
    <UFormGroup
      :label="t('labels.material')"
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
      :label="t('labels.quantity')"
      name="quantity"
    >
      <UInput v-model="state.quantity" />
    </UFormGroup>

    <UFormGroup
      :label="t('labels.description')"
      name="description"
    >
      <UInput v-model="state.description" />
    </UFormGroup>

    <UButton type="submit">
      {{ $t('default.forms.actions.save') }}
    </UButton>
  </UForm>
</template>

<i18n lang="json">
{
  "en-US": {
    "title": "Increase the amount",
    "labels": {
      "material":  "Material",
      "quantity": "Quantity",
      "description": "Description"
    }
  },
  "uk-UK": {
    "title": "Збільшити кількість матеріалу",

    "labels":  {
      "material":  "Матеріал",
      "quantity":  "Кількість",
      "description":  "Опис"
    }
  }
}
</i18n>