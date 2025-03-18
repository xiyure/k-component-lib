<template>
  <el-calendar
    ref="kCalendarRef"
    :class="['k-calendar', _styleModule, { 'k-calendar--adaptive': adaptive }, 'text-base']"
    v-bind="$attrs"
  >
    <template #header="{ date }">
      <slot name="header" :date="date">
        <div class="k-calendar__header">
          <div class="k-calendar__header-left">
            <k-button @click="jumpDate('today')">{{ t?.('today') }}</k-button>
            <k-button @click="jumpDate('prev-month')"><IconArrowLeft /></k-button>
            <k-button @click="jumpDate('next-month')"><IconArrowRight /></k-button>
            <span>{{ date }}</span>
          </div>
          <div class="k-calendar__header-right">
            <k-checkbox
              v-if="showLunar"
              v-model="isShowLunar"
              :label="t?.('showLunar')"
            ></k-checkbox>
          </div>
        </div>
      </slot>
    </template>
    <template #date-cell="cellData">
      <slot name="date-cell" v-bind="cellData">
        <div class="k-calendar__item">
          <div class="k-calendar__date">
            <span class="k-calendar__solar">{{ cellData.data.date.getDate() }}</span>
            <span v-show="isShowLunar" class="k-calendar__lunar">
              {{ lunarDate(cellData.data.date).lunarDate_zh }}
            </span>
          </div>
          <slot name="schedule" :date="cellData.data.date">
            <div class="k-calendar__schedule">
              <ul>
                <li
                  v-for="item in targetSchedule(cellData.data.date)"
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
      </slot>
    </template>
  </el-calendar>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { ElCalendar } from 'element-plus';
import type { CalendarDateType, CalendarInstance } from 'element-plus';
// @ts-expect-error chinese-lunar-calendar has not declare dependencies
import { getLunar } from 'chinese-lunar-calendar';
import { IconArrowLeft, IconArrowRight } from 'ksw-vue-icon';
import { CalendarProps, Schedule } from './type';
import { lunarMonth, lunarDay } from './const';
import { KCheckbox } from '../checkbox';
import { getExposeProxy } from '../../utils';
import { useLocale } from '../../hooks';
import type { IntRange } from '../../utils/typescript/common';

defineOptions({
  name: 'KCalendar'
});

const { t } = useLocale();

const props = withDefaults(defineProps<CalendarProps>(), {
  schedule: () => [],
  showLunar: false,
  adaptive: false
});

const _styleModule = inject('_styleModule', '');

const kCalendarRef = ref<CalendarInstance>();
const isShowLunar = ref(false);

const lunarDate = computed(
  () => function (date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const lunarInfo = getLunar(year, month, day);
    return {
      ...lunarInfo,
      lunarMonth_zh: lunarMonth[lunarInfo.lunarMonth as IntRange<1, 12>],
      lunarDate_zh: lunarDay[lunarInfo.lunarDate as IntRange<1, 30>]
    };
  }
);

const scheduleContent = computed(() => props.schedule
.map((item: Schedule) => {
  const { date } = item;
  let dateStr: string | undefined;
  const newDate: Date = new Date(date);
  if (newDate instanceof Date && !Number.isNaN(newDate?.getTime())) {
    dateStr = formatDate(newDate);
  }
  return {
    date: dateStr,
    content: item.content
  };
})
.filter((item: Schedule) => item.date));
const targetSchedule = computed(
  () => function (date: Date) {
    const targetContent = scheduleContent.value.find(
      (item: Schedule) => item.date === formatDate(date)
    );
    return targetContent?.content || [];
  }
);

function jumpDate(command: CalendarDateType) {
  kCalendarRef.value?.selectDate(command);
}
function handleLunar(showLunar: boolean) {
  isShowLunar.value = showLunar;
}
function formatDate(date: Date) {
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
defineExpose(getExposeProxy(instance, kCalendarRef));
</script>

<style lang="less">
@import './style.less';
</style>
