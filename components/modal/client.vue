<script lang="ts" setup>
import type { Profile } from '#types/entities';

const emit = defineEmits<{
  submit: [profile: Profile]
}>()

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
  emails: [],
  phones: [],
})

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
  <div class="p-2">
    <h2 class="mb-4">
      Add profile
    </h2>
    <UForm
      :state="profile"
      class="space-y-4 w-full"
      @submit="onCreate"
    >
      <UFormGroup label="Profile phote">
        <input-file
          class="block w-40 h-40 rounded-full"
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
        <UInput v-model="profile.birthday" />
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
        <input-tags v-model="profile.emails" />
      </UFormGroup>

      <UFormGroup
        label="Phones"
        name="phones"
      >
        <input-tags v-model="profile.phones" />
      </UFormGroup>

      <UButton
        type="submit"
        :loading
      >
        Submit
      </UButton>
    </UForm>
  </div>
</template>
