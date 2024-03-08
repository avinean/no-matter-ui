<script lang="ts" setup>
import { ModalServiceProduct } from '#components'
import type { ServiceEntity } from '~/types/entities'

const model = defineModel<ServiceEntity[]>({ default: [] })
const { open } = useModalStore()
const { get } = useServiceRepository()

const loading = ref(false)

async function search(search: string) {
  loading.value = true

  const { items } = await get({ search })

  model.value = model.value?.map(
    service => items?.find(({ id }) => id === service.id) || service,
  ).filter<ServiceEntity>((value): value is ServiceEntity => Boolean(value)) || []

  loading.value = false

  return items
}
</script>

<template>
  <div class="flex gap-1">
    <USelectMenu
      v-model="model"
      option-attribute="name"
      multiple
      :loading="loading"
      :searchable="search"
      selected-icon="i-ic-round-check"
      :placeholder="$t('default.forms.placeholders.services')"
      class="flex-1"
    />
    <UButton
      icon="i-ic-baseline-medical-services"
      size="sm"
      color="primary"
      square
      variant="solid"
      @click="() => open(ModalServiceProduct, { type: 'service' })"
    />
  </div>
</template>
