<script setup lang="ts">
import { ModalRole } from '#components'
import type { PermissionEntity, RoleEntity } from '~/types/entities'
import type { Action, Resource } from '~/types/permissions'
import type { DeepPartial } from '~/types/utils'

const { t } = useI18n({
  useScope: 'local',
})
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
  const role: DeepPartial<RoleEntity> = {
    ...selected.value!,
    assignedPermissions: permissions.value.map((permission) => {
      const [_, resourceType, actionType] = permission.split(':') as [string, Resource, Action]
      return { actionType, resourceType } satisfies Partial<PermissionEntity>
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
      title: t('form.formNotifications.accessTitle'),
      description: t('form.formNotifications.accessDesc'),
    })
  }
  catch (e) {
    toast.add({
      title: t('form.formNotifications.errorTitle'),
      description: t('form.formNotifications.errorDesc'),
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
        :label="t('addNewRole')"
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
        :placeholder="t('rolesList.searchPlaceholder')"
        :empty-state="{
          icon: '',
          queryLabel: t('rolesList.emptyList.isEmptyBySearch'),
          label: t('rolesList.emptyList.isEmpty'),
        }"
        @update:model-value="select($event.role)"
      />
    </div>
    <div v-if="selected && !loading" class="w-full p-2 space-y-2">
      <h2 class="font-bold text-2xl">
        {{ t('role') }}: {{ selected.name }}
      </h2>
      <UTable
        :columns="[
          {
            key: 'value',
            label: t('permissionColumns.value'),
          },
          {
            key: 'read',
            label: t('permissionColumns.read'),
          },
          {
            key: 'add',
            label: t('permissionColumns.add'),
          },
          {
            key: 'edit',
            label: t('permissionColumns.edit'),
          },
          {
            key: 'delete',
            label: t('permissionColumns.delete'),
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
          :label="$t('default.forms.actions.cancel') "
        />
        <UButton
          icon="i-ic-baseline-save"
          :label="$t('default.forms.actions.submit') "

          @click="setPermissions"
        />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
      "role": "Role",
      "addNewRole": "Add a new role",
      "rolesList": {
        "searchPlaceholder": "Search...",
        "emptyList": {
          "isEmptyBySearch": "We couldn't find any roles with that name. Please try another name or create new",
          "isEmpty": "We could not find any roles, please create a new one"
        }

      },
      "form": {
        "formNotifications": {
          "accessTitle": "Success!",
          "accessDesc": "Permissions successfully updated",
          "errorTitle": "Something went wrong",
          "errorDesc": "Please try again or contact support"
        }
      },
      "permissionColumns": {
        "value": "Resource",
        "read": "View records",
        "add": "Add records",
        "edit": "Edit records",
        "delete": "Delete records"
      }
  },
  "uk-UK": {
      "role": "Роль",
      "addNewRole": "Додати нову роль",
      "rolesList": {
        "searchPlaceholder": "Пошук...",
        "emptyList": {
          "isEmptyBySearch": "Нам не вдалося знайти роль з такою назвою. Будь ласка, спробуйте іншу, або створіть нову",
          "isEmpty": "Нам не вдалося знайти жодної ролі, створіть нову"
        }
      },
      "form": {
        "formNotifications": {
          "accessTitle": "Вдалося!",
          "accessDesc": "Дозволи успішно оновлено",
          "errorTitle": "Щось пішло не так"
        }
      },
      "permissionColumns": {
        "value": "Ресурс",
        "read": "Переглядати записи",
        "add": "Додавати записи",
        "edit": "Редагувати записи",
        "delete": "Видаляти записи"
      }

  }
}
</i18n>
