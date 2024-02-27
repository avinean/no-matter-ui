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

const { baseUrl } = useRuntimeConfig().public

const { photo, add: addPhoto } = usePhoto(props.preset?.image)
const { add, edit } = useBusinessObectRepository()

const state: Partial<BusinessObjectEntity> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  image: props.preset?.image,
})

async function onCreateOrUpdate() {
  const image = await addPhoto()

  if (props.preset?.id)
    await edit(props.preset?.id, { ...state, image })
  else
    await add({ ...state, image })

  emit('submit')
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

    <UButton
      type="submit"
    >
      Submit
    </UButton>
  </UForm>
</template>
