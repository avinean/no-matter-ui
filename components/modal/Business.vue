<script lang="ts" setup>
import type { BusinessEntity } from '~/types/entities'

const props = defineProps<{
  preset?: BusinessEntity | null
}>()

const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: `Створити бізнес`,
})

const store = useGlobalStore()
const { baseUrl } = useRuntimeConfig().public
const toast = useToast()

const { photo, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<BusinessEntity> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  image: props.preset?.image,
})

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  try {
    const endpoint = props.preset?.id ? `/business/${store.user?.id}/${props.preset.id}` : `/business/${store.user?.id}`
    const method = props.preset?.id ? 'PUT' : 'POST'

    await $api(endpoint, {
      method,
      body: {
        ...state,
        image,
      },
    })

    emit('submit')
  }
  catch (e) {
    console.log(e)
    toast.add({
      title: 'Error',
      description: 'Користувача з таким номером телефону вже зареєстровано',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm
    :state="state"
    class="grid grid-cols-2 gap-x-4 gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <input-file
      class="row-span-6"
      :src="`${baseUrl}/${state.image}`"
      @change="photo = $event"
    />

    <UFormGroup
      label="Назва"
      name="name"
      required
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
      label="Опис"
      name="description"
      required
    >
      <UInput v-model="state.description" />
    </UFormGroup>
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
