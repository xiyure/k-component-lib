<template>
  <div class="demo-rate-block">
    <span class="demonstration">默认</span>
    <k-rate v-model="value1" />
  </div>
  <div class="demo-rate-block">
    <span class="demonstration">不同级别的颜色</span>
    <k-rate v-model="value2" :colors="colors" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
</script>

<style scoped>
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
