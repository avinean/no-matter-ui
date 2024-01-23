
<script setup lang="ts">
import type { Profile } from '#types/entities'
import { ContactType } from '#types/enums'

const { baseUrl } = useRuntimeConfig().public

const { data } = useApi<Profile[]>('/profiles')
const newClients = ref<Profile[]>([])
const commandPaletteRef = ref()
const isOpen = ref(false)
const isEdit = ref(false)
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
    avatar: { src: `${baseUrl}/${client.image}`, loading: 'lazy' },
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
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full">
    <div>
      <UButton
        label="Add item"
        icon="i-heroicons-identification"
        class="w-full"
        @click="isOpen = true"
      />
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="groups"
        :autoselect="false"
        @update:model-value="onSelect"
      >
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">Nothing here!</span>
            <UButton
              label="Add item"
              color="gray"
              icon="i-heroicons-identification"
              @click="isOpen = true"
            />
          </div>
        </template>
      </UCommandPalette>
      
      <modal-client
        v-model="isOpen"
        :preset="isEdit ? selectedClient : null"
        @submit="onProfileAdded"
      />
    </div>
    <div class="w-full flex items-start gap-2 pl-2">
      <template v-if="selectedClient">
        <div class="grid lg:grid-cols-3 gap-2 w-full">
          <UCard>
            <base-image
              :src="selectedClient.image"
              alt="users photo"
              class="w-full"
              width="200"
              height="300"
            />
          </UCard>  
          <UCard class="lg:col-span-2">
            <h1 class="font-bold text-xl">
              {{ selectedClient.firstName }} {{ selectedClient.lastName }}
            </h1>
            <div class="grid grid-cols-[150px,1fr] items-center">
              <span class="font-bold">Phones:</span><span><UBadge
                v-for="phone in phones"
                :key="phone"
                color="white"
                variant="solid"
              >{{ phone }}</UBadge></span>
              <span class="font-bold">Emails:</span><span><UBadge
                v-for="email in emails"
                :key="email"
                color="white"
                variant="solid"
              >{{ email }}</UBadge></span>
              <span class="font-bold">Sex:</span><span>{{ selectedClient.sex }}</span>
              <span class="font-bold">Birthday:</span><span><base-datetime :date="selectedClient.birthday" /></span>
              <span class="font-bold">Source:</span><span>{{ selectedClient.source }}</span>
              <span class="font-bold">Balance:</span><span>{{ selectedClient.balance || 0 }}</span>
              <span class="font-bold">Card:</span><span>{{ selectedClient.cardId || `${selectedClient.id}`.padStart(4, '0') }}</span>
              <span class="font-bold">Created at:</span><span><base-datetime :date="selectedClient.createdAt" /></span>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </div>
</template>

