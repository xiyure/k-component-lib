<template>
  <el-form
    ref="KFormRef"
    class="k-form"
    v-bind="attrs"
    @validate="handleValidate"
  >
    <slot></slot>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { FormItemProp, FormValidateCallback } from 'element-plus';
import { FormProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KForm'
});

type Arrayable<T> = T | T[];

const props = withDefaults(defineProps<FormProps>(), {
  labelPosition: 'right',
  requireAsteriskPosition: 'left',
  showMessage: true,
  validateOnRuleChange: true
});
const emits = defineEmits(['update:modelValue', 'validate']);

const KFormRef = ref<any>(null);
let inputDoms:HTMLElement[];

onMounted(() => {
  inputDoms = KFormRef.value?.$el.querySelectorAll('input');
  inputDoms.forEach((item, index) => {
    item.setAttribute('data-index', index.toString());
  });
  KFormRef.value?.$el.addEventListener('keypress', onKeyPress);
});

onUnmounted(() => {
  KFormRef.value?.$el.removeEventListener('keypress', onKeyPress);
});

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

function onKeyPress(event:any) {
  const index = event.target.getAttribute('data-index');
  const nextIndex = parseInt(index) + 1;
  if (nextIndex < inputDoms.length) {
    inputDoms[nextIndex].focus();
  } else {
    inputDoms[0].focus();
  }
}
const handleValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  emits('validate', prop, isValid, message);
};
const validate = (callback?: FormValidateCallback) => KFormRef.value?.validate(callback);
const validateField = (
  props?: Arrayable<FormItemProp> | undefined,
  callback?: FormValidateCallback | undefined
) => KFormRef.value?.validateField(props, callback);
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