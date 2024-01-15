<script lang="ts" setup>
const store = useUsersStore()
store.get()
</script>

<template>
  <UCard>
    <template #header>
      <nuxt-link to="/users">
      Total Users: {{ store.items.length }}
      </nuxt-link>
    </template>
    <UTable :rows="[...store.items].splice(0,5)" />
  </UCard>
</template>
