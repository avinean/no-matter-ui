import type { BookingEntity, OrderEntity, ProfileEntity, ServiceEntity } from '~/types/entities'

export const useBookingRepository = createGlobalState(() => {
  const toast = useToast()

  function get() {
    return $api<BookingEntity[]>(`/booking`)
  }

  function add(body: Partial<BookingEntity>) {
    try {
      return $api(`/booking`, {
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
      return $api(`/booking/${id}`, {
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

  function profiles(body: Partial<BookingEntity>) {
    return $api<ProfileEntity[]>(
      `/booking/profiles`,
      {
        method: 'POST',
        body: {
          services: body.services?.map(({ service }) => service),
        },
      },
    )
  }
  function services(body: Partial<BookingEntity>) {
    return $api<ServiceEntity[]>(
      `/booking/services`,
      { method: 'POST', body },
    )
  }
  function timeslots(body: Partial<BookingEntity>) {
    return $api<any[]>(
      `/booking/timeslots`,
      { method: 'POST', body },
    )
  }

  function confirm({ id }: BookingEntity) {
    return $api<OrderEntity>(`/booking/${id}/confirm`, {
      method: 'PUT',
    })
  }

  function cancel({ id }: BookingEntity) {
    return $api(`/booking/${id}/cancel`, {
      method: 'PUT',
    })
  }

  return {
    get,
    add,
    edit,
    profiles,
    services,
    timeslots,
    confirm,
    cancel,
  }
})
