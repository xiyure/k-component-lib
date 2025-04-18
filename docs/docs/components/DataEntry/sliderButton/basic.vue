<template>
  <k-slider-button :items="value" v-model="active"></k-slider-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref('btn1');

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
