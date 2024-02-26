<script lang="ts" setup>
const { t, locale } = useI18n()
const globalStore = useGlobalStore()
const toast = useToast()

const locales = computed(() => [
  {
    locale: 'uk-UK',
    label: t('account.settings.titles.generalOptions.locales.ua'),
    avatar: { src: '/flag/uk.png' },
  },
  {
    locale: 'en-US',
    label: t('account.settings.titles.generalOptions.locales.en'),
    avatar: { src: '/flag/gb.png' },
  },
])

const password = reactive({
  password: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
})

function validatePassword(state: typeof password) {
  const errors = []
  if (!state.password)
    errors.push({ path: 'password', message: t('formValidation.required') })
  if (!state.newPassword)
    errors.push({ path: 'newPassword', message: t('formValidation.required') })
  if (state.confirmPassword !== state.newPassword)
    errors.push({ path: 'confirmPassword', message: t('formValidation.confirmPassword') })
  return errors
}

async function onUpdatePassword() {
  await $api('/user/password', {
    method: 'PUT',
    body: password,
  })
  toast.add({
    title: 'Success',
    description: t('account.settings.form.requestMessages.successChangePassword'),
  })

  for (const key in password)
  // @ts-expect-error to fix
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
          {{ $t('account.settings.titles.loginOptions') }}
        </h1>
      </template>
      <UForm
        :state="password"
        :validate="validatePassword"
        class="space-y-2 w-full"
        @submit="onUpdatePassword"
      >
        <UFormGroup
          :label="$t('account.settings.form.labels.password')"
          name="password"
          required
        >
          <UInput v-model="password.password" />
        </UFormGroup>
        <UFormGroup
          :label="$t('account.settings.form.labels.newPassword')"
          name="newPassword"
          required
        >
          <UInput v-model="password.newPassword" />
        </UFormGroup>
        <UFormGroup
          :label="$t('account.settings.form.labels.confirmNewPassword')"
          name="confirmPassword"
          required
        >
          <UInput v-model="password.confirmPassword" />
        </UFormGroup>

        <UButton type="submit">
          {{ $t('account.settings.form.labels.submit') }}
        </UButton>
      </UForm>
    </UCard>
    <UCard
      class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ $t('account.settings.titles.generalOptions.generalTitle') }}
        </h1>
      </template>
      <UFormGroup
        :label="$t('account.settings.titles.generalOptions.localeLabel')"
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
    <UCard
      class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h1 class="text-3xl font-bold">
          Персональний графік роботи
        </h1>
      </template>

      <FormSchedule
        :schedule="globalStore.user?.schedule"
        :profile-id="globalStore.user?.id"
        @submit="globalStore.getUser"
      />
    </UCard>
  </div>
</template>
