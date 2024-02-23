<script lang="ts" setup>
import type { ClientEntity } from '~/types/entities'

defineExpose({
  title: `Створити профіль клієнта`,
})

const props = defineProps<{
  preset?: ClientEntity | null
}>()

const emit = defineEmits<{
  submit: []
}>()

const store = useSuggestionsStore()
store.get('sexes')

const { add, edit } = useClientRepository()
const { photo, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<ClientEntity> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  phone: props.preset?.phone,
  sex: props.preset?.sex,
  birthday: props.preset?.birthday,
  source: props.preset?.source,
  image: props.preset?.image,
})

function validate(state: ClientEntity) {
  const errors = []
  if (!state.firstName)
    errors.push({ path: 'firstName', message: 'Поле обовʼязкове' })
  if (!state.lastName)
    errors.push({ path: 'lastName', message: 'Поле обовʼязкове' })
  if (!state.phone)
    errors.push({ path: 'phone', message: 'Поле обовʼязкове' })
  if (!state.sex)
    errors.push({ path: 'sex', message: 'Поле обовʼязкове' })
  if (!state.birthday)
    errors.push({ path: 'birthday', message: 'Поле обовʼязкове' })
  if (!state.source)
    errors.push({ path: 'source', message: 'Поле обовʼязкове' })

  return errors
}

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  const data = {
    ...state,
    birthday: new Date(state.birthday!).toISOString(),
    image,
  } as ClientEntity

  if (props.preset?.id)
    await edit(props.preset.id, data)
  else
    await add(data)

  emit('submit')
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="grid grid-cols-2 gap-x-4 gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <input-file
      class="row-span-6"
      :src="state.image"
      @change="photo = $event"
    />

    <UFormGroup
      label="First name"
      name="firstName"
      required
    >
      <UInput v-model="state.firstName" />
    </UFormGroup>

    <UFormGroup
      label="Last name"
      name="lastName"
      required
    >
      <UInput v-model="state.lastName" />
    </UFormGroup>

    <UFormGroup
      label="Phone number"
      name="phone"
      required
    >
      <UInput v-model="state.phone" />
    </UFormGroup>

    <UFormGroup
      label="Sex"
      name="sex"
      required
    >
      <USelect
        v-model="state.sex"
        :options="store.suggestions.sexes"
      />
    </UFormGroup>

    <UFormGroup
      label="Birthday"
      name="birthday"
      required
    >
      <input-date v-model="state.birthday" />
    </UFormGroup>

    <UFormGroup
      label="Source"
      name="source"
      required
    >
      <UInput v-model="state.source" />
    </UFormGroup>
    <UButton
      type="submit"
    >
      Submit
    </UButton>
  </UForm>
</template>
