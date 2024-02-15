<template>
  <div class="flex min-h-screen">
    <div class="w-1/3 bg-slate-800 flex-col justify-center items-center hidden lg:flex">
      <img
        src="/logo.svg"
        alt="Syns"
      >
      <img
        class="mt-2"
        src="/textLogo.svg"
        alt="Syns"
      >
    </div>
    <div class="w-full lg:w-2/3 p-4 flex">
      <slot />
    </div>
  </div>
</template>
