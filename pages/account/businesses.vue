<script setup lang="ts">
import { ModalBusiness, ModalBusinessObject } from '#components'

const { t } = useI18n({
  useScope: 'local',
})
const globalStore = useGlobalStore()
const modalStore = useModalStore()

const businessActions = [
  {
    tooltip: t('tooltips.editBusiness'),
    icon: 'i-ic-baseline-edit',
    onClick: () => modalStore.open(ModalBusiness, {
      preset: globalStore.user?.primaryBusiness,
      onSubmit: globalStore.getUser,
    }),
  },
]

const businessObjectActions = [
  {
    tooltip: t('tooltips.editEnterprise'),
    icon: 'i-ic-baseline-edit',
    onClick: () => modalStore.open(ModalBusinessObject, {
      preset: globalStore.user?.primaryBusinessObject,
      onSubmit: globalStore.getUser,
    }),
  },
]

const columns = computed(() => [
  {
    key: 'logo',
    label: t('columns.logo'),
  },
  {
    key: 'name',
    label: t('columns.name'),
  },
  {
    key: 'description',
    label: t('columns.description'),
  },
  {
    key: 'action',
  },
])
</script>

<template>
  <div class="space-y-2">
    <UCard>
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ t('titles.business') }}
        </h1>
      </template>
      <div class="flex items-start gap-2">
        <base-image
          :src="globalStore.user?.primaryBusiness?.image"
          width="100"
          height="100"
        />

        <div class="grid grid-cols-2 flex-1">
          <span class="font-bold text-2xl">{{ globalStore.user?.primaryBusiness?.name }}</span>
          <span class="justify-self-end">
            <base-action-bar :items="businessActions" />
          </span>
          <span class="font-bold">{{ t('view.description') }}:</span><span>{{ globalStore.user?.primaryBusiness?.description }}</span>
          <span class="font-bold">{{ t('view.createdAt') }}:</span><span><base-datetime :date="globalStore.user?.primaryBusiness?.createdAt" /></span>
        </div>
      </div>
    </UCard>
    <UCard v-if="globalStore.user?.primaryBusiness?.businessObjects.length! > 1">
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ t('titles.enterprises') }}
        </h1>
      </template>
      <UTable
        :rows="globalStore.user?.primaryBusiness?.businessObjects"
        :columns="columns"
      >
        <template #logo-data="{ row }">
          <base-image
            :src="row.image"
            width="50"
            height="50"
          />
        </template>
        <template #action-data="{ row }">
          <UButton
            v-show="globalStore.user?.primaryBusinessObject?.id !== row?.id"
            icon="i-ic-baseline-arrow-circle-right"
            size="sm"
            color="primary"
            variant="solid"
            :label="$t('default.forms.actions.select')"
            trailing
          />
          <!-- TODO -->
          <!-- @click="globalStore.user?.primaryBusinessObject = row" -->
        </template>
      </UTable>
    </UCard>
    <UCard>
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ t('titles.enterprise') }}
        </h1>
      </template>
      <div class="flex items-start gap-2">
        <base-image
          :src="globalStore.user?.primaryBusinessObject?.image"
          width="100"
          height="100"
        />

        <div class="grid grid-cols-2 flex-1">
          <span class="font-bold text-2xl">{{ globalStore.user?.primaryBusinessObject?.name }}</span>
          <span class="justify-self-end">
            <base-action-bar :items="businessObjectActions" />
          </span>
          <span class="font-bold">{{ t('view.description') }}:</span><span>{{ globalStore.user?.primaryBusinessObject?.description }}</span>
          <span class="font-bold">{{ t('view.createdAt') }}:</span><span><base-datetime :date="globalStore.user?.primaryBusinessObject?.createdAt" /></span>
        </div>
      </div>
    </UCard>
    <UCard>
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ t('titles.enterpriseSchedule') }}
        </h1>
      </template>

      <FormSchedule
        :schedule="globalStore.user?.primaryBusinessObject?.schedule"
        :bussiness-object-id="globalStore.user?.primaryBusinessObject?.id"
        @submit="globalStore.getUser"
      />
    </UCard>
    <UCard class="col-span-2">
      <template #header>
        <h1 class="text-3xl font-bold">
          {{ t('titles.enterpriseWeekends') }}
        </h1>
      </template>
      <FormCalendar
        :calendar="globalStore.user?.primaryBusinessObject?.calendar"
        :schedule="globalStore.user?.primaryBusinessObject?.schedule"
        :bussiness-object-id="globalStore.user?.primaryBusinessObject?.id"
        @submit="globalStore.getUser"
      />
    </UCard>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "view": {
      "createdAt":  "Date of creation",
      "description": "Description"
    },
    "tooltips": {
      "editBusiness": "Edit Business",
      "editEnterprise": "Edit Enterprise"
    },
    "columns": {
      "logo": "Logo",
      "name": "Name",
      "description": "Description"
    },
    "titles": {
      "business": "Current business",
      "enterprises": "Enterprises",
      "enterprise": "Current enterprise",
      "enterpriseSchedule": "Work schedule of the enterprise",
      "enterpriseWeekends": "Weekends and holidays of the enterprise"
    }
  },
  "uk-UK": {
    "view": {
      "createdAt": "Дата створення",
      "description": "Опис"
    },

    "tooltips": {
      "editBusiness": "Редагувати бізнес",
      "editEnterprise": "Редагувати підприємство"
    },
    "columns": {
      "logo": "Логотип",
      "name": "Ім'я",
      "description": "Опис"
    },
    "titles": {
      "business": "Поточний бізнес",
      "enterprises": "Підприємства",
      "enterprise": "Поточне підприємство",
      "enterpriseSchedule": "Графік роботи підприємства",
      "enterpriseWeekends": "Вихідні та святкові дні підприємства"

    }
  }
}
</i18n>