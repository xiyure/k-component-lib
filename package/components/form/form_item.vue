<template>
  <el-form-item
    ref="KFormItemRef"
    class="k-form-item"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
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
  size: 'base'
});

const KFormItemRef = ref<any>(null);

const validate = (trigger: string, callback?: FormValidateCallback) => KFormItemRef.value?.validate(trigger, callback);
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