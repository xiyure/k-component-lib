<template>
  <div class="k-button-container" ref="box">
    <div class="container" ref="container">
      <slot></slot>
    </div>
    <div
      class="k-button-more"
      :style="{
        opacity: hideTabs.length > 0? 1 : 0,
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
import { ref, onMounted, onUnmounted } from 'vue';
import { ButtonContainerProps } from './type';
import Dropdown from './dropdown_menu';
import { flattenChildren, isValidElement, camelize } from '../../utils';

defineOptions(({
  name: 'KButtonContainer'
}));

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
const hideTabs = ref<any[]>([]);
let buttonsElem: any;

// 可视区域发生变化时，下拉列表也随之更新
onMounted(() => {
  buttonsElem = container.value?.querySelectorAll('.k-button');
  getHideBtnList();
  window.addEventListener('resize', getHideBtnList);
});
onUnmounted(() => {
  window.removeEventListener('resize', getHideBtnList);
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

function isElementInContainerView(el: any) {
  const elRect = el.getBoundingClientRect();
  const containerRect = container.value?.getBoundingClientRect();
  return elRect.left >= containerRect.left && elRect.right <= containerRect.right;
}
function getHideBtnList() {
  setTimeout(() => {
    const res: any[] = [];
    if (!buttons) {
      return [];
    }
    buttonsElem?.forEach((item: any, index: number) => {
      if (!isElementInContainerView(item) && buttons[index]) {
        res.push(buttons[index]);
      }
    });
    hideTabs.value = res;
  });
}
</script>

<style lang="less">
@import './style.less';
</style>