<template>
  <div class="k-input-number">
    <el-input-number
      ref="inputNumberRef"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { IInputNumberProps } from '../../interface/index';

defineOptions({
  name: 'KInputNumber'
});

type InputValue = number | null;

const props = withDefaults(defineProps<IInputNumberProps>(), {
  controls: true,
});

const emit = defineEmits(['update:modelValue', 'blur', 'change', 'focus']);

const inputNumberRef = ref<HTMLElement | null>(null);
const inputValue = ref<InputValue>(0);
const attrs = computed(() => ({
  ...getSizeAttrs(),
  ...getOriginAttrs(),
}));

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });

const getSizeAttrs = ():object => ({
  size: props.size === 'sm' ? 'small' : '',
});
const getOriginAttrs = () => ({
  id: props.id,
  name: props.name,
  label: props.label,
  disabled: props.disabled,
  placeholder: props.placeholder,
  readonly: props.readonly,
  max: props.max,
  min: props.min,
  step: props.step,
  stepStrictly: props.stepStrictly,
  precision: props.precision,
  controls: props.controls,
  controlsPosition: props.controlsPosition,
});

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