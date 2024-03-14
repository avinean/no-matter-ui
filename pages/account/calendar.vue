<script lang="ts" setup>
const { t } = useI18n({
  useScope: 'local',
})
const globalStore = useGlobalStore()
</script>

<template>
  <div class="">
    <UCard
      class="flex flex-col flex-1"
    >
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ t('calendar') }}
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

<i18n lang="json">
{
  "en-US": {
   "calendar": "Calendar"
  },
  "uk-UK": {
    "calendar": "Календар"
  }
}
</i18n>
