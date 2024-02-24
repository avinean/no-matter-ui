<script setup lang="ts">
import type { ProfileEntity } from '~/types/entities'
import { ModalEmailPassAlert, ModalEmployee } from '#components'

const { baseUrl } = useRuntimeConfig().public
const { hasPermission } = useGlobalStore()
const modalStore = useModalStore()
const { data, get } = useProfileRepository()
get()
const commandPaletteRef = ref()
const selectedId = ref<number | null>(null)
const selectedProfile = computed(() => data.value?.find(profile => profile.id === selectedId.value))

const groups = computed(() => [{
  key: 'users',
  commands: (data.value || []).map(client => ({
    id: client.id,
    label: `${client.firstName} ${client.lastName}`,
    client,
    avatar: { src: `${baseUrl}/${client.image}`, loading: 'lazy' },
  })),
}])

const actions = [
  { tooltip: 'Редагувати профіль', icon: 'i-ic-baseline-edit', onClick: () => callModal(selectedProfile.value) },
  { tooltip: 'Копіювати поточний пароль', icon: 'i-ic-baseline-content-copy' },
  { tooltip: 'Перегенерувати пароль', icon: 'i-ic-round-security' },
]

function callModal(preset?: ProfileEntity) {
  modalStore.open(ModalEmployee, {
    preset,
    onSubmit(user) {
      get()
      if (!preset) {
        nextTick(() => {
          modalStore.open(ModalEmailPassAlert, { user })
        })
      }
    },
  })
}
</script>

<template>
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full">
    <div>
      <UButton
        v-if="hasPermission('profile:add')"
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
              v-if="hasPermission('profile:add')"w
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
      <template v-if="selectedProfile">
        <div class="grid lg:grid-cols-3 gap-2 w-full">
          <UCard>
            <base-image :src="selectedProfile.image" width="200" height="200" />
            <UFormGroup label="Статус">
              <UToggle
                on-icon="i-ic-baseline-check-circle-outline"
                off-icon="i-outline-cancel"
              />
            </UFormGroup>
          </UCard>
          <UCard class="lg:col-span-2">
            <h1 class="flex justify-between font-bold text-xl">
              {{ selectedProfile.firstName }} {{ selectedProfile.lastName }}

              <base-action-bar :items="actions" />
            </h1>
            <div class="grid grid-cols-[150px,1fr] items-center">
              <span class="font-bold">Номер телефону:</span><span>{{ selectedProfile.phone }}</span>
              <span class="font-bold">Стать:</span><span>{{ selectedProfile.sex }}</span>
              <span class="font-bold">День народження:</span><span><base-datetime :date="selectedProfile.birthday" /></span>
              <span class="font-bold">Created at:</span><span><base-datetime :date="selectedProfile.createdAt" date-style="full" time-style="full" /></span>
              <span class="font-bold">Ролі:</span>
              <span class="flex gap-2 flex-wrap mt-2">
                <UBadge v-for="role in selectedProfile.roles" :key="role.name" :label="role.name" />
              </span>
              <span class="font-bold">Послуги:</span>
              <span class="flex gap-2 flex-wrap mt-2">
                <UBadge v-for="service in selectedProfile.services" :key="service.name" :label="service.name" />
              </span>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </div>
</template>
