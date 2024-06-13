<template>
  <div class="k-filter">
      <div class="k-filter__content">
        <div class="k-filter__header">
          <span class="text-lg font-bold">{{ $t('seniorFilter') }}</span>
          <span class="text-base" @click="clearFilterData"><IconDelete />{{ $t('clearAll') }}</span>
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
                v-for="conditionItem in conditionList"
                :key="conditionItem"
                :label="conditionItem"
                :value="conditionItem"
              />
            </k-select>
          </div>
          <div class="k-filter__logic">
            <k-select
              v-model="item.logic"
              :teleported="false"
              clearable
              @change="changeDateLogic(instance(item.title), item)"
            >
              <template v-if="instance(item.title)?.uiType === 'date'">
                <k-option
                  v-for="logicItem in dateLogicOptions || []"
                  :key="$t(logicItem)"
                  :label="$t(logicItem)"
                  :value="$t(logicItem)"
                />
              </template>
              <template v-else>
                <k-option
                  v-for="logicItem in instance(item.title)?.logicList || []"
                  :key="logicItem"
                  :label="logicItem"
                  :value="logicItem"
                />
              </template>
            </k-select>
          </div>
          <div class="k-filter__value">
            <k-select
              v-if="instance(item.title)?.uiType === 'select'"
              v-model="item.value"
              :teleported="false"
              clearable
            >
              <k-option
                v-for="valueItem in instance(item.title)?.valueList || []"
                :key="valueItem"
                :label="valueItem"
                :value="valueItem"
              />
            </k-select>
            <div v-else-if="instance(item.title)?.uiType === 'date'" class="k-filter__date-box">
              <k-select
                v-model="item.dateRange"
                :teleported="false"
                clearable
                :disabled="disabledSelect(item)"
                @change="changeDateRange(item)"
              >
                <k-option
                  v-for="logicItem in dateLogicList(item)"
                  :key="logicItem.value"
                  :label="$t(logicItem.label)"
                  :value="logicItem.value"
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
            <k-button type="main" @click="updateFilterData">{{ $t('query') }}</k-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed, getCurrentInstance } from 'vue';
import { IconClose, IconDelete, IconAdd, IconFilterFill } from 'ksw-vue-icon';
import { FilterProps } from './type';
import { KInput } from '../input';
import { KSelect, KOption } from '../select';
import { KButton } from '../button';
import { dateTypeOptions, dateLogicOptions } from './const';

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
  dateLogic?: string
};

const emits = defineEmits(['update:modelValue', 'confirm']);

const _global = getCurrentInstance()?.appContext.app.config.globalProperties;
const t = _global?.$t;
const filterData = ref<IFilterDataType[]>([]);
const filterRule = ref(0);

const instance = computed(() => function (title:string) {
  return props.data.find((item:IFilterDataType) => item.title === title);
});

const conditionList = computed(() => {
  const allConditions = props.data.map((item:any) => item.title);
  const checkedConditions = filterData.value.map((dataItem:IFilterDataType) => dataItem.title);
  return allConditions.filter((item:string) => !checkedConditions.includes(item));
});

const dateLogicList = computed(() => function (item:IFilterDataType) {
  if (item.dateLogic === t?.('equal')) {
    return dateTypeOptions;
  } 
  const hideLogicList = ['past-seven-days', 'past-thirty-days'];
  return dateTypeOptions.filter((item) => !hideLogicList.includes(item.value));
});

// 日期禁用
const disabledSelect = computed(() => function (item:IFilterDataType) {
  const disabledLogicTypes = [t?.('empty'), t?.('nonEmpty')];
  return !item.dateLogic || disabledLogicTypes.includes(item.dateLogic);
}); 

const disabledDatePicker = computed(() => function (item:IFilterDataType) {
  const notDisabledDateRanges = ['date', 'range'];
  return disabledSelect.value(item) || !notDisabledDateRanges.includes(item.dateRange as string);
});

watch(() => props.modelValue, (newValue) => {
  if (!newValue || newValue.length === 0) {
    addCondition();
    return;
  }
  filterData.value = newValue;
}, { immediate: true, deep: true });

watch(() => filterData.value, (newValue) => {
  emits('update:modelValue', newValue);
}, { immediate: true, deep: true });

// 添加条件
function addCondition() {
  const addItem = {
    title: '',
    logic: '',
    value: '',
    dateRange: 'date',
    dateType: 'datetime',
    dateLogic: ''
  };
  filterData.value.push(addItem);
}

// 移除条件
function removeConditionItem(index:number) {
  filterData.value.splice(index, 1);
}
function clearFilterData() {
  filterData.value.length = 0;
  addCondition();
}

function updateFilterData() {
  emits('confirm', filterData.value);
}
function changeCondition(index:number) {
  const targetItem = filterData.value[index];
  targetItem.logic = '';
  targetItem.value = '';
}
function changeDateLogic(instance:any, item:IFilterDataType) {
  if (instance.uiType === 'date') {
    item.dateLogic = item.logic;
    if (disabledSelect.value(item)) {
      item.value = '';
      return;
    }
    changeDateRange(item);
  }
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
  if ((item.dateLogic === t?.('after')
    || item.dateLogic === t?.('before'))
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
  if (item.dateLogic === t?.('equal')) {
    const dateArray = ['date', 'today', 'tomorrow', 'yesterday'];
    item.dateType = dateArray.includes(item.dateRange as string) ? 'datetime' : 'datetimerange';
  } else if (item.dateLogic === t?.('after') || item.dateLogic === t?.('before')) {
    const dateArray = ['range'];
    item.dateType = !dateArray.includes(item.dateRange as string) ? 'datetime' : 'datetimerange';
  } 
}
</script>

<style>
@import './style.less';
</style>