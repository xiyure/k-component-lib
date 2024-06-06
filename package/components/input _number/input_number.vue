<template>
  <el-input-number
    ref="inputNumberRef"
    class="k-input-number"
    v-model="inputValue"
    v-bind="attrs"
    :style="{
      width: props.width
    }"
    @change="handleChangeEvent"
    @focus="handleFocusEvent"
    @blur="handleBlurEvent"
  >
    <template #increase-icon>
      <slot name="increase-icon"></slot>
    </template>
    <template #decrease-icon>
      <slot name="decrease-icon"></slot>
    </template>
  </el-input-number>
</template>

<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance } from 'vue';
import { InputNumberProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KInputNumber'
});

type InputValue = number | null | undefined;

const props = withDefaults(defineProps<InputNumberProps>(), {
  controls: true
});

const emit = defineEmits(['update:modelValue', 'blur', 'change', 'focus']);

const _global = getCurrentInstance()?.appContext.app.config.globalProperties;
const inputNumberRef = ref<HTMLElement | null>(null);
const inputValue = ref<InputValue>(0);
const attrs = computed(() => ({
  id: props.id,
  name: props.name,
  size: getCompSize(props.size),
  label: props.label,
  disabled: props.disabled,
  placeholder: props.placeholder || _global?.$t('input'),
  readonly: props.readonly,
  max: props.max,
  min: props.min,
  step: props.step,
  stepStrictly: props.stepStrictly,
  precision: props.precision,
  controls: props.controls,
  controlsPosition: props.controlsPosition,
}));

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });

const handleBlurEvent = () => {
  emit('blur');
};
const handleFocusEvent = () => {
  emit('focus');
};
const handleChangeEvent = (value:InputValue) => {
  emit('update:modelValue', value);
  emit('change', value);
};

const focus = () => {
  inputNumberRef.value?.focus();
};
const blur = () => {
  inputNumberRef.value?.blur();
};
defineExpose({ focus, blur });

</script>

<style lang="less">
@import './style.less';
</style>