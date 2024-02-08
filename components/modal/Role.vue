<script lang="ts" setup>
import type { Role } from '#types/entities'

const props = withDefaults(defineProps<{
  preset?: Role | null
}>(), {
  preset: null,
})

const emit = defineEmits<{
  submit: []
}>()

const toast = useToast()
const globalStore = useGlobalStore()
const loading = ref(false)
const state: Partial<Role> = reactive({
  name: props.preset?.name,
})

async function onCreateOrUpdate() {
  loading.value = true

  try {
    const endpoint = props.preset?.id ? `/role/${globalStore.bussiness?.id}/${props.preset.id}` : `/role/${globalStore.bussiness?.id}`
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
    class="grid grid-cols-2 gap-x-4 gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <h1 class="text-3xl font-bold">
      Додати нову роль
    </h1>

    <UFormGroup
      label="Назва ролі"
      name="name"
      required
    >
      <UInput v-model="state.name" />
    </UFormGroup>
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
