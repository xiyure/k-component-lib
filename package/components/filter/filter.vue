<template>
  <div
    :class="[
      'k-filter',
      {'text-sm': props.size ==='sm', 'text-base': props.size !== 'sm'},
      _styleModule
    ]"
  >
    <k-popover
      trigger="click"
      width="auto"
      :teleported="false"
      placement="bottom-end"
      :popper-class="popperClassName"
      @before-enter="() => popperClassName = 'k-filter-popper__enter'"
      @before-leave="() => popperClassName = 'k-filter-popper__leave'"
    >
      <template #reference>
        <slot name="reference" :has-config-condition="hasConfigCondition">
          <k-button v-if="border" :size="props.size">
            <IconFilter v-if="!hasConfigCondition" />
            <IconFilterFill v-else color="#2882FF" />
          </k-button>
          <span v-else>
            <IconFilter v-if="!hasConfigCondition" />
            <IconFilterFill v-else color="#2882FF" />
          </span>
        </slot>
      </template>
      <div class="k-filter__content">
        <div class="k-filter__header">
          <span
            :class="props.size === 'sm' ? 'text-base' : 'text-lg'"
            class="font-bold"
          >
            {{ $t('advancedFilter') }}
          </span>
          <span
            :class="props.size === 'sm' ? 'text-sm' : 'text-base'"
            @click="() => {
              clearFilter();
              emits('clear');
            }"
          >
            <IconClearDate />{{ $t('clearAll') }}
          </span>
        </div>
        <div
          v-for="item, index in filterData" :key="index" :title="item.title?.join('/')"
          class="k-filter__item"
        >
          <div class="k-filter__condition">
            <k-cascader
              v-model="item.title"
              :teleported="false"
              :size="props.size"
              :options="options"
              :props="{
                label: 'title',
                value: 'title',
                children: props.childrenField
              }"
              clearable
              @change="changeCondition(index)"
            >
            </k-cascader>
          </div>
          <div class="k-filter__logic">
            <k-select
              v-model="item.logic"
              :size="props.size"
              :teleported="false"
              clearable
              :disabled="item._allowSelectLogic === false"
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
          <div class="k-filter__value" :title="item.value">
            <div v-if="instance(item.key)?.dataType === 'date'" class="k-filter__date-box">
              <k-select
                v-model="item.dateRange"
                :size="props.size"
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
                  :disabled="(item.logic === 'after' || item.logic === 'before') && logicItem.value === 'range'"
                />
              </k-select>
              <k-date-picker
                v-model="item.value"
                :type="item.dateType"
                :teleported="false"
                :size="props.size"
                clearable
                :disabled="disabledDatePicker(item)"
                @change="(val: any) => {
                  dateChange(val, item);
                }"
              />
            </div>
            <k-select
              v-else-if="instance(item.key)?.options?.length"
              v-model="item.value"
              :size="props.size"
              :teleported="false"
              :disabled="disabledInput(item)"
              clearable
              @change="updateValue(item, 'select', instance(item.key).options)"
            >
              <k-option
                v-for="optionItem in instance(item.key)?.options"
                :key="optionItem.value"
                :label="optionItem.label"
                :value="optionItem.value"
              />
            </k-select>
            <k-input
              v-else
              v-model="item.value"
              :size="props.size"
              :disabled="disabledInput(item)"
              clearable
              @change="updateValue(item, 'input', instance(item.key).options)"
            />
          </div>
          <i class="close-icon" @click="removeConditionItem(index)"><IconClose /></i>
        </div>
        <div class="k-filter__operate" :class="props.size === 'sm' ? 'text-sm' : 'text-base'">
          <div class="k-filer__operate-left">
            <span
              @click="addCondition"
            ><IconAdd />{{ $t('addCondition') }}</span>
          </div>
          <div class="k-filer__operate-right">
            <span
              class="select-label"
            >{{ $t('aboveCondition') }}：</span>
            <k-select
              v-model="filterRule"
              :size="props.size"
              :disabled="disableChangeMode"
              :teleported="false"
            >
              <k-option :label="$t('anyOne')" :value="0"></k-option>
              <k-option :label="$t('all')" :value="1"></k-option>
            </k-select>
            <k-button :size="props.size" main @click="query">{{ $t('query') }}</k-button>
          </div>
        </div>
      </div>
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, inject, onMounted, watch } from 'vue';
import { IconClose, IconClearDate, IconAdd, IconFilter, IconFilterFill } from 'ksw-vue-icon';
import { cloneDeep } from 'lodash-es';
import { FilterProps } from './type';
import { KInput } from '../input';
import { KSelect, KOption } from '../select';
import { KButton } from '../button';
import { KPopover } from '../popover';
import { KCascader } from '../cascader';
import { dateTypeOptions, logicOptions } from './data';
import { treeDataToArray, isValid, formatter } from '../../utils';

