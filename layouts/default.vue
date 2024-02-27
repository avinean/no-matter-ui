<script setup>
import { ModalBusinessSelector } from '#components'

const { t } = useI18n()
const store = useGlobalStore()
const modalStore = useModalStore()
const { baseUrl } = useRuntimeConfig().public

const links = computed(() => [
  [
    {
      label: t('default.applicationLinks.dashboard'),
      icon: 'i-ic-outline-dashboard',
      to: '/',
    },
    store.hasPermission('client:read') && {
      label: t('default.applicationLinks.clients'),
      icon: 'i-ic-baseline-people',
      to: '/clients',
    },
    store.hasPermission('booking:read') && {
      label: t('default.applicationLinks.entries'),
      icon: 'i-ic-baseline-arrow-right',
      to: '/entries',
    },
    store.hasPermission('profile:read') && {
      label: t('default.applicationLinks.employees'),
      icon: 'i-ic-sharp-groups',
      to: '/employees',
    },
    store.hasPermission('booking:read') && {
      label: t('default.applicationLinks.booking'),
      icon: 'i-ic-baseline-calendar-month',
      to: '/booking',
    },
    store.hasPermission(['material:read', 'service:read'], 'some') && {
      label: t('default.applicationLinks.catalog'),
      icon: 'i-ic-baseline-design-services',
      to: '/catalog/services',
    },
  ].filter(Boolean),
  [
    {
      label: t('default.applicationLinks.business'),
      avatar: {
        src: `${baseUrl}/${store.business?.image}`,
      },
      click: () => modalStore.open(ModalBusinessSelector),
    },
    {
      label: t('default.applicationLinks.object'),
      avatar: {
        src: `${baseUrl}/${store.object?.image}`,
      },
      click: () => modalStore.open(ModalBusinessSelector),
    },
  ],
  [
    {
      label: t('default.applicationLinks.account'),
      to: '/account',
      avatar: {
        src: `${baseUrl}/${store.user?.image}`,
      },
    },
  ],
])
</script>

<template>
  <div class="flex min-h-screen">
    <div class="max-h-screen flex flex-col p-2 sticky top-0 left-0 z-50 transition bg-gray-200">
      <div class="px-2 pb-2 flex justify-center">
        <img
          src="/logo.svg"
          alt="Syns"
          class="w-12"
          width="70"
          height="70"
        >
      </div>

      <UVerticalNavigation
        :links="links"
        :ui="{
          wrapper: 'flex-1 flex flex-col',
        }"
      />

      <!-- <use-business-select class="flex gap-2 py-2" /> -->
    </div>
    <div class="w-full p-2 bg-gray-200">
      <div class="p-2 bg-white h-full rounded-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
