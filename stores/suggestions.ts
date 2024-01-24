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
  contactTypes: '/suggestions/contact-types',
  materialTransactionTypes: '/suggestions/material-transaction-types',
  roles: '/suggestions/roles',
  sexes: '/suggestions/sexes',
  profileConnectionTypes: '/suggestions/profile-connection-types',
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

  function get(suggestion: Key) {
    if (suggestions.value[suggestion].length)
      return

    loading.value[suggestion] = true
    $api<Suggestion[]>(endpoints[suggestion]).then((data) => {
      suggestions.value[suggestion] = data
      loading.value[suggestion] = false
    })
  }

  return {
    suggestions,
    loading,
    get,
  }
})
