<template>
  <div class="k-tabs-box" :id = id>
    <el-tabs
      v-model="activeName"
      class="k-tabs"
      v-bind="$attrs"
      editable
    >
    <slot></slot>
    </el-tabs>
    <div class="k-tabs-more">
      <k-dropdown trigger="click" :disabled="hideTabs.length === 0" @command="jumpToTab">
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
import { KDropdown,KDropdownItem } from '../dropdown';
import { IconMore } from 'ksw-vue-icon';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KTabs'
});

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
  router: {
    type: Boolean,
    default: false,
  }
});

const activeName = ref<string | undefined>(undefined);
const id = `_${genRandomStr(8)}`;
let tabsElem: HTMLElement | null = null;
let translateElem: HTMLElement | null = null;
const tabPaneDoms = ref<any>([]);
const slots = defineSlots();
const defaultSlot = slots.default?.()[0].children ?? [];
const tabItems = defaultSlot.map((item: any) => ({
  label:item.props.label,
  name: item.props.name
}));
const hideTabs = ref<any>([]);
let preTranslateX = 0;

nextTick(() => {
  tabsElem = document.querySelector(`#${id} .el-tabs__nav-scroll`);
  translateElem = document.querySelector(`#${id} .el-tabs__nav`);
  tabPaneDoms.value = tabsElem?.querySelectorAll('.el-tabs__item') ?? [];
  getHideTabs();
});

function isElementInContainerView(el: any, translateX: number = 0, translateY: number = 0) {
  if (!tabsElem) {
    return;
  }
  const elRect = el.getBoundingClientRect();
  const containerRect = tabsElem.getBoundingClientRect();
  const diffX = translateX - preTranslateX;
  console.log(elRect.left + diffX, containerRect.left, elRect.right + diffX, containerRect.right)
  return (
    elRect.left + diffX >= containerRect.left &&
    elRect.right + diffX <= containerRect.right  
  );
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
    const [translateX] = matches.map(m => parseFloat(m.slice(1, -1)));
    
    const res: any[] = [];
    if (!tabItems) {
      return [];
    }
    tabPaneDoms.value.forEach((item: any, index: number) => {
      if (!isElementInContainerView(item, translateX)) {
        res.push(tabItems[index]);
      }
    })
    preTranslateX = translateX;
    hideTabs.value = res;
  })
}

provide('isUseRouter', props.router);
provide('activeName', activeName);

watch(() => props.modelValue, () => {
  activeName.value = props.modelValue as string;
}, { immediate: true });

</script>

<style lang="less">
@import './style.less';
</style>