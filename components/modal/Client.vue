<script lang="ts" setup>
import type { ClientEntity } from '~/types/entities'

const props = defineProps<{
  preset?: ClientEntity | null
}>()
const emit = defineEmits<{
  submit: []
}>()
const { t } = useI18n({
  useScope: 'local',
})
defineExpose({
  title: computed(() => props.preset?.id ? t('titleUpdate') : t('titleCreate')),
})

const store = useSuggestionsStore()
store.get('sexes')

const { add, edit } = useClientRepository()
const { photo, add: addPhoto } = usePhoto(props.preset?.image)

const loading = ref(false)
const state: Partial<ClientEntity> = reactive({
  firstName: props.preset?.firstName,
  lastName: props.preset?.lastName,
  phone: props.preset?.phone,
  sex: props.preset?.sex,
  birthday: props.preset?.birthday,
  source: props.preset?.source,
  image: props.preset?.image,
})

function validate(state: ClientEntity) {
  const errors = []
  if (!state.firstName)
    errors.push({ path: 'firstName', message: t('formValidation.required') })
  if (!state.lastName)
    errors.push({ path: 'lastName', message: t('formValidation.required') })
  if (!state.phone)
    errors.push({ path: 'phone', message: t('formValidation.required') })
  if (!state.sex)
    errors.push({ path: 'sex', message: t('formValidation.required') })
  if (!state.birthday)
    errors.push({ path: 'birthday', message: t('formValidation.required') })
  if (!state.source)
    errors.push({ path: 'source', message: t('formValidation.required') })

  return errors
}

async function onCreateOrUpdate() {
  loading.value = true
  const image = await addPhoto()

  const data = {
    ...state,
    birthday: new Date(state.birthday!).toISOString(),
    image,
  } as ClientEntity

  if (props.preset?.id)
    await edit(props.preset.id, data)
  else
    await add(data)

  emit('submit')
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="grid gap-2"
    @submit="onCreateOrUpdate"
  >
    <div class="flex justify-center">
      <input-file
          class="row-span-6 w-40"
          :src="state.image"
          @change="photo = $event"
      />
    </div>
    <div class="grid gap-y-2">
    <UCard
        :ui="{
          body: {
            padding: 'px-3 py-3 sm:p-3 grid grid-cols-2 gap-x-4 gap-y-2',
          } }"
    >
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
            :options="store.suggestions.sexes"
            trailing-icon="i-ic-baseline-keyboard-arrow-down"
        />
      </UFormGroup>

      <UFormGroup
          :label="$t('default.forms.labels.dob')"
          name="birthday"
          required
      >
        <input-date v-model="state.birthday" />
      </UFormGroup>

      <UFormGroup
          :label="$t('default.forms.labels.source')"
          name="source"
          required
      >
        <UInput v-model="state.source" />
      </UFormGroup>
    </UCard>

    </div>
    <div class="flex gap-2 justify-end mt-4">
      <UButton
          type="submit"
          class="flex justify-center"
      >
        {{ props.preset?.id ? $t('default.forms.actions.save') : $t('default.forms.actions.create') }}
      </UButton>
    </div>
  </UForm>
</template>

<i18n lang="json">
{
  "en-US": {
        "titleCreate": "Create client profile",
        "titleUpdate": "Edit client profile"
  },
  "uk-UK": {
        "titleCreate": "Створити профіль клієнта",
        "titleUpdate": "Редагування профіля"
  }
}
</i18n>
