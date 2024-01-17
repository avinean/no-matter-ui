import type { Material, MaterialTransaction } from '#types/entities'

export const useMaterialsStore = defineStore('materials', () => {
  const loading = ref(false)
  const updating = ref(false)
  const items = ref<Material[]>([])
  const transactions = ref<MaterialTransaction[]>([])

  async function get() {
    if (items.value.length) return
    loading.value = true
    items.value = await useApi<Material[]>('/materials')
    loading.value = false
  }

  async function getTransactions() {
    if (transactions.value.length) return
    loading.value = true
    transactions.value = await useApi<MaterialTransaction[]>('/materials/transactions')
    
    loading.value = false
  }


  async function create(material: Partial<Material>) {
    updating.value = true
    const response = await useApi<Material>('/materials', {
      method: 'POST',
      body: material,
    })
    items.value.push(response)
    updating.value = false
  }

  async function createTransaction(transaction: Partial<MaterialTransaction>) {
    updating.value = true
    const response = await useApi<MaterialTransaction>('/materials/transactions', {
      method: 'POST',
      body: transaction
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