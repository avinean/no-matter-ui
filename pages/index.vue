<script setup lang="ts">
function random() {
  return `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`
}
definePageMeta({
  middleware: 'requires-auth',
})
</script>

<template>
  <div class="grid grid-cols-2 grid-rows-10 gap-2">
    <UCard
      v-for="key in 10"
      :key
      :class="{ 'row-span-2': key % 2 }"
      :style="{ background: random() }"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam cupiditate temporibus iste qui quisquam dolorem, velit minima. Alias laborum quas pariatur adipisci quos repudiandae suscipit quisquam, architecto incidunt commodi. Aliquid.
    </UCard>
  </div>
</template>
