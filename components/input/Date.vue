<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const props = defineProps({
  mode: String,
  fullDate: {
    type: Boolean,
    default: true, // Set the default value to true
  },
})
const model = defineModel<Date | string>()
console.log(model, 'model')
const label = computed(() => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }
  if (props.fullDate) {
    return model?.value?.toLocaleDateString?.('uk-ua', options)
  }
  else {
    const { hour, minute, ...dateOptions } = options
    return model?.value?.toLocaleDateString('uk-ua', dateOptions)
  }
})
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
