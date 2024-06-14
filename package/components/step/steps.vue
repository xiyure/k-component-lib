<template>
  <div class="k-steps">
    <el-steps
      v-if="!capsule"
      v-bind="$attrs"
      :process-status="getProcessStatus(processStatus)"
      :finish-status="getProcessStatus(finishStatus)"
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
import { watch, provide, nextTick } from 'vue';
import { StepsProps } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KSteps'
});

const props = withDefaults(defineProps<StepsProps>(), {
  processStatus: 'wait',
  finishStatus: 'finish'
});

const id = genRandomStr(8);

// 高度监听
watch(() => props.height, (newValue) => {
  if (!newValue) {
    return;
  }
  nextTick(() => {
    const stepBoxHeight = typeof newValue === 'number'
      ? `${ newValue }px`
      : newValue;
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

provide('isCapsule', props.capsule);
</script>

<style lang="css">
@import './style.css';
</style>