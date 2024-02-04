<script lang="ts" setup>
const toast = useToast()
const password = reactive({
  password: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
})

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
  await $api('/users/password', {
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
  <UForm
    :state="password"
    :validate="validate"
    class="space-y-2 md:w-1/2"
    @submit="onUpdatePassword"
  >
    <UFormGroup
      label="Поточний пароль"
      name="password"
      required
    >
      <UInput v-model="password.password" />
    </UFormGroup>
    <UFormGroup
      label="Новий пароль"
      name="newPassword"
      required
    >
      <UInput v-model="password.newPassword" />
    </UFormGroup>
    <UFormGroup
      label="Підтвердження пароля"
      name="confirmPassword"
      required
    >
      <UInput v-model="password.confirmPassword" />
    </UFormGroup>

    <UButton
      :loading
      type="submit"
    >
      Submit
    </UButton>
  </UForm>
</template>
