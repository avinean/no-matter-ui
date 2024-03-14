<script lang="ts" setup>
import type { FormError } from '#ui/types'
import type { MaterialTransactionEntity } from '~/types/entities'

const { preset } = defineProps<{
  preset: MaterialTransactionEntity
}>()
const emit = defineEmits<{
  submit: []
}>()
const { t } = useI18n({
  useScope: 'local',
})
defineExpose({
  title: `Відмінити транзакцію`,
})

const { revert } = useMaterialTransactionRepository()

const state = reactive<Partial<MaterialTransactionEntity>>({
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

async function onCreateOrUpdate() {
  if (!state.description)
    return
  await revert(preset.id, state.description)
  emit('submit')
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4 w-full"
    @submit="onCreateOrUpdate"
  >
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
