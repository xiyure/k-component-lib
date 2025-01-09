<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">具有快速选项的选择器</span>
      <k-date-picker
        v-model="value"
        type="daterange"
        placeholder="选择日期"
        :show-default-shortcuts="true"
        :disabled-date="disabledDate"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref<'base' | 'lg' | 'sm'>('base');
const value = ref('');

const disabledDate = (time: Date) => time.getTime() > Date.now();
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--k-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--k-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
