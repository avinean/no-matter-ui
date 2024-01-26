<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <UModal :model-value="!!modalStore.component" @close="modalStore.close">
      <component
        :is="modalStore.component"
        v-if="modalStore.component"
        v-bind="modalStore.props"
        @submit="modalStore.close"
      />
    </UModal>
  </div>
</template>
