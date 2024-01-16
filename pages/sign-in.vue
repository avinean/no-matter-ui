<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'auth',
})

const form = reactive({
  username: undefined,
  password: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.username)
    errors.push({ path: 'username', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  const { data, error } = await useFetch<{ access_token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(event.data),
  })

  if (error.value) {
    const toast = useToast()
    toast.add({
      title: 'Авторизація невдала',
    })
  }
  else {
    const cookie = useCookie('sraka')
    cookie.value = data.value?.access_token
    useRouter().push('/')
  }
}
</script>

<template>
  <UForm :validate="validate" :state="form" class="space-y-4 self-center w-full lg:w-1/2" @submit="onSubmit">
    <UFormGroup label="Username" name="username">
      <UInput v-model="form.username" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="form.password" type="password" />
    </UFormGroup>

    <UButton type="submit" size="lg">
      Submit
    </UButton>
  </UForm>
</template>
