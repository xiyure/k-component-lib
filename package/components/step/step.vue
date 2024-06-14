<template>
  <el-step
    v-if="!isCapsule"
    class="k-step"
    v-bind="$attrs"
    :title="title"
    :description="description"
    :icon="icon"
    :status="getProcessStatus(status)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-step>
  <div v-else :id="id" class="k-step__capsule-box">
    <k-popover
      :show-after="500"
      :disabled="!props.description"
    >
      <template #reference>
        <span class="k-step__title">
          <props.icon v-if="props.icon" class="k-step__icon" />
          {{ props.title }}
        </span>
      </template>
      {{ props.description }}
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { watch, inject, nextTick } from 'vue';
import { StepProps } from './type';
import { KPopover } from '../popover';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KStep'
});

const props = withDefaults(defineProps<StepProps>(), {
  title: '',
  description: '',
  status: ''
});
const isCapsule = inject('isCapsule');

const id = genRandomStr(8);
const DEFAULT_STATUS_COLOR = {
  primary: '#2882FF',
  success: '#22C55E',
  error: '#EF4444',
  wait: '#EAE8EB'
};

watch(() => [props.color, props.status], (newValue) => {
  if (!newValue[0] && !newValue[1]) {
    return;
  }
  let newColor:string;
  if (props.status && DEFAULT_STATUS_COLOR[props.status]) {
    newColor = DEFAULT_STATUS_COLOR[props.status];
  } else if (props.color) {
    newColor = props.color;
  } else {
    newColor = DEFAULT_STATUS_COLOR.primary;
  }
  nextTick(() => {
    const element = document.getElementById(id);
    element?.style?.setProperty('--default-bgColor', newColor);
  });
}, { immediate: true, deep: true });

function getProcessStatus(type:string) {
  switch (type) {
    case 'primary': return 'finish';
    case 'wait': return 'wait';
    case 'success': return 'success';
    case 'error': return 'error';
    default: return '';
  }
}
</script>

<style lang="css">
@import './style.css';
</style>