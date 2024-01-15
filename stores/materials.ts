import type { Material, v } from '#types/entities'

export const useMaterialsStore = defineStore('materials', () => {
  const loading = ref(false)
  const updating = ref(false)
  const items = ref<Material[]>([])
  const transactions = ref<MaterialTransaction[]>([])

  async function get() {
    if (items.value.length) return
    loading.value = true
    items.value = await $fetch<Material[]>('/api/materials', {
      headers: {
        Authorization: `Bearer ${useCookie('sraka').value}`,
      },
    })
    loading.value = false
  }

  async function getTransactions() {
    if (transactions.value.length) return
    loading.value = true
    transactions.value = await $fetch<MaterialTransaction[]>('/api/materials-transactions', {
      headers: {
        Authorization: `Bearer ${useCookie('sraka').value}`,
      },
    })
    
    loading.value = false
  }


  async function create(material: Partial<Material>) {
    updating.value = true
    const response = await $fetch<Material>('/api/materials', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useCookie('sraka').value}`,
      },
      body: JSON.stringify(material),
    })
    items.value.push(response)
    updating.value = false
  }

  async function createTransaction(transaction: Partial<MaterialTransaction>) {
    updating.value = true
    const response = await $fetch<MaterialTransaction>('/api/materials-transactions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useCookie('sraka').value}`,
      },
      body: JSON.stringify(transaction),
    })
    
    transactions.value.unshift(response)
    updating.value = false

    items.value = items.value.map((item) => {
      const _item = {...item}
      if (_item.id === transaction.materialId) {
        if (!transaction.type) {
          _item.quantity += transaction.quantity
        } else {
          _item.quantity -= transaction.quantity
        }
      }
      return _item
    })
  }

  return {
    loading,
    updating,
    items,
    transactions,
    get,
    getTransactions,
    create,
    createTransaction
  }
})