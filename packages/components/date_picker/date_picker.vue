<template>
  <el-date-picker
    ref="datePickerRef"
    :class="['k-date-picker', _styleModule]"
    v-bind="$attrs"
    :type="type"
    :shortcuts="customShortcuts"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-date-picker>
</template>

<script setup lang="ts">
import { ref, computed, provide, inject } from 'vue';
import { ElDatePicker } from 'element-plus';
import { VueI18nTranslation } from 'vue-i18n';
import { DatePicker } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KDatePicker'
});

const props = withDefaults(defineProps<DatePicker>(), {
  showDefaultShortcuts: true
});

const formatSize = useSize<DatePicker>(props);

const _styleModule = inject('_styleModule', '');
const t = inject<VueI18nTranslation>('$t');
const datePickerRef = ref(null);
const defaultDateRange = [
  {
    text: t?.('within7days'),
    value: () => getTargetDay(-7)
  },
  {
    text: t?.('within15days'),
    value: () => getTargetDay(-15)
  },
  {
    text: t?.('curMonth'),
    value: getCurMonthRange()
  },
  {
    text: t?.('curQuarter'),
    value: getCurQuarterRange()
  },
  {
    text: t?.('curYear'),
    value: getCurYearRange()
  }
];

const customShortcuts = computed(() => {
  if (
    (props.type === 'daterange' || props.type === 'datetimerange') &&
    props.showDefaultShortcuts
  ) {
    return [...defaultDateRange, ...(props.shortcuts || [])];
  }
  return props.shortcuts;
});

// 获取目标日期范围
function getTargetDay(index: number) {
  const currentDate = new Date();
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + index);
  if (index > 0) {
    return [currentDate, targetDate];
  }
  return [targetDate, currentDate];
}
// 获取本月日期范围
function getCurMonthRange() {
  const startDate = new Date();
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  const monthCount = getCurMonthDayCount();
  const endDate = new Date();
  endDate.setDate(monthCount);
  endDate.setHours(23, 59, 59, 59);
  return [startDate, endDate];
}
function getCurMonthDayCount() {
  const month = new Date().getMonth() + 1;
  const bigMonth = [1, 3, 5, 7, 8, 10, 12];
  const smallMonth = [4, 6, 9, 11];
  if (bigMonth.includes(month)) {
    return 31;
  }
  if (smallMonth.includes(month)) {
    return 30;
  }
  const year = new Date().getFullYear();
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 29;
  }
  return 28;
}
// 获取本季度日期范围
function getCurQuarterRange() {
  const startDate = new Date();
  const endDate = new Date();
  const month = startDate.getMonth();
  const curQuarter = Math.floor(month / 3);
  startDate.setMonth(curQuarter * 3);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setMonth(curQuarter * 3 + 2);
  endDate.setHours(23, 59, 59, 59);
  if (curQuarter === 0 || curQuarter === 3) {
    endDate.setDate(31);
  } else {
    endDate.setDate(30);
  }
  return [startDate, endDate];
}
// 获取本年度日期范围
function getCurYearRange() {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setMonth(0);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setMonth(11);
  endDate.setDate(31);
  endDate.setHours(23, 59, 59, 59);
  return [startDate, endDate];
}

provide(SIZE_KEY, formatSize);

const instance: any = {};
defineExpose(getExposeProxy(instance, datePickerRef));
</script>

<style lang="less">
@import './style.less';
</style>
