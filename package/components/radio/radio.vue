<template>
  <el-radio
    ref="kRadioRef"
    v-model="modelValue"
    class="k-radio"
    :class="[getSizeClass]"
    v-bind="attrs"
    @change="handleChange"
  >
    <slot></slot>
  </el-radio>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, inject } from 'vue';
import { SelectButtonProps } from './type';
import { isValidColor } from '../../utils';

defineOptions({
  name: 'KRadio'
});

const props = withDefaults(defineProps<SelectButtonProps>(), {
  size: 'base',
});

const emits = defineEmits(['update:modelValue', 'change']);
const fillColor = inject('_fillColor', ref(''));
const modelValue = ref(props.modelValue);
const kRadioRef = ref();

const attrs = computed(() => ({
  value: props.value,
  label: props.label,
  disabled: props.disabled
}));

watch(() => [props.color, fillColor.value], () => {
  let color = '#2882FF';
  if (isValidColor(props.color)) {
    color = props.color as string;
  } else if (isValidColor(fillColor.value)) {
    color = fillColor.value;
  }
  nextTick(() => {
    const element = kRadioRef.value.$el;
    element.style.setProperty('--radio-color', color);
  });
}, { immediate: true });

const getSizeClass = computed(() => (props.size ? `el-radio--${ props.size }` : ''));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
});

const handleChange = (value: boolean) => {
  emits('update:modelValue', value);
  emits('change', value);
};

</script>

<style lang="less">
@import './style.less';
</style>