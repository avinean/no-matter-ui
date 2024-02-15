<script setup>
import { ModalBussinessSelector } from '#components'

const store = useGlobalStore()
const modalStore = useModalStore()
const { baseUrl } = useRuntimeConfig().public

const links = computed(() => [
  [
    {
      label: 'Dashboard',
      icon: 'i-ic-outline-dashboard',
      to: '/',
    },
    store.hasPermission('client:read') && {
      label: 'Клієнти',
      icon: 'i-ic-baseline-people',
      to: '/clients',
    },
    store.hasPermission('booking:read') && {
      label: 'Записи',
      icon: 'i-ic-baseline-arrow-right',
      to: '/entries',
    },
    store.hasPermission('profile:read') && {
      label: 'Працівники',
      icon: 'i-ic-sharp-groups',
      to: '/employees',
    },
    store.hasPermission('booking:read') && {
      label: 'Бронювання',
      icon: 'i-ic-baseline-calendar-month',
      to: '/booking-example',
    },
    store.hasPermission(['material:read', 'service:read'], 'some') && {
      label: 'Каталог',
      icon: 'i-ic-baseline-design-services',
      to: '/catalog/services',
    },
  ].filter(Boolean),
  [
    {
      label: 'Бізнес',
      avatar: {
        src: `${baseUrl}/${store.bussiness?.image}`,
      },
      click: () => modalStore.open(ModalBussinessSelector),
    },
    {
      label: 'Обʼєкт',
      avatar: {
        src: `${baseUrl}/${store.object?.image}`,
      },
      click: () => modalStore.open(ModalBussinessSelector),
    },
  ],
  [
    {
      label: 'Аккаунт',
      to: '/account/info',
      avatar: {
        src: `${baseUrl}/${store.user?.image}`,
      },
    },
  ],
])
</script>

<template>
  <div class="flex min-h-screen">
    <div class="max-h-screen flex flex-col p-2 sticky top-0 left-0 z-50 transition">
      <div class="px-2 pb-2">
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

      <!-- <use-bussiness-select class="flex gap-2 py-2" /> -->
    </div>
    <div class="w-full p-2">
      <div class="p-2 bg-white h-full rounded-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
