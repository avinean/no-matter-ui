<script setup lang="ts">
const model = defineModel<string[]>({ default: () => [] })
const value = ref('')

function add() {
  const v = value.value.trim()
  if (!v || model.value.includes(v))
    return value.value = ''

  model.value = [...model.value, v]
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
        icon="i-ic-baseline-plus"
        color="gray"
        @click="add"
      />
    </UButtonGroup>
    <UBadge
      v-for="item in model"
      :key="item"
      variant="subtle"
      @click="remove(item)"
    >
      {{ item }}
      <UIcon name="i-ic-baseline-cancel" />
    </UBadge>
  </div>
</template>
