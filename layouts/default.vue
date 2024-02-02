<script setup>
const store = useGlobalStore()

const primarylinks = computed(() => [
  {
    label: 'Dashboard',
    icon: 'i-ic-baseline-arrow-right',
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
  {
    label: 'Працівники',
    icon: 'i-ic-sharp-groups',
    to: '/employees',
  },
  store.config.allowSeeMaterails && {
    label: 'Матеріали',
    icon: 'i-ic-sharp-tune',
    to: '/materials',
  },
  {
    label: 'Приклад бронювання',
    icon: 'i-ic-baseline-calendar-month',
    to: '/booking-example',
  },
  store.config.allowSeeServices && {
    label: 'Послуги',
    icon: 'i-ic-baseline-design-services',
    to: '/services',
  },
  store.config.allowSeeProducts && {
    label: 'Товари',
    icon: 'i-ic-twotone-production-quantity-limits',
    to: '/products',
  },
])

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
    <div class="w-384 max-h-screen bg-slate-800 flex flex-col items-center sticky top-0 left-0 z-50">
      <div class="p-4">
        <img
          src="/logo.svg"
          alt="Syns"
          class="min-w-16"
          width="70"
          height="70"
        >
      </div>

      <NuxtLink
        v-for="link in primarylinks"
        :key="link.to"
        :to="link.to"
        :aria-label="link.label"
        class="flex itens-center justify-center w-full py-5 text-gray-100 transition hover:bg-gray-100 hover:text-slate-800"
        active-class="bg-gray-100 text-slate-800"
      >
        <UIcon
          :name="link.icon"
          class="text-3xl"
        />
      </NuxtLink>
      <div class="flex-1" />
      <use-bussiness-select class="flex flex-col gap-2 py-2" />
      <NuxtLink
        v-for="link in secondaryLinks"
        :key="link.to"
        :to="link.to"
        :aria-label="link.label"
        class="flex itens-center justify-center w-full py-5 text-gray-100 transition hover:bg-gray-100 hover:text-slate-800"
        active-class="bg-gray-100 text-slate-800"
      >
        <UIcon
          :name="link.icon"
          class="text-3xl"
        />
      </NuxtLink>
    </div>
    <div class="w-full p-4 bg-gray-100">
      <div class="p-2 bg-white h-full rounded-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
