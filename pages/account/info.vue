<script setup lang="ts">
import { ModalEmployee } from '#components'

const globalStore = useGlobalStore()
const modalStore = useModalStore()
const actions = [
  { tooltip: 'Редагувати профіль', icon: 'i-ic-baseline-edit', onClick: () => modalStore.open(ModalEmployee, {
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
        {{ $t('settings.titles.loginOptions') }}
      </h1>
    </template>

    <div class="space-y-2">
      <base-image :src="globalStore.user?.image" width="200" height="200" />

    <base-action-bar :items="actions" />

      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          Імʼя:
        </div>
        <div>{{ globalStore.user?.firstName }} {{ globalStore.user?.lastName }} ({{ globalStore.user?.sex }})</div>
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          День народження:
        </div>
        <base-datetime :date="globalStore.user?.birthday" />
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          Контакти:
        </div>
        <div>{{ globalStore.user?.email }}, {{ globalStore.user?.phone }}</div>
      </div>
      <div class="flex gap-2">
        <div class="font-bold min-w-40">
          Ролі:
        </div>
        <div class="flex gap-2 flex-wrap">
          <UBadge v-for="role in globalStore.user?.roles" :key="role.name" :label="role.name" />
        </div>
      </div>
      <div v-if="globalStore.user?.services" class="flex gap-2">
        <div class="font-bold min-w-40">
          Сервіси:
        </div>
        <div class="flex gap-2 flex-wrap">
          <UBadge v-for="service in globalStore.user?.services" :key="service.name" :label="service.name" />
        </div>
      </div>
    </div>
  </UCard>
</template>
