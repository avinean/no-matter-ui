<script lang="ts" setup>
import type { ServiceEntity } from '~/types/entities'

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
    label: 'Назва',
  },
  {
    key: 'description',
    label: 'Опис',
  },
  {
    key: 'unit',
    label: 'Одиниці вимірювання',
  },
  {
    key: 'quantity',
    label: 'Кількість',
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
    <h1 class="text-3xl font-bold">
      Додати {{ props.type === 'product' ? 'товар' : 'послугу' }}
    </h1>
    <UFormGroup
      label="Назва"
      name="name"
      required
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
      label="Опис"
      name="description"
    >
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UFormGroup
      label="Ціна"
      name="price"
      required
    >
      <UInput v-model="state.price" type="number" />
    </UFormGroup>

    <UFormGroup
      label="Тривалість"
      name="duration"
      required
    >
      <UInput v-model="state.duration" type="number" />
    </UFormGroup>

    <UFormGroup
      label="Знижка"
      name="discount"
    >
      <UInput v-model="state.discount" type="number" />
    </UFormGroup>

    <UFormGroup
      label="Матеріали"
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
      Submit
    </UButton>
  </UForm>
</template>
