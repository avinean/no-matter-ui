<script lang="ts" setup>
import type { User } from '#types/entities';

const { data, pending, error, refresh } = useApi<User[]>('/users')
</script>

<template>
  <UNotification
    v-if="error"
    title="Something went erong! Try to refresh the page"
    :id="2"
    class="mb-2"
    :timeout="0"
    :actions="[{ label: 'Refresh', click: refresh }]"
    :callback="refresh"
  />
  <UCard>
    <h2>Users</h2>
    <UTable :rows="data || []" :loading="pending" />
  </UCard>
</template>
