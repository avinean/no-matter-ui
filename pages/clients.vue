
<script setup lang="ts">
import type { Profile } from '#types/entities'
import { ContactType } from '#types/enums'

const { data } = useApi<Profile[]>('/profiles')
const newClients = ref<Profile[]>([])
const commandPaletteRef = ref()
const isOpen = ref(false)

const selectedClient = ref<Profile>(null)
const emails = computed(() => selectedClient.value?.contacts
  .filter(({ type }) => type === ContactType.Email)
  .map(({ value }) => value)
)
const phones = computed(() => selectedClient.value?.contacts
  .filter(({ type }) => type === ContactType.Phone)
  .map(({ value }) => value)
)

const groups = computed(() => [{
  key: 'users',
  commands: [...newClients.value, ...(data.value || [])].map((client) => ({
    id: client.id, label: `${client.firstName} ${client.lastName}`, client,
    avatar: { src: 'https://picsum.photos/200/300', srcset: 'https://picsum.photos/200/300 2x', loading: 'lazy' },
  })),
}])

function onSelect({ client }) {
  selectedClient.value = client
}

function onProfileAdded(profile: Profile) {
  newClients.value.push(profile)
  isOpen.value = false
}
</script>

<template>
  <div class="grid grid-cols-[200px,1fr] gap-2 divide-x min-h-full">
    <div>
      <UButton label="Add item" icon="i-heroicons-identification" @click="isOpen = true" class="w-full"/>
      <UCommandPalette ref="commandPaletteRef" :groups="groups" :autoselect="false" @update:model-value="onSelect">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">Nothing here!</span>
            <UButton label="Add item" color="gray" icon="i-heroicons-identification" @click="isOpen = true" />
          </div>
        </template>
      </UCommandPalette>
      <UModal v-model="isOpen">
        <modal-client @submit="onProfileAdded"/>
      </UModal> 
    </div>
    <div class="w-full flex items-start gap-2 px-2">
      <template v-if="selectedClient">
        <div class="flex gap-2">
          <img src="https://picsum.photos/200/300" alt="users photo" width="200" height="300"/>
          <div class="grid grid-cols-[150px,1fr] items-center">
            <span class="font-bold">First name:</span><span>{{ selectedClient.firstName }}</span>
            <span class="font-bold">Last name:</span><span>{{ selectedClient.lastName }}</span>
            <span class="font-bold">Phones:</span><span><UBadge v-for="phone in phones" :key="phone" color="white" variant="solid">{{ phone }}</UBadge></span>
            <span class="font-bold">Emails:</span><span><UBadge v-for="email in emails" :key="email" color="white" variant="solid">{{ email }}</UBadge></span>
            <span class="font-bold">Sex:</span><span>{{ selectedClient.sex }}</span>
            <span class="font-bold">Birthday:</span><span>{{ selectedClient.birthday }}</span>
            <span class="font-bold">Source:</span><span>{{ selectedClient.source }}</span>
            <span class="font-bold">Balance:</span><span>{{ selectedClient.balance || 0 }}</span>
            <span class="font-bold">Card:</span><span>{{ selectedClient.cardId || `${selectedClient.id}`.padStart(4, '0') }}</span>
            <span class="font-bold">Created at:</span><span>{{ selectedClient.createdAt }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

