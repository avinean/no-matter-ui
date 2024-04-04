import type { CalendarEntity, ProfileEntity, ScheduleEntity } from '~/types/entities'

export const useProfileRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()

  function get() {
    return $api<ProfileEntity[]>(`/profile/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`)
  }

  async function add(body: Partial<ProfileEntity>) {
    const data = await $api<{ user: { email: string, password: string } }>(`/profile/${globalStore.object?.id}`, {
      method: 'POST',
      body,
    })
    return data.user
  }

  async function edit(id: number, body: Partial<ProfileEntity>) {
    await $api(`/profile/${globalStore.object?.id}/${id}`, {
      method: 'PUT',
      body,
    })
  }

  function useAsPrimary(id: number) {
    return $api(`/profile/${globalStore.object?.id}/${id}/primary`, {
      method: 'PUT',
    })
  }

  function schedule(id: number, body: Partial<ScheduleEntity>[]) {
    return $api(`/profile/${globalStore.object?.id}/${id}/schedule`, {
      method: 'PUT',
      body,
    })
  }

  function calendar(id: number, body: Partial<CalendarEntity>) {
    return $api(`/profile/${globalStore.object?.id}/${id}/calendar`, {
      method: 'PUT',
      body,
    })
  }

  function language(id: number, lang: string) {
    return $api(`/profile/${globalStore.object?.id}/${id}/lang/${lang}`, { method: 'PUT' })
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
