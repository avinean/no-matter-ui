<script setup lang="ts">
const store = useGlobalStore()
const toast = useToast()

const bussinesses = computed(() => [
  [
    {
      label: 'Оберіть бізнес',
      disabled: true,
    },
  ],
  store.user?.bussinesses?.map(_bussiness => ({
    label: _bussiness.name,
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4',
    },
    class: store.bussiness === _bussiness ? 'bg-gray-100' : '',
    click: () => {
      store.bussiness = _bussiness
      store.object = _bussiness.objects?.[0]
    },
  })) || [],
  [
    {
      label: 'Додати новий бізнес',
      icon: 'i-ic-outline-business-center',
      click: () => {
        toast.add({
          title: 'Помилка',
          description: 'Цей функціонал ще не доступний',
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
  store.bussiness?.objects?.map(_object => ({
    label: _object.name,
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4',
    },
    class: store.object === _object ? 'bg-gray-100' : '',
    click: () => {
      store.object = _object
    },
  })) || [],
  [
    {
      label: 'Додати новий обʼєкт бізнесу',
      icon: 'i-ic-baseline-business',
      click: () => {
        toast.add({
          title: 'Помилка',
          description: 'Цей функціонал ще не доступний',
        })
      },
    },
  ],
])
</script>

<template>
  <div>
    <UDropdown :items="bussinesses" :popper="{ placement: 'bottom-start' }">
      <UAvatar :alt="store.bussiness?.name" size="md" />
    </UDropdown>
    <UDropdown :items="objects" :popper="{ placement: 'bottom-start' }">
      <UAvatar :alt="store.object?.name" size="md" />
    </UDropdown>
  </div>
</template>
