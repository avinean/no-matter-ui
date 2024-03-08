<script lang="ts" setup>
import { ModalRole, ModalServiceProduct } from '#components'
import type { RoleEntity } from '~/types/entities'

const globalStore = useGlobalStore()
const { open } = useModalStore()

const model = defineModel<RoleEntity[]>({ default: [] })
const { data, refresh } = useApi<RoleEntity[]>(`/role/${globalStore.business?.id}`)

whenever(data, () => {
  model.value
    = model.value
      ?.map(role => role.name === 'admin' ? role : data.value?.find(({ id }) => id === role.id))
      .filter<RoleEntity>((value): value is RoleEntity => Boolean(value)) || []
})
</script>

<template>
  <div class="flex gap-1">
    <USelectMenu
      v-if="data"
      v-model="model"
      :options="data"
      option-attribute="name"
      multiple
      selected-icon="i-ic-round-check"
      :placeholder="$t('default.forms.placeholders.roles')"
      creatable
      class="flex-1"
    />
    <UButton
      icon="i-ic-outline-add-moderator"
      size="sm"
      color="primary"
      square
      variant="solid"
      @click="() => open(ModalRole, {
        onSubmit() {
          refresh()
        },
      })"
    />
  </div>
</template>
