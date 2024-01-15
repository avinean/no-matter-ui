<template>
<pre>
  <UTable :rows="data" />
</pre>
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = await useFetch('/api/users', {
  headers: {
    Authorization: `Bearer ${useCookie('sraka').value}`
  }
})
onMounted(() => {
  console.log(data.value)
})
</script>