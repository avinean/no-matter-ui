<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const props = defineProps(['mode'])
const model = defineModel<Date | string>()
const label = computed(() => model.value?.toLocaleDateString?.('uk-ua', {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
}))
const datePickerMode = ref(props.mode || 'date')
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <slot>
      <UButtonGroup
        class="w-full"
        size="sm"
        orientation="horizontal"
      >
        <UInput
          v-model="label"
          class="w-full"
          disabled
        />
        <UButton icon="i-ic-baseline-calendar-month" color="gray" />
      </UButtonGroup>
    </slot>
    <template #panel="{ close }">
      <VCalendarDatePicker
        v-model="model"
        locale="uk-UA"
        expanded
        :mode="datePickerMode"
        :attributes="[{
          key: 'today',
          dates: new Date(),
        }]"
        :first-day-of-week="2"
        @update:model-value="close"
      />
    </template>
  </UPopover>
</template>
