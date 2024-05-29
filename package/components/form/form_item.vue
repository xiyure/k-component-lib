<template>
  <el-form-item
    ref="KFormItemRef"
    class="k-form-item"
    v-bind="attrs"
  >
    <slot></slot>
    <template v-if="slots.label" #label>
      <slot name="label"></slot>
    </template>
    <template v-if="slots.error" #error>
      <slot name="error"></slot>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FormValidateCallback } from 'element-plus';
import { FormItemProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KFormItem'
});

const props = withDefaults(defineProps<FormItemProps>(), {
  labelWidth: '',
  showMessage: true,
  inlineMessage: '',
  required: undefined
});
const slots = defineSlots();

const KFormItemRef = ref<any>(null);

const attrs = computed(() => ({
  props: props.props,
  label: props.label,
  labelWidth: props.labelWidth,
  required: props.required,
  rules: props.rules,
  error: props.error,
  showMessage: props.showMessage,
  inlineMessage: props.inlineMessage,
  size: getCompSize(props.size),
  for: props.for,
  validateStatus: props.validateStatus
}));

const validate = (trigger: string, callback?: FormValidateCallback) => {
  KFormItemRef.value?.validate(trigger, callback);
};
const resetField = () => {
  KFormItemRef.value?.resetField();
};
const clearValidate = () => {
  KFormItemRef.value?.clearValidate();
};
const size = computed(() => KFormItemRef.value?.size);
const validateMessage = computed(() => KFormItemRef.value?.validateMessage);
const validateState = computed(() => KFormItemRef.value?.validateState);

defineExpose({
  size,
  validateMessage,
  validateState,
  validate,
  resetField,
  clearValidate
});
</script>

<style lang="less">
@import './style.less';
</style>