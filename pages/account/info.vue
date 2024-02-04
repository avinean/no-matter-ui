<script setup lang="ts">
const store = useGlobalStore()
</script>

<template>
  <div class="space-y-2">
    <div class="flex gap-2">
      <base-image :src="store.user.image" width="200" height="200" />
    </div>
    <div class="flex gap-2">
      <div class="font-bold min-w-40">
        Імʼя:
      </div>
      <div>{{ store.user.firstName }} {{ store.user.lastName }} ({{ store.user.sex }})</div>
    </div>
    <div class="flex gap-2">
      <div class="font-bold min-w-40">
        День народження:
      </div>
      <base-datetime :date="store.user.birthday" />
    </div>
    <div class="flex gap-2">
      <div class="font-bold min-w-40">
        Контакти:
      </div>
      <div>{{ store.user.email }}, {{ store.user.phone }}</div>
    </div>
    <div class="flex gap-2">
      <div class="font-bold min-w-40">
        Ролі:
      </div>
      <div class="flex gap-2 flex-wrap">
        <UBadge v-for="role in store.user.roles.split(',')" :key="role" :label="role" />
      </div>
    </div>
    <div v-if="store.user.services" class="flex gap-2">
      <div class="font-bold min-w-40">
        Сервіси:
      </div>
      <div class="flex gap-2 flex-wrap">
        <UBadge v-for="service in store.user.services" :key="service.name" :label="service" />
      </div>
    </div>
  </div>
</template>
