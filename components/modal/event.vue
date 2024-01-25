<script lang="ts" setup>
import type { Event } from '#types/entities'

const props = defineProps<{
  preset: Event
}>()

const event: Partial<Event> = reactive({
  id: props.preset.id,
  price: props.preset.price,
  title: props.preset.title,
  description: props.preset.description,
  phone: props.preset.phone,
  firstName: props.preset.firstName,
  lastName: props.preset.lastName,
  start: props.preset.start,
  end: props.preset.end,
  approved: props.preset.approved,
  beenPaid: props.preset.beenPaid,
})
const pickerMode = ref('dateTime')
</script>

<template>
  <UCard
    class="flex flex-col flex-1"
    :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
  >
    <template #header>
      <h1 class="text-3xl font-bold">
        {{ props.preset.title }}
      </h1>
    </template>
    <UForm
      ref="form"
      :state="event"
      class="grid grid-cols-1  gap-y-2"
    >
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
        <UInput v-model="event.phone" type="tel" />
      </UFormGroup>
      <UFormGroup
        label="Дата від"
        name="start"
        required
      >
        <input-date v-model="event.start" :mode="pickerMode" />
      </UFormGroup>
      <UFormGroup
        label="Дата до"
        name="end"
        required
      >
        <input-date v-model="event.end" :mode="pickerMode" />
      </UFormGroup>
      <UFormGroup
        label="Заголовок"
        name="title"
        required
      >
        <UInput v-model="event.title" />
      </UFormGroup>

      <UFormGroup
        label="Нотатки"
        name="description"
        required
      >
        <UTextarea v-model="event.description" />
      </UFormGroup>
      <UFormGroup
        label="Підтверджено"
        name="approved"
      >
        <UToggle
          v-model="event.approved"
          :disabled="event.beenPaid && event.approved" color="lime"
        />
      </UFormGroup>
    </UForm>
    <template #footer>
      <div v-if="!event.approved || !event.beenPaid" class="flex justify-end gap-2">
        <UButton
          color="red"
          :loading
          @click="$refs.form.submit()"
        >
          Видалити запис
        </UButton>
        <UButton
          color="lime"
          :loading
          @click="$refs.form.submit()"
        >
          Оплата
        </UButton>
        <UButton
          :loading
          @click="$refs.form.submit()"
        >
          Зберегти
        </UButton>
      </div>
    </template>
  </UCard>
</template>
