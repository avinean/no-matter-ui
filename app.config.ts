export default defineAppConfig({
  nuxtIcon: {},
  ui: {
    primary: 'slate',
    icons: ['goole mat'],
    avatar: {
      rounded: 'rounded-sm',
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
