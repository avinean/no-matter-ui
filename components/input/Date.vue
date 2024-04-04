<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

defineProps<{
  mode?: string
}>()

defineSlots<{
  default: (props: { date: Date | string }) => any
  display: (props: { date: Date | string }) => any
}>()

const date = defineModel<Date | string>({ default: new Date() })
</script>

<template>
  <DatePicker
    v-model.string="date"
    locale="uk-UA"
    expanded
    :mode="mode"
    :attributes="[{
      key: 'today',
      dates: new Date(),
    }]"
    :first-day-of-week="2"
  >
    <template #default="{ togglePopover }">
      <slot :date="date">
        <UButtonGroup
          class="w-full"
          size="sm"
          orientation="horizontal"
        >
          <UButton
            color="gray"
            class="flex-1"
            @click="togglePopover"
          >
            <slot
              name="display"
              :date="date"
            >
              <base-datetime
                :date="date"
                date-style="full"
              />
            </slot>
          </UButton>
          >
          <UButton
            icon="i-ic-baseline-calendar-month"
            color="gray"
            @click="togglePopover"
          />
        </UButtonGroup>
      </slot>
    </template>
  </DatePicker>
</template>
