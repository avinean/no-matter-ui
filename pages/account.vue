<script setup lang="ts">
import type { HorizontalNavigationLink } from '#ui/types'
const store = useGlobalStore()
const { baseUrl } = useRuntimeConfig().public
const { t } = useI18n()

const links = computed(() => [
  {
    label: t('account.tabs.info'),
    to: '/account/info',
    avatar: {
      src: `${baseUrl}/${store.user?.image}`,
    },
  },
  {
    label: t('account.tabs.settings'),
    icon: 'i-ic-sharp-build',
    to: '/account/settings',
  },
  store.isAdmin && {
    label: t('account.tabs.access'),
    icon: 'i-ic-baseline-security',
    to: '/account/permissions',
  },
  store.isAdmin && {
    label: t('account.tabs.businesses'),
    icon: 'i-ic-baseline-security',
    to: '/account/businesses',
  },
  {
    label: t('account.tabs.exit'),
    icon: 'i-ic-sharp-power-settings-new',
    click: () => {
      store.logout()
    },
  },
].filter(Boolean) as HorizontalNavigationLink[])
</script>

<template>
  <div class="space-y-2">
    <UHorizontalNavigation
      :links="links" class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>
