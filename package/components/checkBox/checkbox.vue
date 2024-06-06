<template>
  <el-checkbox
    :class="randomClassName"
    class="k-checkbox"
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
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, inject } from 'vue';
import { SelectButtonProps } from './type';
import { genRandomStr, getCompSize } from '../../utils/index';

defineOptions({
  name: 'KCheckbox'
});

const isWarpped = inject('useCheckboxGroup', false);
const fillColor = inject('fillColor', ref(''));

const props = withDefaults(defineProps<SelectButtonProps>(), {});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);
const randomClassName = genRandomStr(8);

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

watch(() => [props.color, fillColor?.value], () => {
  nextTick(() => {
    const color = props.color || fillColor?.value || '#2882FF';
    const element = document.getElementsByClassName(randomClassName)[0] as HTMLElement;
    element?.style?.setProperty('--checkbox-bgColor', color);
  });
}, { immediate: true });

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