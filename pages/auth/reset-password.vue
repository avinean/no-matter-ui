<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { t } = useI18n()

const store = useGlobalStore()

const form = reactive({
  email: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: t('formValidation.required') })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  store.resetPassword(event.data)
}
</script>

<template>
  <div class="self-center w-full lg:w-1/2">
    <h1 class="text-2xl text-gray-700 mb-4">
      {{ $t('resetPassword.form.title') }}
    </h1>
    <h1 class="text-xs text-gray-700 mb-4">
      {{ $t('resetPassword.form.subTitle') }}
    </h1>
    <UForm
        :validate="validate"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
    >
      <UFormGroup
          :label="$t('resetPassword.form.labels.email')"
          name="email"
          required
      >
        <UInput v-model="form.email" />
      </UFormGroup>
      <div class="flex items-center gap-4 mt-4">
        <UButton
            type="submit"
            size="lg"
        >
          {{ $t('resetPassword.form.labels.submit') }}
        </UButton>
        <ULink
            to="/auth/sign-in"
            inactive-class="hover:text-violet-400 text-sm"
        >
          {{ $t('resetPassword.form.logIn') }}
        </ULink>
      </div>

    </UForm>

  </div>
</template>