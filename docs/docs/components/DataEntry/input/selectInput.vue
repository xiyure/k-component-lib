<template>
  <k-input v-model="input" :options="options" style="width: 240px" placeholder="请输入..." selectable />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('');

const options = ['选项1', '选项2', '选项3'];
</script>