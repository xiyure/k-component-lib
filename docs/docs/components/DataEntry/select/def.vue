<template>
  <div class="flex gap-1 items-end">
  <k-select
    v-model="value"
    class="m-2"
    placeholder="Select"
    size="large"
    style="width: 240px"
  >
    <k-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </k-select>
  <k-select
    v-model="value"
    class="m-2"
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
  <k-select
    v-model="value"
    class="m-2"
    placeholder="Select"
    size="small"
    style="width: 240px"
  >
    <k-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </k-select></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
];
</script>
