<script lang="ts" setup>
const globalStore = useGlobalStore()
</script>

<template>
  <div class="">
    <UCard
      class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ $t('account.settings.titles.calendar') }}
        </h1>
      </template>
      <FormCalendar
        :calendar="globalStore.user?.calendar"
        :schedule="globalStore.user?.schedule"
        :profile-id="globalStore.user?.id"
        @submit="globalStore.getUser"
      />
    </UCard>
  </div>
</template>
