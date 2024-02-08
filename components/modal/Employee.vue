<script lang="ts" setup>
import type { Role, ServiceProduct, User } from '#types/entities'
import { ModalRole, ModalServiceProduct } from '#components'

const props = withDefaults(defineProps<{
  preset?: User | null
}>(), {
  preset: null,
})

const emit = defineEmits<{
  submit: [user: { email: string, password: string }]
}>()

const modalStore = useModalStore()
const globalStore = useGlobalStore()
const toast = useToast()
const suggestionsStore = useSuggestionsStore()
const { add, edit } = useProfileRepository()

suggestionsStore.get(['sexes'])
const { data: roles, refresh: refreshRoles } = useApi<Role[]>(`/role/${globalStore.bussiness?.id}`)
const { data: services, refresh: refreshServices } = useApi<ServiceProduct[]>(`/service/service`)

const loading = ref(false)
const photo = ref()
const state: Partial<User> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  email: props.preset?.email,
  phone: props.preset?.phone,
  birthday: props.preset?.birthday,
  sex: props.preset?.sex,
  roles: props.preset?.roles || [],
  services: props.preset?.services || [],
})

whenever(services, () => {
  state.services = state.services?.map(service => services.value.find(({ id }) => id === service.id)) || []
})
whenever(roles, () => {
  state.roles = state.roles?.map(role => roles.value.find(({ id }) => id === role.id)) || []
})

function addRole() {
  modalStore.open(ModalRole, {
    onSubmit() {
      refreshRoles()
    },
  })
}

function addService() {
  modalStore.open(ModalServiceProduct, {
    type: 'service',
    onSubmit() {
      refreshServices()
    },
  })
}

async function onCreateOrUpdate() {
  loading.value = true
  let image
  if (photo.value) {
    try {
      const body = new FormData()
      body.append('photo', photo.value)
      const endpoint = state.image ? `/util/photo/${state.image}` : '/util/photo'
      const method = state.image ? 'PUT' : 'POST'

      image = await $api<string>(endpoint, {
        method,
        body,
      })
      photo.value = null
    }
    catch (e) {
      toast.add({
        title: 'Error',
        description: 'Не вдалось завантажити фото',
      })
    }
  }

  if (props.preset?.id) {
    edit(props.preset?.id, { ...state, image })
  }
  else {
    const user = await add({ ...state, image })
    emit('submit', user!)
  }
}
</script>

<template>
  <UForm
    :state="state"
    class="grid grid-cols-2 gap-x-4 gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <h1 class="text-3xl font-bold">
      Додати профіль працівника
    </h1>
    <input-file
      class="row-span-6"
      :src="state.image ? `assets/${state.image}` : null"
      @change="photo = $event"
    />

    <UFormGroup
      label="First name"
      name="firstName"
      required
    >
      <UInput v-model="state.firstName" />
    </UFormGroup>

    <UFormGroup
      label="Last name"
      name="lastName"
      required
    >
      <UInput v-model="state.lastName" />
    </UFormGroup>

    <UFormGroup
      label="Email"
      name="email"
      required
    >
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup
      label="Phone"
      name="phone"
      required
    >
      <UInput v-model="state.phone" />
    </UFormGroup>

    <UFormGroup
      label="Birthday"
      name="birthday"
      required
    >
      <InputDate v-model="state.birthday" />
    </UFormGroup>

    <UFormGroup
      label="Sex"
      name="sex"
      required
    >
      <USelect
        v-model="state.sex"
        :options="suggestionsStore.suggestions.sexes"
      />
    </UFormGroup>

    <UFormGroup
      label="Role"
      name="role"
      required
    >
      <div class="flex gap-1">
        <USelectMenu
          v-model="state.roles"
          :options="roles"
          option-attribute="name"
          multiple
          selected-icon="i-ic-round-check"
          placeholder="Оберіть ролі"
          creatable
          class="flex-1"
        />
        <UButton
          icon="i-ic-outline-add-moderator"
          size="sm"
          color="primary"
          square
          variant="solid"
          @click="addRole()"
        />
      </div>
      <div class="flex gap-2 flex-wrap mt-2">
        <UBadge v-for="role in state.roles" :key="role.name" :label="role.name" />
      </div>
    </UFormGroup>

    <UFormGroup
      v-if="services"
      label="Які послуги може надавати спеціаліст"
      name="services"
      required
    >
      <div class="flex gap-1">
        <USelectMenu
          v-model="state.services"
          :options="services"
          option-attribute="name"
          multiple
          selected-icon="i-ic-round-check"
          placeholder="Оберіть послуги"
          class="flex-1"
        />
        <UButton
          icon="i-ic-baseline-medical-services"
          size="sm"
          color="primary"
          square
          variant="solid"
          @click="addService()"
        />
      </div>
      <div class="flex gap-2 flex-wrap mt-2">
        <UBadge v-for="service in state.services" :key="service.name" :label="service.name" />
      </div>
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
