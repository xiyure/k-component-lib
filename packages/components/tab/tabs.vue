<template>
  <el-tabs
    ref="KTabsRef"
    v-model="activeName"
    :class="['k-tabs', _styleModule]"
    v-bind="$attrs"
    :tab-position="tabPosition"
    :editable="editable"
    :addable="addable"
    @tab-click="() => {
      getHideTabs();
      emits('tab-click', activeName);
    }"
  >
    <div
      v-if="hideTabIndex.length"
      class="k-tabs-more"
      :class="`tab-${tabPosition}-layout`"
      :style="{
        right:
          (editable || addable) && (tabPosition === 'top' || tabPosition === 'bottom') ? '2rem' : 0,
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
import { convertPxToRem, getElement,  getExposeProxy } from '../../utils';
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

const emits = defineEmits(['update:modelValue', 'tab-click']);

const _styleModule = inject('_styleModule', '');
const activeName = ref<string | undefined>(undefined);
const KTabsRef = ref();

const hideTabIndex = ref<number[]>([]);
let preTranslate = 0;

// 可视区域发生变化时，下拉列表也随之更新
onMounted(() => {
  window.addEventListener('resize', getHideTabs);
  window.addEventListener('wheel', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('resize', getHideTabs);
  window.removeEventListener('wheel', handleScroll);
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

watch(() => activeName.value, (newVal) => {
  if (props.modelValue !== undefined && props.modelValue !== newVal) {
    scrollToActiveTab();
    emits('update:modelValue', newVal);
  }
});

function handleScroll(evt: WheelEvent) {
  const translateElem = getElement('.el-tabs__nav', KTabsRef.value?.$el) as HTMLElement;
  if (!translateElem || !KTabsRef.value?.$el?.contains(evt.target as Node)) {
    return;
  }
  const disY = evt.deltaY;
  const { width: tabsWidth, height: tabsHeight } = KTabsRef.value?.$el?.getBoundingClientRect() ?? {};
  const { width, height } = translateElem?.getBoundingClientRect() ?? {};
  const maxScale = isHorizontal() ? width - (tabsWidth ?? 0) : height - (tabsHeight ?? 0);
  const translateReg = isHorizontal() ? /translateX\(([^)]+)px\)/ : /translateY\(([^)]+)px\)/;
  const translate = translateElem?.style.transform?.match(translateReg)?.[1] ?? 0;
  let translateDis = Number(translate) - disY;
  const scale = getRestScale();
  if (-translateDis < 0) {
    translateDis = 0;
  } else if (maxScale && -translateDis > maxScale + scale) {
    translateDis = -maxScale - scale;
  }
  translateElem.style.transform = `translate${isHorizontal() ? 'X' : 'Y'}(${translateDis}px)`;
  getHideTabs();
}

function isElementInContainerView(el: HTMLElement | Element, translate: number = 0) {
  if (!KTabsRef.value?.$el || !el) {
    return;
  }
  const elRect = el.getBoundingClientRect();
  const containerRect = KTabsRef.value?.$el.getBoundingClientRect();
  const diff = translate - preTranslate;
  const scale = getRestScale();
  if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
    return (
      elRect.left + diff >= containerRect.left &&
      elRect.right + diff <= containerRect.right - (scale ?? 0)
    );
  }
  return (
    elRect.top + diff >= containerRect.top &&
    elRect.bottom + diff <= containerRect.bottom - (scale ?? 0)
  );
}
function jumpToTab(item: TabData) {
  const name = item.name ?? '';
  activeName.value = name;
  getHideTabs();
}
function getHideTabs() {
  setTimeout(() => {
    const translateElem = getElement('.el-tabs__nav', KTabsRef.value?.$el) as HTMLElement;
    const regex = /\(([^)]+)\)/g;
    // 获取tab栏偏移量
    const matches = translateElem?.style.transform?.match(regex);
    if (!matches) {
      return;
    }
    const [translate] = matches.map((m) => parseFloat(m.slice(1, -1)));

    const res: number[] = [];
    const tabPaneDoms = getElement('.el-tabs__item', KTabsRef.value?.$el, true) ?? [];
    (tabPaneDoms as any[]).forEach((item: HTMLElement, index: number) => {
      if (!isElementInContainerView(item, translate)) {
        res.push(index);
      }
    });
    preTranslate = translate;
    hideTabIndex.value = res;
  });
}

function getRestScale() {
  const addTabElem = getElement<HTMLElement>('.el-tabs__new-tab', KTabsRef.value?.$el) as HTMLElement;
  const { width = 0, height = 0 } = addTabElem?.getBoundingClientRect() ?? {};
  let scale = 0;
  if (!isHorizontal()) {
    scale += height;
  } else {
    scale += width;
  }
  // 下拉开关的width、height、left、right等属性都是基于rem设置的，因此需要转换成px
  scale += convertPxToRem(2);
  return scale;
}

function isHorizontal() {
  return props.tabPosition === 'top' || props.tabPosition === 'bottom';
}

async function scrollToActiveTab() {
  await nextTick();
  const activeTab = KTabsRef.value?.$el?.querySelector('.is-active');
  const translateElem = getElement('.el-tabs__nav', KTabsRef.value?.$el) as HTMLElement;
  if (!translateElem || !activeTab) {
    return;
  }
  const { left } = activeTab.getBoundingClientRect();
  translateElem.style.transform = `translate${isHorizontal() ? 'X' : 'Y'}(${left}px)`;
}


const instance: any = {};
defineExpose(getExposeProxy(instance, KTabsRef));
</script>

<style lang="less">
@import './style.less';
</style>
