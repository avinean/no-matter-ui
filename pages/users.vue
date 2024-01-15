<script lang="ts" setup>
const store = useUsersStore()
store.get()
</script>

<template>
  <UTable :rows="store.items" />
</template>
