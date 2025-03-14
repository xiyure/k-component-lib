<template>
  <el-tabs
    ref="KTabsRef"
    v-model="activeName"
    :class="['k-tabs', _styleModule]"
    v-bind="$attrs"
    :tab-position="tabPosition"
    :editable="editable"
    :addable="addable"
  >
    <div
      v-if="hideTabIndex.length"
      class="k-tabs-more"
      :class="`tab-${tabPosition}-layout`"
      :style="{
        right:
          (editable || addable) && (tabPosition === 'top' || tabPosition === 'bottom') ? '2rem' : 0
      }"
    >
      <TabDropdownMenu :tab-index-list="hideTabIndex" :tab-slots="$slots" @command="jumpToTab">
        <template #title>
          <IconMore />
        </template>
      </TabDropdownMenu>
    </div>
    <slot></slot>
    <template v-if="$slots['add-icon']" #add-icon>
      <slot name="add-icon"></slot>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, inject } from 'vue';
import { ElTabs } from 'element-plus';
import { IconMore } from 'ksw-vue-icon';
import TabDropdownMenu from './tab_dropdown_menu';
import { getElement, getElementAll, getExposeProxy } from '../../utils';
import { TabsProps, TabData } from './type';

defineOptions({
  name: 'KTabs'
});

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  tabPosition: 'top',
  editable: false,
  addable: false,
  maxWidth: undefined
});

const emits = defineEmits(['update:modelValue']);

const _styleModule = inject('_styleModule', '');
const activeName = ref<string | undefined>(undefined);
const KTabsRef = ref();

const hideTabIndex = ref<number[]>([]);

// 可视区域发生变化时，下拉列表也随之更新
onMounted(() => {
  window.addEventListener('resize', getHideTabs);
  window.addEventListener('wheel', handleWheel);
});
onUnmounted(() => {
  window.removeEventListener('resize', getHideTabs);
  window.removeEventListener('wheel', handleWheel);
});

nextTick(() => {
  getHideTabs();
});

watch(
  () => props.maxWidth,
  (val) => {
    if (val) {
      nextTick(() => {
        if (!KTabsRef.value?.$el) {
          return;
        }
        KTabsRef.value?.$el?.style.setProperty('--plane-max-width', val);
      });
    }
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  () => {
    activeName.value = props.modelValue as string;
  },
  { immediate: true }
);

watch(
  () => activeName.value,
  (newVal) => {
    if (props.modelValue !== undefined && props.modelValue !== newVal) {
      emits('update:modelValue', newVal);
      scrollToActiveTab();
    }
  }
);

function handleWheel(evt: WheelEvent) {
  const translateElem = getElement<HTMLElement>('.el-tabs__nav', KTabsRef.value?.$el);
  const parentElement = translateElem?.parentElement;
  if (!translateElem || !parentElement || !translateElem?.contains(evt.target as Node)) {
    return;
  }
  const disY = evt.deltaY;
  const translate = getNavTranslate(translateElem);
  let translateDis = translate - disY;
  const { maxTranslate } = getNavElementInfo(translateElem, parentElement);
  if (translateDis > 0) {
    translateDis = 0;
  } else if (translateDis < maxTranslate) {
    translateDis = maxTranslate;
  }
  translateElem.style.transform = getTransformValue(translateDis);
  getHideTabs();
}
// 判断tab是否在可视区域
function isElementInContainerView(el: HTMLElement | Element) {
  if (!el) {
    return;
  }
  const elRect = el.getBoundingClientRect();
  const container = el.parentElement?.parentElement;
  if (!container) {
    return;
  }
  const containerRect = container.getBoundingClientRect();
  if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
    return elRect.left >= 0 && elRect.right <= containerRect.width;
  }
  return elRect.top >= 0 && elRect.bottom <= containerRect.height;
}
// 下拉列表选择tab时，滚动到可视区域
function jumpToTab(item: TabData) {
  const name = item.name ?? '';
  activeName.value = name;
}
function getHideTabs() {
  setTimeout(() => {
    const res: number[] = [];
    const tabPaneDoms = getElementAll('.el-tabs__item', KTabsRef.value?.$el);
    for (let _i = 0; _i < tabPaneDoms.length; _i++) {
      if (!isElementInContainerView(tabPaneDoms[_i])) {
        res.push(_i);
      }
    }
    hideTabIndex.value = res;
  }, 200);
}
// 滚动到当前激活的tab
function scrollToActiveTab() {
  setTimeout(() => {
    const translateElem = getElement<HTMLElement>('.el-tabs__nav', KTabsRef.value?.$el);
    const activeTab = KTabsRef.value.$el?.querySelector?.('.is-active');
    const parentElement = translateElem?.parentElement;
    if (!activeTab || !translateElem || !parentElement) {
      return;
    }
    const translate = getNavTranslate(translateElem);
    if (isElementInContainerView(activeTab)) {
      return;
    }
    const elRect = activeTab.getBoundingClientRect();
    const { parentRect, maxTranslate } = getNavElementInfo(translateElem, parentElement);
    let newTranslate = translate - (isHorizontal() ? (elRect.right - parentRect.width) : (elRect.bottom - parentRect.height));
    if (newTranslate > 0) {
      newTranslate = 0;
    } else if (newTranslate < maxTranslate) {
      newTranslate = maxTranslate;
    }
    translateElem.style.transform = getTransformValue(newTranslate);
    getHideTabs();
  }, 200);
}
// 获取transform样式值
function getTransformValue(translate: number) {
  return `translate${isHorizontal() ? 'X' : 'Y'}(${translate}px)`;
}
// 获取tab栏偏移量
function getNavTranslate(el: HTMLElement) {
  const translateReg = isHorizontal() ? /translateX\(([^)]+)px\)/ : /translateY\(([^)]+)px\)/;
  return Number(el?.style.transform?.match(translateReg)?.[1] ?? 0);
}
function getNavElementInfo(el: HTMLElement, parentEl: HTMLElement) {
  const parentRect = parentEl.getBoundingClientRect();
  const translateRect = el.getBoundingClientRect();
  const maxTranslate = isHorizontal()
    ? parentRect?.width - translateRect.width
    : parentRect?.height - translateRect.height;
  return {
    maxTranslate,
    parentRect,
    translateRect
  }
}
// 判断tab栏是否水平排列
function isHorizontal() {
  return props.tabPosition === 'top' || props.tabPosition === 'bottom';
}

const instance: any = {};
defineExpose(getExposeProxy(instance, KTabsRef));
</script>

<style lang="less">
@import './style.less';
</style>
