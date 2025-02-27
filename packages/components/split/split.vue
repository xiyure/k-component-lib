<template>
  <component
    :is="component"
    ref="wrapperRef"
    :class="[
      'k-split',
      {
        'k-split-horizontal': isHorizontal,
        'k-split-vertical': !isHorizontal
      }
    ]"
  >
    <div
      :class="['k-split-pane', 'k-split-pane-first', pane1Class]"
      :style="{
        ...firstPaneStyles,
        ...pane1Style
      }"
    >
      <slot name="first" />
    </div>
    <ResizeObserver @mousedown="onMoveStart" @resize="onTriggerResize">
      <div
        :class="[
          'k-split-trigger',
          {
            'k-split-trigger-horizontal': isHorizontal,
            'k-split-trigger-vertical': !isHorizontal,
            'k-split-trigger-disabled': disabled
          }
        ]"
      >
        <slot v-if="showTrigger">
          <div class="k-split-trigger-icon-wrapper">
            <slot name="icon">
              <component :is="resizeTriggerIcon" class="k-split-trigger-icon" />
            </slot>
          </div>
        </slot>
        <div class="k-split-trigger-line" v-else></div>
      </div>
    </ResizeObserver>

    <div :class="['k-split-pane', 'k-split-pane-second', pane2Class]" :style="pane2Style">
      <slot name="second" />
    </div>
  </component>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, onMounted, nextTick } from 'vue';
import { isNumber, isString } from 'lodash-es';
import { IconGripHorizontal, IconGripVertical } from 'ksw-vue-icon';
import ResizeObserver from './resize_observer';
import { SplitProps } from './type';

defineOptions({
  name: 'KSplit'
});

const props = withDefaults(defineProps<SplitProps>(), {
  modelValue: 0.5,
  component: 'div',
  direction: 'horizontal',
  disabled: false,
  pane1Class: '',
  pane2Class: '',
  showTrigger: true
});

const emits = defineEmits(['moveStart', 'moving', 'moveEnd']);

onMounted(async () => {
  const containerSize = await getContainerSize();
  const fixedPxSize = getLegalPxSize(size.value, containerSize);
  updateSize(fixedPxSize, containerSize);
});

// 记录每次拖拽的初始值
const record: {
  startPageX: number;
  startPageY: number;
  startContainerSize: number;
  startSize: number | string;
} = {
  startPageX: 0,
  startPageY: 0,
  startContainerSize: 0,
  startSize: 0
};
const size = defineModel<string | number>({ default: 0.5 });
const { direction, min, max } = toRefs(props);

const triggerSize = ref(0);
const wrapperRef = ref<HTMLDivElement>();

const sizeConfig = computed(() => getSizeConfig(size.value));
const isHorizontal = computed(() => direction.value !== 'vertical');
const firstPaneStyles = computed(() => {
  const { size: numberSize, unit, isPx } = sizeConfig.value;
  const baseVal = isPx ? numberSize : numberSize * 100;
  return {
    flex: `0 0 calc(${baseVal}${unit} - ${triggerSize.value / 2}px)`
  };
});
const resizeTriggerIcon = computed(() => {
  if (props.triggerIcon) {
    return props.triggerIcon;
  }
  return isHorizontal.value ? IconGripVertical : IconGripHorizontal;
});

async function getContainerSize() {
  const getSize = () => {
    return isHorizontal.value ? wrapperRef.value?.clientWidth : wrapperRef.value?.clientHeight || 0;
  };

  if (!wrapperRef.value || getSize()) {
    await nextTick();
  }

  return getSize() as number;
}

function updateSize(newPxSize: number, containerSize: number) {
  if (!containerSize) {
    return;
  }
  const newSize = sizeConfig.value.isPx ? `${newPxSize}px` : px2percent(newPxSize, containerSize);
  size.value = newSize;
}

function getLegalPxSize(size: number | string, containerSize: number) {
  const pxSize = getPxSize({
    size,
    containerSize
  });
  const minPxSize = getPxSize({
    size: min.value,
    defaultSize: '0px',
    containerSize
  });
  const maxPxSize = getPxSize({
    size: max.value,
    defaultSize: `${containerSize}px`,
    containerSize
  });

  let legalPxSize = pxSize;
  legalPxSize = Math.max(legalPxSize, minPxSize);
  legalPxSize = Math.min(legalPxSize, maxPxSize);

  return legalPxSize;
}

function px2percent(numerator: number | string, denominator: number | string) {
  return parseFloat(numerator as string) / parseFloat(denominator as string);
}

function getSizeConfig(size: number | string) {
  const numberSize = isString(size) ? parseFloat(size) : size;
  let unit = '';

  if (isNumber(size) || String(numberSize) === size) {
    unit = numberSize > 1 ? 'px' : '%';
  } else {
    unit = 'px';
  }

  return {
    size: numberSize,
    unit,
    isPx: unit === 'px'
  };
}

// 移动开始，记录初始值，绑定移动事件
async function onMoveStart(e: MouseEvent) {
  if (props.disabled) {
    return;
  }
  emits('moveStart', e);
  record.startPageX = e.pageX;
  record.startPageY = e.pageY;
  record.startContainerSize = await getContainerSize();
  record.startSize = size.value;
  window.addEventListener('mousemove', onMoving);
  window.addEventListener('mouseup', onMovingEnd);
  window.addEventListener('contextmenu', onMovingEnd);
  document.body.style.cursor = isHorizontal.value ? 'col-resize' : 'row-resize';
}
function onMoving(e: MouseEvent) {
  emits('moving', e);
  const newPxSize = isHorizontal.value
    ? getNewPxSize({
        startContainerSize: record.startContainerSize,
        startSize: record.startSize,
        startPosition: record.startPageX,
        endPosition: e.pageX
      })
    : getNewPxSize({
        startContainerSize: record.startContainerSize,
        startSize: record.startSize,
        startPosition: record.startPageY,
        endPosition: e.pageY
      });

  updateSize(newPxSize, record.startContainerSize);
}

// 移动结束，解除事件绑定
function onMovingEnd(e: MouseEvent) {
  window.removeEventListener('mousemove', onMoving);
  window.removeEventListener('mouseup', onMovingEnd);
  window.removeEventListener('contextmenu', onMovingEnd);
  document.body.style.cursor = 'default';
  emits('moveEnd', e);
}

function onTriggerResize(entry: ResizeObserverEntry) {
  const { width, height } = entry.contentRect;
  triggerSize.value = isHorizontal.value ? width : height;
}

function getNewPxSize({
  startContainerSize,
  startSize,
  startPosition,
  endPosition
}: {
  startContainerSize: number;
  startSize: number | string;
  startPosition: number;
  endPosition: number;
}) {
  const startPxSize = getPxSize({
    size: startSize,
    containerSize: startContainerSize
  });
  return getLegalPxSize(`${startPxSize + (endPosition - startPosition)}px`, startContainerSize);
}

function getPxSize({
  size,
  defaultSize,
  containerSize
}: {
  size: number | string | undefined;
  defaultSize?: string;
  containerSize: number;
}) {
  const config = getSizeConfig(size ?? defaultSize ?? 0.5);
  if (config.isPx) {
    return config.size;
  }
  return config.size * containerSize;
}
</script>

<style lang="less">
@import './style.less';
</style>
