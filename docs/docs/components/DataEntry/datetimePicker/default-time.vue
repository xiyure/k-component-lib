<template>
  <div class="block">
    <span class="demonstration">开始和结束日期时间12:00:00</span>
    <k-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="defaultTime1"
    />
  </div>
  <div class="block">
    <span class="demonstration">
      开始日期时间12:00:00，结束日期时间08:00:00
    </span>
    <k-date-picker
      v-model="value2"
      type="datetimerange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="defaultTime2"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');

const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
const defaultTime2: [Date, Date] = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0)
]; // '12:00:00', '08:00:00'
</script>
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
