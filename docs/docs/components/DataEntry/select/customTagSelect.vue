<template>
  <k-select v-model="value" multiple placeholder="Select" style="width: 240px">
    <k-option
      v-for="item in colors"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <div class="flex items-center">
        <k-tag :color="item.value" style="margin-right: 8px" size="small" />
        <span :style="{ color: item.value }">{{ item.label }}</span>
      </div>
    </k-option>
    <template #tag>
      <k-tag v-for="color in value" :key="color" :color="color" />
    </template>
  </k-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string[]>([]);
const colors = ref([
  {
    value: '#E63415',
    label: 'red',
  },
  {
    value: '#FF6600',
    label: 'orange',
  },
  {
    value: '#FFDE0A',
    label: 'yellow',
  },
  {
    value: '#1EC79D',
    label: 'green',
  },
  {
    value: '#14CCCC',
    label: 'cyan',
  },
  {
    value: '#4167F0',
    label: 'blue',
  },
  {
    value: '#6222C9',
    label: 'purple',
  },
])
colors.value.forEach((color) => {
  value.value.push(color.value)
})
</script>

<style scoped>
.k-tag {
  border: none;
  aspect-ratio: 1;
}
</style>
