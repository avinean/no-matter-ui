<script lang="ts" setup>
import type { Booking, Client, ServiceProduct, User } from '#types/entities'

const search: {
  profile: User | undefined
  client: Client | undefined
  services: ServiceProduct[]
  date: Date
  duration: number
  comment: string
} = reactive({
  profile: undefined,
  client: undefined,
  services: [],
  date: new Date().setHours(0, 0, 0, 0),
  duration: 0,
  comment: '',
})

const selectedSlot = ref<string | null>(null)

const { data: bookings } = useApi<Booking[]>('/booking')
const { data: profiles } = useApi<User[]>(
  '/booking/profiles',
  { method: 'POST', body: search },
  { watch: [() => search.services] },
)
const { data: clients } = useApi<Client[]>('/clients')
const { data: services } = useApi<ServiceProduct[]>(
  '/booking/services',
  { method: 'POST', body: search },
  { watch: [() => search.profile] },
)
const { data: timeslots } = useApi<any[]>(
  '/booking/timeslots',
  { method: 'POST', body: search },
  { watch: [() => [search.profile, search.date, search.duration]] },
)

function create() {
  $api('/booking', {
    method: 'POST',
    body: search,
  })
}

function selectTimeslot(timeslot: string) {
  selectedSlot.value = timeslot
  search.date = new Date(timeslot)
}
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
      :state="search"
      class="space-y-2"
      @submit="create"
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
        label="Виконавець"
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

      <UFormGroup
        label="Дата"
        name="date"
        required
      >
        <input-date v-model="search.date">
          <template #display="props">
            <base-datetime v-bind="props" date-style="full" time-style="short" />
          </template>
        </input-date>
      </UFormGroup>

      <UFormGroup
        label="Тривалість"
        name="duration"
        required
      >
        <UInput v-model="search.duration" type="number" />
      </UFormGroup>
      <div class="flex gap-2 flex-wrap mt-2">
        <UButton
          v-for="timeslot in timeslots"
          :key="timeslot" size="2xs"
          :color="selectedSlot === timeslot ? 'primary' : 'gray'"
          @click="selectTimeslot(timeslot)"
        >
          <base-datetime :date="timeslot" time-style="short" />
        </UButton>
      </div>

      <UFormGroup
        label="Коментар"
        name="comment"
      >
        <UTextarea v-model="search.comment" />
      </UFormGroup>

      <UFormGroup
        label="Замовник"
        name="client"
        required
      >
        <USelectMenu
          v-model="search.client"
          :options="clients || []"
          searchable
          searchable-placeholder="Шукайте за іменем"
          by="id"
          selected-icon="i-ic-round-check"
          :search-attributes="['firstName', 'lastName']"
        >
          <template v-if="search.client" #label>
            {{ search.client?.firstName }} {{ search.client?.lastName }}
          </template>
          <template #option="{ option }">
            {{ option.firstName }} {{ option.lastName }}
          </template>
        </USelectMenu>
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>

    <div v-if="bookings" class="py-4">
      <UTable :rows="bookings">
        <template #date-data="{ row }">
          <base-datetime :date="row.date" />
        </template>
        <template #createdAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #updatedAt-data="{ row }">
          <base-datetime :date="row.createdAt" />
        </template>
        <template #status-data="{ row }">
          <UBadge v-if="row.status" color="green" variant="solid">
            активний
          </UBadge>
          <UBadge v-else color="gray" variant="solid">
            неактивний
          </UBadge>
        </template>
        <template #services-data="{ row }">
          <template v-for="service in row.services" :key="service.id">
            {{ service.name }},
          </template>
        </template>
        <template #profile-data="{ row }">
          {{ row.profile.firstName }} {{ row.profile.lastName }}
        </template>
        <template #client-data="{ row }">
          {{ row.client.firstName }} {{ row.client.lastName }}
        </template>
        <!-- <template #actions-data="{ row }">
          <UDropdown :items="menu(row)">
            <UButton color="gray" variant="ghost" icon="i-ic-outline-more-horiz" />
          </UDropdown>
        </template> -->
      </UTable>
    </div>
  </UCard>
</template>
