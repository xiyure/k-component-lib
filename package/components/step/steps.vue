<template>
  <div class="k-steps">
    <el-steps
      v-if="!props.capsule"
      :active="active"
      v-bind="attrs"
    >
      <slot></slot>
    </el-steps>
    <div v-else :id="id" class="k-step__capsule">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, nextTick } from 'vue';
import { StepsProps } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KSteps'
});

const props = withDefaults(defineProps<StepsProps>(), {
  space: '',
  direction: 'horizontal',
  active: 0,
  processStatus: 'wait',
  finishStatus: 'finish'
});

const active = ref(props.active);
const id = genRandomStr(8);

const attrs = computed(() => ({
  space: props.space,
  direction: props.direction,
  processStatus: getProcessStatus(props.processStatus),
  finishStatus: getProcessStatus(props.finishStatus),
  alignCenter: props.alignCenter
}));

watch(() => props.active, (newValue) => {
  active.value = newValue;
});

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