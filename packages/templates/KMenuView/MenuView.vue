<template>
  <div class="k-layout-container h-screen flex overflow-hidden">
    <div class="k-layout-aside flex flex-col" :class="{ 'is-collapse': useCollapse }">
      <div
        v-if="$slots['app-logo']"
        class="logo-box h-12 flex justify-start items-center p-4"
        :class="{ 'is-collapse': useCollapse }"
      >
        <slot name="app-logo"></slot>
      </div>
      <OverlayScrollbarsComponent
        defer
        class="OverlayScrollbarsComponent flex-1"
        :options="{ scrollbars: { autoHide: 'scroll', theme: 'os-theme-light' } }"
      >
        <el-menu  
          :collapse="useCollapse"
          :default-active="defaultActive"
          v-bind="$attrs" 
          @select="handleSelect"
        >
          <sub-menu :options="options" @click="handleClick">
            <template v-for="(_, name) in $slots" :key="name" #[name]="data">
              <slot :name="name" v-bind="data"></slot>
            </template>
          </sub-menu>
        </el-menu>
      </OverlayScrollbarsComponent>
    </div>
    <div class="k-layout-content h-screen overflow-hidden flex flex-col flex-1">
      <div
        class="k-layout-header bg-white h-12 px-4 flex w-full justify-between items-center border-b"
      >
        <IconLeftMenuDisplay
          v-if="props.showCollapse && props.collapse === undefined"
          :class="{ 'rotate-180': !isCollapse }"
          class="collapse-btn cursor-pointer"
          color="black"
          size="20"
          @click="isCollapse = !isCollapse"
        />
        <slot name="header"></slot>
      </div>
      <OverlayScrollbarsComponent
        defer
        :options="{ scrollbars: { autoHide: 'scroll' } }"
        class="flex-1"
      >
        <div class="k-layout-main">
          <slot name="main"></slot>
        </div>
        <div class="k-layout-footer">
          <slot name="footer"></slot>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, provide } from 'vue';
import { IconLeftMenuDisplay } from 'ksw-vue-icon';
import { ElMenu, MenuItemRegistered } from 'element-plus';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { menuViewProps, menuViewOption } from './type';
import SubMenu from './subMenu.vue';
import { transformTreeData } from '../../utils';

defineOptions({
  name: 'KMenuView'
});

const props = withDefaults(defineProps<menuViewProps>(), {
  options: () => [],
  showCollapse: true,
  collapse: undefined
});
const emits = defineEmits(['click', 'select']);

const isCollapse = ref(false);
const activeSet = ref(new Set<string>([]));
const flattenOptions: menuViewOption[] = [];

const useCollapse = computed(() => {
  if (props.collapse !== undefined) {
    return props.collapse;
  }
  return isCollapse.value;
});

watch(() => props.options, () => {
  const array = transformTreeData(
    props.options,
    { parentField: 'index', children: 'children', addPid: true, deleteChildren: true }
  );
  flattenOptions.length = 0;
  flattenOptions.push(...array);
}, { immediate: true, deep: true });

const handleClick = (menuItem: MenuItemRegistered) => {
  emits('click', menuItem);
};
const collapse = () => {
  if (props.collapse !== undefined) {
    return;
  }
  isCollapse.value = true;
};
const expand = () => {
  if (props.collapse !== undefined) {
    return;
  }
  isCollapse.value = false;
};
const toggleCollapse = () => {
  if (props.collapse !== undefined) {
    return;
  }
  isCollapse.value = !isCollapse.value;
};
const handleSelect = (activeIndex: string) => {
  updateActiveSet(activeIndex);
  emits('select', activeIndex);
};
function updateActiveSet(activeIndex: string | undefined) {
  if (!activeIndex) {
    return;
  }
  activeSet.value.clear();
  const optionsMap = new Map(flattenOptions.map((item) => [item.index, item]));
  let curIndex = activeIndex;
  while (curIndex) {
    const option = optionsMap.get(curIndex);
    if (option) {
      activeSet.value.add(option.index);
      curIndex = option.pid;
    }
  }
}

updateActiveSet(props.defaultActive);
provide('__activeSet__', activeSet);

defineExpose({ collapse, expand, toggleCollapse });
</script>

<style lang="less">
@import './style.less';
</style>
