import type { Component } from 'vue'

type Props<T> = T extends new () => { $props: infer P, $emit: infer E } ? NonNullable<P> & { [K in keyof NonNullable<E> as `on${Capitalize<string & K>}`]: NonNullable<E>[K] } :
  T extends (props: infer P, ctx: { slots: any, attrs: any, emit: infer E }, ...args: any) => any ? P & { [K in keyof NonNullable<E> as `on${Capitalize<string & K>}`]: NonNullable<E>[K] } :
    {}

export const useModalStore = defineStore('modal', () => {
  const modals = ref<{
    component: any
    contentProps: any
  }[]>([])

  function open<T extends Component>(_component: T, _props?: Props<T>) {
    modals.value.push({
      component: _component,
      contentProps: _props,
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