defineOptions({
  name: 'KFilter'
});

type IFilterDataType = {
  title: string[],
  logic: string,
  value: any,
  showValue: any
  key: any,
  dateRange?: string,
  dateType?: string,
  handler: ((a: any, b: any) => boolean) | null,
  _allowSelectLogic?: boolean,
};

const props = withDefaults(defineProps<FilterProps>(), {
  border: true,
  size: 'base',
  filterKey: 'title',
  childrenField: 'children',
  data: () => []
});

onMounted(() => {
  const deprecatedFields = ['column'];
  deprecatedFields.forEach((field: string) => {
    if (props[field]) {
      console.warn(`[KFilter] The "${field}" field is deprecated, please use "options" instead.`);
    }
  });
});

// 控制popper的显示/隐藏动画
const popperClassName = ref('');
const _styleModule = inject('_styleModule', '');
const emits = defineEmits(['confirm', 'clear']);
const _global = getCurrentInstance()?.appContext.app.config.globalProperties;
const t = _global?.$t;
const filterData = ref<IFilterDataType[]>([]);
const filterRule = ref(0);

const flatColumns = computed(() => treeDataToArray(cloneDeep(props.options), 'group'));
const instance = computed(() => function (value: any) {
  const matchInstance:any = flatColumns.value?.find(item => item[props.filterKey] === value);
  return matchInstance;
});
const conditionList = computed(() => function (item: any) {
  const columnItem = flatColumns.value?.find(col => col[props.filterKey] === item.key);
  const type = columnItem?.dataType || 'string';
  return logicOptions.find(item => item.type === type);
});

const dateLogicList = computed(() => function (item:IFilterDataType) {
  if (item.logic === 'equal') {
    return dateTypeOptions;
  } 
  const hideLogicList = ['past-seven-days', 'past-thirty-days'];
  return dateTypeOptions.filter((item) => !hideLogicList.includes(item.value));
});

const hasConfigCondition = computed(() => filterData.value.some(item => item.key && item.logic && (item.value || ['empty', 'nonEmpty'].includes(item.logic))));

// 日期禁用
const disabledInput = computed(() => function (item:IFilterDataType) {
  const disabledLogicTypes = ['empty', 'nonEmpty'];
  return !item.logic || disabledLogicTypes.includes(item.logic);
}); 
const disabledDatePicker = computed(() => function (item:IFilterDataType) {
  const notDisabledDateRanges = ['date', 'range'];
  return disabledInput.value(item) || !notDisabledDateRanges.includes(item.dateRange as string);
});
const disableChangeMode = computed(() => {
  const fields = filterData.value.map(item => item.key);
  return props.remote === true || (Array.isArray(props.remote) && props.remote.some((field: string) => fields.includes(field)));
});

watch(() => disableChangeMode.value, (newValue: boolean) => {
  if (newValue) {
    filterRule.value = 1;
  }
}, { immediate: true });

initData();
function initData() {
  filterRule.value = props.defaultCondition?.filterRule ?? 0;
  const { conditionList = [] } = props.defaultCondition ?? {};
  if (!Array.isArray(conditionList) || !conditionList.length) {
    addCondition();
    return;
  }
  for (let i = 0; i < conditionList.length; i++) {
    addCondition();
  }
  for (let index = 0; index < filterData.value.length; index++) {
    const v = filterData.value[index];
    const { title, logic, value, showValue, key, handler } = conditionList[index];
    v.title = title.split('-');
    v.logic = logic;
    v.value = value;
    v.showValue = showValue;
    v.key = key;
    v.handler = handler;
    const columnItem = flatColumns.value?.find(col => col[props.filterKey] === key);
    v._allowSelectLogic = Boolean(!columnItem.options?.length);
    if (columnItem.dataType === 'date' && !Array.isArray(value)) {
      v.dateRange = 'date';
      v.dateType = 'datetime';
    } else if (columnItem.dataType === 'date' && Array.isArray(value)) {
      v.dateRange = 'range';
      v.dateType = 'datetimerange';
    }
  }
}
// 添加条件
function addCondition() {
  const addItem = {
    title: [],
    logic: '',
    showValue: '',
    value: '',
    key: '',
    handler: null,
    dateRange: 'date',
    dateType: 'datetime',
  };
  filterData.value.push(addItem);
}

