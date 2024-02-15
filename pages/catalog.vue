<script setup lang="ts">
const { hasPermission } = useGlobalStore()
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="[
        hasPermission('service:read') && {
          label: 'Послуги',
          icon: 'i-ic-outline-design-services',
          to: '/catalog/services',
        },
        hasPermission('service:read') && {
          label: 'Продукти',
          icon: 'i-ic-baseline-fastfood',
          to: '/catalog/products',
        },
        hasPermission('material:read') && {
          label: 'Матеріали',
          icon: 'i-ic-baseline-format-paint',
          to: '/catalog/materials',
        },
      ].filter(Boolean)" class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>
