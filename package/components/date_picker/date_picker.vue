<template>
  <el-date-picker
    ref="datePickerRef"
    v-model="modelValue"
    class="k-date-picker"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @calendar-change="handleCalendarChange"
    @visible-change="handleVisibleChange"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-date-picker>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DatePicker } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KDatePicker'
});

const props = withDefaults(defineProps<DatePicker>(), {
  size: 'base'
});

const emits = defineEmits([
  'update:modelValue',
  'change',
  'focus',
  'blur',
  'calendar-change',
  'visible-change'
]);

const modelValue = ref(props.modelValue);
const datePickerRef = ref<any>(null);

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    modelValue.value = newValue;
    return;
  }
  modelValue.value = '';
});

function handleChange(value: any) {
  const changeValue = value || '';
  emits('update:modelValue', changeValue);
  emits('change', changeValue);
}
function handleFocus(e: FocusEvent) {
  emits('focus', e);
}
function handleBlur(e: FocusEvent) {
  emits('blur', e);
}
function handleCalendarChange(date: Array<Date>) {
  emits('calendar-change', date);
}
function handleVisibleChange(value: boolean) {
  emits('visible-change', value);
}
function focus(focusStartInput?: boolean, isIgnoreFocusEvent?: boolean) {
  datePickerRef.value?.foucus(focusStartInput, isIgnoreFocusEvent);
}
function handleOpen() {
  datePickerRef.value?.handleOpen();
}
function handleClose() {
  datePickerRef.value?.handleClose();
}

defineExpose({ focus, handleOpen, handleClose });

</script>

<style lang="less">
@import './style.less';
</style>