import type { BusinessEntity } from '~/types/entities'

export const useBusinessRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()

  async function add(body: Partial<BusinessEntity>) {
    await $api(`/business/${globalStore.user?.id}`, {
      method: 'POST',
      body,
    })
  }

  async function edit(id: number, body: Partial<BusinessEntity>) {
    await $api(`/business/${globalStore.user?.id}/${id}`, {
      method: 'PUT',
      body,
    })
  }

  return {
    add,
    edit,
  }
})
