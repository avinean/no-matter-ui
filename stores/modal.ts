export const useModalStore = defineStore('modal', () => {
  const modals = ref<{
    component: any
    contentProps: any
  }[]>([])

  function open(_component: any, _contentProps?: any, _wrapperProps?: any) {
    modals.value.push({
      component: _component,
      contentProps: _contentProps,
    })
  }

  function close() {
    modals.value.pop()
  }

  return {
    modals,
    open,
    close,
  }
})
