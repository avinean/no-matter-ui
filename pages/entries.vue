<script setup lang="ts">
// definePageMeta({
//       colorMode: 'light',
// })

import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import type { CalendarOptions } from '@fullcalendar/core'

const store = useEntriesStore()

function getEventStyle(event: boolean) {
  return {
    'background-color': event.approved && !event.beenPaid
      ? '#D2DA4C'
      : !event.approved && !event.beenPaid
          ? '#D66359'
          : event.approved && event.beenPaid
            ? '#4FB1B0'
            : 'white'
  }
}
const calendarRef = ref()
const currentCalendarView = ref()
const eventDetails = ref()
const isOpenEvent = ref(false)
function handleEventClick(clickInfo: any) {
  isOpenEvent.value = true
  console.log(clickInfo, 'clickInfo')
  eventDetails.value = {
    id: clickInfo.event.id,
    price: clickInfo.event.extendedProps.price,
    title: clickInfo.event.title,
    description: clickInfo.event.extendedProps.description,
    phone: clickInfo.event.extendedProps.phone,
    lastName: clickInfo.event.extendedProps.lastName,
    firstName: clickInfo.event.extendedProps.firstName,
    start: clickInfo.event.start,
    end: clickInfo.event.end,
    approved: clickInfo.event.extendedProps.approved,
    beenPaid: clickInfo.event.extendedProps.beenPaid,
  }
}

function handleDateClick(clickInfo: any) {
}


const options = {
  plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
  initialView: 'timeGridDay',
  nowIndicator: true,
  editable: true,
  selectable: true,
  droppable: true,
  locale: 'UK',
  viewDidMount: (viewInfo) => {
    currentCalendarView.value = viewInfo.view.type
  },
  viewWillUnmount: (viewInfo) => {
    currentCalendarView.value = viewInfo.view.type
  },
  timeZone: 'local',
  events: store.events,
  eventColor: 'transparent',
  eventTextColor: '#000000',
  allDayText: 'Wait-list',
  eventDragStop: (ev) => {
    console.log(ev, 'drag stop') /// when we change positon of event or drag to area Wait
  },
  eventClick: handleEventClick,
  dateClick: handleDateClick,
  forceEventDuration: true,
  buttonText: {
    today: new Date().toLocaleDateString(),
    month: 'Місяць',
    week: 'Тиждень',
    day: 'День',
  },
  // expandRows: true,
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
  },
  eventTimeFormat: {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short',
  },
  dayHeaderContent: '',
  headerToolbar: {
    start: '', // Change the placement of buttons
    // center: 'title',
    end: '', // Change the placement of buttons
  },
} satisfies CalendarOptions

function goToSelectedDate(val: Date) {
  calendarRef?.value.getApi().gotoDate(val)
}

function changeView(view: string) {
  calendarRef?.value.getApi().changeView(view)
}

</script>

<template>
  <UModal
    v-model="isOpenEvent"
    :ui="{
      width: 'sm:max-w-lg',
    }"
    @close="isOpenEvent = false"
  >
    <modal-event
      v-if="isOpenEvent"
      :preset="eventDetails"
      @close="isOpenEvent = false"
    />
  </UModal>
  <div class="p-8 bg-gray-100 rounded-xl">
    <div class="flex items-center justify-between ">
      <div class="flex items-center border-4 border-gray-200 rounded-md text-sm font-normal  text-black">
        <div>
          <div
            class="px-6 py-3 flex items-center cursor-pointer"
            @click="calendarRef?.calendar.prev()"
          >
            <UIcon name="i-heroicons-chevron-left" class="text-xl text-gray-900" />
          </div>
        </div>
        <div
          class="px-6 py-3 border-l-4  cursor-pointer"
          @click="calendarRef?.calendar.today()"
        >
          Сьогодні
        </div>
        <div class="flex items-center gap-4 px-6 py-2 border-l-4 border-r-4">
          <!--          {{currentCalendarView}} -->
          <!--          {{calendarRef?.calendar.view.type}} -->
          <base-datetime v-if="calendarRef?.calendar.getDate()" :date="calendarRef?.calendar.getDate()" date-style="medium" />
          <input-date
            @update:model-value="goToSelectedDate"
          >
            <UButton
              size="xs"
              icon="i-heroicons-calendar-days-solid"
              color="gray"
            />
          </input-date>
        </div>
        <div class="px-4 py-3 border-r-4">
          {{ getCurrentDayName() }}
        </div>
        <div>
          <div class="px-6 py-3 flex items-center cursor-pointer" @click="calendarRef?.calendar.next()">
            <UIcon name="i-heroicons-chevron-right" class="text-gray-900 text-xl" />
          </div>
        </div>
      </div>
      <div class='flex gap-2'>
        <UButton
          :color="currentCalendarView === 'dayGridMonth' ? 'lime' : 'gray'"
          @click="calendarRef?.calendar.changeView('dayGridMonth')"
        >
          Місяць
        </UButton>
        <UButton
          :color="currentCalendarView === 'timeGridDay' ? 'lime' : 'gray'"
          @click="calendarRef?.calendar.changeView('timeGridDay')"
        >
          День
        </UButton>
      </div>
    </div>

    <FullCalendar ref="calendarRef" :options="options" class="syns_calendar">
      <template #eventContent="arg">
        <div
            class="w-full
            rounded
                h-full
                text-xs
                overflow-hidden px-2 py-1"
            :style="getEventStyle(arg.event.extendedProps)"
        >
          <div class="truncate">
            <base-datetime :date="arg.event.start"  :time-style="'short'" />
            {{ arg.event.title }}</div>
        </div>
      </template>
    </FullCalendar>
  </div>
</template>
