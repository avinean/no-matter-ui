<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    index?: number
  }>(),
  {
    index: 0,
  },
)
const { configs, close } = useModalStore()
const modal = computed(() => configs[props.index])
const modalContent = ref<{ title: string, width: string } | null>(null)
</script>

<template>
  <UModal
    :model-value="!!modal"
    :ui="{ width: modalContent?.width || 'sm:max-w-4xl' }"
    prevent-close
    @close="close"
  >
    <UCard>
      <template #header>
        <div class="flex justify-between p-2">
          <h1 class="text-3xl font-bold">
            {{ modalContent?.title }}
          </h1>
          <UButton
            :padded="false"
            color="gray"
            variant="link"
            icon="i-ic-twotone-close"
            @click="close"
          />
        </div>
      </template>
      <component
        :is="modal?.component"
        ref="modalContent"
        v-bind="modal?.props"
        @close="close"
        @submit="close"
      />
    </UCard>
    <UseModal :index="index + 1" />
  </UModal>
</template>
