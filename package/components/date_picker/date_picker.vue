<template>
  <div class="k-date-picker">
    <el-date-picker
      ref="datePickerRef"
      v-model="modelValue"
      v-bind="attrs"
      unlink-panels
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @calendar-change="handleCalendarChange"
      @visible-change="handleVisibleChange"
    ></el-date-picker>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { IDatePicker } from '../../interface/index';

defineOptions({
  name: 'KDatePicker'
});

const props = withDefaults(defineProps<IDatePicker>(), {
  clearable: true,
  editable: true,
  rangeSeparator: '-'
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

const attrs = computed(() => ({
  ...getSizeAttrs(),
  ...getOriginAttrs(),
}));

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    modelValue.value = newValue;
    return;
  }
  modelValue.value = '';
});

const getSizeAttrs = ():object => ({
  size: props.size === 'sm' ? 'small' : ''
});
const getOriginAttrs = () => ({
  type: props.type,
  format: props.format,
  disabled: props.disabled,
  valueFormat: props.valueFormat,
  rangeSeparator: props.rangeSeparator,
  clearable: props.clearable,
  placeholder: props.placeholder,
  startPlaceholder: props.startPlaceholder,
  endPlaceholder: props.endPlaceholder,
  popperClass: props.popperClass,
  readonly: props.readonly,
  editable: props.editable,
  disabledDate: props.disabledDate,
  defaultValue: props.defaultValue,
  defaultTime: props.defaultTime,
  prefixIcon: props.prefixIcon
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
function focus() {
  datePickerRef.value?.foucus();
}

defineExpose({ focus });

</script>

<style lang="less">
@import './style.less';
</style>