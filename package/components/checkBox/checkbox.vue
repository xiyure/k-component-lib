<template>
  <el-checkbox
    class="k-checkbox"
    v-model="modelValue"
    v-bind="attrs"
    :id="id"
    @change="handleChange"
  >
    <slot>
      <span class="checkbox__label">
        {{ props.label }}
      </span>
    </slot>
  </el-checkbox>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, inject } from 'vue';
import { SelectButtonProps } from './type';
import { genRandomStr, getCompSize } from '../../utils/index';

defineOptions({
  name: 'KCheckbox'
});

const isWarpped = inject('useCheckboxGroup', false);
const selectedData:any = inject('selectedData', []);
const fillColor = inject('fillColor', null);

const props = withDefaults(defineProps<SelectButtonProps>(), {});

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
  value: props.value,
  label: props.label,
  disabled: props.disabled,
  indeterminate: props.indeterminate,
  checked: props.checked,
  name: props.name,
  id: props.id,
  size: getCompSize(props.size)
}));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
}, { immediate: true });

// watch(() => [modelValue.value, selectedData.value, props.indeterminate], () => {
//   nextTick(() => {
//     const color = (props.color || fillColor || '#409eff') as string;
//     const element = document.getElementById(id);
//     console.log(color)
//     element?.style?.setProperty('--default-bgColor', color);
//   });
// }, { immediate: true });

const handleChange = (value: boolean) => {
  if (isWarpped) {
    return;
  }
  emits('update:modelValue', value);
  emits('change', value);
};

</script>

<style lang="css">
@import './style.css';
</style>