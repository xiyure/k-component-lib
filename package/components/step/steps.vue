<template>
  <div :class="['k-steps', _styleModule]">
    <el-steps
      v-if="!capsule"
      ref="KStepsRef"
      v-bind="$attrs"
      :process-status="getProcessStatus(processStatus)"
      :finish-status="getProcessStatus(finishStatus)"
      :active="active"
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-steps>
    <div v-else :id="id" class="k-step__capsule">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, nextTick, useSlots, inject } from 'vue';
import { ElSteps } from 'element-plus';
import { StepsProps } from './type';
import { genRandomStr, handleExpose } from '../../utils';

defineOptions({
  name: 'KSteps'
});

const props = withDefaults(defineProps<StepsProps>(), {
  processStatus: 'finish',
  finishStatus: 'success'
});

const _styleModule = inject('_styleModule', '');
const steps = ref<any>([]);
const slots = useSlots();

if (props.capsule) {
  const children = slots.default?.()[0].children ?? [];
  steps.value = (children as any[]).map(item => {
    if (item.type && item.type.name === 'KStep') {
      return {
        key: item.key,
        name: item.props?.title
      };
    }
    return null;
  }).filter(item => item);
}

const id = genRandomStr(8);

// 高度监听
watch(() => props.height, (newValue) => {
  if (!newValue) {
    return;
  }
  nextTick(() => {
    const stepBoxHeight = typeof newValue === 'number' ?
      `${newValue}px` :
      newValue;
    const element = document.getElementById(id);
    element?.style.setProperty('--height', stepBoxHeight);
  });
}, { immediate: true });

function getProcessStatus(type:string) {
  switch (type) {
    case 'primary': return 'finish';
    case 'wait': return 'wait';
    case 'success': return 'success';
    case 'error': return 'error';
    default: return 'finish';
  }
}

provide('stepProps', props);
provide('stepsInfo', steps);

const KStepsRef = ref(null);
const instance: any = {};
handleExpose(instance, KStepsRef, 'KSteps');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>