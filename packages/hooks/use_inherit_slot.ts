import { computed, Slots } from "vue";

export function useInheritSlot(excludes: (string | number)[]) {
  const excludesSet = new Set(excludes);

  const inheritSlots = computed(() => (slots: Slots) => {
    const newSlots = {};
    for (const name in slots) {
      if (!excludesSet.has(name)) {
        newSlots[name] = slots[name];
      }
    }
    return newSlots;
  });

  return inheritSlots;
}