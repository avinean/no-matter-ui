<script lang="ts" setup>
import type { BusinessObjectEntity } from '~/types/entities'

const props = defineProps<{
  preset?: BusinessObjectEntity | null
}>()

const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: `Створити обʼєкт бізнесу'`,
})

const store = useGlobalStore()
const { photo, add: addPhoto } = usePhoto(props.preset?.image)
const { add, edit } = useBusinessObjectRepository()
const loading = ref(false)

const state: Partial<BusinessObjectEntity> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  image: props.preset?.image,
})

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  try {
    if (props.preset?.id)
      await edit(props.preset?.id, { ...state, image })
    else
      await add({ ...state, image })

    await store.getUser()
    emit('submit')
  } finally {
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
      :src="state.image"
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
      :loading="loading"
      type="submit"
    >
      Submit
    </UButton>
  </UForm>
</template>
