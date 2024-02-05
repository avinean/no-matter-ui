interface Suggestion {
  label: string
  value: string
}

type Key = 'contactTypes'
  | 'materialTransactionTypes'
  | 'roles'
  | 'sexes'
  | 'profileConnectionTypes'

const endpoints = {
  contactTypes: '/suggestion/contact-types',
  materialTransactionTypes: '/suggestion/material-transaction-types',
  roles: '/suggestion/roles',
  sexes: '/suggestion/sexes',
  profileConnectionTypes: '/suggestion/profile-connection-types',
}

export const useSuggestionsStore = defineStore('suggestions', () => {
  const suggestions = ref<Record<Key, Suggestion[]>>({
    contactTypes: [],
    materialTransactionTypes: [],
    roles: [],
    sexes: [],
    profileConnectionTypes: [],
  })

  const loading = ref({
    contactTypes: false,
    materialTransactionTypes: false,
    roles: false,
    sexes: false,
    profileConnectionTypes: false,
  })

  function get(s: Key | Key[]) {
    [s].flat().forEach((suggestion) => {
      if (suggestions.value[suggestion].length)
        return

      loading.value[suggestion] = true
      $api<Suggestion[]>(endpoints[suggestion]).then((data) => {
        suggestions.value[suggestion] = data
        loading.value[suggestion] = false
      })
    })
  }

  return {
    suggestions,
    loading,
    get,
  }
})
