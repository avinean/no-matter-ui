<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const store = useGlobalStore()
const { t } = useI18n({
  useScope: 'local',
})

const form = reactive({
  phone: undefined,
  password: undefined,
})

function validate(): FormError[] {
  const errors = []
  if (!form.phone)
    errors.push({ path: 'phone', message: t('formValidation.required') })
  if (!form.password)
    errors.push({ path: 'password', message: t('formValidation.required') })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  store.login(event.data)
}
</script>

<template>
  <div class="self-center w-full lg:w-1/2">
    <h1 class="text-2xl text-gray-700 mb-4">
      {{ t('form.title') }}
    </h1>
    <UForm
      :validate="validate"
      :state="form"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
        :label="$t('default.forms.labels.email')"
        name="email"
        required
      >
        <UInput v-model="form.phone" />
      </UFormGroup>

      <UFormGroup
        :label="$t('default.forms.labels.password')"
        name="password"
        required
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
        {{ $t('default.forms.actions.signIn') }}
      </UButton>
    </UForm>
    <div class="flex align-center justify-between mt-4">
      <ULink
        to="/auth/reset-password"
        inactive-class="   hover:text-violet-400"
      >
        {{ t('form.forgot') }}
      </ULink>
      <ULink
        to="/auth/sign-up"
        inactive-class=" hover:text-violet-400 "
      >
        {{ t('form.signUp') }}
      </ULink>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "form": {
      "title": "Sign In",
      "signUp": "Sign up",
      "forgot": "Forgot your password?"
    },

  },
  "uk-UK": {
    "form": {
      "title": "Авторизація",
      "signUp": "Реєстрація",
      "forgot": "Забули пароль?"
    }
  }
}
</i18n>
