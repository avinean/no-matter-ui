<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'global',
})

const locales = computed(() => [
  {
    locale: 'uk-UK',
    label: t('locale.locales.ua'),
    avatar: { src: '/flag/uk.png' },
  },
  {
    locale: 'en-US',
    label: t('locale.locales.en'),
    avatar: { src: '/flag/gb.png' },
  },
])

</script>

<template>
  <UFormGroup
      :label="t('locale.localeLabel')"
  >
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
  </UFormGroup>
</template>

