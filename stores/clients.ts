
export const useUsersStore = defineStore('clients', () => {
  const items = ref([])

  async function get() {
    if (items.value.length) return
    items.value = await useApi('/users')
  }

  return {
    items,
    get
  }
})