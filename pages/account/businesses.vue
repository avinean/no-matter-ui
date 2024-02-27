<script setup lang="ts">
const globalStore = useGlobalStore()

const actions = [
  { tooltip: 'Редагувати профіль', icon: 'i-ic-baseline-edit', onClick: () => { } },
  { tooltip: 'Копіювати поточний пароль', icon: 'i-ic-baseline-content-copy' },
  { tooltip: 'Перегенерувати пароль', icon: 'i-ic-round-security' },
]

const columns = computed(() => [
  {
    key: 'logo',
    label: 'Логотип',
  },
  {
    key: 'name',
    label: 'Назва',
  },
  {
    key: 'description',
    label: 'Опис',
  },
  {
    key: 'action',
  },
])
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-2">
    <div class="space-y-2">
      <UCard :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h1 class="text-3xl font-bold">
            Поточний бізнес
          </h1>
        </template>
        <div class="flex items-start gap-2">
          <base-image :src="globalStore.business?.image" width="100" height="100" />

          <div class="grid grid-cols-2 flex-1">
            <span class="font-bold text-2xl">{{ globalStore.business?.name }}</span>
            <span class="justify-self-end">
              <base-action-bar :items="actions" />
            </span>
            <span class="font-bold">Опис:</span><span>{{ globalStore.business?.description }}</span>
            <span class="font-bold">Дата створення:</span><span><base-datetime :date="globalStore.business?.createdAt" /></span>
          </div>
        </div>
      </UCard>
      <UCard :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h1 class="text-3xl font-bold">
            Підприємства
          </h1>
        </template>
        <UTable :rows="globalStore.business?.businessObjects" :columns="columns">
          <template #logo-data="{ row }">
            <base-image :src="row.image" width="50" height="50" />
          </template>
          <template #action-data="{ row }">
            <UButton
              icon="i-ic-baseline-arrow-circle-right"
              size="sm"
              color="primary"
              variant="solid"
              label="Обрати"
              trailing
              @click="globalStore.object = row"
            />
          </template>
        </UTable>
      </UCard>
    </div>
    <div class="space-y-2">
      <UCard :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h1 class="text-3xl font-bold">
            Поточне підприємство
          </h1>
        </template>
        <div class="flex items-start gap-2">
          <base-image :src="globalStore.object?.image" width="100" height="100" />

          <div class="grid grid-cols-2 flex-1">
            <span class="font-bold text-2xl">{{ globalStore.object?.name }}</span>
            <span class="justify-self-end">
              <base-action-bar :items="actions" />
            </span>
            <span class="font-bold">Опис:</span><span>{{ globalStore.object?.description }}</span>
            <span class="font-bold">Дата сворення:</span><span><base-datetime :date="globalStore.object?.createdAt" /></span>
          </div>
        </div>
      </UCard>
      <UCard :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h1 class="text-3xl font-bold">
            Графік роботи підприємства
          </h1>
        </template>

        <FormSchedule
          :schedule="globalStore.object?.schedule"
          :bussiness-object-id="globalStore.object?.id"
          @submit="globalStore.getUser"
        />
      </UCard>
    </div>
  </div>
</template>
