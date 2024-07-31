<template>
  <div class="k-tabs-box" :id="id">
    <!-- editable -->
    <el-tabs
      v-model="activeName"
      class="k-tabs"
      v-bind="$attrs"
      :tabPosition="tabPosition"
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
        'tab-right-layout': tabPosition === 'right'
      }"
      :style="{ right: !editable && !addable ? 0 : '2rem' }"
    >
      <k-dropdown
        trigger="click"
        :disabled="hideTabs.length === 0"
        @command="jumpToTab"
      >
        <template #title>
          <IconMore />
        </template>
        <k-dropdown-item v-for="item in hideTabs" :key="item.name" :command="item">
          {{ item.label }}
        </k-dropdown-item>
      </k-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, nextTick } from 'vue';
import { KDropdown, KDropdownItem } from '../dropdown';
import { IconMore } from 'ksw-vue-icon';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KTabs',
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
});

const activeName = ref<string | undefined>(undefined);
const id = `_${genRandomStr(8)}`;
let tabsElem: HTMLElement | null = null;
let translateElem: HTMLElement | null = null;
const tabPaneDoms = ref<any>([]);
const tabItems: any = []
const slots = defineSlots();
slots.default?.().forEach((item: any) => {
  if (item.type?.name === 'KTabPane') {
    tabItems.push({
      label:item.props.label,
      name: item.props.name
    })
  }
  if (Array.isArray(item.children)) {
    item.children.forEach((child: any) => {
      if (child.type?.name === 'KTabPane') {
      tabItems.push({
        label:child.props.label,
        name: child.props.name
      })
    }
    })
  }
})
const hideTabs = ref<any>([]);
let preTranslate = 0;

nextTick(() => {
  tabsElem = document.querySelector(`#${id} .el-tabs__nav-scroll`);
  translateElem = document.querySelector(`#${id} .el-tabs__nav`);
  tabPaneDoms.value = tabsElem?.querySelectorAll('.el-tabs__item') ?? [];
  getHideTabs();
});

function isElementInContainerView(el: any, translate: number = 0) {
  if (!tabsElem) {
    return;
  }
  const elRect = el.getBoundingClientRect();
  const containerRect = tabsElem.getBoundingClientRect();
  const diff = translate - preTranslate;
  if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
    return elRect.left + diff >= containerRect.left && elRect.right + diff <= containerRect.right 
  } else {
    return elRect.top + diff >= containerRect.top && elRect.bottom + diff <= containerRect.bottom
  }
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
    const [translate] = matches.map(m => parseFloat(m.slice(1, -1)));
    
    const res: any[] = [];
    if (!tabItems) {
      return [];
    }
    tabPaneDoms.value.forEach((item: any, index: number) => {
      if (!isElementInContainerView(item, translate)) {
        res.push(tabItems[index]);
      }
    })
    preTranslate = translate;
    hideTabs.value = res;
  });
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
