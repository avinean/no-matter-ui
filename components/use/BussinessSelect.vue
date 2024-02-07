<script setup lang="ts">
const globalStore = useGlobalStore()
const modalStore = useModalStore()

const ModalBussiness = resolveComponent('modal-bussiness')
const ModalObject = resolveComponent('modal-object')

const bussinesses = computed(() => [
  [
    {
      label: 'Оберіть бізнес',
      disabled: true,
    },
  ],
  globalStore.user?.bussinesses?.map(_bussiness => ({
    label: _bussiness.name,
    avatar: {
      src: _bussiness.image,
    },
    class: globalStore.bussiness === _bussiness ? 'bg-gray-100' : '',
    click: () => {
      globalStore.bussiness = _bussiness
      globalStore.object = _bussiness.objects?.[0]
    },
  })) || [],
  [
    {
      label: 'Додати новий бізнес',
      icon: 'i-ic-outline-business-center',
      click: () => {
        modalStore.open(ModalBussiness, {
          onSubmit() {
            globalStore.getBussinesses()
          },
        })
      },
    },
  ],
])

const objects = computed(() => [
  [
    {
      label: 'Оберіть обʼєкт бізнесу',
      disabled: true,
    },
  ],
  globalStore.bussiness?.objects?.map(_object => ({
    label: _object.name,
    avatar: {
      src: _object.image,
    },
    class: globalStore.object === _object ? 'bg-gray-100' : '',
    click: () => {
      globalStore.object = _object
    },
  })) || [],
  [
    {
      label: 'Додати новий обʼєкт бізнесу',
      icon: 'i-ic-baseline-business',
      click: () => {
        modalStore.open(ModalObject, {
          onSubmit() {
            globalStore.getBussinesses()
          },
        })
      },
    },
  ],
])
</script>

<template>
  <div>
    <UDropdown v-if="globalStore.config.allowSeeBussinessSelector" :items="bussinesses" :popper="{ placement: 'bottom-start' }">
      <UAvatar :alt="globalStore.bussiness?.name" size="md" />
    </UDropdown>
    <UDropdown v-if="globalStore.config.allowSeeObjectSelector" :items="objects" :popper="{ placement: 'bottom-start' }">
      <UAvatar :alt="globalStore.object?.name" size="md" />
    </UDropdown>
  </div>
</template>
