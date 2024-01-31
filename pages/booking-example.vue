<script lang="ts" setup>
import type { ServiceProduct, User } from '#types/entities'

const search: {
  profile: User | undefined
  services: ServiceProduct[]
} = reactive({
  profile: undefined,
  services: [],
})

const { data: profiles } = useApi<User[]>(
  '/booking/profiles',
  { method: 'POST', body: search },
  { watch: [() => search.services] },
)
const { data: services } = useApi<ServiceProduct[]>(
  '/booking/services',
  { method: 'POST', body: search },
  { watch: [() => search.profile] },
)
</script>

<template>
  <UCard
    class="flex flex-col flex-1"
    :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
  >
    <template #header>
      <h1 class="text-3xl font-bold">
        Приклад букінга
      </h1>
    </template>

    <UForm
      ref="form"
      :state="search"
      class="space-y-2"
    >
      <UFormGroup
        label="Послуги"
        name="services"
        required
      >
        <USelectMenu
          v-model="search.services"
          :options="services || []"
          searchable
          searchable-placeholder="Шукайте за назвою або id"
          by="id"
          multiple
          selected-icon="i-ic-round-check"
          :search-attributes="['name', 'id']"
        >
          <template #option="{ option }">
            {{ option.name }}
          </template>
        </USelectMenu>
        <div class="flex gap-2 flex-wrap mt-2">
          <UBadge v-for="service in search.services" :key="service.name" :label="service.name" />
        </div>
      </UFormGroup>

      <UFormGroup
        label="Користувач"
        name="user"
        required
      >
        <USelectMenu
          v-model="search.profile"
          :options="profiles || []"
          searchable
          searchable-placeholder="Шукайте за іменем"
          by="id"
          selected-icon="i-ic-round-check"
          :search-attributes="['firstName', 'lastName']"
        >
          <template v-if="search.profile" #label>
            {{ search.profile?.firstName }} {{ search.profile?.lastName }}
          </template>
          <template #option="{ option }">
            {{ option.firstName }} {{ option.lastName }}
          </template>
        </USelectMenu>
      </UFormGroup>
    </UForm>
    {{
      form
    }}
  </UCard>
</template>
