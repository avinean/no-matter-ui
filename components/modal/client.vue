<script lang="ts" setup>
import type { Client } from '#types/entities'

const props = defineProps<{
  preset?: Client | null
}>()

const emit = defineEmits<{
  submit: [profile: Client]
}>()

const { baseUrl } = useRuntimeConfig().public
const toast = useToast()
const store = useSuggestionsStore()
store.get('sexes')

const loading = ref(false)
const photo = ref()
const profile: Partial<Client> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  phone: props.preset?.phone,
  sex: props.preset?.sex,
  birthday: props.preset?.birthday,
  source: props.preset?.source,
  image: props.preset?.image,
})

async function onCreateOrUpdate() {
  loading.value = true
  let image
  if (photo.value) {
    try {
      const body = new FormData()
      body.append('photo', photo.value)

      image = await $api<Client>('/clients/photo', {
        method: 'POST',
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
    const endpoint = props.preset?.id ? `/clients/${props.preset.id}` : '/clients'
    const method = props.preset?.id ? 'PUT' : 'POST'

    const data = await $api<Client>(endpoint, {
      method,
      body: {
        ...profile,
        birthday: new Date(profile.birthday!).toISOString(),
        image,
      },
    })

    emit('submit', data)
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
        Add profile
      </h1>
    </template>

    <UForm
      ref="form"
      :state="profile"
      class="grid grid-cols-2 gap-x-4 gap-y-2"
      @submit="onCreateOrUpdate"
    >
      <input-file
        class="row-span-6"
        :src="profile.image ? `${baseUrl}/${profile.image}` : null"
        @change="photo = $event"
      />

      <UFormGroup
        label="First name"
        name="firstName"
        required
      >
        <UInput v-model="profile.firstName" />
      </UFormGroup>

      <UFormGroup
        label="Last name"
        name="lastName"
        required
      >
        <UInput v-model="profile.lastName" />
      </UFormGroup>

      <UFormGroup
        label="Phone number"
        name="phone"
        required
      >
        <UInput v-model="profile.phone" />
      </UFormGroup>

      <UFormGroup
        label="Sex"
        name="sex"
        required
      >
        <USelect
          v-model="profile.sex"
          :options="store.suggestions.sexes"
        />
      </UFormGroup>

      <UFormGroup
        label="Birthday"
        name="birthday"
        required
      >
        <input-date v-model="profile.birthday" />
      </UFormGroup>

      <UFormGroup
        label="Source"
        name="source"
        required
      >
        <UInput v-model="profile.source" />
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
