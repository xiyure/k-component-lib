<template>
  <div class="m-4">
    <p>default</p>
    <k-select
      v-model="value1"
      multiple
      placeholder="Select"
      style="width: 240px"
    >
      <k-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </k-select>
  </div>
  <div class="m-4">
    <p>use collapse-tags</p>
    <k-select
      v-model="value2"
      multiple
      collapse-tags
      placeholder="Select"
      style="width: 240px"
    >
      <k-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </k-select>
  </div>
  <div class="m-4">
    <p>use collapse-tags-tooltip</p>
    <k-select
      v-model="value3"
      multiple
      collapse-tags
      collapse-tags-tooltip
      placeholder="Select"
      style="width: 240px"
    >
      <k-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </k-select>
  </div>
  <div class="m-4">
    <p>use max-collapse-tags</p>
    <k-select
      v-model="value4"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="3"
      placeholder="Select"
      style="width: 240px"
    >
      <k-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </k-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref([])
const value2 = ref([])
const value3 = ref([])
const value4 = ref([])
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>
