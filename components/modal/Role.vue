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

const { t } = useI18n()

defineExpose({
  title: t('account.permissions.addNewRole'),
})

const toast = useToast()
const globalStore = useGlobalStore()
const loading = ref(false)
const state: Partial<RoleEntity> = reactive({
  name: props.preset?.name,
})

async function onCreateOrUpdate() {
  loading.value = true

  try {
    const endpoint = props.preset?.id ? `/role/${globalStore.business?.id}/${props.preset.id}` : `/role/${globalStore.business?.id}`
    const method = props.preset?.id ? 'PUT' : 'POST'

    await $api(endpoint, {
      method,
      body: state,
    })

    emit('submit')
  }
  catch (e) {
    toast.add({
      title: 'Error',
      description: `Перевірте дані та спробуйте ще раз. Можливо користувач з таким email або телефоном вже існує`,
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm
    ref="form"
    :state="state"
    class="w-full md:w-1/2 grid gap-x-4 gap-y-2   "
    @submit="onCreateOrUpdate"
  >
    <UFormGroup
      :label="$t('account.permissions.form.labels.roleName')"
      name="name"
      required
    >
      <UInput v-model="state.name" />
    </UFormGroup>
    <UButton type="submit" class="flex justify-center w-32">
      {{ $t('account.permissions.form.submit') }}
    </UButton>
  </UForm>
</template>
