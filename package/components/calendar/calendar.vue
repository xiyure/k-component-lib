<template>
  <el-calendar ref="kCalendarRef" :class="['k-calendar', $styleModule]" v-bind="$attrs">
    <template #header="{ date }">
      <slot name="header" :date="date">
        <div class="k-calendar__header">
          <div class="k-calendar__header-left">
            <k-button @click="jumpDate('today')">{{ $t('today') }}</k-button>
            <k-button @click="jumpDate('prev-month')"><IconArrowLeft /></k-button>
            <k-button @click="jumpDate('next-month')"><IconArrowRight /></k-button>
            <span>{{ date }}</span>
          </div>
          <div class="k-calendar__header-right">
            <k-checkbox v-if="showLunar" v-model="isShowLunar" :label="$t('showLunar')"></k-checkbox>
          </div>
        </div>
      </slot>
    </template>
    <template #date-cell="{ data }">
      <div class="k-calendar__item">
        <div class="k-calendar__date">
          <span class="k-calendar__solar">{{ data.date.getDate() }}</span>
          <span v-show="isShowLunar" class="k-calendar__lunar">{{ lunarDate(data.date).lunarDate_zh }}</span>
        </div>
        <slot name="schedule" :date="data.date">
          <div class="k-calendar__schedule">
            <ul>
              <li
                v-for="item in scheduleContent(data.date)"
                :key="item"
                ref="scheduleItemRef"
                class="k-calendar__schedule-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </slot>
      </div>
    </template>
  </el-calendar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElCalendar } from 'element-plus';
import type { CalendarDateType, CalendarInstance } from 'element-plus';
import { getLunar } from 'chinese-lunar-calendar';
import { IconArrowLeft, IconArrowRight } from 'ksw-vue-icon';
import { CalendarProps } from './type';
import { lunarMonth, lunarDay } from './const';
import { KCheckbox } from '../checkbox';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KCalendar'
});

const props = withDefaults(defineProps<CalendarProps>(), {
  schedule: {},
  showLunar: false
});

const kCalendarRef = ref<CalendarInstance>();
const isShowLunar = ref(false);

const lunarDate = computed(() => function (date:Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const lunarInfo = getLunar(year, month, day);
  return {
    ...lunarInfo,
    lunarMonth_zh: lunarMonth[lunarInfo.lunarMonth],
    lunarDate_zh: lunarDay[lunarInfo.lunarDate]
  };
});

const scheduleContent = computed(() => function (date:Date) {
  return props.schedule[formatDate(date)] || [];
});

function jumpDate(command:CalendarDateType) {
  kCalendarRef.value?.selectDate(command);
}
function handleLunar(showLunar:boolean) {
  isShowLunar.value = showLunar;
}
function formatDate(date:Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
}

// expose instance
const instance: any = {
  jumpDate,
  handleLunar
};
handleExpose(instance, kCalendarRef, 'KCalendar');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>