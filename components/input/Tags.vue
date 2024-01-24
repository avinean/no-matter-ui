<script setup lang="ts">
const model = defineModel<string[]>({ default: () => [] })
const value = ref('')

function add() {
  if (!value.value || model.value.includes(value.value))
    return value.value = ''

  model.value = [...model.value, value.value]
  value.value = ''
}

function remove(item: string) {
  model.value = model.value.filter(i => i !== item)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <UButtonGroup
      size="sm"
      orientation="horizontal"
      class="min-w-full"
    >
      <UInput
        v-model="value"
        class="w-full"
      />
      <UButton
        icon="i-heroicons-plus"
        color="gray"
        @click="add"
      />
    </UButtonGroup>
    <UBadge
      v-for="item in model"
      :key="item"
      @click="remove(item)"
    >
      {{ item }}
      <UIcon name="i-heroicons-x-mark" />
    </UBadge>
  </div>
</template>
