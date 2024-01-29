<script setup>
const links = [
  [
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
    {
      label: 'Матеріали',
      icon: 'i-ic-baseline-arrow-right',
      to: '/materials',
    },
    {
      label: 'Послуги',
      icon: 'i-ic-baseline-design-services',
      to: '/services',
    },
    {
      label: 'Товари',
      icon: 'i-ic-twotone-production-quantity-limits',
      to: '/products',
    },
    {
      label: 'Sign in',
      icon: 'i-ic-baseline-arrow-right',
      to: '/auth/sign-in',
    },
  ],
  [
    {
      label: 'Examples',
      icon: 'i-ic-baseline-help',
      to: '/examples',
    },
    {
      label: 'Help',
      icon: 'i-ic-baseline-arrow-right',
      to: '/help',
    },
  ],
]
</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-384 max-h-screen bg-slate-800 flex flex-col items-center sticky top-0">
      <div class="p-4">
        <img
          src="/logo.svg"
          alt="Syns"
          class="min-w-16"
          width="70"
          height="70"
        >
      </div>

      <template
        v-for="group, key in links"
        :key
      >
        <NuxtLink
          v-for="link in group"
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
        <div
          v-if="key < links.length - 1"
          class="flex-1"
        />
      </template>
    </div>
    <div class="w-full p-4 bg-gray-100">
      <div class="p-2 bg-white h-full rounded-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
