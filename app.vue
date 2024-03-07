<script setup lang="ts">
const globalStore = useGlobalStore()
</script>

<template>
  <NuxtLayout>
    <BaseLoader  v-if="globalStore.loading" />
    <NuxtPage :key="globalStore.object?.name" />
    <UNotifications />
    <ClientOnly>
      <UseModal />
    </ClientOnly>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
