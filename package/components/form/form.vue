<template>
  <div class="k-form">
    <el-form
      ref="KFormRef"
      v-bind="attrs"
      @validate="handleValidate"
    >
      <slot></slot>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FormItemProp, FormValidateCallback } from 'element-plus';
import { IForm } from '../../interface/index';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KForm'
});

type Arrayable<T> = T | T[];

const props = withDefaults(defineProps<IForm>(), {
  labelPosition: 'right',
  requireAsteriskPosition: 'left',
  showMessage: true,
  validateOnRuleChange: true
});
const emits = defineEmits(['update:modelValue', 'validate']);

const KFormRef = ref<any>(null);

const attrs = computed(() => ({
  model: props.model,
  rules: props.rules,
  inline: props.inline,
  labelPosition: props.labelPosition,
  labelWidth: props.labelWidth,
  labelSuffix: props.labelSuffix,
  hideRequiredAsterisk: props.hideRequiredAsterisk,
  requireAsteriskPosition: props.requireAsteriskPosition,
  showMessage: props.showMessage,
  inlineMessage: props.inlineMessage,
  statusIcon: props.statusIcon,
  validateOnRuleChange: props.validateOnRuleChange,
  size: getCompSize(props.size),
  disabled: props.disabled,
  scrollToError: props.scrollToError,
  scrollIntoViewOptions: props.scrollIntoViewOptions
}));

const handleValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  emits('validate', prop, isValid, message);
};
const validate = (callback?: FormValidateCallback) => {
  KFormRef.value?.validate(callback);
};
const validateField = (
  props?: Arrayable<FormItemProp> | undefined,
  callback?: FormValidateCallback | undefined
) => {
  KFormRef.value?.validateField(props, callback);
};
const resetFields = (props?: Arrayable<FormItemProp> | undefined) => {
  KFormRef.value?.resetFields(props);
};
const scrollToField = (prop: FormItemProp) => {
  KFormRef.value?.scrollToField(prop);
};
const clearValidate = (props?: Arrayable<FormItemProp> | undefined) => {
  KFormRef.value?.clearValidate(props);
};
const fields = computed(() => KFormRef.value?.fields);

defineExpose({
  fields,
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate
});

</script>

<style lang="less">
@import './style.less';
</style>