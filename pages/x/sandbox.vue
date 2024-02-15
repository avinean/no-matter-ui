<script setup lang="ts">
const dateStyle = ref()
const timeStyle = ref()
const actions = [
  { tooltip: 'Редагувати профіль', icon: 'i-ic-baseline-edit' },
  { tooltip: 'Копіювати поточний пароль', icon: 'i-ic-baseline-content-copy' },
  { tooltip: 'Перегенерувати пароль', icon: 'i-ic-round-security' },
]
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
      <input-date :model-value="new dateStyle()" mode=""/>
    </div>
    <div>
      base-image
      <base-image src="''" width="100" height="100"/>
    </div>
    <div>
      base-datetime
      <USelect v-model="dateStyle" :options="['full', 'long', 'medium', 'short']" />
      <USelect v-model="timeStyle" :options="['full', 'long', 'medium', 'short']" />
      <div><base-datetime :date="Date()" :date-style="dateStyle" :time-style="timeStyle" /></div>
    </div>
    <div>
      base-action-bar
      <base-action-bar :items="actions" />
    </div>
  </div>
</template>
