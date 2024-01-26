export const useModalStore = defineStore('modal', () => {
  const props = ref()
  const component = ref('')

  function open(_component: any, _props: any) {
    component.value = _component

    props.value = _props
  }

  function close() {
    props.value = null
    component.value = ''
  }

  return {
    props,
    component,
    open,
    close,
  }
})
