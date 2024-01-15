<script lang="ts" setup>
const store = useMaterialsStore()
store.get()
</script>

<template>
  <UCard>
    <template #header>
      <nuxt-link to="/users">
        Materials
      </nuxt-link>
    </template>
    <UTable :rows="[...store.items].splice(0,5)" />
  </UCard>
</template>
