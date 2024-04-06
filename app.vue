<script setup lang="ts">
const globalStore = useGlobalStore()
</script>

<template>
  <NuxtLayout>
    <BaseLoader v-model="globalStore.loading" />
    <NuxtPage :key="globalStore.user?.primaryBusinessObject.id" />
    <UNotifications />
    <ClientOnly>
      <UseModal />
    </ClientOnly>
  </NuxtLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

h1 {
    @apply text-2xl font-bold mb-4;
}
h2 {
    @apply text-xl font-bold mb-4;
}
h3 {
    @apply text-lg font-bold mb-4;
}
h4 {
    @apply text-base font-bold mb-4;
}
</style>
