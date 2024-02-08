<script lang="ts" setup>
import type { Client } from '#types/entities'

const props = defineProps<{
  preset?: Client | null
}>()

const emit = defineEmits<{
  submit: []
}>()

const toast = useToast()
const store = useSuggestionsStore()
store.get('sexes')

const { add, edit } = useClientRepository()

const loading = ref(false)
const photo = ref()
const state: Partial<Client> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  phone: props.preset?.phone,
  sex: props.preset?.sex,
  birthday: props.preset?.birthday,
  source: props.preset?.source,
  image: props.preset?.image,
})

function validate(state: Client) {
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
  let image
  if (photo.value) {
    try {
      const body = new FormData()
      body.append('photo', photo.value)
      const endpoint = state.image ? `/util/photo/${state.image}` : '/util/photo'
      const method = state.image ? 'PUT' : 'POST'

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

  const data = {
    ...state,
    birthday: new Date(state.birthday!).toISOString(),
    image,
  }

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
    <h1 class="text-3xl font-bold">
      Створити профіль клієнта
    </h1>

    <input-file
      class="row-span-6"
      :src="state.image ? `assets/${state.image}` : null"
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
