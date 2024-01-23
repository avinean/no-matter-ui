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
      <div><base-datetime :date="Date()" /></div>
    </div>
  </div>
</template>