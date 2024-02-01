<script setup lang="ts">
defineProps<{
  src: string
  srcset?: string
  loading?: 'lazy' | 'eager'
  width: number | string
  height: number | string
}>()

const { baseUrl } = useRuntimeConfig().public
</script>

<template>
  <img
    v-bind="$props"
    :src="`${baseUrl}/${src}`"
  >
</template>
