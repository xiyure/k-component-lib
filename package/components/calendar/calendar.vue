<template>
  <div :id="id" class="k-calendar">
    <el-calendar ref="kCalendarRef" v-model="modelValue">
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
              <k-checkbox v-model="isShowLunar" :label="$t('showLunar')"></k-checkbox>
            </div>
          </div>
        </slot>
      </template>
      <template #date-cell="{ data }">
        <k-popover
          class="k-calendar-item__popover"
          :show-after="1000"
          width="auto"
          :disabled="!props.schedule[formatDate(data.date)]"
        >
          <template #reference>
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
                <span
                  v-show="props.schedule[formatDate(data.date)]?.length > max"
                  class="k-calendar__more"
                  @click.stop.prevent="handleMore"
                >更多...</span>
              </slot>
            </div>
          </template>
          <div class="k-calendar__poper">
            <ul>
              <li
                v-for="item in props.schedule[formatDate(data.date)] || []"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </k-popover>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { getLunar } from 'chinese-lunar-calendar';
import { IconArrowLeft, IconArrowRight } from 'ksw-vue-icon';
import type { CalendarDateType, CalendarInstance } from 'element-plus';
import { CalendarProps } from './type';
import { lunarMonth, lunarDay } from './const';
import { KCheckbox } from '../checkbox';
import { KPopover } from '../popover';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KCalendar'
});

const props = withDefaults(defineProps<CalendarProps>(), {
  schedule: {},
  max: 4
});
const emits = defineEmits(['update:modelValue', 'show-all']);

const kCalendarRef = ref<CalendarInstance>();
const modelValue = ref(props.modelValue);
const isShowLunar = ref(false);
const id = genRandomStr(8);

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
  const content = props.schedule[formatDate(date)] || [];
  return content.slice(0, props.max);
});

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
});
watch(() => modelValue.value, (newValue) => {
  emits('update:modelValue', newValue);
});

function jumpDate(command:CalendarDateType) {
  kCalendarRef.value?.selectDate(command);
}
function handleLunar(showLunar:boolean) {
  isShowLunar.value = showLunar;
}
function handleMore() {
  emits('show-all');
}
function formatDate(date:Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${ y }-${ m }-${ d }`;
}

// 根据实际数据重新计算容器高度
const scheduleItemRef = ref();
nextTick(() => {
  const rootBox = document.getElementById(id);
  if (!rootBox) {
    return;
  }
  const scheduleBox = rootBox?.getElementsByClassName('k-calendar__schedule');
  for (let i = 0; i < scheduleBox?.length; i++) {
    const schduleBoxItem = scheduleBox[i] as HTMLElement;
    const scheduleListItem = scheduleItemRef.value[0];
    const scheduleBoxHeight = schduleBoxItem?.offsetHeight;
    const itemHeight = scheduleListItem?.offsetHeight;
    if (!scheduleBoxHeight || !itemHeight) {
      return;
    }
    schduleBoxItem.style.height = `${ scheduleBoxHeight - (scheduleBoxHeight % itemHeight) }px`;
  }
});

defineExpose({ jumpDate, handleLunar });
</script>

<style lang="less">
@import './style.less';
</style>