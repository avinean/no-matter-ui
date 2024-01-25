<script setup lang="ts">
const dateStyle = ref()
const timeStyle = ref()
</script>

<template>
  <div class="space-y-8">
    <div>
      input-tags
      <input-tags />
    </div>
    <div>
      input-file
      <input-file class="block w-40 h-40" />
    </div>
    <div>
      input-date
      <input-date />
    </div>
    <div>
      base-image
      <base-image />
    </div>
    <div>
      base-datetime
      <USelect v-model="dateStyle" :options="['full', 'long', 'medium', 'short']" />
      <USelect v-model="timeStyle" :options="['full', 'long', 'medium', 'short']" />
      <div><base-datetime :date="Date()" :date-style="dateStyle" :time-style="timeStyle" /></div>
    </div>
  </div>
</template>
