
<script lang="ts" setup>
const store = useEntriesStore()

</script>
<template>
<div>
  <Calendar :events="store.events" />
</div>
</template>
