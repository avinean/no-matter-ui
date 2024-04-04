<script lang="ts" setup>
import type { EventEntity } from '~/types/entities'

const props = defineProps<{
  preset?: {
    eventInfo: EventEntity | null
    isEdit: boolean
  }
}>()

const pickerMode = ref('dateTime')

const event: any = reactive({
  id: props.preset?.eventInfo?.id,
  price: props.preset?.eventInfo?.price,
  title: props.preset?.eventInfo?.title,
  description: props.preset?.eventInfo?.description,
  phone: props.preset?.eventInfo?.phone,
  firstName: props.preset?.eventInfo?.firstName,
  lastName: props.preset?.eventInfo?.lastName,
  start: props.preset?.eventInfo?.start || '',
  end: props.preset?.eventInfo?.end,
  approved: props.preset?.eventInfo?.approved,
  beenPaid: props.preset?.eventInfo?.beenPaid,
  service: props?.preset?.eventInfo?.service || [],
  specialist: props?.preset?.eventInfo?.specialist,
  timeSlots: props?.preset?.eventInfo?.timeSlots || {},
})

const services: any = [
  { name: 'Стрижка', time: '2' },
  { name: 'Миття голови', time: '1' },
  { name: 'Покраска', time: '4' },
]
const specialistList: any = [
  { name: 'таня', id: '2' },
  { name: 'Галя', id: '1' },
  { name: 'Оксана', id: '4' },
]

const timeSlotsArray: any = [
  { from: '12:00', to: '15:00' },
  { from: '16:00', to: '18:00' },
]
function removeSelectedService(item: object) {
  // @ts-expect-error to fix
  event.service = event?.service?.filter(i => i?.name !== item?.name)
}

function addTimeSlot(item: object) {
  event.timeSlots = item
}
</script>

<template>
  <UForm
    :state="event"
    class="grid grid-cols-1  gap-y-2"
  >
    <h1 class="text-3xl font-bold">
      {{ props.preset?.isEdit ? props.preset?.eventInfo?.title : 'Новий запис' }}
    </h1>
    <UFormGroup
      label="Виберіть послугу"
      name="service"
      required
    >
      <USelectMenu
        v-model="event.service"
        searchable
        :options="services"
        multiple
        option-attribute="name"
      >
        <template #label>
          <UBadge
            v-for="item, i in event.service"
            :key="i"
            class="gap-2"
            @click="removeSelectedService(item)"
          >
            {{ item.name }}
            <UIcon name="i-ic-baseline-cancel" />
          </UBadge>
        </template>
      </USelectMenu>
    </UFormGroup>
    <UFormGroup
      v-if="event.service?.length"
      label="Виберіть спеціаліста"
      name="specialist"
      required
    >
      <USelect
        v-model="event.specialist"
        option-attribute="name"
        value-attribute="id"
        :options="specialistList"
      />
    </UFormGroup>
    <UFormGroup
      v-if="event.service?.length"
      label="~Загальна к-сть годин~"
    >
      <UBadge>
        {{ event?.service?.reduce((acc: any, service: any) => acc + parseInt(service.time, 10), 0) }}
      </UBadge>
    </UFormGroup>
    <UFormGroup
      label="Дата"
      name="start"
      required
    >
      <input-date
        v-model="event.start"
        :mode="pickerMode"
        :full-date="false"
      />
    </UFormGroup>
    <UFormGroup
      v-if="event.start"
      label="Виберіть вільні слоти спеціаліста на вибрану дату"
    >
      <div class="flex gap-2 items-center">
        <UBadge
          v-for="slot in timeSlotsArray"
          :key="`${slot.from}-${slot.to}`"
          class="cursor-pointer"
          :variant="event?.timeSlots?.from === slot?.from && event?.timeSlots?.to === slot?.to ? 'solid' : 'outline'"
          @click="addTimeSlot(slot)"
        >
          {{ slot.from }}
          -
          {{ slot.to }}
        </UBadge>
      </div>
    </UFormGroup>
    <div class="flex items-center gap-2">
      <UFormGroup
        label="Прізвище"
        name="lastName"
        required
        class="w-full"
      >
        <UInput v-model="event.lastName" />
      </UFormGroup>
      <UFormGroup
        label="Ім'я"
        name="firstName"
        required
        class="w-full"
      >
        <UInput v-model="event.firstName" />
      </UFormGroup>
    </div>
    <UFormGroup
      label="Телефон"
      name="phone"
      required
    >
      <UInput
        v-model="event.phone"
        type="tel"
      />
    </UFormGroup>

    <UFormGroup
      label="Заголовок"
      placeholder="123"
      name="title"
      required
    >
      <UInput
        v-model="event.title"
        placeholder="Стрижка + фарбування"
      />
    </UFormGroup>

    <UFormGroup
      label="Нотатки"
      name="description"
      required
    >
      <UTextarea v-model="event.description" />
    </UFormGroup>
    <UFormGroup
      v-if="preset?.isEdit"
      label="Підтверджено"
      name="approved"
    >
      <UToggle
        v-model="event.approved"
        :disabled="event.beenPaid && event.approved"
        color="lime"
      />
    </UFormGroup>

    <div
      v-if="!event.approved || !event.beenPaid"
      class="flex justify-end gap-2"
    >
      <UButton
        v-if="preset?.isEdit"
        color="red"
        type="submit"
      >
        Видалити запис
      </UButton>
      <UButton
        v-if="preset?.isEdit"
        color="lime"
        type="submit"
      >
        Оплата
      </UButton>
      <UButton
        type="submit"
      >
        Зберегти
      </UButton>
    </div>
  </UForm>
</template>
