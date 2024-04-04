<script lang="ts" setup>
defineProps<{
  user: { email: string, password: string }
}>()
const { t } = useI18n({
  useScope: 'local',
})
const toast = useToast()
const { copy, copied } = useClipboard()

whenever(copied, () => {
  toast.add({
    title: t('copy'),
  })
})
</script>

<template>
  <div class="space-y-2">
    <UFormGroup
      :label="$t('default.forms.labels.email')"
    >
      <UButtonGroup
        class="w-full"
        size="sm"
        orientation="horizontal"
      >
        <UInput
          :model-value="user.email"
          class="w-full"
          disabled
        />
        <UButton icon="i-ic-baseline-content-copy" color="gray" @click="copy(user.password)" />
      </UButtonGroup>
    </UFormGroup>

    <UFormGroup :label="$t('default.forms.labels.password')">
      <UButtonGroup
        class="w-full"
        size="sm"
        orientation="horizontal"
      >
        <UInput
          :model-value="user.password"
          class="w-full"
          disabled
        />
        <UButton icon="i-ic-baseline-content-copy" color="gray" @click="copy(user.password)" />
      </UButtonGroup>
    </UFormGroup>

    <UAlert
      icon="i-ic-baseline-info"
      title="Зверніть увагу!"
    >
      <template #description>
        {{ t('titles.valid') }}
        <br>
        {{ t('titles.regenerate') }}
      </template>
    </UAlert>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "copy": "The text has been successfully copied to the clipboard",
    "titles": {
      "valid": "The temporary password is valid for 15 minutes. Give it to an employee to log in and set a convenient permanent password.",
      "regenerate": "You can always copy or regenerate the password by clicking on the corresponding button in the user profile"
    }
  },
  "uk-UK": {
    "copy":  "Текст успішно скопійовано в буфер обміну",
    "titles": {
      "valid": "Тимчасовий пароль дійсний протягом 15хв. Передайте його працівникові для входу в систему та встановлення зручного постійного паролю.",
      "regenerate":  "Ви завжди можете скопіювати або перегенерувати пароль клікнувши на відповідну кнопку в профілеві користувача"
    }
  }
}
</i18n>
