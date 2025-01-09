<template>
  <k-radio-group v-model="size" aria-label="size control">
    <k-radio-button value="lg">large</k-radio-button>
    <k-radio-button value="base">default</k-radio-button>
    <k-radio-button value="sm">small</k-radio-button>
  </k-radio-group>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">默认选项</span>
      <k-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        :size="size"
      />
    </div>
    <div class="block">
      <span class="demonstration">具有快速选项的选择器</span>
      <k-date-picker
        v-model="value2"
        type="date"
        placeholder="选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref<'base' | 'lg' | 'sm'>('base');

const value1 = ref('');
const value2 = ref('');

const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    }
  }
];

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
