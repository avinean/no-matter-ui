<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const store =  useGlobalStore()

const form = reactive({
  email: undefined,
  password: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  store.login(event.data)
}
</script>

<template>
  <div class="self-center w-full lg:w-1/2">
    <h1 class="text-2xl text-gray-700 mb-4">
      Авторизуватись
    </h1>
    <UForm
      :validate="validate"
      :state="form"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Email"
        name="email"
      >
        <UInput v-model="form.email" />
      </UFormGroup>

      <UFormGroup
        label="Password"
        name="password"
      >
        <UInput
          v-model="form.password"
          type="password"
        />
      </UFormGroup>

      <UButton
        type="submit"
        size="lg"
      >
        Submit
      </UButton>
    </UForm>
  </div>
</template>
