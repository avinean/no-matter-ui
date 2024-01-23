<script lang="ts" setup>
import type { Profile } from '#types/entities';

const emit = defineEmits<{
  submit: [profile: Profile]
}>()

const model = defineModel<boolean>()
const toast = useToast()
const loading = ref(false)

const photo = ref()

const profile: Partial<Profile> = reactive({
  firstName:  undefined,
  lastName:  undefined,
  sex: undefined,
  birthday:  undefined,
  source: undefined,
  image: undefined,
})
const emails = ref<string[]>([])
const phones = ref<string[]>([])

async function onCreate() {
  loading.value = true
  let image
  if (photo.value) {
    try {
      const body = new FormData()
      body.append('photo', photo.value)

      image = await $api<Profile>('/profiles/photo', {
        method: 'POST',
        body,
      })
    } catch (e) {
      toast.add({
        title: 'Error',
        description: 'An error occured while uploading photo',
      })
    }
  }

  try {
    const data = await $api<Profile>('/profiles', {
      method: 'POST',
      body: {
        ...profile,
        emails: emails.value,
        phones: phones.value,
        birthday: new Date(profile.birthday!).toISOString(),
        image,
      }
    })
    emit('submit', data)
  } catch (e) {
    toast.add({
      title: 'Error',
      description: 'An error occured while creating the profile',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal
    v-model="model"
    :ui="{
      width: 'sm:max-w-4xl'
    }"
  >
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
        @submit="onCreate"
      >
        <UFormGroup
          label="Profile phote"
          class="row-span-5"
        >
          <input-file
            class="block w-full aspect-square"
            @change="photo = $event"
          />
        </UFormGroup>

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
          label="Sex"
          name="sex"
          required
        >
          <UInput v-model="profile.sex" />
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

        <UFormGroup
          label="Emails"
          name="emails"
        >
          <input-tags v-model="emails" />
        </UFormGroup>

        <UFormGroup
          label="Phones"
          name="phones"
        >
          <input-tags v-model="phones" />
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
  </UModal>
</template>
