import { MaybeRef, unref, watch } from 'vue';

type DeprecationParam = {
  from: string
  replacement: string
  scope: string
  version: string
  ref?: string
  type?: 'API' | 'Attribute' | 'Event' | 'Slot'
}

export const useDeprecated = (
  { from, replacement, scope, version, ref, type = 'API' }: DeprecationParam,
  condition: MaybeRef<boolean>
) => {
  watch(
    () => unref(condition),
    (val) => {
      if (val) {
        console.warn(
          `${scope}[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail ${ref ? ', please visit:' + ref : '.'}
`
        )
      }
    },
    {
      immediate: true,
    }
  )
}