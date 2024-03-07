import type { CalendarEntity, ProfileEntity, ScheduleEntity } from '~/types/entities'

export const useProfileRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()
  const toast = useToast()

  function get() {
    return $api<ProfileEntity[]>(`/profile/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`)
  }

  async function add(body: Partial<ProfileEntity>) {
    try {
      const data = await $api<{ user: { email: string, password: string } }>(`/profile/${globalStore.object?.id}`, {
        method: 'POST',
        body,
      })
      return data.user
    }
    catch (e) {
      toast.add({
        title: 'Error',
        description: `Перевірте дані та спробуйте ще раз. Можливо користувач з таким email або телефоном вже існує`,
      })
    }
  }

  async function edit(id: number, body: Partial<ProfileEntity>) {
    try {
      await $api(`/profile/${globalStore.object?.id}/${id}`, {
        method: 'PUT',
        body,
      })
    }
    catch (e) {
      toast.add({
        title: 'Error',
        description: `Перевірте дані та спробуйте ще раз. Можливо користувач з таким email або телефоном вже існує`,
      })
    }
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
