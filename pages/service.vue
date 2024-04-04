<script setup lang="ts">
import type { HorizontalNavigationLink } from '#ui/types'

const { t } = useI18n({
  useScope: 'local',
})

const links = computed(() => [
  {
    label: t('booking'),
    icon: 'i-ic-baseline-calendar-month',
    to: '/service/booking',
  },
  {
    label: t('entries'),
    icon: 'i-ic-baseline-alarm',
    to: '/service/entries',
  },
  {
    label: t('orders'),
    icon: 'i-ic-outline-receipt-long',
    to: '/service/order',
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
    "booking": "Booking",
    "entries": "Entries",
    "orders": "Orders"
  },
  "uk-UK": {
    "booking": "Бронювання",
    "entries": "Записи",
    "orders":  "Рахунки"
  }
}
</i18n>
