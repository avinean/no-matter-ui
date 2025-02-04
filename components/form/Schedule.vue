<script lang="ts" setup>
import type { ScheduleEntity } from '~/types/entities'
import type { FormError } from '#ui/types'

const props = defineProps<{
  schedule?: ScheduleEntity[]
  profileId?: number
  bussinessObjectId?: number
}>()

const emit = defineEmits<{
  submit: []
}>()

const { t } = useI18n({
  useScope: 'local',
})

const dayOfWeek = computed(() => ([
  t('daysOfWeek.sunday'),
  t('daysOfWeek.monday'),
  t('daysOfWeek.tuesday'),
  t('daysOfWeek.wednesday'),
  t('daysOfWeek.thursday'),
  t('daysOfWeek.friday'),
  t('daysOfWeek.saturday'),
]))

const schedule = ref<Partial<ScheduleEntity>[]>([1, 2, 3, 4, 5, 6, 0].map((day) => {
  const record = props.schedule?.find(r => r.dayOfWeek === day)
  return {
    id: record?.id,
    dayOfWeek: day as ScheduleEntity['dayOfWeek'],
    isWeekend: record?.isWeekend ?? false,
    start: record?.start || '08:00',
    end: record?.end || '16:00',
    offset: new Date().getTimezoneOffset(),
  }
}))

const columns = computed(() => [
  {
    key: 'isWeekend',
    label: t('columns.isWeekend'),
  },
  {
    key: 'day',
    label: t('columns.day'),
  },
  {
    key: 'period',
    label: t('columns.period'),
  },
])

function validateSchedule(state: Partial<ScheduleEntity>[]) {
  return state.map((row) => {
    if (!row.isWeekend && !row.start)
      return { path: `${row.dayOfWeek}period`, message: t('formValidation.required') }
    if (!row.isWeekend && !row.end)
      return { path: `${row.dayOfWeek}period`, message: t('formValidation.required') }
    // @ts-expect-error it is allowed
    if (!row.isWeekend && row.start > row.end)
      return { path: `${row.dayOfWeek}period`, message: t('formValidation.start') }
    return undefined
  }).filter(e => e !== undefined) as FormError[]
}

async function onUpdateSchedule() {
  if (props.profileId)
    await useProfileRepository().schedule(props.profileId, schedule.value)
  else if (props.bussinessObjectId)
    await useBusinessObjectRepository().schedule(props.bussinessObjectId, schedule.value)
  emit('submit')
}
</script>

<template>
  <UForm
    :state="schedule"
    :validate="validateSchedule"
    class="space-y-2 w-full"
    @submit="onUpdateSchedule"
  >
    <UTable
      :rows="schedule"
      :columns="columns"
    >
      <template #day-data="{ row }">
        <div class="flex items-center">
          <span class="text-lg font-bold">{{ dayOfWeek[row.dayOfWeek] }}</span>
        </div>
      </template>
      <template #period-data="{ row }">
        <UFormGroup :name="`${row.day}period`">
          <div class="flex gap-2">
            <UInput
              v-model="row.start"
              type="time"
              :disabled="row.isWeekend"
            />
            <UInput
              v-model="row.end"
              type="time"
              :disabled="row.isWeekend"
            />
          </div>
        </UFormGroup>
      </template>
      <template #isWeekend-data="{ row }">
        <UCheckbox v-model="row.isWeekend" />
      </template>
    </UTable>

    <UButton type="submit">
      {{ $t('default.forms.actions.save') }}
    </UButton>
  </UForm>
</template>

<i18n lang="json">
{
  "en-US": {
    "columns": {
      "isWeekend": "Weekend",
      "day": "Day of the week",
      "period": "Interval from-to"
    },
    "daysOfWeek": {
      "sunday": "Sunday",
      "monday": "Monday",
      "tuesday": "Tuesday",
      "wednesday": "Wednesday",
      "thursday": "Thursday",
      "friday": "Friday",
      "saturday": "Saturday"
    }
  },
  "uk-UK": {
    "columns": {
      "isWeekend": "Вихідний",
      "day": "День тижня",
      "period": "Проміжок від-до"
    },

    "daysOfWeek": {
      "sunday": "Неділя",
      "monday": "Понеділок",
      "tuesday": "Вівторок",
      "wednesday": "Середа",
      "thursday": "Четвер",
      "friday": "П'ятниця",
      "saturday": "Субота"
    }
  }
}
</i18n>
