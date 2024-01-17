import type { User } from '#types/entities'

export const useUsersStore = defineStore('users', () => {
  const items = ref<User[]>([])

  async function get() {
    if (items.value.length) return
    items.value = await useApi<User[]>('/users')
  }

  return {
    items,
    get
  }
})