// 移除条件
function removeConditionItem(index:number) {
  if (index === 0 && filterData.value.length === 1) {
    clearFilter(false);
    return;
  }
  filterData.value.splice(index, 1);
}
function clearFilter(isFilter:boolean = true) {
  filterData.value.length = 0;
  addCondition();
  if (isFilter) {
    return filter();
  }
  return {};
}
function query() {
  const { conditionInfo, tableData } = filter();
  emits('confirm', conditionInfo, tableData ?? []);
}
function filter(data?: any[]) {
  const sourceData = Array.isArray(data) ? data : props.data;
  const conditionInfo = getConditionInfo();
  if (conditionInfo.conditionList.length === 0 || props.remote === true) {
    return {
      conditionInfo,
      tableData: sourceData
    }; 
  }
  const remoteFieldMap = getRemoteFieldMap();
  const newData = sourceData?.filter((dataItem: any) => {
    if (filterRule.value === 0) {
      return conditionInfo.conditionList.some(item => {
        if (remoteFieldMap.has(item.key)) {
          return true;
        }
        const targetColumn = flatColumns.value?.find(col => col[props.filterKey] === item.key);
        if (!targetColumn || !targetColumn[props.filterKey]) {
          return false;
        }
        return item.handler?.(dataItem[targetColumn[props.filterKey]], item.value);
      });
    } 
    return conditionInfo.conditionList.every(item => {
      if (remoteFieldMap.has(item.key)) {
        return true;
      }
      const targetColumn = flatColumns.value?.find(col => col[props.filterKey] === item.key);
      if (!targetColumn || !targetColumn[props.filterKey]) {
        return false;
      }
      return item.handler?.(dataItem[targetColumn[props.filterKey]], item.value);
    });
  });
  return {
    conditionInfo,
    tableData: newData ?? []
  };
}
function getConditionInfo() {
  const disabledLogicTypes = ['empty', 'nonEmpty'];
  const conditionList = filterData.value
  .filter(item => item.key && item.logic && (isValid(item.value) || disabledLogicTypes.includes(item.logic)))
  .map(item => ({
    title: item.title.join(' - '),
    logic: t?.(item.logic),
    key: item.key,
    showValue: item.showValue,
    value: item.value,
    handler: item.handler
  }));
  return {
    conditionList,
    filterRule: filterRule.value
  };
}
function getRemoteFieldMap() {
  if (!Array.isArray(props.remote)) {
    return new Map();
  }
  return new Map(props.remote.map((item: any, index: number) => [item, index]));
}
function changeCondition(index:number) {
  const targetItem = filterData.value[index];
  const titles = targetItem.title ?? [];
  if (titles.length === 0) {
    targetItem.key = null;
    targetItem.logic = 'equal';
    targetItem.value = '';
    targetItem.showValue = '';
    return;
  }
  let columns: any[] = props.options ?? [];
  let columnItem: any = null;
  for (const title of titles) {
    columnItem = columns?.find(item => item.title === title);
    columns = columnItem?.group ?? [];
  }
  targetItem.key = columnItem?.[props.filterKey];
  targetItem.logic = 'equal';
  const logicOptionItem = logicOptions.find(item => item.type === (columnItem.dataType || 'string'));
  if (logicOptionItem) {
    const logicItem = logicOptionItem.logicList.find(item => item.logic === 'equal');
    targetItem.handler = logicItem?.handler as any;
  }
  if (columnItem?.options?.length) {
    targetItem.value = columnItem.options[0].value;
    targetItem.showValue = columnItem.options[0].label;
    targetItem._allowSelectLogic = false;
  } else {
    targetItem.value = '';
    targetItem.showValue = '';
    targetItem._allowSelectLogic = true;
  }
}
function changeLogic(dataItem) {
  if ((dataItem.logic === 'after' ||
    dataItem.logic === 'before') &&
    dataItem.dateType === 'datetimerange'
  ) {
    dataItem.dateType = 'datetime';
    dataItem.dateRange = 'date';
  }
  const type = instance.value(dataItem.key)?.dataType ?? 'string';
  const logicOptionItem = logicOptions.find(item => item.type === type);
  if (!logicOptionItem) {
    return;
  }
  if (disabledInput.value(dataItem)) {
    dataItem.value = '';
    dataItem.showValue = '';
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
    item.showValue = '';
    return;
  }
  changeDateRange(item);
}
function changeDateRange(item:IFilterDataType) {
  setDatePickerType(item);
  let dateValue:any = Array.isArray(item.value) ? '' : item.value;
  switch (item.dateRange) {
    case 'range': dateValue = ['', '']; break;
    case 'today': dateValue = getTargetDay(0); break;
    case 'tomorrow': dateValue = getTargetDay(1); break;
    case 'yesterday': dateValue = getTargetDay(-1); break;
    case 'current-week':
      dateValue = [getTargetDay(-getWeekDay() + 1), getTargetDay(7 - getWeekDay(), true)]; break;
    case 'last-week':
      dateValue = [getTargetDay(-getWeekDay() - 6), getTargetDay(-getWeekDay(), true)]; break;
    case 'current-month':
      dateValue = [getTargetDay(-getDateDay() + 1), getTargetDay(getCurMonthDayCount() - getDateDay(), true)]; break;
    case 'last-month':
      dateValue = [getTargetDay(-getDateDay() - getCurMonthDayCount(true) + 1), getTargetDay(-getDateDay(), true)]; break;
    case 'past-seven-days': dateValue = [getTargetDay(-7), getTargetDay(-1, true)]; break;
    case 'past-thirty-days': dateValue = [getTargetDay(-30), getTargetDay(-1, true)]; break;
  }
  const targetRanges = ['current-week', 'last-week', 'current-month', 'last-month'];
  if (item.dateType === 'datetime' && targetRanges.includes(item.dateRange as string)) {
    item.value = dateValue[0];
    item.showValue = formatter(dateValue[0], props.formatter);
  } else {
    item.value = dateValue;
    if (Array.isArray(dateValue)) {
      item.showValue = formatter(dateValue, props.formatter).join(' - ');
    } else {
      item.showValue = formatter(dateValue, props.formatter);
    }
  }
}
// 日期推导
function getTargetDay(index:number, isEnd = false) {
  const currentDate = new Date();
  const targetDate = new Date(currentDate);
  targetDate.setDate(targetDate.getDate() + index);
  if (isEnd) {
    targetDate.setHours(23, 59, 59, 0);
  } else {
    targetDate.setHours(0, 0, 0, 0);
  }
  return targetDate;
}
function getWeekDay() {
  return new Date().getDay();
}
function getDateDay() {
  return new Date().getDate();
}
function getCurMonthDayCount(isPre = false) {
  const currentMonth = new Date().getMonth() + 1;
  const month = isPre ? currentMonth - 1 : currentMonth;
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
  if (item.logic === 'equal') {
    const dateArray = ['date', 'today', 'tomorrow', 'yesterday'];
    item.dateType = dateArray.includes(item.dateRange as string) ? 'datetime' : 'datetimerange';
  } else if (item.logic === 'after' || item.logic === 'before') {
    const dateArray = ['range'];
    item.dateType = !dateArray.includes(item.dateRange as string) ? 'datetime' : 'datetimerange';
  }
}
function updateValue(dataItem:IFilterDataType, uiType:string, options?:any[]) {
  if (uiType === 'input') {
    dataItem.showValue = dataItem.value;
  } else if (uiType === 'select') {
    const targetOption = options?.find(item => item.value === dataItem.value);
    dataItem.showValue = targetOption?.label ?? '';
  }
}
function dateChange(val: any, item: any) {
  const formatterData = formatter(val, props.formatter);
  item.showValue = Array.isArray(formatterData) ? formatterData.join(' - ') : formatterData;
}

defineExpose({ filter, clearFilter, getConditionInfo });
</script>

<style>
@import './style.less';
</style>