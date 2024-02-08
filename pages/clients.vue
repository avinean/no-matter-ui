<script setup lang="ts">
import type { Client } from '#types/entities'

const { baseUrl } = useRuntimeConfig().public
const modalStore = useModalStore()
const ModalClient = resolveComponent('modal-client')

const { data, refresh, status } = useApi<Client[]>('/client')
const commandPaletteRef = ref()
const selectedId = ref<number | null>(null)
const selectedClient = computed(() => data.value?.find(client => client.id === selectedId.value))

const groups = computed(() => [{
  key: 'users',
  commands: (data.value || []).map(client => ({
    id: client.id,
    label: `${client.firstName} ${client.lastName}`,
    client,
    avatar: { src: `${baseUrl}/${client.image}`, loading: 'lazy' },
  })),
}])

function callModal(preset?: Client) {
  modalStore.open(ModalClient, {
    preset,
    onSubmit() {
      refresh()
    },
  })
}
</script>

<template>
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full">
    <div>
      <UButton
        label="Add item"
        icon="i-ic-outline-contact-phone"
        class="w-full"
        @click="callModal()"
      />
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="groups"
        :autoselect="false"
        @update:model-value="selectedId = $event.client.id"
      >
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">Nothing here!</span>
            <UButton
              label="Add item"
              color="gray"
              icon="i-ic-outline-contact-phone"
              @click="callModal()"
            />
          </div>
        </template>
      </UCommandPalette>
    </div>
    <div class="w-full flex items-start gap-2 pl-2">
      <template v-if="selectedClient">
        <div class="grid lg:grid-cols-3 gap-2 w-full">
          <UCard>
            <base-image
              :key="status"
              :src="selectedClient.image"
              alt="users photo"
              class="w-full mb-4"
              width="200"
              height="300"
            />
            <UFormGroup label="Статус">
              <UToggle
                on-icon="i-ic-baseline-check-circle-outline"
                off-icon="i-outline-cancel"
              />
            </UFormGroup>
          </UCard>
          <UCard class="lg:col-span-2">
            <h1 class="flex justify-between font-bold text-xl">
              {{ selectedClient.firstName }} {{ selectedClient.lastName }}
              <UButton
                icon="i-ic-baseline-edit"
                @click="callModal(selectedClient)"
              />
            </h1>
            <div class="grid grid-cols-[150px,1fr] items-center">
              <span class="font-bold">Номер телефону:</span><span>{{ selectedClient.phone }}</span>
              <span class="font-bold">Стать:</span><span>{{ selectedClient.sex }}</span>
              <span class="font-bold">День народжння:</span><span><base-datetime :date="selectedClient.birthday" /></span>
              <span class="font-bold">Баланс:</span><span>{{ selectedClient.balance || 0 }}</span>
              <span class="font-bold">Номер картки:</span><span>{{ selectedClient.cardId || `${selectedClient.id}`.padStart(4, '0') }}</span>
              <span class="font-bold">Source:</span><span>{{ selectedClient.source }}</span>
              <span class="font-bold">Created at:</span><span><base-datetime :date="selectedClient.createdAt" /></span>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </div>
</template>
