<script lang="ts" setup>
import { Calendar } from 'v-calendar'
import type { BusinessObjectEntity, CalendarEntity, ProfileEntity, ScheduleEntity } from '~/types/entities'
import { DayType } from '~/types/enums'
import type { Props } from '~/types/utils'

type CalendarProps = Props<typeof Calendar>

const props = defineProps<{
  calendar?: CalendarEntity[]
  schedule?: ScheduleEntity[]
  profileId?: number
  bussinessObjectId?: number
}>()

const emit = defineEmits<{
  submit: []
}>()

const colors: Record<DayType, string> = {
  [DayType.workingDay]: 'red',
  [DayType.vacation]: 'purple',
  [DayType.sickLeave]: 'yellow',
  [DayType.holiday]: 'green',
  [DayType.companyHoliday]: 'blue',
  [DayType.dayOff]: 'grey',
  [DayType.stateHoliday]: 'bg-red-700',
}

const attributes = computed<CalendarProps['attributes']>(() => [
  {
    highlight: {
      color: 'gray',
      fillMode: 'light',
    },
    popover: {
      label: 'Вихідний день',
    },
    dates: [
      {
        repeat: {
          weekdays: props.schedule
            ?.map(({ isWeekend, dayOfWeek }) => isWeekend ? dayOfWeek + 1 : undefined)
            .filter(e => e !== undefined) as [], //  as [] needs because of filter
        },
      },
    ],
  },
  ...(props.calendar?.map(item => ({
    dot: true,
    popover: {
      label: item.type === DayType.workingDay ? `ʼ${item.comment} (${item.start} - ${item.end})` : item.comment,
    },
    highlight: {
      color: colors[item.type],
      fillMode: 'light',
      // @ts-expect-error number is expected
    } as CalendarProps['attributes'][number]['highlight'],
    dates: [{
      start: item.from,
      end: item.to,
    }],
  })) || []),
])

const state: Partial<CalendarEntity> = reactive({
  type: DayType.vacation,
  comment: '',
  from: new Date(),
  to: new Date(),
  start: '08:00',
  end: '16:00',
  offset: new Date().getTimezoneOffset(),
  profile: props.profileId ? { id: props.profileId } as ProfileEntity : undefined,
  businessObject: props.bussinessObjectId ? { id: props.bussinessObjectId } as BusinessObjectEntity : undefined,
})

function validate() {
  return []
}

async function onUpdateSchedule() {
  if (props.profileId)
    await useProfileRepository().calendar(props.profileId, state)
  else if (props.bussinessObjectId)
    await useBusinessObectRepository().calendar(props.bussinessObjectId, state)
  emit('submit')
}
</script>

<template>
  <div class="grid lg:grid-cols-[1fr,1fr] gap-2">
    <UForm
      :state="state"
      :validate="validate"
      class="space-y-2"
      @submit="onUpdateSchedule"
    >
      <UFormGroup :label="$t('account.calendar.form.labels.type')" name="type" required>
        <USelect
          v-model="state.type"
          :options="Object.values(DayType).map((value) => ({
            label: $t(`enums.dayType.${value}`),
            value,
          }))"
        />
      </UFormGroup>
      <UFormGroup :label="$t('account.calendar.form.labels.comment')" name="comment">
        <UTextarea v-model="state.comment" />
      </UFormGroup>
      <UFormGroup :label="$t('account.calendar.form.labels.from')" name="from" required>
        <InputDate v-model="state.from" />
      </UFormGroup>
      <UFormGroup :label="$t('account.calendar.form.labels.to')" name="to" required>
        <InputDate v-model="state.to" />
      </UFormGroup>
      <template v-if="state.type === DayType.workingDay">
        <UFormGroup :label="$t('account.calendar.form.labels.start')" name="start" required>
          <UInput v-model="state.start" type="time" />
        </UFormGroup>
        <UFormGroup :label="$t('account.calendar.form.labels.end')" name="end" required>
          <UInput v-model="state.end" type="time" />
        </UFormGroup>
      </template>
      <UButton type="submit">
        {{ $t('account.settings.form.labels.submit') }}
      </UButton>
    </UForm>
    <Calendar
      :attributes="attributes"
      :rows="4"
      :columns="3"
      :min-date="new Date()"
    />
  </div>
</template>
