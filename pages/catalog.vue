<script setup lang="ts">
const store = useGlobalStore()
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="[
        store.config.allowSeeServices && {
          label: 'Послуги',
          icon: 'i-ic-outline-design-services',
          to: '/catalog/services',
        },
        store.config.allowSeeProducts && {
          label: 'Продукти',
          icon: 'i-ic-baseline-fastfood',
          to: '/catalog/products',
        },
        store.config.allowSeeMaterails && {
          label: 'Матеріали',
          icon: 'i-ic-baseline-format-paint',
          to: '/catalog/materials',
        },
      ].filter(Boolean)" class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>
