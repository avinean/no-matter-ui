<script setup>
import { ModalBussiness, ModalObject } from '#components'

const { baseUrl } = useRuntimeConfig().public
const globalStore = useGlobalStore()
const modalStore = useModalStore()

const bussinesses = computed(() => globalStore.user.bussinesses.map(bussiness => ({
  id: bussiness.id,
  label: bussiness.name,
  avatar: { src: `${baseUrl}/${bussiness.image}`, loading: 'lazy' },
})))

const bussinessObjects = computed(() => (globalStore.bussiness?.objects || []).map(object => ({
  object,
  id: object.id,
  label: object.name,
  avatar: { src: `${baseUrl}/${object.image}`, loading: 'lazy' },
})))

const bussiness = computed({
  get() {
    return bussinesses.value.find(b => b.id === globalStore.bussiness?.id)
  },
  set(value) {
    if (value.click)
      return value.click()
    globalStore.bussiness = globalStore.user.bussinesses.find(b => b.id === value.id)
  },
})

const object = computed({
  get() {
    return bussinessObjects.value.find(o => o.id === globalStore.object?.id)
  },
  set(value) {
    if (value.click)
      return value.click()
    globalStore.object = globalStore.bussiness?.objects.find(o => o.id === value.id)
  },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <UCommandPalette
      v-model="bussiness"
      :searchable="false"
      :groups="[
        {
          key: 'bussinesses',
          label: 'Оберіть бізнес',
          commands: bussinesses,
        },
        {
          key: 'actions',
          commands: [{
            label: 'Додати новий бізнес',
            icon: 'i-ic-outline-business-center',
            click: () => modalStore.open(ModalBussiness),
          }],
        },
      ]"
    />
    <UCommandPalette
      v-model="object"
      :searchable="false"
      :groups="[
        {
          key: 'bussinessObjects',
          label: 'Оберіть обʼєкт бізнесу',
          commands: bussinessObjects,
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
