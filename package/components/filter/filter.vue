<template>
  <div class="k-filter">
    <k-popover
      trigger="click"
      popper-class="k-filter-custom"
      @show="popoverShow = true"
      @hide="popoverShow = false"
    >
      <template #reference>
        <IconFilterFill
          class="k-filter__trigger-icon" :style="{
            color: popoverShow ? '#2882FF' : '#000'
          }"
        />
      </template>
      <div class="k-filter__content">
        <div class="k-filter__header">
          <span class="text-lg font-bold">全局操作</span>
          <span class="text-base" @click="clearFilterData"><IconDelete />清除所有条件</span>
        </div>
        <div v-for="item, index in filterData" :key="index" class="k-filter__item">
          <div class="k-filter__condition">
            <k-select
              v-model="item.condition"
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
              @change="changeDateLogic(instance(item.condition), item)"
            >
              <k-option
                v-for="logicItem in (instance(item.condition)?.uiType === 'date' 
                  ? dateLogicOptions : instance(item.condition)?.logicList) || []"
                :key="logicItem"
                :label="logicItem"
                :value="logicItem"
              />
            </k-select>
          </div>
          <div class="k-filter__value">
            <k-select
              v-if="instance(item.condition)?.uiType === 'select'"
              v-model="item.value"
              :teleported="false"
              clearable
            >
              <k-option
                v-for="valueItem in instance(item.condition)?.valueList || []"
                :key="valueItem"
                :label="valueItem"
                :value="valueItem"
              />
            </k-select>
            <div v-else-if="instance(item.condition)?.uiType === 'date'" class="k-filter__date-box">
              <k-select
                v-model="dateRange"
                :teleported="false"
                clearable
                :disabled="disabledSelect"
                @change="changeDateRange(item)"
              >
                <k-option
                  v-for="logicItem in dateLogicList"
                  :key="logicItem.value"
                  :label="logicItem.label"
                  :value="logicItem.value"
                />
              </k-select>
              <k-date-picker
                v-model="item.value"
                :type="dateType"
                :teleported="false"
                clearable
                :disabled="disabledDatePicker"
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
            <span @click="addCondition"><IconAdd />添加条件</span>
            <span><IconEmptyBox />保存为新视图</span>
          </div>
          <div class="k-filer__operate-right">
            <k-button type="main" @click="updateFilterData">查询</k-button>
          </div>
        </div>
      </div>
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue';
import { IconClose, IconDelete, IconAdd, IconEmptyBox, IconFilterFill } from 'ksw-vue-icon';
import { IFilter } from '../../interface/index';
import { KInput } from '../input';
import { KSelect, KOption } from '../select';
import { KButton } from '../button';
import { KDatePicker } from '../date_picker';
import { KPopover } from '../popover';
import { dateTypeOptions, dateLogicOptions } from './const';

defineOptions({
  name: 'KFilter'
});

const props = withDefaults(defineProps<IFilter>(), {});
type IFilterDataType = {
  condition: string,
  logic: string,
  value: any
};

const emits = defineEmits(['update:modelValue', 'confirm']);

const filterData = ref<IFilterDataType[]>([]);
const popoverShow = ref(false);
const dateRange = ref('date');
const dateLogic = ref('');
const dateType = ref('datetime');

const instance = computed(() => function (condition:string) {
  return props.data.find((item:IFilterDataType) => item.condition === condition);
});

const conditionList = computed(() => {
  const allConditions = props.data.map((item:any) => item.condition);
  const checkedConditions = filterData.value.map((dataItem:IFilterDataType) => dataItem.condition);
  return allConditions.filter((item:string) => !checkedConditions.includes(item));
});

const dateLogicList = computed(() => {
  if (dateLogic.value === '等于') {
    return dateTypeOptions;
  } 
  const hideLogicList = ['past-seven-days', 'past-thirty-days'];
  return dateTypeOptions.filter((item) => !hideLogicList.includes(item.value));
});

const disabledSelect = computed(() => {
  const disabledLogicTypes = ['为空', '不为空'];
  return disabledLogicTypes.includes(dateLogic.value);
});

const disabledDatePicker = computed(() => {
  const notDisabledDateRanges = ['date', 'range'];
  return disabledSelect.value || !notDisabledDateRanges.includes(dateRange.value);
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

function addCondition() {
  const addItem = {
    condition: '',
    logic: '',
    value: ''
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
  emits('confirm', filterData);
}
function changeCondition(index:number) {
  const targetItem = filterData.value[index];
  targetItem.logic = '';
  targetItem.value = '';
}
function changeDateLogic(instance:any, item:IFilterDataType) {
  if (instance.uiType === 'date') {
    dateLogic.value = item.logic;
    if (disabledSelect.value) {
      item.value = '';
      return;
    }
    changeDateRange(item);
  }
}
function changeDateRange(item:IFilterDataType) {
  setDatePickerType();
  switch (dateRange.value) {
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
  if ((dateLogic.value === '晚于' || dateLogic.value === '早于') && targetRanges.includes(dateRange.value)) {
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
function setDatePickerType() {
  if (dateLogic.value === '等于') {
    const dateArray = ['date', 'today', 'tomorrow', 'yesterday'];
    dateType.value = dateArray.includes(dateRange.value) ? 'datetime' : 'datetimerange';
  } else if (dateLogic.value === '晚于' || dateLogic.value === '早于') {
    const dateArray = ['range'];
    dateType.value = !dateArray.includes(dateRange.value) ? 'datetime' : 'datetimerange';
  } 
}
</script>

<style>
@import './style.less';
</style>