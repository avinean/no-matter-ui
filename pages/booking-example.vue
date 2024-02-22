<script lang="ts" setup>
import type { BookingEntity, ClientEntity, ProfileEntity, ServiceEntity } from '~/types/entities'
import { ConfirmationStatus } from '~/types/enums'

const search: {
  profile: ProfileEntity | undefined
  client: ClientEntity | undefined
  services: ServiceEntity[]
  date: Date
  duration: number
  comment: string
} = reactive({
  profile: undefined,
  client: undefined,
  services: [],
  date: new Date(new Date().setHours(0, 0, 0, 0)),
  duration: 0,
  comment: '',
})

const selectedSlot = ref<{ time: string, booked: BookingEntity } | null>(null)

const bookingRepository = useBookingRepository()

const { data: clients } = useAsyncData(() => useClientRepository().get())
const { data: profiles } = useAsyncData(
  () => bookingRepository.profiles(search),
  { watch: [() => search.services] },
)
const { data: services } = useAsyncData(
  () => bookingRepository.services(search),
  { watch: [() => search.profile] },
)
const { data: timeslots } = useAsyncData(
  () => bookingRepository.timeslots(search),
  { watch: [() => [search.profile, search.date, search.duration]] },
)

async function create() {
  await bookingRepository.add({
    ...search,
    services: search.services.map((service, i) => ({ quantity: i, service })),
    date: selectedSlot.value?.time,
  })
}
</script>

<template>
  <div class="flex flex-col flex-1">
    <h1 class="text-3xl font-bold">
      Приклад букінга
    </h1>

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
        <input-date v-model="search.date" />
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
          @click="selectedSlot = timeslot"
        >
          <base-datetime :date="timeslot.time" time-style="short" />
          <UTooltip v-if="timeslot.booked" :text="`${timeslot.booked.comment} ${timeslot.booked.date}`">
            <span>booked</span>
          </UTooltip>
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
          v-if="clients"
          v-model="search.client"
          :options="clients"
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
  </div>
</template>
