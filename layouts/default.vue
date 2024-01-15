<script setup>
const links = [
  [
{
      label: 'Installation',
      icon: 'i-heroicons-home',
      to: '/getting-started/installation'
    }, {
      label: 'Vertical Navigation',
      icon: 'i-heroicons-chart-bar',
      to: '/navigation/vertical-navigation'
    }, {
      label: 'Command Palette',
      icon: 'i-heroicons-command-line',
      to: '/navigation/command-palette'
    },
    {
      label: 'Sign in page',
      icon: 'i-heroicons-command-line',
      to: '/sign-in'
    }
  ],
  [
    {
      label: 'Examples',
      icon: 'i-heroicons-light-bulb',
      to: '/getting-started/examples#verticalnavigation'
    },
    {
      label: 'Help',
      icon: 'i-heroicons-question-mark-circle',
      to: '/getting-started/examples'
    }
  ]
]
</script>



<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <UContainer class="w-full h-20 bg-primary">
        footer
      </UContainer>
    <main class="w-full flex-1 flex">
      <div class="w-40">
        <UVerticalNavigation :links="links" />
      </div>
      <UContainer class="flex-1">
        <NuxtPage />
      </UContainer>
    </main>
      <UContainer class="w-full h-20 bg-primary">
        footer
      </UContainer>
    </div>
  </div>
</template>