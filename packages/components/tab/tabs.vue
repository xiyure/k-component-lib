<template>
  <el-tabs
    ref="KTabsRef"
    v-model="activeName"
    class="k-tabs"
    v-bind="$attrs"
    :tab-position="tabPosition"
    :editable="editable"
    :addable="addable"
    @edit="(paneName: string | number | undefined, action: 'add' | 'remove') => {
      emits('edit', paneName, action);
      getHideTabs();
    }"
  >
    <div
      v-if="showHideList && hideTabIndex.length"
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
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { ElTabs } from 'element-plus';
import { IconMore } from 'ksw-vue-icon';
import TabDropdownMenu from './tab_dropdown_menu';
import { getElement, getElementAll, isElementInContainerView, getExposeProxy } from '../../utils';
import { TabsProps, TabData } from './type';

defineOptions({
  name: 'KTabs'
});

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  tabPosition: 'top',
  maxWidth: undefined,
  showHideList: true
});

const emits = defineEmits(['update:modelValue', 'edit']);

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
    }
    scrollToActiveTab();
  }
);

function handleWheel(evt: WheelEvent) {
  const $el = KTabsRef.value?.$el;
  const nav = getElement<HTMLElement>('.el-tabs__nav', $el);
  const navScroll = getElement<HTMLElement>('.el-tabs__nav-scroll', $el);
  if (!nav || !navScroll || !nav?.contains(evt.target as Node)) {
    return;
  }
  const disY = evt.deltaY;
  const translate = getNavTranslate();
  let translateDis = translate - disY;
  const navScrollBounding = navScroll.getBoundingClientRect();
  let maxOffset = isHorizontal()
      ? nav.offsetWidth - navScrollBounding.width
      : nav.offsetHeight - navScrollBounding.height;
  if (maxOffset <= 0) {
    maxOffset = -translate
  }
  if (translateDis > 0) {
    translateDis = 0;
  } else if (translateDis < -maxOffset) {
    translateDis = -maxOffset;
  }
  setNavTranslate(translateDis);
  getHideTabs();
}

// 下拉列表选择tab时，滚动到可视区域
function jumpToTab(item: TabData) {
  const name = item.name ?? '';
  activeName.value = name;
}
function getHideTabs() {
  if (!props.showHideList) {
    return;
  }
  setTimeout(() => {
    const res: number[] = [];
    const $el = KTabsRef.value?.$el
    const tabPaneDoms = getElementAll('.el-tabs__item', $el);
    const navScroll = getElement<HTMLElement>('.el-tabs__nav-scroll', $el);
    if (!$el || !navScroll || !tabPaneDoms?.length) {
      return;
    }
    const navScrollRect = navScroll.getBoundingClientRect();
    for (let _i = 0; _i < tabPaneDoms.length; _i++) {
      const elRect = tabPaneDoms[_i].getBoundingClientRect();
      if (!isElementInContainerView(elRect, navScrollRect, isHorizontal() ? 'horizontal' :'vertical')) {
        res.push(_i);
      }
    }
    hideTabIndex.value = res;
  }, 200);
}
// 滚动到当前激活的tab
function scrollToActiveTab() {
  setTimeout(() => {
    const $el = KTabsRef.value?.$el;
    const nav = getElement<HTMLElement>('.el-tabs__nav', $el);
    const navScroll = getElement<HTMLElement>('.el-tabs__nav-scroll', $el);
    if (!$el || !navScroll || !nav) return;
    const activeTab = getElement<HTMLElement>('.is-active', $el);
    if (!activeTab) return;
    const _isHorizontal = isHorizontal();
    const activeTabBounding = activeTab.getBoundingClientRect();
    const navScrollBounding = navScroll.getBoundingClientRect();
    let maxOffset = _isHorizontal
      ? nav.offsetWidth - navScrollBounding.width
      : nav.offsetHeight - navScrollBounding.height;

    const currentOffset = -getNavTranslate();
    if (maxOffset <= 0) {
      maxOffset = currentOffset;
    }
    let newOffset = currentOffset;

    if (_isHorizontal) {
      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
      }
      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
      }
    } else {
      if (activeTabBounding.top < navScrollBounding.top) {
        newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
      }
      if (activeTabBounding.bottom > navScrollBounding.bottom) {
        newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
      }
    }
    newOffset = Math.max(newOffset, 0);
    setNavTranslate(-Math.min(newOffset, maxOffset));
    getHideTabs();
  }, 200);
}
// 获取tab栏偏移量
function getNavTranslate() {
  if (!KTabsRef.value?.$el) {
    return 0;
  }
  const translate = KTabsRef.value.$el.style.getPropertyValue('--translate') || 0;
  return parseFloat(translate);
}
// 设置tab栏偏移量
function setNavTranslate(translate: number) {
  if (!KTabsRef.value?.$el) {
    return;
  }
  KTabsRef.value.$el.style.setProperty('--translate', `${translate}px`);
}
// 判断tab栏是否水平排列
function isHorizontal() {
  return Boolean(props.tabPosition === 'top' || props.tabPosition === 'bottom');
}

const instance: any = {};
defineExpose(getExposeProxy(instance, KTabsRef));
</script>

<style lang="less">
@import './style.less';
</style>
