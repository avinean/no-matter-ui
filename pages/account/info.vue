<script setup lang="ts">
import { ModalEmployee } from '#components'

const { t } = useI18n({
  useScope: 'local',
})

const globalStore = useGlobalStore()
const modalStore = useModalStore()
const actions = [
  { tooltip:
        t('actions.tooltipText'), icon: 'i-ic-baseline-edit', onClick: () => modalStore.open(ModalEmployee, {
    preset: globalStore.user,
    onSubmit() {
      globalStore.getUser()
    },
  }) },
]
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-3xl font-bold">
        {{ t('title') }}
      </h1>
    </template>

    <div class="space-y-2">
      <base-image
        :src="globalStore.user?.image"
        width="200"
        height="200"
      />

      <base-action-bar :items="actions" />

      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ t('userFields.name') }}:
        </div>
        <div>{{ globalStore.user?.firstName }} {{ globalStore.user?.lastName }} ({{ globalStore.user?.sex }})</div>
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ t('userFields.dob') }}:
        </div>
        <base-datetime :date="globalStore.user?.birthday" />
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ t('userFields.contacts') }}:
        </div>
        <div>{{ globalStore.user?.email }}, {{ globalStore.user?.phone }}</div>
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ t('userFields.roles') }}:
        </div>
        <div class="flex gap-2 flex-wrap">
          <UBadge
            v-for="role in globalStore.user?.roles"
            :key="role.name"
            :label="role.name"
            variant="subtle"
          />
        </div>
      </div>
      <div
        v-if="globalStore.user?.services"
        class="flex gap-2"
      >
        <div class="font-bold min-w-40">
          {{ t('userFields.services') }}:
        </div>
        <div class="flex gap-2 flex-wrap">
          <UBadge
            v-for="service in globalStore.user?.services"
            :key="service.name"
            :label="service.name"
            variant="subtle"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<i18n lang="json">
{
  "en-US": {
      "title": "Account information",
      "userFields": {
        "dob": "Date of birthday",
        "name": "Name",
        "contacts": "Contacts",
        "roles": "Roles",
        "services": "Services"
      },
      "actions": {
        "tooltipText": "Edit profile"
    }
  },
  "uk-UK": {
      "title": "Інформація про аккаунт",
      "userFields": {
        "dob": "Дата народження",
        "name": "Імʼя",
        "contacts": "Контакти",
        "roles": "Ролі",
        "services": "Сервіси"
      },
      "actions": {
        "tooltipText": "Редагувати профіль"
      }
  }
}
</i18n>
