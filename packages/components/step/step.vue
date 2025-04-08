<template>
  <el-step
    v-if="!stepsProps.capsule"
    ref="KStepRef"
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
    <k-popover :show-after="500" :disabled="!props.description">
      <template #reference>
        <slot name="title">
          <span class="k-step__title">
            <component :is="props.icon" v-if="props.icon" />
            {{ props.title }}
          </span>
        </slot>
      </template>
      {{ props.description }}
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, nextTick } from 'vue';
import { ElStep } from 'element-plus';
import { isNumber } from 'lodash-es';
import { StepProps, StepsProps } from './type';
import { KPopover } from '../popover';
import { genRandomStr, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KStep'
});

const props = withDefaults(defineProps<StepProps>(), {
  title: '',
  description: '',
  status: ''
});
const stepsProps: StepsProps = inject('stepProps', {});
const steps: string[] = inject('steps', []);
const stepMethods = inject('stepMethods') as any;

// 向父组件添加step信息
stepMethods.registerStep(props.title);

const id = genRandomStr(8);
const DEFAULT_STATUS_COLOR: {
  primary: string;
  success: string;
  error: string;
  wait: string;
  [key: string]: string;
} = {
  primary: '#2882FF',
  success: '#22C55E',
  error: '#EF4444',
  wait: '#EAE8EB'
};
watch(() => props.title, (newValue: string, oldValue: string) => {
  if (newValue !== oldValue) {
    stepMethods.updateStep(newValue, oldValue);
  }
});
watch(
  () => stepsProps.active,
  (newValue) => {
    const index = steps.indexOf(props.title);
    if (
      !isNumber(newValue) ||
      index === -1 ||
      newValue < 0 ||
      newValue > steps.length ||
      props.status ||
      props.color
    ) {
      return;
    }
    const typeKeys = Object.keys(DEFAULT_STATUS_COLOR);
    let color: string = '';
    if (newValue === index) {
      const processStatus = getProcessStatus(stepsProps.processStatus);
      color = typeKeys.includes(processStatus) ?
        DEFAULT_STATUS_COLOR[processStatus] :
        DEFAULT_STATUS_COLOR.primary;
    } else if (newValue > index) {
      const finishStatus = getProcessStatus(stepsProps.finishStatus);
      color = typeKeys.includes(finishStatus) ?
        DEFAULT_STATUS_COLOR[finishStatus] :
        DEFAULT_STATUS_COLOR.success;
    } else {
      color = DEFAULT_STATUS_COLOR.wait;
    }
    if (!color) {
      return;
    }
    setStepColor(color);
  },
  { immediate: true }
);
watch(
  () => [props.color, props.status],
  (newValue) => {
    if (!newValue[0] && !newValue[1]) {
      return;
    }
    let newColor: string;
    if (props.status && [props.status]) {
      newColor = DEFAULT_STATUS_COLOR[props.status];
    } else if (props.color) {
      newColor = props.color;
    } else {
      newColor = DEFAULT_STATUS_COLOR.primary;
    }
    setStepColor(newColor);
  },
  { immediate: true, deep: true }
);

function setStepColor(color: string) {
  if (typeof window !== 'undefined') {
    nextTick(() => {
      const element = document.getElementById(id);
      element?.style?.setProperty('--default-bgColor', color);
    });
  }
}

function getProcessStatus(type: string | undefined) {
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
      return '';
  }
}

const KStepRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KStepRef));
</script>

<style lang="less">
@import './style.less';
</style>
