<script setup lang="ts">
const store = useGlobalStore()
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="[
        {
          label: 'Інформація',
          to: '/account/info',
          avatar: {
            src: store.user?.image,
          },
        },
        {
          label: 'Налаштування',
          icon: 'i-ic-sharp-build',
          to: '/account/settings',
        },
        {
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
      ]" class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>
