import type { CalendarEntity, ProfileEntity, ScheduleEntity } from '~/types/entities'

export const useProfileRepository = createGlobalState(() => {
  function get() {
    return $api<ProfileEntity[]>(`/profile`)
  }

  async function add(body: Partial<ProfileEntity>) {
    const data = await $api<{ user: { email: string, password: string } }>(`/profile`, {
      method: 'POST',
      body,
    })
    return data.user
  }

  async function edit(id: number, body: Partial<ProfileEntity>) {
    await $api(`/profile/${id}`, {
      method: 'PUT',
      body,
    })
  }

  function useAsPrimary(id: number) {
    return $api(`/profile/${id}/primary`, {
      method: 'PUT',
    })
  }

  function schedule(id: number, body: Partial<ScheduleEntity>[]) {
    return $api(`/profile/${id}/schedule`, {
      method: 'PUT',
      body,
    })
  }

  function calendar(id: number, body: Partial<CalendarEntity>) {
    return $api(`/profile/${id}/calendar`, {
      method: 'PUT',
      body,
    })
  }

  function language(id: number, lang: string) {
    return $api(`/profile/${id}/lang/${lang}`, { method: 'PUT' })
  }

  return {
    get,
    add,
    edit,
    useAsPrimary,
    schedule,
    calendar,
    language,
  }
})
