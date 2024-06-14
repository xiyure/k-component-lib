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
let inputDoms:HTMLInputElement[];

onMounted(() => {
  inputDoms = KFormRef.value?.$el.querySelectorAll('input');
  const targetType = ['text', 'password', 'number'];
  inputDoms = Array.from(inputDoms).filter(item => targetType.includes(item.type));
  inputDoms.forEach((item, index) => {
    item.setAttribute('data-index', index.toString());
  });
  KFormRef.value?.$el.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  KFormRef.value?.$el.removeEventListener('keydown', onKeyDown);
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

function onKeyDown(event:any) {
  const index = event.target.getAttribute('data-index');
  let nextIndex = parseInt(index);
  if (Number.isNaN(nextIndex) || nextIndex < 0 || nextIndex >= inputDoms.length) {
    return;
  }
  // 判断当前是否按压上下方向键以及回车键
  if (event.keyCode === 13 && nextIndex === inputDoms.length - 1) {
    return;
  }
  if (event.keyCode === 13 || event.keyCode === 40) {
    nextIndex += 1;
  } else if (event.keyCode === 38) {
    nextIndex -= 1;
  } else {
    return;
  }
  if (nextIndex < 0) {
    inputDoms[inputDoms.length - 1].focus();
  } else if (nextIndex >= inputDoms.length) {
    inputDoms[0].focus();
  } else {
    inputDoms[nextIndex].focus();
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