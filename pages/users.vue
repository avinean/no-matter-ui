<script lang="ts" setup>

const { data, pending } = await useFetch<{ [key: string]: any }[]>('/api/users', {
  headers: {
    Authorization: `Bearer ${useCookie('sraka').value}`,
  },
})
</script>

<template>
  <div v-if="pending">
    pending
  </div>
  <UTable v-else :rows="data" />
</template>
