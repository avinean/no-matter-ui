<script setup>
import { ModalBusiness, ModalBusinessObject } from '#components'

const globalStore = useGlobalStore()
const modalStore = useModalStore()

defineExpose({
  title: 'Оберіть бізнес та підприємство',
})

async function selectBusiness(businessId) {
  globalStore.loading = true
  const { useAsPrimary } = useBusinessRepository()
  await useAsPrimary(businessId)
  await globalStore.getUser()
  globalStore.loading = false
}

async function selectBusinessObject(objectId) {
  globalStore.loading = true
  const { useAsPrimary } = useBusinessObjectRepository()
  await useAsPrimary(objectId)
  await globalStore.getUser()
  globalStore.loading = false
}

</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <div>
      <h3>Бізнеси</h3>
      <div class="space-y-1">
        <div
          v-for="business in globalStore.user.businesses"
          :key="business.id"
          class="flex items-center gap-2 cursor-pointer p-2 rounded-md"
          :class="{ 'bg-gray-100': business.id === globalStore.user.primaryBusiness.id }"
          @click="selectBusiness(business.id)"
        >
          <BaseImage
            :src="business.image"
            width="32"
          />
          <span>{{ business.name }}</span>
        </div>
        <UButton
          color="gray"
          icon="i-ic-outline-business-center"
          @click="modalStore.open(ModalBusiness)"
        >
          Додати бізнес
        </UButton>
      </div>
    </div>
    <div>
      <h3>Об'єкти</h3>
      <div class="space-y-1">
        <div
          v-for="object in globalStore.user.primaryBusiness.businessObjects"
          :key="object.id"
          class="flex items-center gap-2 cursor-pointer p-2 rounded-md"
          :class="{ 'bg-gray-100': object.id === globalStore.user.primaryBusinessObject?.id }"
          @click="selectBusinessObject(object.id)"
        >
          <BaseImage
            :src="object.image"
            width="32"
          />
          <span>{{ object.name }}</span>
        </div>
        <UButton
          color="gray"
          icon="i-ic-outline-maps-home-work"
          @click="modalStore.open(ModalBusinessObject)"
        >
          Додати об'єкт
        </UButton>
      </div>
    </div>
  </div>
</template>
