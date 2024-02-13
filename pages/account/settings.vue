<script lang="ts" setup>
const { locale, setLocale, availableLocales, setLocaleCookie, getLocaleCookie } = useI18n()
const toast = useToast()
const password = reactive({
  password: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
})

const locales = [
  {
    locale: 'uk-UK',
    label: 'Українська',
    avatar: { src: '/flag/uk.png' },
  },
  {
    locale: 'en-US',
    label: 'English',
    avatar: { src: '/flag/gb.png' },
  },
]

function validate(state) {
  const errors = []
  if (!state.password)
    errors.push({ path: 'password', message: 'Поле обовʼязкове' })
  if (!state.newPassword)
    errors.push({ path: 'newPassword', message: 'Поле обовʼязкове' })
  if (state.confirmPassword !== state.newPassword)
    errors.push({ path: 'confirmPassword', message: 'Паролі мають збігатись' })
  return errors
}

async function onUpdatePassword() {
  await $api('/user/password', {
    method: 'PUT',
    body: password,
  })
  toast.add({
    title: 'Success',
    description: 'Пароль успішно змінено',
  })

  for (const key in password)
    password[key] = undefined
}
</script>

<template>
  <div class="grid md:grid-cols-[1fr,1fr] gap-2">
    <UCard
      class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ $t('settings.titles.loginOptions') }}
        </h1>
      </template>
      <UForm
        :state="password"
        :validate="validate"
        class="space-y-2 w-full"
        @submit="onUpdatePassword"
      >
        <UFormGroup
          :label="$t('settings.form.labels.password')"
          name="password"
          required
        >
          <UInput v-model="password.password" />
        </UFormGroup>
        <UFormGroup
          :label="$t('settings.form.labels.newPassword')"
          name="newPassword"
          required
        >
          <UInput v-model="password.newPassword" />
        </UFormGroup>
        <UFormGroup
          :label="$t('settings.form.labels.confirmNewPassword')"
          name="confirmPassword"
          required
        >
          <UInput v-model="password.confirmPassword" />
        </UFormGroup>

        <UButton
          :loading
          type="submit"
        >
          {{ $t('settings.form.labels.submit') }}
        </UButton>
      </UForm>
    </UCard>
    <UCard
      class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ $t('settings.titles.generalOptions') }}
        </h1>
      </template>
      <UFormGroup
        :label="$t('settings.form.labels.confirmNewPassword')"
      >
        <USelectMenu
          v-model="locale"
          :options="locales"
          value-attribute="locale"
          trailing-icon="i-ic-baseline-keyboard-arrow-down"
        >
          <template #leading>
            <UAvatar v-if="locale" :src="locales.find(_ => _.locale === locale)?.avatar.src" size="2xs" class="mx-0.5" />
          </template>
        </USelectMenu>
      </UFormGroup>
    </UCard>
  </div>
</template>
