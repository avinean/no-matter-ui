<script setup lang="ts">
import type { Profile } from '#types/entities'

const { baseUrl } = useRuntimeConfig().public
const toast = useToast()

const { data } = useApi<Profile[]>('/profiles')
const newClients = ref<Profile[]>([])
const commandPaletteRef = ref()
const isOpen = ref(false)
const isEdit = ref(false)
const selectedClient = ref<Profile | null>(null)

const groups = computed(() => [{
  key: 'users',
  commands: [...newClients.value, ...(data.value || [])].map(client => ({
    id: client.id,
    label: `${client.firstName} ${client.lastName}`,
    client,
    avatar: { src: `${baseUrl}/${client.image}`, loading: 'lazy' },
  })),
}])

function onSelect({ client }: { client: Profile }) {
  selectedClient.value = client
}

function onProfileAddedOrEdited(profile: Profile) {
  if (isEdit.value)
    Object.assign(selectedClient.value!, profile)
  else
    newClients.value.push(profile)

  isOpen.value = false
  isEdit.value = false
}

function updateStatus(status: boolean) {
  $api(`/profiles/${selectedClient.value!.id}/status`, {
    method: 'PUT',
    body: { status },
  }).then(() => {
    selectedClient.value!.status = status
    toast.add({
      title: 'Вдалося!',
      description: 'Статус успішно змінено',
    })
  }).catch(() => {
    toast.add({
      title: 'Помилка!',
      description: 'Не вдалось змінити статус',
    })
  })
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

      <UModal
        v-model="isOpen"
        :ui="{
          width: 'sm:max-w-4xl',
        }"
        @close="isEdit = false"
      >
        <modal-client
          v-if="isOpen"
          :preset="isEdit ? selectedClient : null"
          @submit="onProfileAddedOrEdited"
          @close="isOpen = false; isEdit = false"
        />
      </UModal>
    </div>
    <div class="w-full flex items-start gap-2 pl-2">
      <template v-if="selectedClient">
        <div class="grid lg:grid-cols-3 gap-2 w-full">
          <UCard>
            <base-image
              :src="selectedClient.image"
              alt="users photo"
              class="w-full mb-4"
              width="200"
              height="300"
            />
            <UFormGroup label="Статус">
              <UToggle
                on-icon="i-heroicons-check-20-solid"
                off-icon="i-heroicons-x-mark-20-solid"
                :model-value="selectedClient.status"
                @update:model-value="updateStatus"
              />
            </UFormGroup>
          </UCard>
          <UCard class="lg:col-span-2">
            <h1 class="flex justify-between font-bold text-xl">
              {{ selectedClient.firstName }} {{ selectedClient.lastName }}
              <UButton
                icon="i-heroicons-pencil-square"
                @click="isEdit = true; isOpen = true"
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
