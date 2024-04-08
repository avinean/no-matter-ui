import type { BusinessEntity } from '~/types/entities'

export const useBusinessRepository = createGlobalState(() => {
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

  function useAsPrimary(id: number) {
    return $api(`/business/${id}/primary`, {
      method: "PUT",
    });
  }

  return {
    add,
    edit,
    useAsPrimary,
  };
})
