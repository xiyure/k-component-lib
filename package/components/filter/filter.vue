<template>
  <div class="k-filter">
    <k-popover
      trigger="click"
      width="auto"
    >
      <template #reference>
        <slot name="icon"><IconFilter /></slot>
      </template>
      <div class="k-filter__content">
        <div class="k-filter__header">
          <span class="text-lg font-bold">{{ $t('seniorFilter') }}</span>
          <span class="text-base" @click="clearFilter"><IconClearDate />{{ $t('clearAll') }}</span>
        </div>
        <div v-for="item, index in filterData" :key="index" class="k-filter__item">
          <div class="k-filter__condition">
            <k-select
              v-model="item.title"
              :teleported="false"
              clearable
              @change="changeCondition(index)"
            >
              <k-option
                v-for="dataItem in column"
                :key="dataItem.title"
                :label="dataItem.title"
                :value="dataItem.title"
              />
            </k-select>
          </div>
          <div class="k-filter__logic">
            <k-select
              v-model="item.logic"
              :teleported="false"
              clearable
              @change="changeLogic(item)"
            >
              <k-option
                v-for="conditionItem in conditionList(item)?.logicList"
                :key="conditionItem.logic"
                :label="$t(conditionItem.logic)"
                :value="conditionItem.logic"
              />
            </k-select>
          </div>
          <div class="k-filter__value">
            <div v-if="instance(item.title)?.dataType === 'date'" class="k-filter__date-box">
              <k-select
                v-model="item.dateRange"
                :teleported="false"
                clearable
                :disabled="disabledInput(item)"
                @change="changeDateRange(item)"
              >
                <k-option
                  v-for="logicItem in dateLogicList(item)"
                  :key="logicItem.value"
                  :label="$t(logicItem.label)"
                  :value="logicItem.value"
                  :disabled="(item.logic === $t('after') || item.logic === $t('before')) && logicItem.value === 'range'"
                />
              </k-select>
              <k-date-picker
                v-model="item.value"
                :type="item.dateType"
                :teleported="false"
                clearable
                :disabled="disabledDatePicker(item)"
              />
            </div>
            <k-input
              v-else
              v-model="item.value"
              clearable
            />
          </div>
          <i class="close-icon" @click="removeConditionItem(index)"><IconClose /></i>
        </div>
        <div class="k-filter__operate">
          <div class="k-filer__operate-left text-base">
            <span @click="addCondition"><IconAdd />{{ $t('addCondition') }}</span>
          </div>
          <div class="k-filer__operate-right">
            <span class="select-label">{{ $t('aboveCondition') }}：</span>
            <k-select v-model="filterRule" :teleported="false">
              <k-option :label="$t('anyOne')" :value="0"></k-option>
              <k-option :label="$t('all')" :value="1"></k-option>
            </k-select>
            <k-button type="main" @click="filter">{{ $t('query') }}</k-button>
          </div>
        </div>
      </div>
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import { IconClose, IconClearDate, IconAdd, IconFilter } from 'ksw-vue-icon';
import { FilterProps } from './type';
import { KInput } from '../input';
import { KSelect, KOption } from '../select';
import { KButton } from '../button';
import { KPopover } from '../popover';
import { dateTypeOptions, logicOptions } from './const';

defineOptions({
  name: 'KFilter'
});

const props = withDefaults(defineProps<FilterProps>(), {});
type IFilterDataType = {
  title: string,
  logic: string,
  value: any,
  dateRange?: string,
  dateType?: string,
  handler: ((a: any, b: any) => boolean) | null
};

const emits = defineEmits(['confirm']);

onMounted(() => {
  addCondition();
});

const _global = getCurrentInstance()?.appContext.app.config.globalProperties;
const t = _global?.$t;
const filterData = ref<IFilterDataType[]>([]);
const filterRule = ref(0);

const instance = computed(() => function (title:string) {
  const matchInstance:any = props.column?.find(item => item.title === title);
  return matchInstance || [];
});
const conditionList = computed(() => function (item: any) {
  const columnItem = props.column?.find(col => col.title === item.title);
  const type = columnItem?.dataType || 'string';
  return logicOptions.find(item => item.type === type);
});

const dateLogicList = computed(() => function (item:IFilterDataType) {
  if (item.logic === t?.('equal')) {
    return dateTypeOptions;
  } 
  const hideLogicList = ['past-seven-days', 'past-thirty-days'];
  return dateTypeOptions.filter((item) => !hideLogicList.includes(item.value));
});

// 日期禁用
const disabledInput = computed(() => function (item:IFilterDataType) {
  const disabledLogicTypes = [t?.('empty'), t?.('nonEmpty')];
  return !item.logic || disabledLogicTypes.includes(item.logic);
}); 
const disabledDatePicker = computed(() => function (item:IFilterDataType) {
  const notDisabledDateRanges = ['date', 'range'];
  return disabledInput.value(item) || !notDisabledDateRanges.includes(item.dateRange as string);
});

