<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <img :src="src || '/default-img.png'">
</template>
