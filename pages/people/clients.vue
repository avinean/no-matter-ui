<script setup lang="ts">
import type { ClientEntity } from '~/types/entities'
import { ModalClient } from '#components'

const { t } = useI18n({
  useScope: 'local',
})
const { baseUrl } = useRuntimeConfig().public
const modalStore = useModalStore()

const { get } = useClientRepository()
const { data, refresh } = useAsyncData(() => get())
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
      refresh()
    },
  })
}
</script>

<template>
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full pt-2">
    <div>
      <UButton
        :label="t('addNewClient')"
        icon="i-ic-outline-contact-phone"
        class="w-full"
        @click="callModal()"
      />
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="groups"
        :autoselect="false"
        :placeholder="t('clientsList.searchPlaceholder')"
        :ui="{ emptyState: {
          wrapper: 'px-2 py-2 sm:px-2',
        } }"
        :empty-state="{
          icon: '',
          queryLabel: t('clientsList.emptyList.isEmptyBySearch'),
          label: t('clientsList.emptyList.isEmpty'),
        }"
        @update:model-value="selectedId = $event.client.id"
      />
    </div>
    <div class="w-full flex items-start gap-2 pl-2">
      <template v-if="selectedClient">
        <div class="grid lg:grid-cols-3 gap-2 w-full">
          <UCard>
            <base-image :src="selectedClient.image" width="200" height="200" />
            <UFormGroup :label="t('clientInfo.status')">
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
                {{ t('clientInfo.phone') }}:</span><span>{{ selectedClient.phone }}</span>
              <span class="font-bold">{{ t('clientInfo.sex') }}:</span><span>{{ selectedClient.sex }}</span>
              <span class="font-bold">{{ t('clientInfo.dob') }}:</span><span><base-datetime :date="selectedClient.birthday" /></span>
              <span class="font-bold">{{ t('clientInfo.balance') }}:</span><span>{{ selectedClient.balance || 0 }}</span>
              <!-- <span class="font-bold">Номер картки:</span><span>{{ selectedClient.cardId || `${selectedClient.id}`.padStart(4, '0') }}</span> -->
              <span class="font-bold">{{ t('clientInfo.source') }}:</span><span>{{ selectedClient.source }}</span>
              <span class="font-bold">{{ t('clientInfo.created') }}:</span><span><base-datetime :date="selectedClient.createdAt" /></span>
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
      "addNewClient": "Add New",
      "clientsList": {
        "searchPlaceholder": "Search...",
        "emptyList": {
          "isEmptyBySearch": "We couldn't find a client with that name. Try again or create a new one",
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
        "status": "Status"
      }
  },
  "uk-UK": {
      "addNewClient": "Додати нового",
      "clientsList": {
        "searchPlaceholder": "Пошук...",
        "emptyList": {
          "isEmptyBySearch": "Нам не вдалося знайти клієнта з таким іменем. Cпробуйте ще раз або створіть нового",
          "isEmpty": "Нам не вдалося знайти жодного клієнта, створіть нового"
        }
      },
      "clientInfo": {
        "phone": "Номер телефону",
        "sex": "Стать",
        "dob": "Дата народження",
        "balance": "Баланс",
        "created": "Дата створення",
        "source": "Джерело",
        "status": "Статус"
      }
  }
}
</i18n>
