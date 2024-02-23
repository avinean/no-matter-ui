<script lang="ts" setup>
import type { BookingEntity, ClientEntity, OrderProductsEntity, ProfileEntity, ServiceEntity } from '~/types/entities'

defineOptions({
  title: `Забронювати`,
})

const props = defineProps<{
  preset?: BookingEntity | null
}>()

const emit = defineEmits<{
  submit: []
}>()

const search: Partial<BookingEntity> = reactive({
  profile: props.preset?.profile,
  client: props.preset?.client,
  services: props.preset?.services || [],
  date: props.preset?.date || new Date(new Date().setHours(0, 0, 0, 0)),
  duration: props.preset?.duration || 0,
  comment: props.preset?.comment || '',
})

const { add, edit, ...bookingRepository } = useBookingRepository()

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

const orderProducts = computed({
  get() {
    return search.services?.map(({ service }) => service?.id)
  },
  set(ids) {
    if (!services.value)
      return
    search.services = ids?.map<Partial<OrderProductsEntity>>(id => ({
      service: services.value?.find(({ id: serviceId }) => serviceId === id),
      quantity: search.services?.find(({ service }) => service?.id === id)?.quantity || 1,
    }))
  },
})

const columns = [
  {
    key: 'name',
    label: 'Назва',
  },
  {
    key: 'description',
    label: 'Опис',
  },
  {
    key: 'duration',
    label: 'Тривалість',
  },
  {
    key: 'quantity',
    label: 'Кількість',
  },
]

const selectedSlot = ref<{ time: string, booked: BookingEntity } | null>(null)

async function create() {
  await (props.preset?.id
    ? edit(props.preset?.id, {
      ...search,
      date: selectedSlot.value?.time,
    })
    : add({
      ...search,
      date: selectedSlot.value?.time,
    }))

  emit('submit')
}
</script>

<template>
  <UForm
    :state="search"
    class="grid gap-y-2"
    @submit="create"
  >
    <UFormGroup
      label="Послуги"
      name="services"
    >
      <USelectMenu
        v-if="services"
        v-model="orderProducts"
        :options="services"
        multiple
        searchable
        option-attribute="name"
        value-attribute="id"
        selected-icon="i-ic-round-check"
      />

      <UTable v-if="search.services?.length" :rows="search.services" :columns="columns">
        <template #name-data="{ row }">
          {{ row.service.name }}
        </template>
        <template #description-data="{ row }">
          {{ row.service.description }}
        </template>
        <template #duration-data="{ row }">
          {{ row.service.duration }}
        </template>
        <template #quantity-data="{ row }">
          <UInput v-model="row.quantity" type="number" />
        </template>
      </UTable>
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
</template>
