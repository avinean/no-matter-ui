<script setup lang="ts">
const store = useGlobalStore()
const { baseUrl } = useRuntimeConfig().public
const { t, locale } = useI18n()
const links = ref<Array<{ label: string, to?: string, icon?: string, click?: () => void, avatar?: { src: string } } | null>>([])

function updateLinks() {
  links.value = [
    {
      label: t('account.tabs.info'),
      to: '/account/info',
      avatar: {
        src: `${baseUrl}/${store.user?.image}`,
      },
    },
    {
      label: t('account.tabs.settings'),
      icon: 'i-ic-sharp-build',
      to: '/account/settings',
    },
    store.isAdmin
    && {
      label: t('account.tabs.access'),
      icon: 'i-ic-baseline-security',
      to: '/account/permissions',
    },
    {
      label: t('account.tabs.exit'),
      icon: 'i-ic-sharp-power-settings-new',
      click: () => {
        store.logout()
      },
    },
  ]
}

watch(locale, updateLinks)

updateLinks()
</script>

<template>
  <div class="space-y-2">
    <UHorizontalNavigation
      :links="links" class="border-b border-gray-200 dark:border-gray-800"
    />
    <NuxtPage />
  </div>
</template>
