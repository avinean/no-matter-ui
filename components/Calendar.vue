<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import { defineProps } from 'vue';
const props = defineProps(['events']);

import { ref } from 'vue';
import type {CalendarOptions} from "@fullcalendar/core";

const todayButtonText = computed(() => `Cьогодні ${new Date().toLocaleDateString()}`);

const getEventStyle = (event: boolean) => ({
  'background-color': event.approved && !event.beenPaid ? '#D2DA4C' :
      !event.approved && !event.beenPaid ? '#D66359' :
          event.approved && event.beenPaid ? '#4FB1B0' :
              'white',
  'height': '100%',
  'padding': '7px',
  'pointer-events': event.approved && event.beenPaid ? 'none' : '',
  'width': '100%'
});

const handleEventClick = (clickInfo: any) => {
  console.log(clickInfo, 'clickInfo')
  console.log(clickInfo.event.extendedProps, 'all props without title')
  console.log(clickInfo.event.title, 'event title')
  // clickInfo.event.remove()
}


const options = {
  plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
  initialView: 'timeGridWeek',
  nowIndicator: true,
  editable: true,
  // selectable: true,
  droppable: true,
  locale: 'UK',
  timeZone: 'local',
  events: props,
  eventColor: 'transparent',
  eventTextColor: '#000000',
  allDayText: '',
  eventClick: handleEventClick,
  buttonText: {
    today: todayButtonText.value,
    month: 'Місяць',
    week: 'Тиждень',
    day: 'День'
  },
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    // hour12: true,
  },
  eventTimeFormat: {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short"
  },
  // titleFormat: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  headerToolbar: {
    start: 'prev,today,next,', // Change the placement of buttons
    // center: 'title',
    end: 'dayGridMonth,timeGridWeek,timeGridDay', // Change the placement of buttons
  },
  eventClassNames: ['custom-event shadow-none'],
  // eventDidMount: handleEventDidMount,
  // eventContent: renderEventContent,
} satisfies CalendarOptions



</script>

<template>


  <div class="p-8 bg-gray-100">
    <FullCalendar :options="options" class="syns_calendar">
      <template v-slot:eventContent="arg">
        <UPopover
            :ui="{trigger: 'h-full'}"
            class="h-full" mode="hover" :popper="{ placement: 'top',  arrow: true, trigger: 'h-full'   }">
          <div
              :style="getEventStyle(arg.event.extendedProps)"
          >
            <!-- Content inside the event div -->
            <div>{{ arg.event.title }}</div>
            <div>{{ arg.event.extendedProps.userName }}</div>
          </div>

          <template #panel >
              <div class="rounded-md bg-gray-300 p-2"
              >
                <span>
                {{ new Date(arg.event.start).getHours() }} :
                  {{new Date(arg.event.start).getMinutes().toString().padStart(2, '0')}}
                  - {{ new Date(arg.event.end).getHours()}} :
                   {{new Date(arg.event.end).getMinutes().toString().padStart(2, '0')}}
                </span><br>
                <span>{{ arg.event.title }}</span><br>
                <span>{{ arg.event.extendedProps.userName }}</span><br>
                <span>{{ arg.event.extendedProps.phone }}</span><br>
                <span>{{ arg.event.extendedProps.description }}</span><br>
              </div>
          </template>

        </UPopover>
      </template>
    </FullCalendar>
  </div>
</template>


<style scoped>
.fc-event {
  box-shadow: none!important; /* Set your desired box shadow */
  border: none!important; /* Set your desired border color */
  /* Add other styles as needed */
}
a{
  box-shadow: none!important;
}
</style>