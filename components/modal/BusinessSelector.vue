<script setup>
const { t } = useI18n({
  useScope: 'local',
})

import { ModalBusiness, ModalBusinessObject } from '#components'

const globalStore = useGlobalStore()
const modalStore = useModalStore()



defineExpose({
  title: t('titles.general'),
})

async function selectBusiness(businessId) {
  const { useAsPrimary } = useBusinessRepository()
  await useAsPrimary(businessId)
}

async function selectBusinessObject(objectId) {
  const { useAsPrimary } = useBusinessObjectRepository()
  await useAsPrimary(objectId)
}

</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <div>
      <h3>{{ t('titles.businesses') }}</h3>
      <div class="space-y-1">
        <div
          v-for="business in globalStore.user.businesses"
          :key="business.id"
          class="flex items-center gap-2 cursor-pointer p-2 rounded-md mb-3"
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
          {{ t('addBusiness') }}
        </UButton>
      </div>
    </div>
    <div>
      <h3>{{ t('titles.objects') }}</h3>
      <div class="space-y-1">
        <div
          v-for="object in globalStore.user.primaryBusiness.businessObjects"
          :key="object.id"
          class="flex items-center gap-2 cursor-pointer p-2 rounded-md mb-3"
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
          {{ t('addObjects') }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "titles": {
      "general": "Select a business and an enterprise",
      "businesses": "Businesses",
      "objects": "Objects"

    },
    "addBusiness": "Add new business",
    "addObjects": "Add new object"
  },
  "uk-UK": {
    "titles": {
      "general":  "Оберіть бізнес та підприємство",
      "businesses": "Бізнеси",
      "objects": "Об'єкти"

    },
    "addBusiness":  "Додати бізнес",
    "addObjects":  "Додати об'єкт"
  }
}
</i18n>