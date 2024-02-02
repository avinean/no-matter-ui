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
      const endpoint = props.preset?.id ? `/utils/photo/${state.image}` : '/utils/photo'
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
  <UCard
    class="flex flex-col flex-1"
    :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
  >
    <template #header>
      <h1 class="text-3xl font-bold">
        Створити бізнес
      </h1>
    </template>

    <UForm
      ref="form"
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
    </UForm>
    <template #footer>
      <div class="flex justify-end">
        <UButton
          :loading
          @click="$refs.form.submit()"
        >
          Submit
        </UButton>
      </div>
    </template>
  </UCard>
</template>
