<script setup lang="ts">
const globalStore = useGlobalStore()
const modalStore = useModalStore()
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="globalStore.object?.name" />
    <UNotifications />
    <UModal
      :model-value="!!modalStore.modals.length"
      :ui="{ width: 'sm:max-w-4xl' }"
      @close="modalStore.close"
    >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template
          v-for="(modal, key) in modalStore.modals"
          :key
        >
          <component
            :is="modal.component"
            v-show="key === modalStore.modals.length - 1"
            v-bind="modal.contentProps"
            @submit="modalStore.close"
          />
        </template>
      </UCard>
    </UModal>

    <UModals />
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
