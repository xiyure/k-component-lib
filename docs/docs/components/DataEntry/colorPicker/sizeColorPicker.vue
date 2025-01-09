<template>
  <div class="demo-color-sizes">
    <k-color-picker v-model="color" class="k-color-picker" size="large" />
    <k-color-picker v-model="color" class="k-color-picker" />
    <k-color-picker v-model="color" class="k-color-picker" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('409EFF');
</script>

<style>
.demo-color-sizes .k-color-picker:not(:last-child) {
  margin-right: 16px;
}
</style>
