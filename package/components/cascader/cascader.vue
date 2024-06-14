<template>
  <el-cascader
    ref="cascaderRef"
    v-model="inputValue"
    class="k-cascader"
    v-bind="$attrs"
    :size="getCompSize(size)"
    @change="handleChangeEvent"
    @focus="handleFocusEvent"
    @blur="handleBlurEvent"
    @expand-change="handleExpandEvent"
    @visible-change="handleVisibleChangeEvent"
    @remove-tag="handleRemoveTagEvent"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { CascaderProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KCascader'
});

type InputValue = string | number;

const props = withDefaults(defineProps<CascaderProps>(), {
  size: 'base'
});

const emits = defineEmits([
  'update:modelValue',
  'blur',
  'change',
  'expand-change',
  'focus',
  'visible-change',
  'remove-tag'
]);

const inputValue = ref<InputValue>('');
const cascaderRef = ref<any>(null);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });

function handleBlurEvent() {
  emits('blur');
}
function handleFocusEvent() {
  emits('focus');
}
function handleChangeEvent(value:InputValue) {
  emits('update:modelValue', value);
  emits('change', value);
}
function handleExpandEvent(value:boolean) {
  emits('expand-change', value);
}
function handleVisibleChangeEvent(value:boolean) {
  emits('visible-change', value);
}
function handleRemoveTagEvent(tag:any) {
  emits('remove-tag', tag);
}
function getCheckedNodes(isOnlyLeaf:boolean) {
  return cascaderRef.value?.getCheckedNodes(isOnlyLeaf);
}
function togglePopperVisible(isExpand:boolean) {
  cascaderRef.value?.togglePopperVisible(isExpand);
}

defineExpose({
  getCheckedNodes,
  togglePopperVisible
});
</script>

<style lang="less">
@import './style.less';
</style>