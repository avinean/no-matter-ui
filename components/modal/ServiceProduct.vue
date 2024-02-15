<script lang="ts" setup>
import type { ServiceEntity } from '~/types/entities';

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

const loading = ref(false)
const serviceProduct: Partial<ServiceEntity> = reactive({
  name: props.preset?.name,
  description: props.preset?.description,
  type: props.preset?.type,
  price: props.preset?.price,
  duration: props.preset?.duration,
  discount: props.preset?.discount,
})

async function onCreateOrUpdate() {
  if (props.preset?.id)
    await edit(props.preset.id, serviceProduct)
  else
    await add(serviceProduct)

  emit('submit')
}
</script>

<template>
  <UForm
    :state="serviceProduct"
    class="grid grid-cols-2 gap-x-4 gap-y-2"
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
      <UInput v-model="serviceProduct.name" />
    </UFormGroup>

    <UFormGroup
      label="Опис"
      name="description"
    >
      <UTextarea v-model="serviceProduct.description" />
    </UFormGroup>

    <UFormGroup
      label="Ціна"
      name="price"
      required
    >
      <UInput v-model="serviceProduct.price" type="number" />
    </UFormGroup>

    <UFormGroup
      label="Тривалість"
      name="duration"
      required
    >
      <UInput v-model="serviceProduct.duration" type="number" />
    </UFormGroup>

    <UFormGroup
      label="Знижка"
      name="discount"
    >
      <UInput v-model="serviceProduct.discount" type="number" />
    </UFormGroup>

    <UButton
      :loading
      type="submit"
    >
      Submit
    </UButton>
  </UForm>
</template>
