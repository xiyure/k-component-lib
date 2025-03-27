<template>
  <div ref="box" class="k-button-container">
    <div ref="container" class="container">
      <slot></slot>
    </div>
    <div
      class="k-button-more"
      :style="{
        opacity: hideTabs.length > 0 ? 1 : 0
      }"
    >
      <Dropdown
        :tabs="hideTabs"
        :trigger="trigger"
        :max-height="maxHeight"
        :placement="placement"
        :hide-on-click="hideOnClick"
        :teleported="teleported"
        :show-timeout="showTimeout"
        :hide-timeout="hideTimeout"
        :popper-class="popperClass"
        v-bind="$attrs"
        @command="handleCommand"
      >
        <template #title>
          <span class="k-button-more-trigger">
            <slot name="trigger">
              <component :is="props.triggerIcon" />
            </slot>
          </span>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, inject, nextTick, computed, provide } from 'vue';
import { ButtonContainerProps } from './type';
import Dropdown from './dropdown_menu';
import { flattenChildren, isValidElement, camelize, genRandomStr, getElementAll, isElementInContainerView } from '../../utils';
import { SIZE_KEY, useSize } from '../../hooks';

defineOptions({
  name: 'KButtonContainer'
});

const elementObserver = inject<any>('__elementObserver');

const props = withDefaults(defineProps<ButtonContainerProps>(), {
  trigger: 'click',
  maxHeight: 300,
  placement: 'bottom',
  hideOnClick: true,
  teleported: true,
  triggerIcon: 'IconMore'
});

const slots = defineSlots();
const container = ref();
const box = ref();
const hideTabs = ref<{ label: string; disabled: boolean, index: number }[]>([]);
const key = `_${genRandomStr(8)}`;

// 可视区域发生变化时，下拉列表也同步更新
onMounted(() => {
  box.value.setAttribute('data-observer-key', key);
  elementObserver.observe(box.value, resize);
});
onBeforeUnmount(() => {
  if (box.value) {
    elementObserver?.unobserve?.(box.value);
  }
});

const buttons = computed(() => parseBtnList(flattenChildren(slots.default?.())));
// 控件自身size发生变化时，需要重新计算可视区域
const formatSize = useSize<ButtonContainerProps>(props);
watch(
  () => formatSize.value,
  () => {
    setTimeout(() => {
      resize();
    }, 100);
  },
  { deep: true }
);

function parseBtnList(children: any[]): { label: string; disabled: boolean }[] {
  return children
    .map((node) => {
      if (isValidElement(node)) {
        const props = { ...(node.props || {}) };
        for (const [k, v] of Object.entries(props)) {
          delete props[k];
          props[camelize(k)] = v;
        }
        const slots = node.children || {};
        return {
          label: slots.default,
          disabled: Boolean(props.disabled)
        };
      }
      return null;
    })
    .filter((btn) => btn !== null);
}

function resize() {
  const res: { label: string; disabled: boolean, index: number }[] = [];
  if (!buttons.value.length) {
    return [];
  }
  const containerRect = container.value.getBoundingClientRect();
  getButtonsElem()?.forEach((item: HTMLElement, index: number) => {
    const itemRect = item.getBoundingClientRect();
    if (!isElementInContainerView(itemRect, containerRect) && buttons.value[index]) {
      item.style.opacity = '0';
      res.push({ ...buttons.value[index], index });
    } else {
      item.style.opacity = '1';
    }
  });
  hideTabs.value = res;
}
function handleCommand(command: number) {
  const targetButton = getButtonsElem()?.[command];
  if (targetButton) {
    targetButton.click();
  }
}
function getButtonsElem() {
  return getElementAll<HTMLElement>('.k-button', container.value) ?? []
}

provide(SIZE_KEY, formatSize);
</script>

<style lang="less">
@import './style.less';
</style>
