<script setup>
const store = useGlobalStore()

const primarylinks = computed(() => [
  {
    label: 'Dashboard',
    icon: 'i-ic-outline-dashboard',
    to: '/',
  },
  {
    label: 'Клієнти',
    icon: 'i-ic-baseline-people',
    to: '/clients',
  },
  {
    label: 'Записи',
    icon: 'i-ic-baseline-arrow-right',
    to: '/entries',
  },
  store.config.allowSeeEmployees && {
    label: 'Працівники',
    icon: 'i-ic-sharp-groups',
    to: '/employees',
  },
  {
    label: 'Бронювання',
    icon: 'i-ic-baseline-calendar-month',
    to: '/booking-example',
  },
  {
    label: 'Каталог',
    icon: 'i-ic-baseline-design-services',
    to: '/catalog/services',
  },
].filter(Boolean))

const secondaryLinks = computed(() => [
  {
    label: 'Аккаунт',
    icon: 'i-ic-baseline-room-preferences',
    to: '/account/info',
  },
])
</script>

<template>
  <div class="flex min-h-screen">
    <div class="max-h-screen bg-slate-800 flex flex-col items-center sticky top-0 left-0 z-50 transition">
      <div class="p-4">
        <img
          src="/logo.svg"
          alt="Syns"
          class="w-12"
          width="70"
          height="70"
        >
      </div>

      <NuxtLink
        v-for="link in primarylinks"
        :key="link.to"
        :to="link.to"
        :aria-label="link.label"
        class="flex items-center w-full gap-2 py-4 px-2 text-gray-100 transition hover:bg-gray-100 hover:text-slate-800"
        active-class="bg-gray-100 text-slate-800"
      >
        <UIcon
          :name="link.icon"
          class="text-3xl"
        />
        {{ link.label }}
      </NuxtLink>
      <div class="flex-1" />
      <use-bussiness-select class="flex gap-2 py-2" />
      <NuxtLink
        v-for="link in secondaryLinks"
        :key="link.to"
        :to="link.to"
        :aria-label="link.label"
        class="flex items-center w-full gap-2 py-4 px-2 text-gray-100 transition hover:bg-gray-100 hover:text-slate-800"
        active-class="bg-gray-100 text-slate-800"
      >
        <UIcon
          :name="link.icon"
          class="text-3xl"
        />
        {{ link.label }}
      </NuxtLink>
    </div>
    <div class="w-full p-4 bg-gray-100">
      <div class="p-2 bg-white h-full rounded-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
