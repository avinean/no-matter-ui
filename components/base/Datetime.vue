<template>
  <span>{{ formattedDate }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
  date: Date | string;
  dateStyle?: "full" | "long" | "medium" | "short"
  timeStyle?: "full" | "long" | "medium" | "short"
}>()

const formattedDate = computed(() => new Intl.DateTimeFormat('uk', {
  dateStyle: props.dateStyle || 'medium',
  timeStyle: props.timeStyle,
}).format(new Date(props.date)))
</script>