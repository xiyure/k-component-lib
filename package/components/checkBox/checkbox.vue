<template>
  <div
    :id="id"
    class="k-checkbox"
  >
    <el-checkbox
      v-model="modelValue"
      v-bind="attrs"
      @change="handleChange"
    >
      <slot>
        <span class="checkbox__label">
          {{ props.label }}
        </span>
      </slot>
    </el-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, inject } from 'vue';
import { ISelectButtonProps } from '../../interface/index';
import { genRandomStr } from '../../utils/index';

defineOptions({
  name: 'KCheckbox'
});

const isWarpped = inject('useCheckboxGroup', false);
const selectedData:any = inject('selectedData', []);
const fillColor = inject('fillColor', null);

const props = withDefaults(defineProps<ISelectButtonProps>(), {});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);
let checkboxDom:HTMLElement | null = null;
let labelDom:HTMLElement | null = null;
let selectDom:HTMLElement | null = null;
const id = genRandomStr(8);
onMounted(() => {
  checkboxDom = document.getElementById(id);
  if (checkboxDom === null) {
    return;
  }
  selectDom = checkboxDom.querySelector('.el-checkbox .el-checkbox__inner');
  labelDom = checkboxDom.querySelector('.el-checkbox .el-checkbox__label');
});

const attrs = computed(() => ({
  ...getSizeAttrs(),
  ...getOriginAttrs(),
}));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
}, { immediate: true });

watch(() => [modelValue.value, selectedData.value, props.indeterminate], () => {
  nextTick(() => {
    const color = (props.color || fillColor || '#409eff') as string;
    changeCheckboxStyle(color);
  });
}, { immediate: true });

const getSizeAttrs = ():object => ({
  size: props.size === 'sm' ? 'small' : ''
});
const getOriginAttrs = () => ({
  value: props.value,
  label: props.label,
  disabled: props.disabled,
  indeterminate: props.indeterminate
});
function changeCheckboxStyle(color:string) {
  let isChecked = false;
  if (isWarpped) {
    isChecked = selectedData.value.includes(props.value);
  } else {
    isChecked = modelValue.value === true;
  }
  if (labelDom !== null && isChecked) {
    labelDom.style.color = color;
  } else if (labelDom !== null && !isChecked) {
    labelDom.style.color = '#000';
  }
  if (selectDom !== null && (isChecked || props.indeterminate)) {
    selectDom.style.backgroundColor = color;
    selectDom.style.borderColor = color;
  } else if (selectDom !== null && !isChecked && !props.indeterminate) {
    selectDom.style.backgroundColor = '#FFF';
    selectDom.style.borderColor = '#CDCACF';
  }
}
const handleChange = (value: boolean) => {
  if (isWarpped) {
    return;
  }
  emits('update:modelValue', value);
  emits('change', value);
};

</script>

<style lang="less">
@import './style.less';
</style>