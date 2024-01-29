<script lang="ts" setup>
import type { User } from '#types/entities'

const props = withDefaults(defineProps<{
  preset?: User | null
}>(), {
  preset: null,
})

const emit = defineEmits<{
  submit: [user: { email: string, password: string }]
}>()

const toast = useToast()
const store = useSuggestionsStore()
store.get(['sexes', 'roles'])

const loading = ref(false)
const user: Partial<User> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  email: props.preset?.email,
  phone: props.preset?.phone,
  birthday: props.preset?.birthday,
  sex: props.preset?.sex,
  roles: props.preset?.roles || [],
})

async function onCreateOrUpdate() {
  loading.value = true

  try {
    const endpoint = props.preset?.id ? `/users/${props.preset.id}` : `/users`
    const method = props.preset?.id ? 'PUT' : 'POST'

    const data = await $api<{ user: { email: string, password: string } }>(endpoint, {
      method,
      body: user,
    })

    emit('submit', data.user)
  }
  catch (e) {
    toast.add({
      title: 'Error',
      description: `Перевірте дані та спробуйте ще раз. Можливо користувач з таким email або телефоном вже існує`,
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard
    class="flex flex-col flex-1"
    :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
  >
    <template #header>
      <h1 class="text-3xl font-bold">
        Додати профіль працівника
      </h1>
    </template>

    <UForm
      ref="form"
      :state="user"
      class="grid grid-cols-2 gap-x-4 gap-y-2"
      @submit="onCreateOrUpdate"
    >
      <UFormGroup
        label="First name"
        name="firstName"
        required
      >
        <UInput v-model="user.firstName" />
      </UFormGroup>

      <UFormGroup
        label="Last name"
        name="lastName"
        required
      >
        <UInput v-model="user.lastName" />
      </UFormGroup>

      <UFormGroup
        label="Email"
        name="email"
        required
      >
        <UInput v-model="user.email" />
      </UFormGroup>

      <UFormGroup
        label="Phone"
        name="phone"
        required
      >
        <UInput v-model="user.phone" />
      </UFormGroup>

      <UFormGroup
        label="Birthday"
        name="birthday"
        required
      >
        <InputDate v-model="user.birthday" />
      </UFormGroup>

      <UFormGroup
        label="Sex"
        name="sex"
        required
      >
        <USelect
          v-model="user.sex"
          :options="store.suggestions.sexes"
        />
      </UFormGroup>

      <UFormGroup
        label="Role"
        name="role"
        required
      >
        <USelectMenu
          v-model="user.roles"
          :options="store.suggestions.roles"
          value-attribute="value"
          multiple
          selected-icon="i-ic-round-check"
          placeholder="Оберіть ролі"
        />
        <div class="flex gap-2 flex-wrap mt-2">
          <UBadge v-for="role in user.roles" :key="role" :label="role" />
        </div>
      </UFormGroup>
    </UForm>
    <template #footer>
      <div class="flex justify-end">
        <UButton
          :loading
          @click="$refs.form.submit()"
        >
          Submit
        </UButton>
      </div>
    </template>
  </UCard>
</template>
