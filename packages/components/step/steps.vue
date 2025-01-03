<template>
  <div :class="['k-steps', _styleModule]">
    <el-steps
      v-if="!capsule"
      ref="KStepsRef"
      v-bind="$attrs"
      :process-status="getProcessStatus(processStatus)"
      :finish-status="getProcessStatus(finishStatus)"
      :active="active"
      :class="[{ 'k-steps--ant': useAntStyle }]"
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
import { ref, watch, provide, nextTick, inject } from 'vue';
import { ElSteps } from 'element-plus';
import { StepsProps } from './type';
import { genRandomStr, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KSteps'
});

const props = withDefaults(defineProps<StepsProps>(), {
  processStatus: 'finish',
  finishStatus: 'success',
  useAntStyle: false
});

const _styleModule = inject('_styleModule', '');
const steps: any[] = [];

const id = genRandomStr(8);

// 高度监听
watch(
  () => props.height,
  (newValue) => {
    if (!newValue) {
      return;
    }
    if (typeof window !== 'undefined') {
      nextTick(() => {
        const stepBoxHeight = typeof newValue === 'number' ? `${newValue}px` : newValue;
        const element = document.getElementById(id);
        element?.style.setProperty('--height', stepBoxHeight);
      });
    }
  },
  { immediate: true }
);

function getProcessStatus(type: string) {
  switch (type) {
    case 'primary':
      return 'finish';
    case 'wait':
      return 'wait';
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    default:
      return 'finish';
  }
}
function registerStep(stepTitle: string) {
  steps.push(stepTitle);
}
function updateStep(newTitle: string, oldTitle: string) {
  const index = steps.indexOf(oldTitle);
  if (index !== -1) {
    steps.splice(index, 1, newTitle);
  }
}

provide('stepProps', props);
provide('steps', steps);
provide('stepMethods', {
  registerStep,
  updateStep
});

const KStepsRef = ref();

const instance: any = {};
defineExpose(getExposeProxy(instance, KStepsRef));
</script>

<style lang="less">
@import './style.less';
</style>
