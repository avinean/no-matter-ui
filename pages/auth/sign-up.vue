<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { t } = useI18n({
  useScope: 'local',
})

const store = useGlobalStore()

const form = reactive({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.firstName)
    errors.push({ path: 'firstName', message: t('formValidation.required') })
  if (!state.lastName)
    errors.push({ path: 'lastName', message: t('formValidation.required') })
  if (!state.email)
    errors.push({ path: 'email', message: t('formValidation.required') })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  store.signup(event.data)
}
</script>

<template>
  <div class="self-center w-full lg:w-1/2">
    <h1 class="text-2xl text-gray-700 mb-4">
      {{ t('title') }}
    </h1>
    <UForm
      :validate="validate"
      :state="form"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
        :label="$t('default.forms.labels.firstName')"
        name="firstName"
        required
      >
        <UInput v-model="form.firstName" />
      </UFormGroup>

      <UFormGroup
        :label="$t('default.forms.labels.lastName')"
        name="lastName"
        required
      >
        <UInput v-model="form.lastName" />
      </UFormGroup>

      <UFormGroup
        :label="$t('default.forms.labels.email')"
        name="email"
        required
      >
        <UInput v-model="form.email" />
      </UFormGroup>

      <UButton
        type="submit"
        size="lg"
      >
        {{ $t('default.forms.actions.signUp') }}
      </UButton>
    </UForm>
    <div class="flex align-center gap-1.5 mt-4">
      <span class="">
        {{ t('alreadyLogIn') }}
      </span>
      <ULink
        to="/auth/sign-in"
        inactive-class="underline  hover:text-violet-400"
      >
        {{ t('logIn') }}
      </ULink>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
      "title": "New user registration",
      "logIn": "Sign up",
      "alreadyLogIn": "Already registered?"
  },
  "uk-UK": {
      "title": "Реєстрація нового користувача",
      "logIn": "Увійти",
      "alreadyLogIn": "Вже зареєстровані?"
  }
}
</i18n>
