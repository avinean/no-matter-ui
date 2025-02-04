import type { BusinessEntity, CalendarEntity, ScheduleEntity } from '~/types/entities'

export const useBusinessObjectRepository = createGlobalState(() => {
  const globalStore = useGlobalStore();
  
  async function add(body: Partial<BusinessEntity>) {
    await $api(`/business-object`, {
      method: 'POST',
      body,
    })
  }

  async function edit(id: number, body: Partial<BusinessEntity>) {
    await $api(`/business-object/${id}`, {
      method: 'PUT',
      body,
    })
  }

  async function useAsPrimary(id: number) {
    await $api(`/business-object/${id}/primary`, {
      method: 'PUT',
    });
    await globalStore.refreshToken();
  }

  function schedule(id: number, body: Partial<ScheduleEntity>[]) {
    return $api(`/business-object/${id}/schedule`, {
      method: 'PUT',
      body,
    })
  }

  function calendar(id: number, body: Partial<CalendarEntity>) {
    return $api(`/business-object/${id}/calendar`, {
      method: 'PUT',
      body,
    })
  }

  return {
    add,
    edit,
    useAsPrimary,
    schedule,
    calendar,
  }
})
