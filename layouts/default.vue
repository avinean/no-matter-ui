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
  <div>
    <div class="flex flex-col min-h-screen">
      <UContainer class="w-full h-20 p-2">
        <img src="/logo.svg" class="h-full" alt="logo">
      </UContainer>
      <main class="w-full flex-1 flex">
        <UVerticalNavigation class="w-40" :links="links" />
        <UContainer class="flex-1">
          <slot />
        </UContainer>
      </main>
      <UContainer class="w-full h-20 p-2">
        <img src="/logo.svg" class="h-full" alt="logo">
      </UContainer>
    </div>
  </div>
</template>
