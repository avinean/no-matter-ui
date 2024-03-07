<script setup lang="ts">
const { locale } = useI18n()

const locales = [
  {
    locale: 'uk-UK',
    label: 'Українська',
    avatar: { src: '/flag/uk.png' },
  },
  {
    locale: 'en-US',
    label: 'English',
    avatar: { src: '/flag/gb.png' },
  },
]
</script>

<template>
  <USelectMenu
    v-model="locale"
    :options="locales"
    value-attribute="locale"
    trailing-icon="i-ic-baseline-keyboard-arrow-down"
  >
    <template #leading>
      <UAvatar v-if="locale" :src="locales.find(_ => _.locale === locale)?.avatar.src" size="2xs" class="mx-0.5" />
    </template>
  </USelectMenu>
</template>
