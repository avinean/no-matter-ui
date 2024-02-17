<script setup lang="ts">
import { ModalEmployee } from '#components'

const { t } = useI18n()

const globalStore = useGlobalStore()
const modalStore = useModalStore()
const actions = [
  { tooltip:
        t('account.info.actions.tooltipText'), icon: 'i-ic-baseline-edit', onClick: () => modalStore.open(ModalEmployee, {
    preset: globalStore.user,
    onSubmit() {
      globalStore.getUser()
    },
  }) },
]
</script>

<template>
  <UCard
    :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
  >
    <template #header>
      <h1 class="text-3xl font-bold">
        {{ $t('account.info.title') }}
      </h1>
    </template>

    <div class="space-y-2">
      <base-image :src="globalStore.user?.image" width="200" height="200" />

      <base-action-bar :items="actions" />

      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ $t('account.info.userFields.name') }}:
        </div>
        <div>{{ globalStore.user?.firstName }} {{ globalStore.user?.lastName }} ({{ globalStore.user?.sex }})</div>
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ $t('account.info.userFields.dob') }}:
        </div>
        <base-datetime :date="globalStore.user?.birthday" />
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ $t('account.info.userFields.contacts') }}:
        </div>
        <div>{{ globalStore.user?.email }}, {{ globalStore.user?.phone }}</div>
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ $t('account.info.userFields.roles') }}:
        </div>
        <div class="flex gap-2 flex-wrap">
          <UBadge v-for="role in globalStore.user?.roles" :key="role.name" :label="role.name" />
        </div>
      </div>
      <div v-if="globalStore.user?.services" class="flex gap-2">
        <div class="font-bold min-w-40">
          {{ $t('account.info.userFields.services') }}:
        </div>
        <div class="flex gap-2 flex-wrap">
          <UBadge v-for="service in globalStore.user?.services" :key="service.name" :label="service.name" />
        </div>
      </div>
    </div>
  </UCard>
</template>
