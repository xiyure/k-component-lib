<template>
  <el-tabs
    v-model="activeName"
    class="k-tabs"
    v-bind="originAttrs"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
  >
    <slot></slot>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';

defineOptions({
  name: 'KTabs'
});

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  tabPosition: {
    type: String,
    default: 'top',
  },
  router: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false
  },
  stretch: {
    type: Boolean,
    default: false
  },
  beforeLeave: {
    type: Function,
    default: () => true
  }
});

const emits = defineEmits(['tab-click', 'tab-remove', 'update:modelValue']);

const activeName = ref('');

provide('isUseRouter', props.router);
provide('activeName', activeName);

watch(() => props.modelValue, () => {
  activeName.value = props.modelValue as string;
}, { immediate: true });
watch(() => activeName.value, (newValue) => {
  emits('update:modelValue', newValue);
});

const getOriginAttrs = () => {
  const { type, closable, stretch, beforeLeave, tabPosition  } = props;
  return { type, tabPosition, closable, stretch, beforeLeave };
};
const originAttrs = getOriginAttrs();

const handleClick = (e:any) => {
  emits('tab-click', e);
};
const handleRemove = (paneName:string) => {
  emits('tab-remove', paneName);
};

</script>

<style lang="less">
@import './style.less';
</style>