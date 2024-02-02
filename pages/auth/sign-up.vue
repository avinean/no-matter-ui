<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const store = useGlobalStore()

const form = reactive({
  firstName: undefined,
  lastName: undefined,
  phone: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.firstName)
    errors.push({ path: 'firstName', message: 'Required' })
  if (!state.lastName)
    errors.push({ path: 'lastName', message: 'Required' })
  if (!state.phone)
    errors.push({ path: 'phone', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  store.signup(event.data)
}
</script>

<template>
  <div class="self-center w-full lg:w-1/2">
    <h1 class="text-2xl text-gray-700 mb-4">
      Зареєструватись
    </h1>
    <UForm
      :validate="validate"
      :state="form"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
        label="First Name"
        name="firstName"
      >
        <UInput v-model="form.firstName" />
      </UFormGroup>

      <UFormGroup
        label="Last Name"
        name="lastName"
      >
        <UInput v-model="form.lastName" />
      </UFormGroup>

      <UFormGroup
        label="Phone"
        name="phone"
      >
        <UInput v-model="form.phone" />
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
