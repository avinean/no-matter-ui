<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

defineProps<{
  mode?: string
}>()

defineSlots<{
  default(props: { date: Date | string }): any
  display(props: { date: Date | string }): any
}>()

const date = defineModel<Date | string>({ default: new Date() })
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <slot :date="date">
      <UButtonGroup
        class="w-full"
        size="sm"
        orientation="horizontal"
      >
        <UButton color="gray" class="flex-1">
          <slot name="display" :date="date">
            <base-datetime :date="date" date-style="full"/>
          </slot>
        </UButton>
        <UButton icon="i-ic-baseline-calendar-month" color="gray" />
      </UButtonGroup>
    </slot>
    <template #panel="{ close }">
      <VCalendarDatePicker
        v-model.string="date"
        locale="uk-UA"
        expanded
        :mode="mode"
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
