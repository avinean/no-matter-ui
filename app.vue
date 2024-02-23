<script setup lang="ts">
const globalStore = useGlobalStore()
const modalStore = useModalStore()
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="globalStore.object?.name" />
    <UNotifications />
    <UModal
      v-for="(modal, key) in modalStore.configs"
      :key="key"
      :model-value="true"
      :ui="{ width: 'sm:max-w-4xl' }"
      prevent-close
      @close="modalStore.close"
    >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex justify-between p-2">
            <h1 class="text-3xl font-bold">
              {{ 'title' in modal.component && modal.component.title }}
            </h1>
            <UButton
              :padded="false"
              color="gray"
              variant="link"
              icon="i-ic-twotone-close"
              @click="modalStore.close"
            />
          </div>
        </template>
        <component
          :is="modal.component"
          v-bind="modal.props"
          @submit="modalStore.close"
        />
      </UCard>
    </UModal>
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
