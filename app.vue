<script setup lang="ts">
const globalStore = useGlobalStore()
</script>

<template>
  <NuxtLayout>
    <BaseLoader v-model="globalStore.loading" />
    <NuxtPage :key="globalStore.object?.name" />
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
</style>
