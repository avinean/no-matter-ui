<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const model = defineModel<Date>()
const label = computed(() => model.value?.toLocaleDateString?.('uk-ua', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }))
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
        <UButton
            icon="i-heroicons-calendar"
            color="gray"
        />
      </UButtonGroup>
    </slot>
    <template #panel="{ close }">
      <VCalendarDatePicker
        v-model="model"
        locale="uk-UA"
        expanded
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
