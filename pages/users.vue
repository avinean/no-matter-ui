<script lang="ts" setup>
const store = useUsersStore()
store.get()
</script>

<template>
  <UCard>
    <h2>Users</h2>
    <UTable :rows="store.items" />
  </UCard>
</template>
