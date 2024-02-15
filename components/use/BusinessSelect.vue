<script setup lang="ts">
const globalStore = useGlobalStore()
const modalStore = useModalStore()

const ModalBusiness = resolveComponent('modal-business')
const ModalObject = resolveComponent('modal-object')

const businesses = computed(() => [
  [
    {
      label: 'Оберіть бізнес',
      disabled: true,
    },
  ],
  globalStore.user?.ownedBusinesses?.map(_business => ({
    label: _business.name,
    avatar: {
      src: _business.image,
    },
    class: globalStore.business === _business ? 'bg-gray-100' : '',
    click: () => {
      globalStore.business = _business
      globalStore.object = _business.businessObjects?.[0]
    },
  })) || [],
  [
    {
      label: 'Додати новий бізнес',
      icon: 'i-ic-outline-business-center',
      click: () => {
        modalStore.open(ModalBusiness, {
          onSubmit() {
            globalStore.getBusinesses()
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
  globalStore.business?.businessObjects?.map(_object => ({
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
            globalStore.getBusinesses()
          },
        })
      },
    },
  ],
])
</script>

<template>
  <div>
    <UDropdown :items="businesses" :popper="{ placement: 'bottom-start' }">
      <UAvatar :alt="globalStore.business?.name" size="md" />
    </UDropdown>
    <UDropdown :items="objects" :popper="{ placement: 'bottom-start' }">
      <UAvatar :alt="globalStore.object?.name" size="md" />
    </UDropdown>
  </div>
</template>
