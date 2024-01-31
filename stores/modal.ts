export const useModalStore = defineStore('modal', () => {
  const contentProps = ref()
  const wrapperProps = ref()
  const component = ref('')

  function open(_component: any, _contentProps?: any, _wrapperProps?: any) {
    component.value = _component

    contentProps.value = _contentProps
    wrapperProps.value = _wrapperProps
  }

  function close() {
    contentProps.value = null
    wrapperProps.value = null
    component.value = ''
  }

  return {
    contentProps,
    wrapperProps,
    component,
    open,
    close,
  }
})
