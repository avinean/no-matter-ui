<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <UModal
      :model-value="!!modalStore.component"
      v-bind="modalStore.wrapperProps"
      @close="modalStore.close"
    >
      <component
        :is="modalStore.component"
        v-if="modalStore.component"
        v-bind="modalStore.contentProps"
        @submit="modalStore.close"
      />
    </UModal>
  </div>
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
