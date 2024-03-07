<script setup lang="ts">
import type { ProfileEntity } from '~/types/entities'
import { ModalEmailPassAlert, ModalEmployee } from '#components'

const { t } = useI18n({
  useScope: 'local',
})
const globalStore = useGlobalStore()
const modalStore = useModalStore()
const { useAsPrimary } = useProfileRepository()
const { data, refresh } = useAsyncData(useUserRepository().get)
const selectedId = ref<number | null>(null)
const selectedUser = computed(() => data.value?.find(user => user.id === selectedId.value))

const groups = computed(() => [{
  key: 'users',
  commands: (data.value || []).map(client => ({
    id: client.id,
    label: `${client.id} ${client.email}`,
    client,
  })),
}])

function callModal(preset?: ProfileEntity) {
  modalStore.open(ModalEmployee, {
    preset,
    onSubmit(user) {
      refresh()
      if (!preset) {
        nextTick(() => {
          modalStore.open(ModalEmailPassAlert, { user })
        })
      }
    },
  })
}

function menu(item: ProfileEntity) {
  return [
    [{
      label: 'Використати',
      icon: 'i-ic-baseline-check-circle',
      click: async () => {
        await useAsPrimary(item.id)
        globalStore.getUser()
      },
    },
      //   {
      //   label: 'Виставити рахунок',
      //   icon: 'i-ic-outline-receipt-long',
      //   click: async () => {
      //     // const order = await bookingRepository.confirm(item)
      //     refresh()

    //     // modalStore.open(ModalOrder, {
    //     //   preset: order,
    //     // })
    //   },
    // }, {
    //   label: 'Відмінити',
    //   icon: 'i-ic-baseline-content-copy',
    //   click: async () => {
    //     // await bookingRepository.cancel(item)
    //     refresh()
    //   },
    //   }
    ],
  ]
}

const columns = [
  { key: 'image' },
  { key: 'name', label: 'Імʼя' },
  { key: 'roles', label: 'Ролі' },
  { key: 'createdAt', label: 'Свторено' },
  { key: 'actions' },
]

function addProfile() {
  modalStore.open(ModalEmployee, {
    user: selectedUser.value,
    onSubmit() {
      refresh()
    },
  })
}
</script>

<template>
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full pt-2">
    <div>
      <UCommandPalette
        :groups="groups"
        :autoselect="false"
        :placeholder="t('employeeList.searchPlaceholder')"
        :ui="{ emptyState: {
          wrapper: 'px-2 py-2 sm:px-2',
        } }"
        :empty-state="{
          icon: '',
          queryLabel: t('employeeList.emptyList.isEmptyBySearch'),
          label: t('employeeList.emptyList.isEmpty'),
        }"
        @update:model-value="selectedId = $event.client.id"
      />
    </div>
    <div class="pl-2">
      <template v-if="selectedUser">
        <div class="flex justify-end gap-2 p-2">
          <UButton
            icon="i-ic-baseline-create"
            size="sm"
            color="primary"
            square
            variant="solid"
            :label="t('addNew')"
            @click="addProfile"
          />
        </div>
        <UTable :rows="selectedUser.associatedProfiles || []" :columns="columns">
          <template #image-data="{ row }">
            <base-image :src="row.image" width="32" height="32" />
          </template>
          <template #name-data="{ row }">
            {{ row.firstName }} {{ row.lastName }}
          </template>
          <template #createdAt-data="{ row }">
            <base-datetime :date="row.createdAt" />
          </template>
          <template #roles-data="{ row }">
            <span class="flex gap-2 flex-wrap mt-2">
              <UBadge v-for="role in row.roles" :key="role.name" :label="role.name" variant="subtle" />
            </span>
          </template>
          <template #actions-data="{ row }">
            <UDropdown :items="menu(row)">
              <UButton color="gray" variant="ghost" icon="i-ic-outline-more-horiz" />
            </UDropdown>
          </template>
        </UTable>
      </template>
    </div>
  </div>
</template>
