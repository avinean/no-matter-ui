<script lang="ts" setup>
import type { Bussiness } from '#types/entities'

const props = defineProps<{
  preset?: Bussiness | null
}>()

const emit = defineEmits<{
  submit: []
}>()

const store = useGlobalStore()
const { baseUrl } = useRuntimeConfig().public
const toast = useToast()

const loading = ref(false)
const photo = ref()
const state: Partial<Bussiness> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  image: props.preset?.image,
})

async function onCreateOrUpdate() {
  loading.value = true
  let image
  if (photo.value) {
    try {
      const body = new FormData()
      body.append('photo', photo.value)
      const endpoint = props.preset?.image ? `/util/photo/${state.image}` : '/util/photo'
      const method = props.preset?.id ? 'PUT' : 'POST'

      image = await $api<string>(endpoint, {
        method,
        body,
      })
      photo.value = null
    }
    catch (e) {
      toast.add({
        title: 'Error',
        description: 'Не вдалось завантажити фото',
      })
    }
  }

  try {
    const endpoint = props.preset?.id ? `/bussiness/${store.user?.id}/${props.preset.id}` : `/bussiness/${store.user?.id}`
    const method = props.preset?.id ? 'PUT' : 'POST'
    console.log('before api call')
    await $api(endpoint, {
      method,
      body: {
        ...state,
        image,
      },
    })
    console.log('after api call')

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
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
