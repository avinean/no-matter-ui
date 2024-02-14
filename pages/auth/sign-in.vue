<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
const store = useGlobalStore()
const { t } = useI18n()

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
      {{ $t('signIn.form.title') }}
    </h1>
    <UForm
        :validate="validate"
      :state="form"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
          :label="$t('signIn.form.labels.email')"
        name="email"
      >
        <UInput v-model="form.phone" />
      </UFormGroup>

      <UFormGroup
          :label="$t('signIn.form.labels.password')"
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
        {{ $t('signIn.form.labels.submit') }}
      </UButton>
    </UForm>
    <div class="flex align-center justify-between mt-4">
      <ULink
          to="/auth/sign-up"
          inactive-class="   hover:text-violet-400"
      >
        {{ $t('signIn.form.forgot') }}
      </ULink>
      <ULink
          to="/auth/sign-up"
          inactive-class=" hover:text-violet-400 "
      >
        {{ $t('signIn.form.signUp') }}
      </ULink>
    </div>

  </div>
</template>
