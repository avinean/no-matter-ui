<script lang="ts" setup>
import type { ServiceProduct, User } from '#types/entities'

const props = withDefaults(defineProps<{
  preset?: User | null
}>(), {
  preset: null,
})

const emit = defineEmits<{
  submit: [user: { email: string, password: string }]
}>()

const globalStore = useGlobalStore()
const toast = useToast()
const suggestionsStore = useSuggestionsStore()
suggestionsStore.get(['sexes', 'roles'])

const { data: services } = useApi<ServiceProduct[]>(`/service/service`)

const loading = ref(false)
const user: Partial<User> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  email: props.preset?.email,
  phone: props.preset?.phone,
  birthday: props.preset?.birthday,
  sex: props.preset?.sex,
  roles: props.preset?.roles.split(',') || [],
  services: props.preset?.services || [],
})

whenever(services, () => {
  user.services = user.services?.map(service => services.value.find(({ id }) => id === service.id)) || []
})

async function onCreateOrUpdate() {
  loading.value = true

  try {
    const endpoint = props.preset?.id ? `/user/${globalStore.object?.id}/${props.preset.id}` : `/user/${globalStore.object?.id}`
    const method = props.preset?.id ? 'PUT' : 'POST'

    const data = await $api<{ user: { email: string, password: string } }>(endpoint, {
      method,
      body: {
        ...user,
        roles: user.roles.join(','),
      },
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
          :options="suggestionsStore.suggestions.sexes"
        />
      </UFormGroup>

      <UFormGroup
        label="Role"
        name="role"
        required
      >
        <USelectMenu
          v-model="user.roles"
          :options="suggestionsStore.suggestions.roles"
          value-attribute="value"
          multiple
          selected-icon="i-ic-round-check"
          placeholder="Оберіть ролі"
        />
        <div class="flex gap-2 flex-wrap mt-2">
          <UBadge v-for="role in user.roles" :key="role" :label="role" />
        </div>
      </UFormGroup>

      <UFormGroup
        v-if="services"
        label="Які послуги може надавати спеціаліст"
        name="role"
        required
      >
        <USelectMenu
          v-model="user.services"
          :options="services"
          option-attribute="name"
          multiple
          selected-icon="i-ic-round-check"
          placeholder="Оберіть послуги"
        />
        <div class="flex gap-2 flex-wrap mt-2">
          <UBadge v-for="service in user.services" :key="service.name" :label="service.name" />
        </div>
      </UFormGroup>
    </UForm>
    <template #footer>
      <div class="flex justify-end">
        <UButton @click="$refs.form.submit()">
          Submit
        </UButton>
      </div>
    </template>
  </UCard>
</template>
