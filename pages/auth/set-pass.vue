<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const route = useRoute()
const router = useRouter()

const form = reactive({
  password: undefined,
  newPassword: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  if (state.password !== state.newPassword)
    errors.push({ path: 'newPassword', message: 'Passwords must match' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  await useApi('/auth/set-password', {
    method: 'POST',
    body: {
      password: event.data.password,
      token: route.query.t,
    },
  })
  
  router.push('/auth/sign-in')
}
</script>

<template>
  <div class="self-center w-full lg:w-1/2">
    <h1 class="text-2xl text-gray-700 mb-4">Встановити пароль</h1>
    <UForm :validate="validate" :state="form" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Password" name="password">
        <UInput v-model="form.password" type="password" />
      </UFormGroup>

      <UFormGroup label="New Password" name="newPassword">
        <UInput v-model="form.newPassword" type="password" />
      </UFormGroup>

      <UButton type="submit" size="lg">
        Submit
      </UButton>
    </UForm>
  </div>
</template>
