interface Suggestion {
  label: string
  value: string
}

type Key = 'contactTypes'
  | 'materialTransactionTypes'
  | 'roles'
  | 'sexes'
  | 'profileConnectionTypes'
  | 'resources'
  | 'actions'

const endpoints = {
  contactTypes: '/suggestion/contact-types',
  materialTransactionTypes: '/suggestion/material-transaction-types',
  sexes: '/suggestion/sexes',
  profileConnectionTypes: '/suggestion/profile-connection-types',
  roles: '/suggestion/roles',
  resources: '/suggestion/resources',
  actions: '/suggestion/actions',
}

export const useSuggestionsStore = defineStore('suggestions', () => {
  const suggestions = ref<Record<Key, Suggestion[]>>({
    contactTypes: [],
    materialTransactionTypes: [],
    sexes: [],
    profileConnectionTypes: [],
    roles: [],
    resources: [],
    actions: [],
  })

  const loading = ref({
    contactTypes: false,
    materialTransactionTypes: false,
    sexes: false,
    profileConnectionTypes: false,
    roles: false,
    resources: false,
    actions: false,
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
