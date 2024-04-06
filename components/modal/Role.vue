<script lang="ts" setup>
import type { RoleEntity } from '~/types/entities'

const props = withDefaults(defineProps<{
  preset?: RoleEntity | null
}>(), {
  preset: null,
})

const emit = defineEmits<{
  submit: []
}>()

const { t } = useI18n({
  useScope: 'local',
})

defineExpose({
  title: t('addNewRole'),
})

const toast = useToast()
const loading = ref(false)
const name: Partial<RoleEntity> = reactive({
  name: props.preset?.name,
})

async function onCreateOrUpdate() {
  loading.value = true

  try {
    const endpoint = props.preset?.id ? `/role/${props.preset.id}` : `/role`
    const method = props.preset?.id ? 'PUT' : 'POST'

    await $api(endpoint, {
      method,
      body: name,
    })

    emit('submit')
  }
  catch (e) {
    toast.add({
      title: t('form.formNotifications.errorTitle'),
      description: t('form.formNotifications.roleErrorDesc'),
    })
  }
  finally {
    loading.value = false
  }
}

function validate(state: typeof name) {
  const errors = []
  if (!state.name)
    errors.push({ path: 'name', message: t('formValidation.required') })
  return errors
}
</script>

<template>
  <UForm
    ref="form"
    :state="name"
    :validate="validate"
    class="w-full md:w-1/2 grid gap-x-4 gap-y-2   "
    @submit="onCreateOrUpdate"
  >
    <UFormGroup
      :label="$t('default.forms.labels.roleName')"
      name="name"
      required
    >
      <UInput v-model="name.name" />
    </UFormGroup>
    <UButton
      type="submit"
      class="flex justify-center w-32"
    >
      {{ $t('default.forms.actions.save') }}
    </UButton>
  </UForm>
</template>

<i18n lang="json">
{
  "en-US": {
    "addNewRole": "Add a new role",
    "form": {
      "formNotifications": {
        "accessTitle": "Success!",
        "accessDesc": "Permissions successfully updated",
        "errorTitle": "Something went wrong",
        "errorDesc": "Please try again or contact support",
        "roleErrorTitle": "Something went wrong",
        "roleErrorDesc": "Check the data and try again. Maybe a role with such data already exists"
      }
    }
  },
  "uk-UK": {
    "addNewRole": "Додати нову роль",
    "form": {
      "formNotifications": {
        "accessTitle": "Вдалося!",
        "accessDesc": "Дозволи успішно оновлено",
        "errorTitle": "Щось пішло не так",
        "errorDesc": "Повторіть спробу або звʼяжіться зі службою підтримки",
        "roleErrorDesc": "Перевірте дані та спробуйте ще раз. Можливо роль з такими даними вже існує"
      }
    }
  }
}
</i18n>
