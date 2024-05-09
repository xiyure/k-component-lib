<template>
  <div class="k-table">
    <el-table
      v-bind="attrs"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

defineOptions({
  name: 'KTable'
});

const attrs = computed(() => ({
  
}));

</script>

<style lang="less">
@import './style.less';
</style>