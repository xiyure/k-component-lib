<template>
  <div style="display: flex; gap: 1rem; flex-direction: column">
    <k-script-input v-model="text" :options="data">
      <template #prepend><k-button>Http://</k-button></template>
    </k-script-input>
    <k-script-input v-model="text" :options="data">
      <template #append><k-button>.com</k-button></template>
    </k-script-input>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const text = ref('');

const data = [
  {
    id: '051DC769F4404585A4F097D198647597',
    value: 'LoopIndex',
    fxName: 'fx(LoopIndex)',
    label: 'LoopIndex',
    name: 'LoopIndex',
    type: null,
    pid: null,
    icon: 'IconFn',
    children: [],
    _X_ROW_CHILD: []
  },
  {
    id: '24FD9C812AB448A88170E62F0EDCCEF6',
    value: 'LoopIndex2',
    fxName: 'fx(LoopIndex2)',
    label: 'LoopIndex2',
    name: 'LoopIndex',
    type: '2',
    pid: 'LoopIndex',
    icon: 'IconFn',
    children: [],
    _X_ROW_CHILD: []
  },
  {
    id: 'C5C20FD0C698406185E647197D8A8AED',
    value: 'LoopIndex3',
    fxName: 'fx(LoopIndex3)',
    label: 'LoopIndex3',
    name: 'LoopIndex',
    type: '1',
    pid: 'LoopIndex2',
    icon: 'IconFn',
    children: [],
    _X_ROW_CHILD: []
  }
];
</script>
