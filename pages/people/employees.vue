<script setup lang="ts">
import type { ProfileEntity } from '~/types/entities'
import { ModalEmailPassAlert, ModalEmployee } from '#components'

const { t } = useI18n({
  useScope: 'local',
})
const { hasPermission } = useGlobalStore()
const modalStore = useModalStore()
const { data, refresh } = useAsyncData(useProfileRepository().get)
const commandPaletteRef = ref()
const selectedId = ref<number | null>(null)
const selectedProfile = computed(() => data.value?.find(profile => profile.id === selectedId.value))

const groups = computed(() => [{
  key: 'users',
  commands: (data.value || []).map(client => ({
    id: client.id,
    label: `${client.firstName} ${client.lastName}`,
    client,
    avatar: { src: client.image, loading: 'lazy' },
  })),
}])

const actions = [
  { tooltip: t('actions.edit'), icon: 'i-ic-baseline-edit', onClick: () => callModal(selectedProfile.value) },
  { tooltip: t('actions.copy'), icon: 'i-ic-baseline-content-copy' },
  { tooltip: t('actions.regeneratePass'), icon: 'i-ic-round-security' },
]

function callModal(preset?: ProfileEntity) {
  modalStore.open(ModalEmployee, {
    preset,
    onSubmit(user) {
      refresh()
      if (!preset) {
        nextTick(() => {
          modalStore.open(ModalEmailPassAlert, { user })
        })
      }
    },
  })
}
</script>

<template>
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full pt-2">
    <div>
      <UButton
        v-if="hasPermission('profile:add')"
        :label="t('addNewEmployee')"
        icon="i-ic-outline-contact-phone"
        class="w-full"
        @click="callModal()"
      />
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="groups"
        :autoselect="false"
        :placeholder="t('employeeList.searchPlaceholder')"
        :ui="{ emptyState: {
          wrapper: 'px-2 py-2 sm:px-2',
        } }"
        :empty-state="{
          icon: '',
          queryLabel: t('employeeList.emptyList.isEmptyBySearch'),
          label: t('employeeList.emptyList.isEmpty'),
        }"
        @update:model-value="selectedId = $event.client.id"
      />
    </div>
    <div class="w-full flex items-start gap-2 pl-2">
      <template v-if="selectedProfile">
        <div class="grid lg:grid-cols-3 gap-2 w-full">
          <UCard>
            <base-image
              :src="selectedProfile.image"
              width="200"
              height="200"
            />
          </UCard>
          <UCard class="lg:col-span-2">
            <h1 class="flex justify-between font-bold text-xl">
              {{ selectedProfile.firstName }} {{ selectedProfile.lastName }}
              <base-action-bar :items="actions" />
            </h1>
            <div class="grid grid-cols-[150px,1fr] items-center">
              <span class="font-bold">{{ t('employeeInfo.phone') }}:</span><span>{{ selectedProfile.phone }}</span>
              <span class="font-bold">{{ t('employeeInfo.sex') }}:</span><span>{{ selectedProfile.sex }}</span>

              <span class="font-bold">{{ t('employeeInfo.dob') }}:</span><span><base-datetime :date="selectedProfile.birthday" /></span>
              <span class="font-bold">{{ t('employeeInfo.created') }}:</span><span><base-datetime
                :date="selectedProfile.createdAt"
                date-style="medium"
                time-style="medium"
              /></span>
              <span class="font-bold">{{ t('employeeInfo.roles') }}:</span>
              <span class="flex gap-2 flex-wrap mt-2">
                <UBadge
                  v-for="role in selectedProfile.roles"
                  :key="role.name"
                  :label="role.name"
                  variant="subtle"
                />
              </span>
              <span class="font-bold">{{ t('employeeInfo.services') }}:</span>
              <span class="flex gap-2 flex-wrap mt-2">
                <UBadge
                  v-for="service in selectedProfile.services"
                  :key="service.name"
                  :label="service.name"
                  variant="subtle"
                />
              </span>
              <span class="font-bold">{{ t('employeeInfo.status') }}:</span>
              <span class="mt-2">
                <UToggle
                  v-model="selectedProfile.status"
                  on-icon="i-ic-baseline-check-circle-outline"
                  off-icon="i-outline-cancel"
                  color="lime"
                  disabled
                />
              </span>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
      "addNewEmployee": "Add New",
      "employeeList": {
        "searchPlaceholder": "Search...",
        "emptyList": {
          "isEmptyBySearch": "We couldn't find any with that name. Please try again or create a new one",
          "isEmpty": "We couldn't find any employees, create a new one"
        }
      },
      "employeeInfo": {
        "phone": "Phone number",
        "sex": "Sex",
        "dob": "Date of birth",
        "created": "Date of creation",
        "roles": "Roles",
        "services": "Services",
        "status": "Status"
      },
        "actions": {
          "edit": "Edit Profile",
          "copy": "Copy current password",
          "regeneratePass": "Regenerate password"
        }
  },
  "uk-UK": {
      "addNewEmployee": "Додати нового",
      "employeeList": {
        "searchPlaceholder": "Пошук...",
        "emptyList": {
          "isEmptyBySearch": "Нам не вдалося знайти нікого з таким іменем. Будь ласка, спробуйте ще раз або створіть нового",
          "isEmpty": "Нам не вдалося знайти жодного співробітника, створіть нового"
        }
      },
      "employeeInfo": {
        "phone": "Номер телефону",
        "sex": "Стать",
        "dob": "Дата народження",
        "created": "Дата створення",
        "roles": "Ролі",
        "services": "Послуги",
        "status": "Статус"
      },
      "actions": {
        "edit": "Редагувати профіль",
        "copy": "Копіювати поточний пароль",
        "regeneratePass": "Перегенерувати пароль"
      }
  }
}
</i18n>
