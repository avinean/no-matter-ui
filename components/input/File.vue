<template>
  <label
    :style="{ backgroundImage: `url(${imageUrl || src || '/placeholder.jpg'})`}"
    class="bg-cover bg-size bg-center cursor-pointer"
  >
    <input
      type="file"
      hidden
      @change="handleFileChange"
    >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Preview"
      style="max-width: 100%;"
    >
  </label>
</template>

<script setup lang="ts">
defineProps < {
  src?: string;
} > ();

const emit = defineEmits<{
  'change': [file: File];
}>();

const imageUrl = ref('');

function handleFileChange(event: Event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
      emit('change', file);
    };
    reader.readAsDataURL(file);
  }
}
</script>
