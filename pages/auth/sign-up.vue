<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { t } = useI18n()

const store = useGlobalStore()

const form = reactive({
  firstName: undefined,
  lastName: undefined,
  phone: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.firstName)
    errors.push({ path: 'firstName', message: t('formValidation.required') })
  if (!state.lastName)
    errors.push({ path: 'lastName', message: t('formValidation.required') })
  if (!state.phone)
    errors.push({ path: 'phone', message: t('formValidation.required') })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  store.signup(event.data)
}
</script>

<template>
  <div class="self-center w-full lg:w-1/2">
    <h1 class="text-2xl text-gray-700 mb-4">
      {{ $t('signUp.form.title') }}
    </h1>
    <UForm
      :validate="validate"
      :state="form"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
        :label="$t('signUp.form.labels.firstName')"
        name="firstName"
      >
        <UInput v-model="form.firstName" />
      </UFormGroup>

      <UFormGroup
        :label="$t('signUp.form.labels.lastName')"
        name="lastName"
      >
        <UInput v-model="form.lastName" />
      </UFormGroup>

      <UFormGroup
        :label="$t('signUp.form.labels.email')"
        name="email"
      >
        <UInput v-model="form.phone" />
      </UFormGroup>

      <UButton
        type="submit"
        size="lg"
      >
        {{ $t('signUp.form.labels.submit') }}
      </UButton>
    </UForm>
    <div class="flex align-center gap-1.5 mt-4">
      <span class="">
        {{ $t('signUp.form.alreadyLogIn') }}
      </span>
      <ULink
        to="/auth/sign-in"
        inactive-class="underline  hover:text-violet-400 "
      >
        {{ $t('signUp.form.logIn') }}
      </ULink>
    </div>
  </div>
</template>
