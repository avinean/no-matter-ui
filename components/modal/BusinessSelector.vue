<script setup>
import { ModalBusiness, ModalObject } from '#components'

const { baseUrl } = useRuntimeConfig().public
const globalStore = useGlobalStore()
const modalStore = useModalStore()

const businesses = computed(() => globalStore.user.businesses.map(business => ({
  id: business.id,
  label: business.name,
  avatar: { src: `${baseUrl}/${business.image}`, loading: 'lazy' },
})))

const businessObjects = computed(() => (globalStore.business?.objects || []).map(object => ({
  object,
  id: object.id,
  label: object.name,
  avatar: { src: `${baseUrl}/${object.image}`, loading: 'lazy' },
})))

const business = computed({
  get() {
    return businesses.value.find(b => b.id === globalStore.business?.id)
  },
  set(value) {
    if (value.click)
      return value.click()
    globalStore.business = globalStore.user.businesses.find(b => b.id === value.id)
  },
})

const object = computed({
  get() {
    return businessObjects.value.find(o => o.id === globalStore.object?.id)
  },
  set(value) {
    if (value.click)
      return value.click()
    globalStore.object = globalStore.business?.objects.find(o => o.id === value.id)
  },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <UCommandPalette
      v-model="business"
      :searchable="false"
      :groups="[
        {
          key: 'businesses',
          label: 'Оберіть бізнес',
          commands: businesses,
        },
        {
          key: 'actions',
          commands: [{
            label: 'Додати новий бізнес',
            icon: 'i-ic-outline-business-center',
            click: () => modalStore.open(ModalBusiness),
          }],
        },
      ]"
    />
    <UCommandPalette
      v-model="object"
      :searchable="false"
      :groups="[
        {
          key: 'businessObjects',
          label: 'Оберіть обʼєкт бізнесу',
          commands: businessObjects,
        },
        {
          key: 'objectActions',
          commands: [{
            label: 'Додати новий обʼєкт',
            icon: 'i-ic-baseline-business',
            click: () => modalStore.open(ModalObject),
          }],
        },
      ]"
    />
  </div>
</template>
