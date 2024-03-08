<script lang="ts" setup>
import { UseServicesSelect } from '#components'
import type { ProfileEntity, UserEntity } from '~/types/entities'

const props = withDefaults(defineProps<{
  preset?: ProfileEntity | null
  user?: UserEntity
}>(), {
  preset: null,
})

const emit = defineEmits<{
  submit: [user: { email: string, password: string }]
}>()

const toaster = useToast()
const { t } = useI18n({
  useScope: 'local',
})

defineExpose({
  title: computed(() => `${props.preset?.id ? t('titleUpdate') : t('titleCreate')} `),
})

const suggestionsStore = useSuggestionsStore()
const { add, edit } = useProfileRepository()
const { photo, url, add: addPhoto } = usePhoto(props.preset?.image)

suggestionsStore.get(['sexes'])

const loading = ref(false)
const state: Partial<ProfileEntity> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  email: props.preset?.email,
  phone: props.preset?.phone,
  image: props.preset?.image,
  birthday: props.preset?.birthday,
  sex: props.preset?.sex,
  roles: props.preset?.roles || [],
  services: props.preset?.services || [],
})

async function onCreateOrUpdate() {
  loading.value = true

  try {
    await addPhoto()
  }
  catch (error) {
    toaster.add({
      title: 'Щось пішло не так',
      description: 'Не вдалось завантажити фото',
    })
  }

  try {
    const user = await (props.preset?.id
      ? edit(props.preset?.id, { ...state, image: url.value })
      : add({ ...state, image: url.value, user: props.user }))

    emit('submit', user!)
  }
  catch (error) {
    toaster.add({
      title: 'Щось пішло не так',
      description: 'не вдалось створити користувача',
    })
  }
}
</script>

<template>
  <UForm
    :state="state"
    class="grid grid-cols-2 gap-x-4 gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <input-file
      class="row-span-6"
      :src="state.image"
      @change="photo = $event"
    />

    <UFormGroup
      :label="$t('default.forms.labels.firstName')"
      name="firstName"
      required
    >
      <UInput v-model="state.firstName" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.lastName')"

      name="lastName"
      required
    >
      <UInput v-model="state.lastName" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.email')"

      name="email"
      required
    >
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.phone')"
      name="phone"
      required
    >
      <UInput v-model="state.phone" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.dob')"
      name="birthday"
      required
    >
      <InputDate v-model="state.birthday" />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.sex')"
      name="sex"
      required
    >
      <USelect
        v-model="state.sex"
        :options="suggestionsStore.suggestions.sexes"
      />
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.role')"
      name="role"
      required
    >
      <UseRolesSelect v-model="state.roles" />
      <div class="flex gap-2 flex-wrap mt-2">
        <UBadge v-for="role in state.roles" :key="role.name" :label="role.name" variant="subtle" />
      </div>
    </UFormGroup>

    <UFormGroup
      :label="$t('default.forms.labels.services')"
      name="services"
      required
    >
      <UseServicesSelect v-model="state.services" />
      <div class="flex gap-2 flex-wrap mt-2">
        <UBadge v-for="service in state.services" :key="service.name" :label="service.name" variant="subtle" />
      </div>
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<i18n lang="json">
{
  "en-US": {
    "titleCreate": "Create employee profile",
    "titleUpdate": "Edit employee profile"
  },
  "uk-UK": {
    "titleCreate": "Створити профіль працівника",
    "titleUpdate": "Редагування профіля"
  }
}
</i18n>
