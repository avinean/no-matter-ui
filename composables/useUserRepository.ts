import type { UserEntity } from '~/types/entities'

export const useUserRepository = createGlobalState(() => {
  const globalStore = useGlobalStore()

  function get() {
    return $api<UserEntity[]>(`/user/${globalStore.user?.id}`)
  }

  return {
    get,
  }
})
