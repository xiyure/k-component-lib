<template>
  <div ref="box" :class="['k-button-container', styleModule]">
    <div ref="container" class="container">
      <slot></slot>
    </div>
    <div
      class="k-button-more"
      :style="{
        opacity: hideTabs.length > 0 ? 1 : 0,
      }"
    >
      <Dropdown
        :tabs="hideTabs"
        :trigger="trigger"
        :size="size"
        :max-height="maxHeight"
        :placement="placement"
        :hide-on-click="hideOnClick"
        :teleported="teleported"
        :show-timeout="showTimeout"
        :hide-timeout="hideTimeout"
        :popper-class="popperClass"
        v-bind="$attrs"
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
import { ref, onMounted, onBeforeUnmount, inject } from 'vue';
import { ButtonContainerProps } from './type';
import Dropdown from './dropdown_menu';
import { flattenChildren, isValidElement, camelize, genRandomStr } from '../../utils';

defineOptions(({
  name: 'KButtonContainer'
}));

const elementObserver = inject<any>('__elementObserver');
const styleModule = inject('_styleModule', '');

const props = withDefaults(defineProps<ButtonContainerProps>(), {
  trigger: 'click',
  size: 'base',
  maxHeight: 300,
  placement: 'bottom',
  hideOnClick: true,
  teleported: true,
  triggerIcon: 'IconMore'
});
const slots = defineSlots();
const container = ref();
const box = ref();
const buttons = parseBtnList(flattenChildren(slots.default?.()));
const hideTabs = ref<HTMLElement[]>([]);
let buttonsElem: HTMLElement[];
const key = `_${genRandomStr(8)}`;

// 可视区域发生变化时，下拉列表也随之更新
onMounted(() => {
  buttonsElem = container.value?.querySelectorAll('.k-button');
  box.value.setAttribute('data-observer-key', key);
  getHideBtnList();
  elementObserver.observe(box.value, getHideBtnList);
});
onBeforeUnmount(() => {
  if (box.value) {
    elementObserver?.unobserve?.(box.value);
  }
});

function parseBtnList(children: any[]): any[] {
  return children
  .map(node => {
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
  .filter(btn => btn);
}

function isElementInContainerView(el: HTMLElement) {
  const elRect = el.getBoundingClientRect();
  const containerRect = container.value?.getBoundingClientRect();
  if (!containerRect) {
    return true;
  }
  return elRect.left >= containerRect.left && elRect.right <= containerRect.right;
}
function getHideBtnList() {
  const res: HTMLElement[] = [];
  if (!buttons) {
    return [];
  }
  buttonsElem?.forEach((item: HTMLElement, index: number) => {
    if (!isElementInContainerView(item) && buttons[index]) {
      item.style.opacity = '0';
      res.push(buttons[index]);
    } else {
      item.style.opacity = '1';
    }
  });
  hideTabs.value = res;
}
</script>

<style lang="less">
@import './style.less';
</style>