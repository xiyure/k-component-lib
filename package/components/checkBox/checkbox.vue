<template>
  <el-checkbox
    ref="kCheckboxRef"
    v-model="modelValue"
    class="k-checkbox"
    v-bind="$attrs"
    :label="label"
    :size="getCompSize(size)"
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
import { ref, watch, nextTick, inject } from 'vue';
import { SelectButtonProps } from './type';
import { getCompSize, isValidColor } from '../../utils/index';

defineOptions({
  name: 'KCheckbox'
});

const isWarpped = inject('useCheckboxGroup', false);
const fillColor = inject('_fillColor', ref(''));

const props = withDefaults(defineProps<SelectButtonProps>(), {});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);
const kCheckboxRef = ref();

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
}, { immediate: true });

watch(() => [props.color, fillColor.value], () => {
  let color = '#2882FF';
  if (isValidColor(props.color)) {
    color = props.color as string;
  } else if (isValidColor(fillColor.value)) {
    color = fillColor.value;
  }
  nextTick(() => {
    const element = kCheckboxRef.value.$el;
    element.style.setProperty('--checkbox-bgColor', color);
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