import { computed } from "vue";

export function useInheritSlot<const T extends PropertyKey>(excludes: T[]) {
  const excludesSet = new Set<T>(excludes)

  const inheritSlots = computed(() => <const U extends Record<PropertyKey, any>>(slots: U) => {
    const newSlots = {} as Omit<U, T>
    for (const name in slots) {
      if (!excludesSet.has(name)) {
        newSlots[name] = slots[name]
      }
    }
    return newSlots
  })

  return inheritSlots;
}