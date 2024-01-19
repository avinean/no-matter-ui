<script setup>

const links = [
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-presentation-chart-bar',
      to: '/',
    },
    {
      label: 'Clients',
      icon: 'i-heroicons-identification',
      to: '/clients',
    },
    {
      label: 'Users',
      icon: 'i-heroicons-user-group',
      to: '/users',
    },
    {
      label: 'Materials',
      icon: 'i-heroicons-cube',
      to: '/materials',
    },
    {
      label: 'Services',
      icon: 'i-heroicons-scissors',
      to: '/services',
    },
    {
      label: 'Sign in',
      icon: 'i-heroicons-arrow-left-circle',
      to: '/auth/sign-in',
    },
  ],
  [
    {
      label: 'Examples',
      icon: 'i-heroicons-light-bulb',
      to: '/examples',
    },
    {
      label: 'Help',
      icon: 'i-heroicons-question-mark-circle',
      to: '/help',
    },
  ],
]
</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-384 max-h-screen py-6 px-4 bg-slate-800 flex flex-col items-center gap-4 sticky top-0">
      <img src="/logo.svg" alt="Syns" class="min-w-16" width="70" height="70">

      <template v-for="group, key in links" :key>
        <UButton
          v-for="link in group"
          :key="link.to"
          :to="link.to"
          :icon="link.icon"
          :aria-label="link.label"
          class="hover:bg-gray-400"
          activeClass="bg-gray-400"
          size="sm"
          color="gray"
          square
          variant="solid"
        />
        <div v-if="key < links.length -1" class="flex-1" />
      </template>
    </div>
    <div class="w-full p-4">
      <slot />
    </div>  
  </div>
</template>
