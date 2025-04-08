import { defineComponent, inject } from 'vue'
import { isEqual } from 'lodash-unified'
import { selectKey } from 'element-plus'
import type { Component, VNode, VNodeNormalizedChildren } from 'vue'

export default defineComponent({
  name: 'KOptions',
  setup(_, { slots }) {
    const select = inject(selectKey)
    let cachedValueList: any[] = []

    return () => {
      const children = slots.default?.()!
      const valueList: any[] = []

      function filterOptions(children?: VNodeNormalizedChildren) {
        if (!Array.isArray(children)) return
        ;(children as VNode[]).forEach((item) => {
          const name = ((item?.type || {}) as Component)?.name

          if (name === 'KOptionGroup') {
            filterOptions(
             typeof item.children !== 'string' &&
                !Array.isArray(item.children) &&
                typeof item.children?.default === 'function'
                ? item.children?.default()
                : item.children
            )
          } else if (name === 'KOption') {
            valueList.push(item.props?.value)
          } else if (Array.isArray(item.children)) {
            filterOptions(item.children)
          }
        })
      }

      if (children.length) {
        filterOptions(children[0]?.children)
      }

      if (!isEqual(valueList, cachedValueList)) {
        cachedValueList = valueList
        if (select) {
          select.states.optionValues = valueList
        }
      }

      return children
    }
  },
})
