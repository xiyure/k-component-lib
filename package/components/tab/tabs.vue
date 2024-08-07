<template>
  <div :id="id" class="k-tabs-box" :class="class">
    <el-tabs
      v-model="activeName"
      class="k-tabs"
      v-bind="$attrs"
      :tab-position="tabPosition"
      :editable="editable"
      :addable="addable"
    >
      <slot></slot>
    </el-tabs>
    <div
      v-if="hideTabs?.length"
      class="k-tabs-more"
      :class="{
        'tab-top-layout': tabPosition === 'top',
        'tab-bottom-layout': tabPosition === 'bottom',
        'tab-left-layout': tabPosition === 'left',
        'tab-right-layout': tabPosition === 'right',
      }"
      :style="{ right: !editable && !addable ? 0 : '2rem' }"
    >
      <TabDropdownMenu :tabs="hideTabs" @command="jumpToTab">
        <template #title>
          <IconMore />
        </template>
      </TabDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, nextTick } from 'vue';
import { IconMore } from 'ksw-vue-icon';
import TabDropdownMenu from './tab_dropdown_menu';
import { genRandomStr, flattenChildren, isValidElement, camelize } from '../../utils';

defineOptions({
  name: 'KTabs'
});

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
  tabPosition: {
    type: String,
    default: 'top',
  },
  router: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  addable: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: undefined,
  },
  class: {
    type: String || Array || Object,
    default: '',
  }
});

const activeName = ref<string | undefined>(undefined);
const id = `_${genRandomStr(8)}`;
let tabsElem: HTMLElement | null = null;
let translateElem: HTMLElement | null = null;
const tabPaneDoms = ref<any>([]);
const slots = defineSlots();

const tabs = parseTabList(flattenChildren(slots.default?.()));

const hideTabs = ref<any>([]);
let preTranslate = 0;

nextTick(() => {
  tabsElem = document.querySelector(`#${id} .el-tabs__nav-scroll`);
  translateElem = document.querySelector(`#${id} .el-tabs__nav`);
  tabPaneDoms.value = tabsElem?.querySelectorAll('.el-tabs__item') ?? [];
  getHideTabs();
});

// watch props.maxWidth , 如果有值, 则把 k-tabs-box 中的变量 "  --plane-max-width" = props.maxWidth
watch(
  () => props.maxWidth,
  (val) => {
    if (val) {
      nextTick(() => {
        const box: HTMLElement | null = document.querySelector(`#${id}`);
        if (!box) {
          return;
        }
        box?.style.setProperty('--plane-max-width', val);
      });
    }
  },
  { immediate: true },
);

function isElementInContainerView(el: any, translate: number = 0) {
  if (!tabsElem) {
    return;
  }
  const elRect = el.getBoundingClientRect();
  const containerRect = tabsElem.getBoundingClientRect();
  const diff = translate - preTranslate;
  if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
    return elRect.left + diff >= containerRect.left && elRect.right + diff <= containerRect.right; 
  } 
  return elRect.top + diff >= containerRect.top && elRect.bottom + diff <= containerRect.bottom;
}
function jumpToTab(item: any) {
  const name = item.name ?? '';
  activeName.value = name;
  getHideTabs();
}
function getHideTabs() {
  setTimeout(() => {
    const regex = /\(([^)]+)\)/g;
    const matches = translateElem?.style.transform?.match(regex);
    if (!matches) {
      return;
    }
    const [translate] = matches.map((m) => parseFloat(m.slice(1, -1)));

    const res: any[] = [];
    if (!tabs) {
      return [];
    }
    tabPaneDoms.value.forEach((item: any, index: number) => {
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

provide('isUseRouter', props.router);
provide('activeName', activeName);

watch(
  () => props.modelValue,
  () => {
    activeName.value = props.modelValue as string;
  },
  { immediate: true },
);

</script>

<style lang="less">
@import './style.less';
</style>
