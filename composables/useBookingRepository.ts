import type { BookingEntity, ProfileEntity, ServiceEntity } from '~/types/entities'

export const useBookingRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()
  const toast = useToast()

  function get() {
    return $api<BookingEntity[]>(`/booking/${globalStore.object?.id || globalStore.user?.employers[0]?.id}`)
  }

  function add(body: Partial<BookingEntity>) {
    try {
      return $api(`/booking/${globalStore.object?.id}`, {
        method: 'POST',
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

  function edit(id: number, body: Partial<BookingEntity>) {
    try {
      return $api(`/booking/${globalStore.object?.id}/${id}`, {
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

  function profiles(body: any) { // TODO
    return $api<ProfileEntity[]>(
      `/booking/${globalStore.object?.id}/profiles`,
      { method: 'POST', body },
    )
  }
  function services(body: any) { // TODO
    return $api<ServiceEntity[]>(
      `/booking/${globalStore.object?.id}/services`,
      { method: 'POST', body },
    )
  }
  function timeslots(body: any) { // TODO
    return $api<any[]>(
      `/booking/${globalStore.object?.id}/timeslots`,
      { method: 'POST', body },
    )
  }

  return {
    get,
    add,
    edit,
    profiles,
    services,
    timeslots,
  }
})
