<script lang="ts" setup>
const store = useMaterialsStore()
store.getTransactions()
</script>

<template>
  <UCard>
    <template #header>
      <nuxt-link to="/users">
        Material transactions
      </nuxt-link>
    </template>
    <UTable :rows="[...store.transactions].splice(0,5)" />
  </UCard>
</template>
