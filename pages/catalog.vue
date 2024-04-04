<script setup lang="ts">
import type { HorizontalNavigationLink } from '#ui/types'

const { t } = useI18n({
  useScope: 'local',
})

const { hasPermission } = useGlobalStore()
const links = computed(() => [
  hasPermission('service:read') && {
    label: t('services'),
    icon: 'i-ic-outline-design-services',
    to: '/catalog/services',
  },
  hasPermission('service:read') && {
    label: t('products'),
    icon: 'i-ic-baseline-fastfood',
    to: '/catalog/products',
  },
  hasPermission('material:read') && {
    label: t('materials'),
    icon: 'i-ic-baseline-format-paint',
    to: '/catalog/materials',
  },
].filter(Boolean) as HorizontalNavigationLink[])
</script>

<template>
  <div>
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
