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
