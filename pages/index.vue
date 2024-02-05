<template>
  <div class="grid grid-cols-2 grid-rows-10 gap-2">
    <UCard
      v-for="key in 10"
      :key
      :class="{ 'row-span-2': key % 2 }"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam cupiditate temporibus iste qui quisquam dolorem, velit minima. Alias laborum quas pariatur adipisci quos repudiandae suscipit quisquam, architecto incidunt commodi. Aliquid.
    </UCard>
  </div>
</template>
