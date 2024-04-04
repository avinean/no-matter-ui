<script lang="ts" setup>
import { Calendar } from 'v-calendar'
import type { BusinessObjectEntity, CalendarEntity, ProfileEntity, ScheduleEntity } from '~/types/entities'
import { DayType } from '~/types/enums'
import type { Props } from '~/types/utils'

const props = defineProps<{
  calendar?: CalendarEntity[]
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

type CalendarProps = Props<typeof Calendar>

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
      label: t('popover.dayOf'),
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
      <UFormGroup
        :label="t('form.type')"
        name="type"
        required
      >
        <USelect
          v-model="state.type"
          :options="Object.values(DayType).map((value) => ({
            label: t(`dayTypes.${value}`),
            value,
          }))"
        />
      </UFormGroup>
      <UFormGroup
        :label="t('form.comment')"
        name="comment"
      >
        <UTextarea v-model="state.comment" />
      </UFormGroup>
      <UFormGroup
        :label="t('form.from')"
        name="from"
        required
      >
        <InputDate v-model="state.from" />
      </UFormGroup>
      <UFormGroup
        :label="t('form.to')"
        name="to"
        required
      >
        <InputDate v-model="state.to" />
      </UFormGroup>
      <template v-if="state.type === DayType.workingDay">
        <UFormGroup
          :label="t('form.fromTime')"
          name="start"
          required
        >
          <UInput
            v-model="state.start"
            type="time"
          />
        </UFormGroup>
        <UFormGroup
          :label="t('form.toTime')"
          name="end"
          required
        >
          <UInput
            v-model="state.end"
            type="time"
          />
        </UFormGroup>
      </template>
      <UButton type="submit">
        {{ $t('default.forms.actions.add') }}
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

<i18n lang="json">
{
  "en-US": {
    "popover": {
      "dayOf": "Day off"
    },
    "dayTypes": {
      "stateHoliday": "State holiday",
      "companyHoliday": "Company holiday",
      "holiday": "Holiday",
      "workingDay": "Working Day",
      "vacation": "Vacation",
      "sickLeave": "Sick Leave",
      "dayOff": "Day Off"
    },

    "form": {
      "type": "Type",
      "comment": "Comment",
      "from": "Day start",
      "to": "Day end" ,
      "fromTime": "TIme start",
      "toTime": "TIme end"
    }
  },
  "uk-UK": {
    "popover": {
      "dayOf": "Вихідний день"
    },
    "dayTypes": {
      "stateHoliday": "Державне свято",
      "companyHoliday": "Cвято компанії",
      "holiday": "Неробочий день",
      "workingDay": "Робочий день",
      "vacation": "Відпустка",
      "sickLeave": "Лікарняний",
      "dayOff": "Вихідний"
    },
    "form": {
      "type": "Тип",
      "comment": "Коментар",
      "from": "День від",
      "to": "День до",
      "fromTime": "Час від",
      "toTime": "Час до"
    }
  }
}
</i18n>
