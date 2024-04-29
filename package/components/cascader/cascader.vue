<template>
  <div class="k-cascader">
    <el-cascader
      ref="cascaderRef"
      v-model="inputValue"
      v-bind="attrs"
      :props="propsConfig"
      collapse-tags-tooltip
      @change="handleChangeEvent"
      @focus="handleFocusEvent"
      @blur="handleBlurEvent"
      @expand-change="handleExpandEvent"
      @visible-change="handleVisibleChangeEvent"
      @remove-tag="handleRemoveTagEvent"
    >
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </el-cascader>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ICascaderProps, ICascaderConfig } from '../../interface/index';

defineOptions({
  name: 'KCascader'
});

type InputValue = string | number;

const props = withDefaults(defineProps<ICascaderProps>(), {
  showAllLevels: true,
  separator: '/'
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

const attrs = computed(() => ({
  ...getSizeAttrs(),
  ...getOriginAttrs(),
}));

const propsConfig:object = computed(() => {
  if (!props.props) {
    return {};
  }
  const cascaderConfig = props.props as ICascaderConfig;
  return {
    expandTrigger: cascaderConfig?.expandTrigger ?? 'click',
    multiple: Boolean(cascaderConfig?.multiple),
    emitPath: Boolean(cascaderConfig?.emitPath),
    value: cascaderConfig?.value ?? 'value',
    label: cascaderConfig?.label ?? 'label',
    children: cascaderConfig?.children ?? 'children',
    leaf: cascaderConfig?.leaf ?? 'leaf',
    lazy: Boolean(cascaderConfig?.lazy),
    lazyLoad: cascaderConfig.lazyLoad ?? null,
    checkStrictly: Boolean(cascaderConfig?.checkStrictly),
  };
});

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });

const getSizeAttrs = ():object => ({
  size: props.size === 'sm' ? 'small' : '',
});

const getOriginAttrs = () => ({
  disabled: props.disabled,
  placeholder: props.placeholder,
  clearable: props.clearable,
  filterable: props.filterable,
  popperClass: props.popperClass,
  separator: props.separator,
  options: getOptions(),
  showAllLevels: props.showAllLevels,
  collapseTags: props.collapseTags,
  beforeFilter: props.beforeFilter
});

function getOptions() {
  if (!props.props) {
    return {};
  }
  const cascaderConfig = props.props as ICascaderConfig;
  const { lazy, lazyLoad } = cascaderConfig;
  if (lazy && lazyLoad) {
    return [];
  }
  return props.options;
}

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
  cascaderRef.value?.getCheckedNodes(isOnlyLeaf);
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