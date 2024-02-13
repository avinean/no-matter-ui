<script setup lang="ts">
const store = useGlobalStore()
const { baseUrl } = useRuntimeConfig().public
</script>

<template>
  <div class="space-y-2">
    <UHorizontalNavigation
      :links="[
        {
          label: 'Інформація',
          to: '/account/info',
          avatar: {
            src: `${baseUrl}/${store.user?.image}`,
          },
        },
        {
          label: 'Налаштування',
          icon: 'i-ic-sharp-build',
          to: '/account/settings',
        },
        store.isAdmnin && {
          label: 'Дозволи',
          icon: 'i-ic-baseline-security',
          to: '/account/permissions',
        },
        {
          label: 'Вихід',
          icon: 'i-ic-sharp-power-settings-new',
          click: () => {
            store.logout()
          },
        },
      ].filter(Boolean)" class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>
