<script setup lang="ts">
import type { HorizontalNavigationLink } from '#ui/types'

const { t } = useI18n({
  useScope: 'local',
})
const store = useGlobalStore()

const links = computed(() => [
  {
    label: t('tabs.info'),
    ...(store.user?.image
      ? { avatar: { src: store.user?.image } }
      : { icon: 'i-ic-outline-info' }),
    to: '/account',
  },
  {
    label: t('tabs.settings'),
    icon: 'i-ic-sharp-build',
    to: '/account/settings',
  },
  {
    label: t('tabs.calendar'),
    icon: 'i-ic-baseline-calendar-month',
    to: '/account/calendar',
  },
  store.isAdmin && {
    label: t('tabs.access'),
    icon: 'i-ic-baseline-security',
    to: '/account/permissions',
  },
  store.isAdmin && {
    label: t('tabs.businesses'),
    icon: 'i-ic-baseline-security',
    to: '/account/businesses',
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
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "tabs": {
      "businesses": "Businesses",
      "calendar": "Calendar",
      "info": "Information",
      "settings": "Settings",
      "access": "Permissions",
      "exit": "Exit"
    }
  },
  "uk-UK": {
    "tabs": {
      "businesses": "Компанії",
      "calendar": "Календар",
      "info": "Інформація",
      "settings": "Налаштування",
      "access": "Дозволи",
      "exit": "Вихід"
    }
  }
}
</i18n>
