<script setup lang="ts">
 // definePageMeta({
 //       colorMode: 'light',
 // })
import {getCurrentDayName} from "~/utils/dates";

 const store = useEntriesStore()
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ref, onMounted } from 'vue';
import type {CalendarOptions} from "@fullcalendar/core";
const todayButtonText = computed(() => `${new Date().toLocaleDateString()}`);

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
const calendarRef = ref()
console.log(calendarRef, 'calendarRef')
const handleEventClick = (clickInfo: any) => {
  console.log(clickInfo, 'clickInfo')
  console.log(clickInfo.event.extendedProps, 'all props without title')
  console.log(clickInfo.event.title, 'event title')
  // clickInfo.event.remove()
}


const options = {
  plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
  initialView: 'timeGridDay',
  nowIndicator: true,
  editable: true,
  selectable: true,
  droppable: true,
  locale: 'UK',
  timeZone: 'local',
  events: store.events,
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
  },
  eventTimeFormat: {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short"
  },
  dayHeaderContent: '',
  headerToolbar: {
    start: '', // Change the placement of buttons
    // center: 'title',
    end: '', // Change the placement of buttons
  },
} satisfies CalendarOptions

onMounted(() => {
  if (calendarRef.value) {
    calendarRef.value = calendarRef.value.getApi();
  }
});

const goToPrev = () => {
  calendarRef.value.prev();
};

const goToToday = () => {
  calendarRef.value.today();
};

const goToNext = () => {
  calendarRef.value.next();
};

const changeView = (view: string) => {
  // Call the changeView method to switch to the specified view
  calendarRef.value?.changeView(view);
};

</script>

<template>


  <div class="p-8 bg-gray-100 rounded-xl">
    <div class="flex items-center justify-between ">
      <div class="flex items-center border-4 border-gray-200 rounded-md text-sm font-normal  text-black">
        <div>
          <div
              class="px-6 py-3 flex items-center cursor-pointer"
              @click="goToPrev"
          >
            <UIcon style="font-size: 1.5rem;" name="i-heroicons-chevron-left" class="text-gray-900"  />
          </div>
        </div>
        <div
            class="px-6 py-3 border-l-4  cursor-pointer"
            @click="goToToday"
        >
          Сьогодні
        </div>
        <div class="flex gap-4 px-6 py-3 border-l-4 border-r-4">
          {{todayButtonText}}
        </div>
        <div class="px-4 py-3 border-r-4">
          {{getCurrentDayName()}}
        </div>
        <div>
          <div @click="goToNext" class="px-6 py-3 flex items-center cursor-pointer" >
            <UIcon style="font-size: 1.5rem;" name="i-heroicons-chevron-right" class="text-gray-900" />
          </div>
        </div>

<!--        <button class="flex gap-4 px-4 py-3 border-l-4 border-r-4 border-gray-900" @click="goToToday">-->
<!--          <span>-->
<!--             {{todayButtonText}}-->
<!--          </span> <span>-->
<!--          1-->

<!--          </span>-->

<!--        </button>-->

      </div>
      <div>
        <button @click="changeView('dayGridMonth')">Місяць</button>
        <button @click="changeView('timeGridWeek')">Тиждень</button>
        <button @click="changeView('timeGridDay')">День</button>
      </div>
    </div>


    <FullCalendar :options="options" ref="calendarRef" class="syns_calendar">
      <template v-slot:eventContent="arg">

        <UPopover
            :ui="{trigger: 'h-full'}"
            class="h-full" mode="hover" :popper="{ placement: 'top', trigger: 'h-full'   }">

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

