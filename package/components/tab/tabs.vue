<template>
  <el-tabs
    ref="KTabsRef"
    v-model="activeName"
    :class="['k-tabs', _styleModule]"
    v-bind="$attrs"
    :tab-position="tabPosition"
    :editable="editable"
    :addable="addable"
    @tab-click="getHideTabs"
  >
    <div
      v-if="hideTabs.length"
      class="k-tabs-more"
      :class="`tab-${tabPosition}-layout`"
      :style="{ right: (editable
        || addable)
        && (tabPosition === 'top'
          || tabPosition === 'bottom') ? '2rem' : 0 }"
    >
      <TabDropdownMenu :tabs="hideTabs" @command="jumpToTab">
        <template #title>
          <IconMore />
        </template>
      </TabDropdownMenu>
    </div>
    <slot></slot>
    <template v-if="$slots.addIcon" #add-icon>
      <slot name="add-icon"></slot>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, inject } from 'vue';
import { ElTabs } from 'element-plus';
import { IconMore } from 'ksw-vue-icon';
import TabDropdownMenu from './tab_dropdown_menu';
import { flattenChildren, isValidElement, camelize, getExposeProxy } from '../../utils';
import { TabsProps } from './type';

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

const _styleModule = inject('_styleModule', '');
const activeName = ref<string | undefined>(undefined);
let tabsElem: HTMLElement | null = null;
let translateElem: HTMLElement | null | undefined = null;
let tabPaneDoms: NodeListOf<Element> | null | undefined = null;
let addTabElem: HTMLElement | null | undefined = null;
const slots = defineSlots();
const KTabsRef = ref<any>();

const tabs = parseTabList(flattenChildren(slots.default?.()));

const hideTabs = ref<any>([]);
let preTranslate = 0;

// 可视区域发生变化时，下拉列表也随之更新
onMounted(() => {
  window.addEventListener('resize', getHideTabs);
});
onUnmounted(() => {
  window.removeEventListener('resize', getHideTabs);
});

nextTick(() => {
  tabsElem = KTabsRef?.value?.$el;
  translateElem = tabsElem?.querySelector('.el-tabs__nav');
  addTabElem = tabsElem?.querySelector('.el-tabs__new-tab');
  tabPaneDoms = tabsElem?.querySelectorAll('.el-tabs__item');
  getHideTabs();
});

// watch props.maxWidth , 如果有值, 则把 k-tabs-box 中的变量 "  --plane-max-width" = props.maxWidth
watch(
  () => props.maxWidth,
  (val) => {
    if (val) {
      nextTick(() => {
        if (!tabsElem) {
          return;
        }
        tabsElem?.style.setProperty('--plane-max-width', val);
      });
    }
  },
  { immediate: true }
);

function isElementInContainerView(el: any, translate: number = 0) {
  if (!tabsElem) {
    return;
  }
  const elRect = el.getBoundingClientRect();
  const containerRect = tabsElem.getBoundingClientRect();
  const diff = translate - preTranslate;
  const { width: addTabWidth, height: addTabHeight } = addTabElem?.getBoundingClientRect() ?? {};
  if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
    return elRect.left + diff >= containerRect.left && elRect.right + diff <= containerRect.right - (addTabWidth ?? 0); 
  }
  return elRect.top + diff >= containerRect.top && elRect.bottom + diff <= containerRect.bottom - (addTabHeight ?? 0);
}
function jumpToTab(item: any) {
  const name = item.name ?? '';
  activeName.value = name;
  getHideTabs();
}
function getHideTabs() {
  setTimeout(() => {
    const regex = /\(([^)]+)\)/g;
    // 获取tab栏偏移量
    const matches = translateElem?.style.transform?.match(regex);
    if (!matches) {
      return;
    }
    const [translate] = matches.map((m) => parseFloat(m.slice(1, -1)));

    const res: any[] = [];
    if (!tabs) {
      return [];
    }
    tabPaneDoms?.forEach((item: any, index: number) => {
      if (!isElementInContainerView(item, translate) && tabs[index]) {
        res.push(tabs[index]);
      }
    });
    preTranslate = translate;
    hideTabs.value = res;
  });
}
// 解析tab-pane
function parseTabList(children: any[]): any[] {
  return children
  .map(node => {
    if (isValidElement(node)) {
      const props = { ...(node.props || {}) };
      for (const [k, v] of Object.entries(props)) {
        delete props[k];
        props[camelize(k)] = v;
      }
      const slots = node.children || {};
      const name = node.props?.name !== undefined ? node.props.name : undefined;
      const {
        label = slots.label,
        disabled
      } = props;
      return {
        name,
        label,
        disabled: disabled === '' || disabled
      };
    }
    return null;
  })
  .filter(tab => tab);
}

watch(
  () => props.modelValue,
  () => {
    activeName.value = props.modelValue as string;
  },
  { immediate: true }
);

const instance: any = {};
defineExpose(getExposeProxy(instance, KTabsRef));
</script>

<style lang="less">
@import './style.less';
</style>
