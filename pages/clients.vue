<script setup lang="ts">
import type { ClientEntity } from '~/types/entities'
import { ModalClient } from '#components';

const { t } = useI18n({
  useScope: 'local',
})
const { baseUrl } = useRuntimeConfig().public
const modalStore = useModalStore()

const { get } = useClientRepository()
const { data } = useAsyncData(() => get())

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

function callModal(preset?: ClientEntity) {
  modalStore.open(ModalClient, {
    preset,
    onSubmit() {
      get()
    },
  })
}
</script>

<template>
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full">
    <div>
      <UButton
        :label="t('clients.addNewClient')"
        icon="i-ic-outline-contact-phone"
        class="w-full"
        @click="callModal()"
      />
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="groups"
        :autoselect="false"
        :placeholder="t('clients.clientsList.searchPlaceholder')"
        :empty-state="{
          icon: '',
          queryLabel: t('clients.clientsList.emptyList.isEmptyBySearch'),
          label: t('clients.clientsList.emptyList.isEmpty'),
        }"
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
            <base-image :src="selectedClient.image" width="200" height="200" />
            <UFormGroup :label="t('clients.clientInfo.clientStatus')">
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
              <span class="font-bold">
                {{ t('clients.clientInfo.phone') }}:</span><span>{{ selectedClient.phone }}</span>
              <span class="font-bold">{{ t('clients.clientInfo.sex') }}:</span><span>{{ selectedClient.sex }}</span>
              <span class="font-bold">{{ t('clients.clientInfo.dob') }}:</span><span><base-datetime :date="selectedClient.birthday" /></span>
              <span class="font-bold">{{ t('clients.clientInfo.balance') }}:</span><span>{{ selectedClient.balance || 0 }}</span>
              <!-- <span class="font-bold">Номер картки:</span><span>{{ selectedClient.cardId || `${selectedClient.id}`.padStart(4, '0') }}</span> -->
              <span class="font-bold">{{ t('clients.clientInfo.source') }}:</span><span>{{ selectedClient.source }}</span>
              <span class="font-bold">{{ t('clients.clientInfo.created') }}:</span><span><base-datetime :date="selectedClient.createdAt" /></span>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "clients": {
      "addNewClient": "Add New",
      "clientsList": {
        "searchPlaceholder": "Search...",
        "emptyList": {
          "isEmptyBySearch": "We couldn't find a client with that name. Please try again or create a new one",
          "isEmpty": "We couldn't find any clients, create a new one"
        }
      },
      "clientInfo": {
        "phone": "Phone number",
        "sex": "Sex",
        "dob": "Date of birth",
        "balance": "Balance",
        "created": "Date of creation",
        "source": "Source",
        "clientStatus": "Status"
      }
    }
  },
  "uk-UK": {
    "clients": {
      "addNewClient": "Додати нового",
      "clientsList": {
        "searchPlaceholder": "Пошук...",
        "emptyList": {
          "isEmptyBySearch": "Нам не вдалося знайти клієнта з таким іменем. Будь ласка, спробуйте ще раз або створіть нового",
          "isEmpty": "Нам не вдалося знайти жодної клієнта, створіть нового"
        }
      },
      "clientInfo": {
        "phone": "Номер телефону",
        "sex": "Стать",
        "dob": "Дата народження",
        "balance": "Баланс",
        "created": "Дата створення",
        "source": "Джерело",
        "clientStatus": "Статус"
      }
    }
  }
}
</i18n>
