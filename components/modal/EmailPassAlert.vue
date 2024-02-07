<script lang="ts" setup>
defineProps<{
  user: { email: string, password: string }
}>()

const toast = useToast()
const { copy, copied } = useClipboard()

whenever(copied, () => {
  toast.add({
    title: 'Скопійовано!',
    description: 'Текст успішно скопійовано в буфер обміну',
  })
})
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-3xl font-bold">
      Додати профіль працівника
    </h1>
    <UFormGroup label="Імейл">
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

    <UFormGroup label="Тимчасовий пароль">
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
        Тимчасовий пароль дійсний протягом 15хв.
        Передайте його працівникові для входу в систему та встановлення зручного постійного паролю.
        <br>
        Ви завжди можете скопіювати або перегенерувати пароль клікнувши на відповідну кнопку в профілеві користувача
      </template>
    </UAlert>
  </div>
</template>
