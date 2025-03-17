<template>
  <k-slider-button :items="value" active="btn1"></k-slider-button>
</template>

<script lang="ts" setup>

const value = [
  {
    label: '按钮1',
    name: 'btn1'
  },
  {
    label: '按钮2',
    name: 'btn2'
  },
  {
    label: '按钮3',
    name: 'btn3'
  }
];
</script>
