<script setup lang="ts">
import type { HorizontalNavigationLink } from '#ui/types'

const { t } = useI18n({
  useScope: 'local',
})
const store = useGlobalStore()
const { baseUrl } = useRuntimeConfig().public

const links = computed(() => [
  {
    label: t('tabs.info'),
    to: '/account/info',
    avatar: {
      src: `${baseUrl}/${store.user?.image}`,
    },
  },
  {
    label: t('tabs.settings'),
    icon: 'i-ic-sharp-build',
    to: '/account/settings',
  },
  store.isAdmin && {
    label: t('tabs.access'),
    icon: 'i-ic-baseline-security',
    to: '/account/permissions',
  },
  {
    label: t('tabs.exit'),
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

<i18n lang="json">
{
  "en-US": {
    "tabs": {
      "info": "Information",
      "settings": "Settings",
      "access": "Permissions",
      "exit": "Exit"
    }
  },
  "uk-UK": {
    "tabs": {
      "info": "Інформація",
      "settings": "Налаштування",
      "access": "Дозволи",
      "exit": "Вихід"
    }
  }
}
</i18n>
