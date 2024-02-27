import type { BusinessEntity, CalendarEntity, ScheduleEntity } from '~/types/entities'

export const useBusinessObectRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()

  async function add(body: Partial<BusinessEntity>) {
    await $api(`/business-object/${globalStore.user?.id}/${globalStore.business?.id}`, {
      method: 'POST',
      body,
    })
  }

  async function edit(id: number, body: Partial<BusinessEntity>) {
    await $api(`/business-object/${globalStore.user?.id}/${globalStore.business?.id}`, {
      method: 'PUT',
      body,
    })
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
    schedule,
    calendar,
  }
})