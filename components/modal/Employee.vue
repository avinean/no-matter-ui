<script lang="ts" setup>
import type { FormError } from '#ui/types'
import { UseServicesSelect } from '#components'
import type { ProfileEntity, UserEntity } from '~/types/entities'

const props = withDefaults(defineProps<{
  preset?: ProfileEntity | null
  user?: UserEntity
  close?: () => void
}>(), {
  preset: null,
  close: () => {},
})

const emit = defineEmits<{
  submit: [user: { email: string, password: string }]
}>()
const { t } = useI18n({
  useScope: 'local',
})

const toaster = useToast()

defineExpose({
  title: computed(() => `${props.preset?.id ? t('titleUpdate') : t('titleCreate')} `),
  width: 'max-w-2xl sm:max-w-2xl',
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
  status: props.preset?.status,
})

async function onCreateOrUpdate() {
  loading.value = true

  try {
    await addPhoto()
  }
  catch (error) {
    toaster.add({
      title: t('notifications.errors.title'),
      description: t('notifications.errors.photo'),
    })
  }
  try {
    const user = await (props.preset?.id
      ? edit(props.preset?.id, { ...state, image: url.value })
      : add({ ...state, image: url.value, user: props.user }))

    emit('submit', user!)
    toaster.add({
      title: t(props.preset?.id ? 'notifications.success.update' : 'notifications.success.create'),
    })
  }
  catch (e: any) {
    if (e.response.status === 409) {
      toaster.add({
        title: t('notifications.errors.title'),
        description: t(props.preset?.id ? 'notifications.errors.update' : 'notifications.errors.create'),
      })
    }
  }
}
function validate(state: any): FormError[] {
  const {roles, services, ...rest} = state
  const errors = []
  for (const key in rest) {
    if (state[key] === undefined || state[key] === '')
      errors.push({ path: key, message: t('formValidation.required') })
  }
  if (!state.services?.length)
    errors.push({ path: 'services', message: t('formValidation.required') })
  if (!state.roles?.length)
    errors.push({ path: 'roles', message: t('formValidation.required') })
  return errors
}
</script>

<template>
  <UForm
      :validate="validate"
    :state="state"
    class="grid gap-2"
    @submit="onCreateOrUpdate"
  >
    <div class="flex justify-center">
      <input-file
        class="row-span-6"
        :src="state.image"
        @change="photo = $event"
      />
    </div>
    <div class="grid  gap-y-2">
      <UCard
        :ui="{ ring: '',
               divide: 'divide-y divide-gray-100 dark:divide-gray-800 ',
               body: {
                 padding: 'px-3 py-3 sm:p-3 grid grid-cols-2 gap-x-4 gap-y-2',

               },
               header: {
                 padding: 'px-3 py-3 sm:px-3',
               } }"
      >
        <template #header>
          <div class="flex justify-between p-1">
            <h3 class="text-xl font-bold">
              Загальна інформація
            </h3>
          </div>
        </template>
        <UFormGroup
          :label="$t('default.forms.labels.firstName')"
          name="firstName"
          required
        >
          <UInput v-model="state.firstName" />
        </UFormGroup>
        <UFormGroup
          :label="$t('default.forms.labels.email')"
          name="email"

          required
        >
          <UInput v-model="state.email" type="email" />
        </UFormGroup>
        <UFormGroup
          :label="$t('default.forms.labels.lastName')"

          name="lastName"
          required
        >
          <UInput v-model="state.lastName" />
        </UFormGroup>
        <UFormGroup
          :label="$t('default.forms.labels.dob')"
          name="birthday"
          required
        >
          <InputDate v-model="state.birthday" />
        </UFormGroup>
        <UFormGroup
          :label="$t('default.forms.labels.phone')"
          name="phone"
          required
        >
          <UInput v-model="state.phone" />
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
      </UCard>
      <UCard
        :ui="{ ring: '',
               divide: 'divide-y divide-gray-100 dark:divide-gray-800 ',
               body: {
                 padding: 'px-3 py-3 sm:p-3 grid grid-cols-1 gap-x-4 gap-y-2',

               },
               header: {
                 padding: 'px-3 py-3 sm:px-3',
               } }"
      >
        <template #header>
          <div class="flex justify-between p-1">
            <h3 class="text-xl font-bold">
              Професійна інформація
            </h3>
          </div>
        </template>
        <UFormGroup
          :label="t('status')"
        >
          <UToggle
            v-model="state.status"
            on-icon="i-ic-baseline-check-circle-outline"
            off-icon="i-outline-cancel"
            color="lime"
          />
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
        <UFormGroup
          :label="$t('default.forms.labels.role')"
          name="roles"
          required
        >
          <UseRolesSelect v-model="state.roles" />
          <div class="flex gap-2 flex-wrap mt-2">
            <UBadge v-for="role in state.roles" :key="role.name" :label="role.name" variant="subtle" />
          </div>
        </UFormGroup>
      </UCard>
    </div>
    <div class="flex gap-2 justify-end mt-4">
      <UButton class="w-36 justify-center" @click="close">
        {{ $t('default.forms.actions.cancel') }}
      </UButton>
      <UButton type="submit" class="w-36 justify-center">
        {{ props?.preset?.id ? $t('default.forms.actions.save') : $t('default.forms.actions.create') }}
      </UButton>
    </div>
  </UForm>
</template>

<i18n lang="json">
{
  "en-US": {
    "status": "Status",
    "titleCreate": "Create employee profile",
    "titleUpdate": "Edit employee profile",
    "notifications":  {
      "errors": {
        "title": "Something went wrong",
        "photo": "Failed to upload photo",
        "create": "Could not create, maybe such a user already exists",
        "update": "Failed to update user"
      },
      "success": {
        "create": "Successfully created",
        "update": "Successfully updated"
      }
    }
  },
  "uk-UK": {
    "status":  "Статус",
    "titleCreate": "Створити профіль працівника",
    "titleUpdate": "Редагування профіля",
    "notifications": {
      "errors": {
        "title": "Щось пішло не так",
        "photo": "Не вдалось завантажити фото",
        "create": "Не вдалось створити, можливо такий користувач вже існує",
        "update":  "Не вдалось оновити дані користувача"
      },
      "success": {
        "create": "Успішно створено",
        "update":  "Дані успішно оновлено"
      }
    }

  }
}
</i18n>
