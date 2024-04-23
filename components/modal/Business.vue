<script lang="ts" setup>
import type { BusinessEntity } from '~/types/entities';

const { t } = useI18n({
  useScope: 'local',
})

const props = defineProps<{
  preset?: BusinessEntity | null
}>()

const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: t('title'),
})

const store = useGlobalStore()
const { photo, add: addPhoto } = usePhoto(props.preset?.image)
const { add, edit } = useBusinessRepository()

const loading = ref(false)
const state: Partial<BusinessEntity> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  image: props.preset?.image,
})

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  if (props.preset?.id)
    await edit(props.preset.id, { ...state, image })
  else
    await add({ ...state, image })

  await store.getUser()
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
      class="row-span-6 w-40"
      :src="state.image"
      @change="photo = $event"
    />

    <UFormGroup
        :label="$t('default.forms.labels.name') "
      name="name"
      required
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
        :label="$t('default.forms.labels.desc') "
      name="description"
      required
    >
      <UInput v-model="state.description" />
    </UFormGroup>
    <UButton type="submit">
      {{ $t('default.forms.actions.create') }}
    </UButton>
  </UForm>
</template>


<i18n lang="json">
{
  "en-US": {
    "title": "Create new business"
  },
  "uk-UK": {
    "title": "Створити бізнес"
  }
}
</i18n>