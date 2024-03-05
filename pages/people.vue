<script setup lang="ts">
import type { HorizontalNavigationLink } from '#ui/types'

const { t } = useI18n({
  useScope: 'local',
})

const { hasPermission } = useGlobalStore()
const links = computed(() => [
  hasPermission('profile:read') && {
    label: t('default.applicationLinks.employees'),
    icon: 'i-ic-sharp-groups',
    to: '/people/employees',
  },
  hasPermission('client:read') && {
    label: t('default.applicationLinks.clients'),
    icon: 'i-ic-baseline-people',
    to: '/people/clients',
  },
  // {
  //   label: t('default.applicationLinks.users'),
  //   icon: 'i-ic-baseline-manage-accounts',
  //   to: '/people/users',
  // },
].filter(Boolean) as HorizontalNavigationLink[])
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="links" class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "services": "Services",
    "products": "Products",
    "materials": "Materials"
  },
  "uk-UK": {
    "services": "Послуги",
    "products": "Продукти",
    "materials":  "Матеріали"

  }
}
</i18n>
