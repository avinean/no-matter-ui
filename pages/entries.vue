<script setup lang="ts">
// definePageMeta({
//       colorMode: 'light',
// })

import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import type { CalendarOptions } from '@fullcalendar/core'

const { baseUrl } = useRuntimeConfig().public
const store = useEntriesStore()

function getEventStyle(event: any) {
  return {
    'background-color': event.approved && !event.beenPaid
      ? '#D2DA4C'
      : !event.approved && !event.beenPaid
          ? '#D66359'
          : event.approved && event.beenPaid
            ? '#4FB1B0'
            : 'white',
  }
}
const calendarRef = ref()
const commandPaletteRef = ref()
const currentCalendarView = ref()
const eventDetails = ref()
const isOpenEvent = ref(false)
const selectedId = ref()
const tabItems = [
  { label: 'Tab1', id: 1, lastName: 'Марина', firstName: 'Олешко', jobTitle: 'Анестезіолог',
  },
  { label: 'Tab1', id: 10, lastName: 'Марина', firstName: 'Олешко', jobTitle: 'Анестезіолог',
  },
  { label: 'Tab1', id: 9, lastName: 'Марина', firstName: 'Олешко', jobTitle: 'Анестезіолог',
  },
  { label: 'Tab1', id: 8, lastName: 'Марина', firstName: 'Олешко', jobTitle: 'Анестезіолог',
  },
  { label: 'Tab2', id: 2, lastName: 'Олена', firstName: 'Зірина', jobTitle: 'дерматовенеролог',
  },
  { label: 'Tab3', id: 3, lastName: 'Дарина', firstName: 'Головко', jobTitle: 'косметолог  ',
  },
  { label: 'Tab3', id: 4, lastName: 'Дарина', firstName: 'Головко', jobTitle: 'косметолог  ',
  },
  { label: 'Tab3', id: 5, lastName: 'Дарина', firstName: 'Головко', jobTitle: 'косметолог  ',
  },
  { label: 'Tab3', id: 6, lastName: 'Дарина', firstName: 'Головко', jobTitle: 'косметолог  ',
  },
  { label: 'Tab3', id: 7, lastName: 'Дарина', firstName: 'Головко', jobTitle: 'косметолог  ',
  },
]

const groups = computed(() => [{
  key: 'users',
  commands: (tabItems || []).map(client => ({
    id: client.id,
    label: `${client.firstName} ${client.lastName}`,
    suffix: client.jobTitle,
    client,
    // avatar: { src: `${baseUrl}/${client.image || ''}`, loading: 'lazy' },
  })),
}])
const selectedProfile = computed(() => tabItems?.find(profile => profile.id === selectedId.value))

function handleEventClick(clickInfo: any) {
  isOpenEvent.value = true
  eventDetails.value = {
    isEdit: true,
    eventInfo: {
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
    },
  }
}

function addNewEvent() {
  eventDetails.value = {
    isEdit: false,
    eventInfo: {
      start: new Date(),
    },
  }
  isOpenEvent.value = true
}

function handleDateClick(clickInfo: any) {
  eventDetails.value = {
    isEdit: false,
    eventInfo: {
      start: clickInfo.date,
    },
  }
  isOpenEvent.value = true
}
const options: any = {
  plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
  initialView: 'timeGridDay',
  nowIndicator: true,
  editable: true,
  selectable: true,
  droppable: true,
  locale: 'UK',
  viewDidMount: (viewInfo: any) => {
    currentCalendarView.value = viewInfo.view.type
  },
  viewWillUnmount: (viewInfo: any) => {
    currentCalendarView.value = viewInfo.view.type
  },
  timeZone: 'local',
  events: store.events,
  dayMaxEvents: 3,
  eventColor: 'transparent',
  moreLinkContent: 'більше...',
  moreLinkText: '3',
  eventTextColor: '#000000',
  allDayText: 'Wait-list',
  eventDragStop: (ev: any) => {
    console.log(ev, 'drag stop') /// when we change positon of event or drag to area Wait
  },
  eventClick: handleEventClick,
  dateClick: handleDateClick,
  buttonText: {
    today: new Date().toLocaleDateString(),
    month: 'Місяць',
    week: 'Тиждень',
    day: 'День',
  },
  allDaySlot: false,
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

}

function goToSelectedDate(val: Date) {
  calendarRef?.value.getApi().gotoDate(val)
}

function handleTabChange(id: number) {
  selectedId.value = id
}
</script>

<template>
  <div>
    <USlideover
      v-model="isOpenEvent"
      :overlay="false"
      @close="isOpenEvent = false"
    >
      <modal-event
        v-if="isOpenEvent"
        :preset="eventDetails || null"
        @close="isOpenEvent = false"
      />
    </USlideover>
    <div class="p-8  rounded-xl">
      <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full">
        <UCommandPalette
          ref="commandPaletteRef"
          :groups="groups"
          :autoselect="false"
          :ui="{
            input: {
              base: 'border-1 border-gray-200 rounded-md',
              height: 'h-8',
            },
            group: {
              command: {
                active: 'text-gray-900',
                label: 'grid gap-0',
              },
            },
          }"
          @update:model-value="selectedId = $event.client.id"
        >
          <template #empty-state>
            <div class="flex flex-col items-center justify-center py-6 gap-3">
              <span class="italic text-sm">Nothing here!</span>
            </div>
          </template>
        </UCommandPalette>
        <div>
          <div class="flex items-center justify-between ">
            <div class="flex items-center border-4 border-gray-200 rounded-md text-sm font-normal  text-black">
              <div>
                <div
                  class="px-6 py-3 flex items-center cursor-pointer"
                  @click="calendarRef?.calendar.prev()"
                >
                  <UIcon name="i-ic-baseline-chevron-left" class="text-xl text-gray-900" />
                </div>
              </div>
              <div
                class="px-6 py-3 border-l-4  cursor-pointer"
                @click="calendarRef?.calendar.today()"
              >
                Сьогодні
              </div>
              <div class="flex items-center gap-4 px-6 py-2 border-l-4 border-r-4">
                <base-datetime v-if="calendarRef?.calendar.getDate()" :date="calendarRef?.calendar.getDate()" date-style="medium" />
                <input-date
                  @update:model-value="goToSelectedDate"
                >
                  <UButton
                    size="xs"
                    icon="i-ic-baseline-event-note"
                    color="gray"
                  />
                </input-date>
              </div>
              <div class="px-4 py-3 border-r-4">
                {{ getCurrentDayName() }}
              </div>
              <div>
                <div class="px-6 py-3 flex items-center cursor-pointer" @click="calendarRef?.calendar.next()">
                  <UIcon name="i-ic-baseline-chevron-right" class="text-gray-900 text-xl" />
                </div>
              </div>
            </div>
            <div class="flex gap-2">
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
              <UButton
                color="gray"
                @click="addNewEvent"
              >
                Додати запис
              </UButton>
            </div>
          </div>
          <FullCalendar
            ref="calendarRef" :options="options" class="syns_calendar"
          >
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
                  <base-datetime :date="arg.event.start" time-style="short" />
                  {{ arg.event.title }}
                </div>
              </div>
            </template>
          </FullCalendar>
        </div>
      </div>
    </div>
  </div>
</template>
