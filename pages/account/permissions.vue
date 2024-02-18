<script setup lang="ts">
import { ModalRole } from '#components'
import type { RoleEntity } from '~/types/entities'

const toast = useToast()
const globalStore = useGlobalStore()
const modalStore = useModalStore()
const store = useSuggestionsStore()
store.get('roles')
store.get('resources')
store.get('actions')
const loading = computed(() => store.loading.actions || store.loading.resources || store.loading.roles)

const { data, refresh } = useApi<RoleEntity[]>(`/role/${globalStore.business?.id}`)

const selected = ref<RoleEntity | null>(null)

const groups = computed(() => [{
  key: 'roles',
  commands: (data.value || []).map(role => ({
    id: role.id,
    label: role.name,
    role,
  })),
}])

const permissions = ref<string[]>([])

function callModal(preset?: RoleEntity) {
  modalStore.open(ModalRole, {
    preset,
    onSubmit() {
      refresh()
    },
  })
}

async function setPermissions() {
  const role = {
    ...selected.value!,
    permissions: permissions.value.map((permission) => {
      const [name, resource, action] = permission.split(':')
      return { name, resource, action }
    }),
  }

  try {
    await $api(`/role/${globalStore.business?.id}/${role.id}`, {
      method: 'PUT',
      body: role,
    }).then(() => {
      refresh()
    })

    toast.add({
      title: 'Вдалося!',
      description: `Дозволи успішно оновлено`,
    })
  }
  catch (e) {
    toast.add({
      title: 'Щось пішло не так',
      description: `Повторіть спробу та звʼяжіться зі службою підтримки`,
    })
  }
}

function select(role: RoleEntity) {
  selected.value = role
  permissions.value = role.assignedPermissions.map(({ resourceType, actionType }) => `${role.name}:${resourceType}:${actionType}`) || []
}
</script>

<template>
  <div class="grid md:grid-cols-[200px,1fr] gap-2 divide-x min-h-full">
    <div class="p-2">
      <UButton
        :label="$t('account.permissions.addNewRole')"
        icon="i-ic-outline-contact-phone"
        class="w-full"
        @click="callModal()"
      />
      <UCommandPalette
        :ui="{ emptyState: {
          wrapper: 'px-2 py-4 sm:px-2',
        } }"
        :groups="groups"
        :autoselect="false"
        :placeholder="$t('account.permissions.rolesList.searchPlaceholder')"
        :empty-state="{
          icon: '',
          queryLabel: $t('account.permissions.rolesList.emptyList.isEmptyBySearch'),
          label: $t('account.permissions.rolesList.emptyList.isEmpty'),
        }"
        @update:model-value="select($event.role)"
      />
    </div>
    <div v-if="selected && !loading" class="w-full p-2 space-y-2">
      <h2 class="font-bold text-2xl">
        {{ $t('account.permissions.role') }}: {{ selected.name }}
      </h2>
      <UTable
        :columns="[
          {
            key: 'value',
            label: $t('account.permissions.permissionColumns.value'),
          },
          {
            key: 'read',
            label: $t('account.permissions.permissionColumns.read'),
          },
          {
            key: 'add',
            label: $t('account.permissions.permissionColumns.add'),
          },
          {
            key: 'edit',
            label: $t('account.permissions.permissionColumns.edit'),
          },
          {
            key: 'delete',
            label: $t('account.permissions.permissionColumns.delete'),
          },
        ]"
        :rows="store.suggestions.resources"
      >
        <template v-for="(action, key) in store.suggestions.actions" :key="key" #[`${action.value}-data`]="{ row }">
          <UCheckbox
            v-model="permissions"
            :value="`${selected.name}:${row.value}:${action.value}`"
          />
        </template>
      </UTable>
      <div class="flex  gap-2 p-2">
        <UButton
          color="gray"
          icon="i-ic-baseline-cancel"
          :label="$t('account.permissions.form.cancel') "
        />
        <UButton
          icon="i-ic-baseline-save"
          :label="$t('account.permissions.form.submit') "

          @click="setPermissions"
        />
      </div>
    </div>
  </div>
</template>
