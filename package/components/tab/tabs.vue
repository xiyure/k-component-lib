<template>
  <div class="k-tabs">
    <el-tabs
      v-model="activeName"
      v-bind="originAttrs"
      :tab-position="props.position"
      @tab-click="handleClick"
      @tab-remove="handleRemove"
    >
      <slot></slot>
    </el-tabs>
  </div>
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
  position: {
    type: String,
    default: 'top',
  },
  router: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['tab-click', 'tab-remove']);

const activeName = ref('');

provide('isUseRouter', props.router);
provide('activeName', activeName);

watch(() => props.modelValue, () => {
  activeName.value = props.modelValue as string;
}, { immediate: true });

const getOriginAttrs = () => {
  const { type } = props;
  return { type };
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