<script lang="ts" setup>
import type { Bussiness } from '#types/entities'

const props = defineProps<{
  preset?: Bussiness | null
}>()

const emit = defineEmits<{
  submit: []
}>()

const { baseUrl } = useRuntimeConfig().public
const toast = useToast()
const globalStore = useGlobalStore()

const { photo, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<Bussiness> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  image: props.preset?.image,
})

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  try {
    const endpoint = props.preset?.id
      ? `/bussiness-object/${globalStore.user?.id}/${globalStore.bussiness?.id}/${props.preset.id}`
      : `/bussiness-object/${globalStore.user?.id}/${globalStore.bussiness?.id}`
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
    ref="form"
    :state="state"
    class="grid grid-cols-2 gap-x-4 gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <h1 class="text-3xl font-bold">
      Створити бізнес
    </h1>
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

    <UButton
      type="submit"
    >
      Submit
    </UButton>
  </UForm>
</template>
