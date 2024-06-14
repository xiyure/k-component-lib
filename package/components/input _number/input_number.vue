<template>
  <el-input-number
    ref="inputNumberRef"
    v-model="inputValue"
    class="k-input-number"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
    @change="handleChangeEvent"
    @focus="handleFocusEvent"
    @blur="handleBlurEvent"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-input-number>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { InputNumberProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KInputNumber'
});

type InputValue = number | null | undefined;

const props = withDefaults(defineProps<InputNumberProps>(), {});

const emit = defineEmits(['update:modelValue', 'blur', 'change', 'focus']);

const inputNumberRef = ref<HTMLElement | null>(null);
const inputValue = ref<InputValue>(0);

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