import type { BusinessEntity } from '~/types/entities'

export const useBusinessRepository = createGlobalState(() => {
  const globalStore = useGlobalStore();
  async function add(body: Partial<BusinessEntity>) {
    await $api(`/business`, {
      method: 'POST',
      body,
    })
  }

  async function edit(id: number, body: Partial<BusinessEntity>) {
    await $api(`/business/${id}`, {
      method: 'PUT',
      body,
    })
  }

  async function useAsPrimary(id: number) {
    await $api(`/business/${id}/primary`, {
      method: 'PUT',
    });
    await globalStore.refreshToken();
  }

  return {
    add,
    edit,
    useAsPrimary,
  };
})
