<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { MaterialEntity } from '~/types/entities'

const emit = defineEmits<{
  submit: []
}>()
const { t } = useI18n({
  useScope: 'local',
})
defineExpose({
  title: t('title'),
})

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
      errors.push({ path: key, message: t('formValidation.required') })
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
    <UFormGroup
      :label="$t('default.forms.labels.name')"
      name="name"
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.desc')"
      name="description"
    >
      <UInput v-model="state.description" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.unit')"
      name="unit"
    >
      <UInput v-model="state.unit" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.criticalQuantity')"
      name="criticalQuantity"
    >
      <UInput v-model="state.criticalQuantity" />
    </UFormGroup>

    <UButton type="submit">
      {{ $t('default.forms.actions.create') }}
    </UButton>
  </UForm>
</template>

<i18n lang="json">
{
  "en-US": {
    "title": "Add material"
  },
  "uk-UK": {
    "title": "Додати матеріал"
  }
}
</i18n>
