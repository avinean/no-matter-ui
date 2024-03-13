export default defineAppConfig({
  nuxtIcon: {},
  ui: {
    primary: 'orange',
    icons: ['goole mat'],
    avatar: {
      rounded: 'rounded-sm',
    },
    card: {
      body: {
        base: 'flex-1'
      },
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    },
    commandPalette: {
      group: {
        command: {
          avatar: {
            size: 'sm',
          },
        },
      },
    },
    notifications: {
      position: 'top-10 bottom-auto',
    },
    table: {
      th: {
        padding: 'py-1 px-2',
      },
      td: {
        padding: 'py-1 px-2',
      },
    },
  },
})
