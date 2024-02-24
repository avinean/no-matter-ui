<script lang="ts" setup>
import type { ServiceEntity } from '~/types/entities'
const { t } = useI18n({
  useScope: 'local',
})
const props = withDefaults(defineProps<{
  preset?: ServiceEntity | null
  type: 'product' | 'service'
}>(), {
  preset: null,
  type: 'service',
})

const emit = defineEmits<{
  submit: []
}>()

defineExpose({
  title: computed(() => props.preset?.id ? t('edit', {type: props.type === 'product' ? t('product') : t('service')} ) : t('create', {type: props.type === 'product' ? t('product') : t('service')})),
})

const { add, edit } = props.type === 'product'
  ? useProductRepository()
  : useServiceRepository()
const { get } = useMaterialRepository()
const { data: materials } = useAsyncData(() => get())

const state: Partial<ServiceEntity> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  type: props.preset?.type,
  price: props.preset?.price,
  duration: props.preset?.duration,
  discount: props.preset?.discount,
  spending: props.preset?.spending || [],
})

const serviceMaterials = computed({
  get() {
    return state.spending?.map(({ material }) => material.id)
  },
  set(ids) {
    if (!materials.value)
      return
    state.spending = ids?.map<ServiceEntity['spending'][number]>(id => ({
      // @ts-expect-error idk
      material: materials.value?.find(({ id: materialId }) => materialId === id),
      quantity: state.spending?.find(({ material }) => material.id === id)?.quantity || 1,
    }))
  },
})

const columns = [
  {
    key: 'name',
    label: t('columns.name'),
  },
  {
    key: 'description',
    label: t('columns.description'),
  },
  {
    key: 'unit',
    label: t('columns.unit'),
  },
  {
    key: 'quantity',
    label: t('columns.quantity'),
  },
]

async function onCreateOrUpdate() {
  if (props.preset?.id)
    await edit(props.preset.id, state)
  else
    await add(state)

  emit('submit')
}
</script>

<template>
  <UForm
    :state="state"
    class="grid gap-y-2"
    @submit="onCreateOrUpdate"
  >
    <UFormGroup
      :label="t('form.name')"
      name="name"
      required
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
        :label="t('form.description')"
        name="description"
    >
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UFormGroup
        :label="t('form.price')"
        name="price"
      required
    >
      <UInput v-model="state.price" type="number" />
    </UFormGroup>

    <UFormGroup
        :label="t('form.duration')"
        name="duration"
      required
    >
      <UInput v-model="state.duration" type="number" />
    </UFormGroup>

    <UFormGroup
        :label="t('form.discount')"
        name="discount"
    >
      <UInput v-model="state.discount" type="number" />
    </UFormGroup>

    <UFormGroup
        :label="t('form.materials')"
        name="materials"
    >
      <USelectMenu
        v-if="materials"
        v-model="serviceMaterials"
        :options="materials"
        multiple
        searchable
        option-attribute="name"
        value-attribute="id"
        selected-icon="i-ic-round-check"
      />

      <UTable v-if="state.spending?.length" :rows="state.spending" :columns="columns">
        <template #name-data="{ row }">
          {{ row.material.name }}
        </template>
        <template #description-data="{ row }">
          {{ row.material.description }}
        </template>
        <template #unit-data="{ row }">
          {{ row.material.unit }}
        </template>
        <template #quantity-data="{ row }">
          <UInput v-model="row.quantity" type="number" />
        </template>
      </UTable>
    </UFormGroup>

    <UButton
      type="submit"
    >
      {{$t('default.forms.actions.create')}}
    </UButton>
  </UForm>
</template>


<i18n lang="json">
{
  "en-US": {
    "service": "service",
    "product": "product",
    "edit": "Edit {type}",
    "create": "Create {type}",
    "form": {
      "name": "Name",
      "description": "Description",
      "price": "Price",
      "duration": "Duration",
      "discount": "Discount",
      "materials": "Materials"
    },
    "columns": {
      "name": "Name",
      "description": "Description",
      "unit": "Units",
      "quantity": "Quantity"
    }
  },
  "uk-UK": {
    "service": "послугу",
    "product": "товар",
    "edit": "Редагувати {type}",
    "create": "Створити {type}",
    "form": {
      "name": "Назва",
      "description": "Опис",
      "price": "Ціна",
      "duration": "Тривалість",
      "discount": "Знижка",
      "materials": "Матеріали"
    },
    "columns": {
      "name": "Назва",
      "description": "Опис",
      "unit": "Одиниці вимірювання",
      "quantity": "Кількість"
    }
  }
}
</i18n>