// 添加条件
function addCondition() {
  const addItem = {
    title: '',
    logic: '',
    value: '',
    handler: null,
    dateRange: 'date',
    dateType: 'datetime',
  };
  filterData.value.push(addItem);
}

// 移除条件
function removeConditionItem(index:number) {
  if (index === 0 && filterData.value.length === 1) {
    return;
  }
  filterData.value.splice(index, 1);
}
function clearFilter() {
  filterData.value.length = 0;
  addCondition();
  filter();
}

function filter() {
  const conditionList = filterData.value
  .filter(item => item.title && item.logic && item.value)
  .map(item => ({
    title: item.title,
    logic: t?.(item.logic),
    value: item.value,
    handler: item.handler
  }));
  const conditionInfo = {
    conditionList,
    filterRule: filterRule.value
  };
  if (conditionList.length === 0) {
    emits('confirm', conditionInfo, props.data);
    return; 
  }
  const newData = props.data.filter(dataItem => {
    if (filterRule.value === 0) {
      return filterData.value.some(item => {
        const targetColumn = props.column?.find(col => col.title === item.title);
        if (!targetColumn || !targetColumn.field) {
          return false;
        }
        return item.handler?.(dataItem[targetColumn.field], item.value);
      });
    } 
    return filterData.value.every(item => {
      const targetColumn = props.column?.find(col => col.title === item.title);
      if (!targetColumn && !targetColumn.field) {
        return false;
      }
      return item.handler?.(dataItem[targetColumn.field], item.value);
    });
  });
  emits('confirm', conditionInfo, newData);
}
function changeCondition(index:number) {
  const targetItem = filterData.value[index];
  targetItem.logic = '';
  targetItem.value = '';
}
function changeLogic(dataItem) {
  if ((dataItem.logic === t?.('after')
    || dataItem.logic === t?.('before'))
    && dataItem.dateType === 'datetimerange'
  ) {
    dataItem.dateType = 'datetime';
    dataItem.dateRange = 'date';
  }
  const type = instance.value(dataItem.title)?.dataType;
  const logicOptionItem = logicOptions.find(item => item.type === type);
  if (!logicOptionItem) {
    return;
  }
  const logicItem = logicOptionItem.logicList.find(item => item.logic === dataItem.logic);
  dataItem.handler = logicItem?.handler;
  if (type === 'date') {
    changeDateLogic(dataItem);
  }
}
function changeDateLogic(item:IFilterDataType) {
  if (disabledInput.value(item)) {
    item.value = '';
    return;
  }
  changeDateRange(item);
}
function changeDateRange(item:IFilterDataType) {
  setDatePickerType(item);
  switch (item.dateRange) {
    case 'date': item.value = ''; break;
    case 'range': item.value = ['', '']; break;
    case 'today': item.value = getTargetDay(0); break;
    case 'tomorrow': item.value = getTargetDay(1); break;
    case 'yesterday': item.value = getTargetDay(-1); break;
    case 'current-week':
      item.value = [getTargetDay(-getWeekDay() + 1), getTargetDay(7 - getWeekDay())]; break;
    case 'last-week':
      item.value = [getTargetDay(-getWeekDay() - 6), getTargetDay(-getWeekDay())]; break;
    case 'current-month':
      item.value = [getTargetDay(-getDateDay() + 1), getTargetDay(getCurMonthDayCount() - getDateDay())]; break;
    case 'last-month':
      item.value = [getTargetDay(-getDateDay() - getCurMonthDayCount() + 1), getTargetDay(-getDateDay())]; break;
    case 'past-seven-days': item.value = [getTargetDay(-7), getTargetDay(0)]; break;
    case 'past-thirty-days': item.value = [getTargetDay(-30), getTargetDay(0)]; break;
  }
  const targetRanges = ['current-week', 'last-week', 'current-month', 'last-month'];
  if ((item.logic === t?.('after')
    || item.logic === t?.('before'))
    && targetRanges.includes(item.dateRange as string)
  ) {
    item.value = item.value[0];
  }
}
// 日期推导
function getTargetDay(index:number) {
  const currentDate = new Date();
  const targetDate = new Date(currentDate);
  targetDate.setDate(targetDate.getDate() + index);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate;
}
function getWeekDay() {
  return new Date().getDay();
}
function getDateDay() {
  return new Date().getDate();
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
// 设置日期选择器的类型（日期 or 时间段）
function setDatePickerType(item:IFilterDataType) {
  if (item.logic === t?.('equal')) {
    const dateArray = ['date', 'today', 'tomorrow', 'yesterday'];
    item.dateType = dateArray.includes(item.dateRange as string) ? 'datetime' : 'datetimerange';
  } else if (item.logic === t?.('after') || item.logic === t?.('before')) {
    const dateArray = ['range'];
    item.dateType = !dateArray.includes(item.dateRange as string) ? 'datetime' : 'datetimerange';
  } 
}

defineExpose({ filter, clearFilter });
</script>

<style>
@import './style.less';
</style>