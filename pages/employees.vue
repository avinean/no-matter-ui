<script setup lang="ts">
import type { User } from '#types/entities'

const { baseUrl } = useRuntimeConfig().public
const toast = useToast()
const globalStore = useGlobalStore()
const modalStore = useModalStore()
const ModalEmployee = resolveComponent('modal-employee')
const EmailPassAlert = resolveComponent('modal-email-pass-alert')

const { data, refresh } = useApi<User[]>(`/users/${globalStore.object?.id}`)
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

function updateStatus(status: boolean) {
  $api(`/profiles/${selectedProfile.value!.id}/status`, {
    method: 'PUT',
    body: { status },
  }).then(() => {
    refresh()
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

function callModal(preset?: User) {
  modalStore.open(ModalEmployee, {
    preset,
    onSubmit(user) {
      refresh()
      if (!preset) {
        nextTick(() => {
          modalStore.open(EmailPassAlert, { user })
        })
      }
    },
  }, {
    ui: {
      width: 'sm:max-w-4xl',
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
      <template v-if="selectedProfile">
        <div class="grid lg:grid-cols-3 gap-2 w-full">
          <UCard>
            <base-image
              :src="selectedProfile.image"
              alt="users photo"
              class="w-full mb-4"
              width="200"
              height="300"
            />
            <UFormGroup label="Статус">
              <UToggle
                on-icon="i-ic-baseline-check-circle-outline"
                off-icon="i-outline-cancel"
                :model-value="selectedProfile.status"
                @update:model-value="updateStatus"
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
              <span class="font-bold">День народжння:</span><span><base-datetime :date="selectedProfile.birthday" /></span>
              <span class="font-bold">Created at:</span><span><base-datetime :date="selectedProfile.createdAt" date-style="full" time-style="full" /></span>
              <span class="font-bold">Ролі:</span>
              <span class="flex gap-2 flex-wrap mt-2">
                <UBadge v-for="role in selectedProfile.roles.split(',')" :key="role" :label="role" />
              </span>
              <span class="font-bold">Послуги:</span>
              <span class="flex gap-2 flex-wrap mt-2">
                <UBadge v-for="role in selectedProfile.services" :key="role.name" :label="role.name" />
              </span>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </div>
</template>
