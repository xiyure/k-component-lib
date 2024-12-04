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
        <el-menu v-bind="$attrs" :collapse="useCollapse" @select="handleSelect">
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
import { ref, computed } from 'vue';
import { IconLeftMenuDisplay } from 'ksw-vue-icon';
import { MenuItemRegistered } from 'element-plus';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { menuViewProps } from './type';
import SubMenu from './subMenu.vue';

defineOptions({
  name: 'KMenuView',
});

const props = withDefaults(defineProps<menuViewProps>(), {
  options: () => [],
  showCollapse: true,
  collapse: undefined,
});
const emits = defineEmits(['click', 'select']);

const useCollapse = computed(() => {
  if (props.collapse !== undefined) {
    return props.collapse;
  }
  return isCollapse.value;
});

const isCollapse = ref(false);

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
const handleSelect = (data: any) => {
  emits('select', data);
};

defineExpose({ collapse, expand, toggleCollapse });
</script>

<style lang="less">
@import './style.less';
</style>
